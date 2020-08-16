import {Component, OnInit, ViewChild} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {IonTabs, NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {BaseDeliveringPage} from '../base-delivering.page';
import {StateManagerService} from '../../services/state-manager';
import {BasePage} from '../base.page';

@Component({
    selector: 'app-locations-map',
    templateUrl: './locations-map.page.html',
    styleUrls: ['./locations-map.page.scss']
})
export class LocationsMapPage extends BasePage implements OnInit{

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
     * Default Constructor
     * @param locationManager
     */
    constructor(private locationManager: LocationManagerService) {
        super();
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
}
