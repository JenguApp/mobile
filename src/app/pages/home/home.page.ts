import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';
import {Events, Platform} from '@ionic/angular';
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
     *
     * @param stateManager
     * @param locationManager
     * @param platform
     * @param requests
     * @param userService
     * @param pendingRequestService
     * @param events
     */
    constructor(private stateManager: StateManagerService,
                private locationManager: LocationManagerService,
                private platform: Platform,
                private requests: RequestsProvider,
                private userService: UserService,
                private pendingRequestService: PendingRequestService,
                private events: Events) {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        this.events.subscribe('state-changed', (state => {
            this.currentState = state;
        }));
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
        // TODO run request load
        this.pendingRequestService.listenForPendingRequestChanges({
            next: (update) => {
                if (update instanceof Request) {
                    // TODO set request data
                } else {
                    // TODO show waiting text
                }
            },
            complete: () => {

            }
        });
        this.currentRequestDataLoaded = true;
    }
}
