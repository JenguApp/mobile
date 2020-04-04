import {Component, Input, ViewChild} from '@angular/core';
import {RequestedItem} from '../../../models/request/requested-item';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../../providers/requests/requests';
import {User} from '../../../models/user/user';
import {AlertController, IonInput} from '@ionic/angular';

@Component({
    selector: 'app-request-form-item',
    templateUrl: './request-form-item.component.html',
    styleUrls: ['./request-form-item.component.scss']
})
export class RequestFormItemComponent {

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
     * The input for the name
     */
    @ViewChild('name', {static: true})
    nameInput: IonInput;

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
     * Gets the image asset url to show to the user
     */
    getAssetUrl(): string {
        return this.requestedItem.asset ? this.requestedItem.asset.url : '/assets/default.jpg';
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
                //     this.user.profile_image_url = asset.url;/
            });
        });
    }
}
