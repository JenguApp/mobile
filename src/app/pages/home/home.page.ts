import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';
import {Platform} from '@ionic/angular';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {RequestsProvider} from '../../providers/requests/requests';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import PendingRequestService from '../../services/data-services/pending-request.service';
import {Request} from '../../models/request/request';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {

    /**
     * The current state of the app
     */
    currentState: State = null;

    /**
     * The current coordinates
     */
    currentPosition: Geoposition = null;

    /**
     * The Logged in user
     */
    me: User = null;

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
    nextRefreshTime = null;

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
     * @param stateManager
     * @param locationManager
     * @param platform
     * @param requests
     * @param userService
     * @param pendingRequestService
     */
    constructor(private stateManager: StateManagerService,
                private locationManager: LocationManagerService,
                private platform: Platform,
                private requests: RequestsProvider,
                private userService: UserService,
                private pendingRequestService: PendingRequestService) {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        this.stateManager.stateChangeObserver.subscribe(state => {
            this.currentState = state;
        });
        this.platform.ready().then(() => {

            this.stateManager.getCurrentState().then(state => {
                this.currentState = state;
            });
            this.me = this.userService.getMe();
            if (!this.me) {
                this.requests.auth.loadInitialInformation().then(user => {
                    this.userService.storeMe(user);
                    this.me = user;
                    this.loadRequestInformation();
                });
            } else {
                this.loadRequestInformation();
            }
            this.locationManager.getPosition().then(position => {
                this.currentPosition = position;
            }).catch(error => {
                console.error(error);
            });
        });
    }

    /**
     * Loads information on the users current requests
     */
    loadRequestInformation() {
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
        this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
            if (requestsPage.data.length > 0) {
                const first = requestsPage.data[0];
                if (!first.completed) {
                    this.pendingRequest = first;
                }
            }
            this.currentRequestDataLoaded = true;
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
