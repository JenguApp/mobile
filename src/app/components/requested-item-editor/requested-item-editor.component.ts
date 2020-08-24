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
import {RequestedItem} from '../../models/request/requested-item';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import {AlertController, IonInput} from '@ionic/angular';
import IsEntity from '../../models/contracts/is-entity';

@Component({
    selector: 'app-requested-item-editor',
    templateUrl: './requested-item-editor.component.html',
    styleUrls: ['./requested-item-editor.component.scss']
})
export class RequestedItemEditorComponent implements OnChanges {

    /**
     * The requested item that
     */
    @Input()
    requestedItem: RequestedItem = null;

    /**
     * Whether or not this is for reviewing an item related to a location
     */
    @Input()
    isLocationRequestReview = false;

    /**
     * The currently logged in user
     */
    @Input()
    entity: IsEntity;

    /**
     * The change detection passed in, so that we can send messages backwards
     */
    @Input()
    changeDetection: ChangeDetectorRef;

    /**
     * Whether or not we should show the quantity inputs
     */
    @Input()
    showQuantity: boolean;

    /**
     * The rating change callback
     */
    @Output()
    itemRemoved: EventEmitter<RequestedItemEditorComponent> = new EventEmitter();

    /**
     * The input for the name
     */
    @ViewChild('name', {static: true})
    nameInput: IonInput;

    /**
     * The input for the quantity if it exists
     */
    @ViewChild('quantity', {static: false})
    quantityInput: IonInput;

    /**
     * The input for the maxQuantityPerRequest if it exists
     */
    @ViewChild('maxQuantityPerRequest', {static: false})
    maxQuantityPerRequestInput: IonInput;

    /**
     * The private instance of our requested item
     */
    localItem: RequestedItem = null;

    /**
     * Whether or not the image is currently uploading
     */
    uploading = false;

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
     * Prompts the user if they really want to destroy the item if it already exists
     */
    promptDestroy() {
        if (this.requestedItem.id) {

            this.alertController.create({
                header: 'Are you sure?',
                message: 'This cannot be undone.',
                buttons: [
                    {
                        text: 'Cancel',
                    },
                    {
                        text: 'Destroy',
                        handler: () => {
                            this.destroy();
                        }
                    },
                ]
            }).then(alert => {
                alert.present();
            });
        } else {
            this.remove();
        }
    }

    /**
     * Destroys the requested item properly
     */
    destroy() {
        this.requests.locationRequestedItems.deleteOrganizationManager(this.requestedItem).then(() => {
            this.remove();
        });
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
            this.uploading = true;
            this.changeDetection.detectChanges();
            this.localItem.replaceAsset(this.requests, this.entity, imageData).then(() => {
                this.uploading = false;
                this.changeDetection.detectChanges();
            });
        });
    }

    /**
     * Gets the requested item model with all of it's current values
     */
    getRequestedItemModel(): RequestedItem {

        this.localItem.name = this.nameInput.value as string;

        if (this.showQuantity) {
            this.localItem.quantity = this.quantityInput.value as number;
            this.localItem.max_quantity_per_request = this.maxQuantityPerRequestInput.value as number;
        }

        return this.localItem;
    }

    /**
     * Clears all inputs
     */
    clear() {
        this.nameInput.value = '';
        if (this.showQuantity) {
            this.quantityInput.value = '';
            this.maxQuantityPerRequestInput.value = '';
        }
        this.localItem = new RequestedItem({});
    }
}
