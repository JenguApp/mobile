import {Component, OnInit, ViewChild} from '@angular/core';
import {Request} from '../../models/request/request';
import {IonTabs, NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {BaseRequestingDeliveriesPage} from '../base-requesting-deliveries.page';

@Component({
    selector: 'app-pending-request',
    templateUrl: './pending-request.page.html',
    styleUrls: ['./pending-request.page.scss']
})
export class PendingRequestPage extends BaseRequestingDeliveriesPage {

    /**
     * The tabs controller
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

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

    constructor(protected requests: RequestsProvider,
                protected navController: NavController,
                protected userService: UserService,
                protected currentRequestService: CurrentRequestService,
                protected toastController: ToastController) {
        super(requests, navController, userService, currentRequestService);
    }

    /**
     * sets up our request properly
     */
    requestUpdated() {
        this.checkForDefaultTab();
        this.userService.cacheUser(this.currentRequest.requested_by);
        if (!this.currentRequest.completed_by_id) {
            this.setNextRefreshTime(10);
        }
    }

    /**
     * Checks to see if our default tab has been set
     */
    checkForDefaultTab() {
        if (this.currentRequest && !this.currentRequest.completed_at) {
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
            this.currentRequest = null;
            this.currentRequestService.setCurrentRequest(null);
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

    /**
     * Takes us home in this situation
     */
    noActiveRequest() {
        this.navController.navigateRoot('/home').catch(console.error);
    }
}
