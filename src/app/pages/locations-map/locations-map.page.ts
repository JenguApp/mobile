import {Component, OnInit} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {User} from '../../models/user/user';
import {BasePage} from '../base.page';

@Component({
    selector: 'app-locations-map',
    templateUrl: './locations-map.page.html',
    styleUrls: ['./locations-map.page.scss']
})
export class LocationsMapPage extends BasePage implements OnInit
{

    /**
     * The currently logged in user
     */
    me: User;

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
