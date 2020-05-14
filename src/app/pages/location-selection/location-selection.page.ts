import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import { RequestCreationService } from '../../services/data-services/request-creation.service';
import {LocationSelectMapComponent} from '../../components/map/location-select-map/location-select-map.component';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-location-selection',
    templateUrl: './location-selection.page.html',
    styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {

    @ViewChild('map', {static: false})
    map: LocationSelectMapComponent;

    /**
     * The current position loaded
     */
    currentPosition: Geoposition = null;

    /**
     * Default Constructor
     * @param locationManagerService
     * @param requestCreationService
     * @param navController
     */
    constructor(private locationManagerService: LocationManagerService,
                private requestCreationService: RequestCreationService,
                private navController: NavController) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.locationManagerService.getPosition().then(position => {
            this.currentPosition = position;
        }).catch(error => {
            console.error(error);
        });
    }

    /**
     * Starts the submission process while storing the selected location information,
     * and takes the user to the next page where they can review their request.
     */
    continue() {
        const position = this.map.getPosition();
        this.requestCreationService.storeLocationInformation(position.lat, position.lng);
        this.navController.navigateForward('/request-review').catch(console.error);
    }
}
