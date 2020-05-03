import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {AlertController, IonTabs, ToastController} from '@ionic/angular';
import CompletingRequestService from '../../services/data-services/completing-request.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-state-delivery',
    templateUrl: './state-delivery.component.html',
    styleUrls: ['./state-delivery.component.scss']
})
export class StateDeliveryComponent implements OnInit {

    /**
     * The currently logged in user
     */
    @Input()
    me: User;

    /**
     * The tabs controller
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

    /**
     * Whether or not the users current request has loaded
     */
    currentRequestDataLoaded = false;

    /**
     * The current coordinates
     */
    currentPosition: Geoposition = null;

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
     * @param userService
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private alertController: AlertController,
                private toastController: ToastController,
                private completingRequestService: CompletingRequestService,
                private userService: UserService,
                private requests: RequestsProvider) {
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        this.locationManager.getPosition().then(position => {
            this.currentPosition = position;
        }).catch(error => {
            console.error(error);
        });

        this.completingRequestService.listenForCompletingRequestChanges({
            next: completingRequest => {
                this.completingRequest = completingRequest;
                console.log('checkForDefaultTab');
                this.checkForDefaultTab();
            },
        });
        this.completingRequestService.getCompletingRequest().then(completingRequest => {
            this.completingRequest = completingRequest;
            if (!this.completingRequest) {
                this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                    for (let i = 0; i < requestsPage.data.length; i++) {
                        const request = requestsPage.data[i];
                        if (request.completed_by_id == this.me.id && !request.completed_at) {
                            this.completingRequestService.setCompletingRequest(request);
                            break;
                        }
                    }
                    this.currentRequestDataLoaded = true;
                    this.userService.cacheUser(this.completingRequest.requested_by);
                });
            } else {
                this.currentRequestDataLoaded = true;
                this.checkForDefaultTab();
                this.userService.cacheUser(this.completingRequest.requested_by);
            }
        });
    }

    /**
     * Checks to see if our default tab has been set
     */
    checkForDefaultTab() {
        if (this.completingRequest && !this.completingRequest.completed_at) {
            setTimeout(() => {
                if (this.tabs.getSelected() == undefined) {
                    this.tabs.select('delivery-info').catch(console.error);
                }
            }, 100);
        }
    }

    /**
     * Opens the alert to allow someone to report a concern with a drop off
     * @param request
     */
    reportProblem(request: Request) {
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
                        this.requests.deliveryRequests.createSafetyReport(request, data.description as string).then(() => {
                            this.toastController.create({
                                message: 'We have received your report, and we will investigate promptly.',
                            }).then(toast => {
                                toast.present().catch(console.error);
                            });
                            this.completingRequestService.setCompletingRequest(null);
                        });
                    }
                }
            ]
        }).then(alert => {
            alert.present().catch(console.error);
        });
    }
}
