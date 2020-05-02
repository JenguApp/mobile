import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {AlertController, ToastController} from '@ionic/angular';
import CompletingRequestService from '../../services/data-services/completing-request.service';
import {RequestsProvider} from '../../providers/requests/requests';

@Component({
    selector: 'app-delivery-info',
    templateUrl: './delivery-info.page.html',
    styleUrls: ['./delivery-info.page.scss'],
})
export class DeliveryInfoPage implements OnInit {

    /**
     * The request that the user is currently completing
     */
    completingRequest: Request = null;

    /**
     * Default Constructor
     * @param locationManager
     * @param alertController
     * @param toastController
     * @param completingRequestService
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private alertController: AlertController,
                private toastController: ToastController,
                private completingRequestService: CompletingRequestService,
                private requests: RequestsProvider) {
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void {
        this.completingRequestService.getCompletingRequest().then(completingRequest => {
            this.completingRequest = completingRequest;
        });
    }

    /**
     * handles the complete function
     * @param completingRequest
     */
    complete(completingRequest: Request) {
        this.alertController.create({
            header: 'Completing Request',
            message: 'Please make sure that you have followed all drop off instructions before you complete the request.',
            buttons: [
                {
                    text: 'One Moment',
                },
                {
                    text: 'All Set!',
                    handler: () => {
                        this.requests.deliveryRequests.completeDeliveryRequest(completingRequest).then((request) => {
                            this.completingRequestService.setCompletingRequest(request);
                        });
                    }
                }
            ]
        }).then(alert => {
            alert.present().catch(console.error);
        });
    }
}
