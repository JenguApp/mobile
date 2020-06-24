import {Component, Input} from '@angular/core';
import {Request} from '../../models/request/request';
import {AlertController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-delivery-completed',
    templateUrl: './delivery-completed.component.html',
    styleUrls: ['./delivery-completed.component.scss']
})
export class DeliveryCompletedComponent {

    /**
     * The text we will display in the button that allows the user to officially complete the request within the app
     */
    @Input()
    completionText: string;

    /**
     * The request that was completed
     */
    @Input()
    request: Request;

    /**
     * Default Constructor
     * @param currentRequestService
     * @param requests
     * @param toastController
     * @param alertController
     */
    constructor(private currentRequestService: CurrentRequestService,
                private requests: RequestsProvider,
                private toastController: ToastController,
                private alertController: AlertController) {
    }

    /**
     * Completes the request properly
     */
    complete() {
        this.currentRequestService.setCurrentRequest(null);
    }

    /**
     * Opens the alert to allow someone to report a concern with a drop off
     */
    reportProblem() {
        this.alertController.create({
            header: 'Report A Problem',
            inputs: [
                {
                    name: 'description',
                    type: 'textarea',
                    placeholder: 'What was the problem?',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Submit',
                    handler: data => {
                        this.requests.deliveryRequests.createSafetyReport(this.request, data.description as string).then(() => {
                            this.toastController.create({
                                message: 'We have received your report, and we will investigate promptly.',
                            }).then(toast => {
                                toast.present().catch(console.error);
                            });
                            this.currentRequestService.setCurrentRequest(null);
                        });
                    }
                }
            ]
        }).then(alert => {
            alert.present().catch(console.error);
        });
    }
}
