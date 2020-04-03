import { Component } from '@angular/core';
import {LineItem} from '../../models/request/line-item';
import {Asset} from '../../models/asset';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../providers/requests/requests';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {

    /**
     * All line items the user has entered so far
     */
    lineItems: LineItem[] = [];

    /**
     * The new asset he user has added
     */
    newItemAsset: Asset = null;

    /**
     *
     * @param camera
     * @param requests
     */
    constructor(private camera: Camera,
                private requests: RequestsProvider) {
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
            // TODO handle upload
            // this.requests.auth.uploadProfileImage(this.user, imageData).then(asset => {
            //     this.user.profile_image_url = asset.url;
            // });
        });
    }
}
