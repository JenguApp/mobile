import {Component, OnInit} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {BaseDeliveringPage} from '../base-delivering.page';
import {StateManagerService} from '../../services/state-manager';

@Component({
    selector: 'app-browsing-deliveries',
    templateUrl: './browsing-deliveries.page.html',
    styleUrls: ['./browsing-deliveries.page.scss']
})
export class BrowsingDeliveriesPage extends BaseDeliveringPage implements OnInit {

    /**
     * The currently logged in user
     */
    me: User;

    /**
     * The current coordinates
     */
    currentPosition: Geoposition = null;

    /**
     * The request that the user is currently completing
     */
    currentRequest: Request = null;

    /**
     * Default Constructor
     * @param navController
     * @param currentRequestService
     * @param userService
     * @param stateManagerService
     * @param locationManager
     * @param requests
     */
    constructor(protected requests: RequestsProvider,
                protected navController: NavController,
                protected userService: UserService,
                protected currentRequestService: CurrentRequestService,
                private stateManagerService: StateManagerService,
                private locationManager: LocationManagerService) {
        super(requests, navController, userService, currentRequestService);
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
    }

    /**
     * This should never happen
     */
    noActiveRequest() {}

    /**
     * Takes the user to the next step
     */
    requestUpdated()
    {
        this.stateManagerService.navigateToCurrentPage(this.navController, this.currentRequest).catch(console.error);
    }
}
