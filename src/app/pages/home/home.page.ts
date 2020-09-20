import {Component, OnInit} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {BaseRequestPage} from '../base-request.page';
import {Page} from '../../models/page';
import {Request} from '../../models/request/request';
import {RequestsProvider} from '../../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {StateManagerService} from '../../services/state-manager';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage extends BaseRequestPage implements OnInit
{
    /**
     * Whether or not the users current request has loaded
     */
    currentRequestDataLoaded = false;

    /**
     * The current coordinates
     */
    currentPosition: Geoposition = null;

    /**
     * Whether or not this page is currently the active page
     */
    pageActive = true;

    /**
     * Default Constructor
     * @param requests
     * @param navController
     * @param userService
     * @param currentRequestService
     * @param stateManager
     * @param locationManager
     */
    constructor(protected requests: RequestsProvider,
                protected navController: NavController,
                protected userService: UserService,
                protected currentRequestService: CurrentRequestService,
                private stateManager: StateManagerService,
                private locationManager: LocationManagerService) {
        super(requests, navController, userService, currentRequestService);
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void
    {
        this.locationManager.getPosition().then(position => {
            this.currentPosition = position;
        }).catch(error => {
            console.error(error);
        });
    }

    /**
     * sets the page to be active
     */
    ionViewDidEnter(): void
    {
        this.pageActive = true;
    }

    /**
     * Removes the refresh timer in order to prevent us from running accidental updates on this page
     */
    ionViewWillLeave(): void
    {
        this.pageActive = false;
    }

    /**
     * Returns the current incomplete request
     * @param page
     */
    findCurrentRequest(page: Page<Request>): Request
    {
        return page.data.find(request => request.completed_at == null);
    }

    /**
     * No action needed here
     */
    noActiveRequest() {}

    /**
     * Takes the user to the current request page.
     * This
     */
    requestUpdated()
    {
        if (this.pageActive) {
            this.stateManager.navigateToCurrentPage(this.navController, this.currentRequest).catch(console.error);
        }
    }
}
