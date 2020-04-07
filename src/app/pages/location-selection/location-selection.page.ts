import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import RequestCreationService from '../../services/data-services/request-creation.service';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {GoogleMap, GoogleMapOptions, GoogleMaps} from '@ionic-native/google-maps';

@Component({
    selector: 'app-location-selection',
    templateUrl: './location-selection.page.html',
    styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {

    /**
     * The google map
     */
    map: GoogleMap;

    /**
     * Whether or not the location has loaded
     */
    locationLoaded = false;

    /**
     * Default Constructor
     * @param navController
     * @param locationManagerService
     * @param requestCreationService
     */
    constructor(private navController: NavController,
                private locationManagerService: LocationManagerService,
                private requestCreationService: RequestCreationService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.locationManagerService.getPosition().then(position => {
            this.locationLoaded = true;

            let mapOptions: GoogleMapOptions = {
                camera: {
                    target: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    zoom: 18,
                    tilt: 30
                }
            };

            this.map = GoogleMaps.create('map_canvas', mapOptions);
        });
    }
}
