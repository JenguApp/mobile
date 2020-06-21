import {Component, OnInit, ViewChild} from '@angular/core';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {IonTabs, NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import { CurrentRequestService } from '../../services/data-services/current-request.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-requesting-deliveries',
    templateUrl: './requesting-deliveries.page.html',
    styleUrls: ['./requesting-deliveries.page.scss']
})
export class RequestingDeliveriesPage implements OnInit {

    /**
     * The Logged in user
     */
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
     * @param navController
     * @param userService
     * @param currentRequestService
     */
    constructor(private locationManager: LocationManagerService,
                private requests: RequestsProvider,
                private toastController: ToastController,
                private navController: NavController,
                private userService: UserService,
                private currentRequestService: CurrentRequestService) {
    }

    /**
     * Loads information on the users current requests
     */
    ngOnInit(): void {
        this.me = this.userService.getMe();
        if (!this.me) {
            this.navController.navigateRoot('/home').catch(console.error);
            return;
        }
        this.currentRequestService.listenForCurrentRequestChanges({
            next: completingRequest => {
                this.setRequest(completingRequest);
            },
        });
        this.currentRequestService.getCurrentRequest().then(request => {
            this.setRequest(request);
            this.currentRequestDataLoaded = true;
        }).catch(() => {
            this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                for (let i = 0; i < requestsPage.data.length; i++) {
                    const request = requestsPage.data[i];
                    if (request.requested_by_id == this.me.id && !request.canceled_at && !request.completed_at) {
                        this.currentRequestService.setCurrentRequest(request);
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
        this.userService.cacheUser(this.pendingRequest.requested_by);
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
        this.currentRequestService.waitForRequestRefresh(nextRefreshTime);
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
