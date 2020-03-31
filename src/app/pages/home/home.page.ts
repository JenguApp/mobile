import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';
import {Events, Platform} from '@ionic/angular';
import {Coordinates, Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';

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
     *
     * @param stateManager
     * @param locationManager
     * @param platform
     * @param events
     */
    constructor(private stateManager: StateManagerService,
                private locationManager: LocationManagerService,
                private platform: Platform,
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

            this.locationManager.getPosition().then(position => {
                this.currentPosition = position;
            }).catch(error => {
                console.error(error);
            });
        });
    }
}
