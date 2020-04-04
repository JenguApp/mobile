import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';
import {Events, Platform} from '@ionic/angular';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {RequestsProvider} from '../../providers/requests/requests';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';

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
     *
     * @param stateManager
     * @param locationManager
     * @param platform
     * @param requests
     * @param userService
     * @param events
     */
    constructor(private stateManager: StateManagerService,
                private locationManager: LocationManagerService,
                private platform: Platform,
                private requests: RequestsProvider,
                private userService: UserService,
                private events: Events) {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        this.stateManager.getCurrentState().then(state => {
            this.currentState = state;
        });
        this.events.subscribe('state-changed', (state => {
            this.currentState = state;
        }));
        this.platform.ready().then(() => {

            this.me = this.userService.getMe();
            if (!this.me) {
                this.requests.auth.loadInitialInformation().then(user => {
                    this.userService.storeMe(user);
                    this.me = user;
                });
            }
            this.locationManager.getPosition().then(position => {
                this.currentPosition = position;
            }).catch(error => {
                console.error(error);
            });
        });
    }
}
