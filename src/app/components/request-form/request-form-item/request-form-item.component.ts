import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {RequestedItem} from '../../../models/request/requested-item';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../../providers/requests/requests';
import {User} from '../../../models/user/user';
import {AlertController, IonInput} from '@ionic/angular';
import {Asset} from '../../../models/asset';

@Component({
    selector: 'app-request-form-item',
    templateUrl: './request-form-item.component.html',
    styleUrls: ['./request-form-item.component.scss']
})
export class RequestFormItemComponent implements OnChanges {

    /**
     * The requested item that
     */
    @Input()
    requestedItem: RequestedItem = null;

    /**
     * The currently logged in user
     */
    @Input()
    user: User;

    /**
     * The change detection passed in, so that we can send messages backwards
     */
    @Input()
    changeDetection: ChangeDetectorRef;

    /**
     * The rating change callback
     */
    @Output()
    itemRemoved: EventEmitter<RequestFormItemComponent> = new EventEmitter();

    /**
     * The input for the name
     */
    @ViewChild('name', {static: true})
    nameInput: IonInput;

    /**
     * The private instance of our requested item
     */
    localItem: RequestedItem = null;

    /**
     * Default Constructor
     * @param camera
     * @param requests
     * @param alertController
     */
    constructor(private camera: Camera,
                private requests: RequestsProvider,
                private alertController: AlertController) {
    }

    /**
     * Detects changes properly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.requestedItem && changes.requestedItem.currentValue != changes.requestedItem.previousValue) {
            this.localItem = this.requestedItem;
        } else if (this.localItem === null) {
            this.localItem = new RequestedItem({});
        }
    }

    /**
     * Asks the user how they want to capture their profile image
     */
    promptCaptureMethod() {
        this.alertController.create({
            header: 'Do you want to take a picture, or select one from your library?',
            buttons: [
                {
                    text: 'Take',
                    handler: () => {
                        this.captureImage(this.camera.PictureSourceType.CAMERA);
                    },
                }, {
                    text: 'Library',
                    handler: () => {
                        this.captureImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                    },
                }
            ]
        }).then(alert => {
            alert.present();
        });
    }

    /**
     * Makes sure to emit the item removed listener
     */
    remove() {
        this.itemRemoved.emit(this);
    }

    /**
     * Inits the image capture
     */
    captureImage(sourceType) {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            this.localItem.replaceAsset(this.requests, this.user, imageData, this.changeDetection);
        });
    }

    /**
     * Gets the requested item model with all of it's current values
     */
    getRequestedItemModel(): RequestedItem {

        this.localItem.name = this.nameInput.value;

        return this.localItem;
    }

    /**
     * Clears all inputs
     */
    clear() {
        this.nameInput.value = '';
        this.localItem = new RequestedItem({});
    }
}
