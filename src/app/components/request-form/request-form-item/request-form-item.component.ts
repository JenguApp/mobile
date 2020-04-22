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
     * The asset the user has uploaded for this item
     */
    asset: Asset = null;

    /**
     * Default Constructor
     * @param camera
     * @param requests
     * @param changeDetection
     * @param alertController
     */
    constructor(private camera: Camera,
                private requests: RequestsProvider,
                private changeDetection: ChangeDetectorRef,
                private alertController: AlertController) {
    }

    /**
     * Detects changes properly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.requestedItem && changes.requestedItem.currentValue != changes.requestedItem.previousValue) {
            this.asset = this.requestedItem.asset;
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
            this.requests.deliveryRequests.uploadAsset(this.user, imageData).then(asset => {
                this.asset = asset;
                this.changeDetection.detectChanges();
            });
        });
    }

    /**
     * Gets the requested item model with all of it's current values
     */
    getRequestedItemModel(): RequestedItem {
        const model = this.requestedItem ? this.requestedItem : new RequestedItem({});

        model.name = this.nameInput.value;
        model.asset = this.asset;

        return model;
    }

    /**
     * Clears all inputs
     */
    clear() {
        this.nameInput.value = '';
        this.asset = null;
    }
}
