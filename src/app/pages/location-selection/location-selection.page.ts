import { Component, OnInit } from '@angular/core';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Geoposition} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-location-selection',
    templateUrl: './location-selection.page.html',
    styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {

    /**
     * The current position loaded
     */
    currentPosition: Geoposition = null;

    /**
     * Default Constructor
     * @param locationManagerService
     */
    constructor(private locationManagerService: LocationManagerService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.locationManagerService.getPosition().then(position => {
            this.currentPosition = position;
        });
    }
}
