import {Component, OnInit, ViewChild} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {IonTabs, NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {StorageProvider} from '../../providers/storage/storage';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {BaseDeliveringPage} from '../base-delivering.page';

@Component({
    selector: 'app-browsing-deliveries',
    templateUrl: './browsing-deliveries.page.html',
    styleUrls: ['./browsing-deliveries.page.scss']
})
export class BrowsingDeliveriesPage extends BaseDeliveringPage {

    /**
     * The currently logged in user
     */
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
    currentRequest: Request = null;

    /**
     * Default Constructor
     * @param navController
     * @param currentRequestService
     * @param userService
     * @param locationManager
     * @param requests
     */
    constructor(protected requests: RequestsProvider,
                protected navController: NavController,
                protected userService: UserService,
                protected currentRequestService: CurrentRequestService,
                private locationManager: LocationManagerService) {
        super(requests, navController, userService, currentRequestService);
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        super.ngOnInit();
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
    requestUpdated() {
        this.currentRequestService.navigateToCurrentPage(this.navController, 'request');
    }
}
