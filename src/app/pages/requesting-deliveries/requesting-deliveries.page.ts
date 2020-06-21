import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {IonTabs, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import { PendingRequestService } from '../../services/data-services/pending-request.service';
import {StorageProvider} from '../../providers/storage/storage';

@Component({
    selector: 'app-requesting-deliveries',
    templateUrl: './requesting-deliveries.page.html',
    styleUrls: ['./requesting-deliveries.page.scss']
})
export class RequestingDeliveriesPage implements OnInit {

    /**
     * The Logged in user
     */
    @Input()
    me: User = null;

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
     * Whether or not there is a pending request
     */
    pendingRequest: Request = null;

    /**
     * The time for when the next refresh will be attempted for any pieces of data that may be refreshed
     */
    nextRefreshTime = 0;

    /**
     * The handler for our refresh ui updating timeout
     */
    refreshTimer = null;

    /**
     * A boolean value that we toggle to start and stop the loading animation
     */
    loadingAnimating = false;

    /**
     * Default Constructor
     * @param locationManager
     * @param requests
     * @param toastController
     * @param storageProvider
     * @param pendingRequestService
     */
    constructor(private locationManager: LocationManagerService,
                private requests: RequestsProvider,
                private toastController: ToastController,
                private storageProvider: StorageProvider,
                private pendingRequestService: PendingRequestService) {
    }

    /**
     * Loads information on the users current requests
     */
    ngOnInit(): void {
        this.pendingRequestService.listenForPendingRequestChanges({
            next: (update) => {
                if (update instanceof Request) {
                    this.pendingRequest = update;
                } else {
                    this.setNextRefreshTime(update);
                }
            },
            complete: () => {

            }
        });
        this.storageProvider.loadCurrentActiveRequest().then(request => {
            this.setRequest(request);
            this.currentRequestDataLoaded = true;
        }).catch(e => {
            this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                for (let i = 0; i < requestsPage.data.length; i++) {
                    const request = requestsPage.data[i];
                    if (request.requested_by_id == this.me.id && !request.canceled_at && !request.completed_at) {
                        this.storageProvider.saveCurrentActiveRequest(request).catch(console.error);
                        this.setRequest(request);
                        break;
                    }
                }
                this.currentRequestDataLoaded = true;
            });
        });
    }

    /**
     * sets up our request properly
     * @param request
     */
    setRequest(request: Request) {
        this.pendingRequest = request;
        this.checkForDefaultTab();
        this.pendingRequestService.setPendingRequest(request);
        if (!request.completed_by_id) {
            this.setNextRefreshTime(10);
        }
    }

    /**
     * Checks to see if our default tab has been set
     */
    checkForDefaultTab() {
        if (this.pendingRequest && !this.pendingRequest.completed_at) {
            setTimeout(() => {
                if (this.tabs.getSelected() == undefined) {
                    this.tabs.select('request-accepted-info').catch(console.error);
                }
            }, 100);
        }
    }

    /**
     * Cancels the request the user created
     * @param request
     */
    cancelRequest(request: Request) {
        this.requests.deliveryRequests.cancelRequest(this.me, request).then(() => {
            this.toastController.create({
                message: 'Your request has been cancelled!',
                duration: 2000
            }).then(toast => {
                toast.present();
            });
            this.pendingRequest = null;
        });
    }

    /**
     * Sets the next refresh time for our timer
     * @param nextRefreshTime
     */
    setNextRefreshTime(nextRefreshTime: number) {
        this.nextRefreshTime = nextRefreshTime;
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        this.startTimerAnimationCycle();

        this.refreshTimer = setInterval(() => {
            this.nextRefreshTime--;
            if (this.nextRefreshTime <= 0) {
                this.nextRefreshTime = 0;
                clearInterval(this.refreshTimer);
            } else {
                this.startTimerAnimationCycle();
            }
        }, 1000);
    }

    /**
     * Stats the timer animation cycle by toggling our boolean variable to remove and apply our animation class
     */
    startTimerAnimationCycle() {
        this.loadingAnimating = false;
        setTimeout(() => {
            this.loadingAnimating = true;
        }, 10);
    }
}
