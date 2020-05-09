import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import {AlertController} from '@ionic/angular';
import CompletingRequestService from '../../services/data-services/completing-request.service';
import {RequestsProvider} from '../../providers/requests/requests';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';


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
     * Whether or not the user has opened the navigation app
     */
    hasNavigated = false;

    /**
     * Default Constructor
     * @param alertController
     * @param completingRequestService
     * @param requests
     * @param launchNavigator
     */
    constructor(private alertController: AlertController,
                private completingRequestService: CompletingRequestService,
                private requests: RequestsProvider,
                private launchNavigator: LaunchNavigator) {
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
     * Opens the navigation properly
     */
    openNavigation() {
        this.launchNavigator.navigate([this.completingRequest.latitude, this.completingRequest.longitude]).then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
        );
        this.hasNavigated = true;
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
