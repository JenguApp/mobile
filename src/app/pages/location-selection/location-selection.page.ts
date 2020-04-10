import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import RequestCreationService from '../../services/data-services/request-creation.service';
import {LocationSelectMapComponent} from '../../components/map/location-select-map/location-select-map.component';

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
     */
    constructor(private locationManagerService: LocationManagerService,
                private requestCreationService: RequestCreationService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.locationManagerService.getPosition().then(position => {
            this.currentPosition = position;
        });
    }

    /**
     * Starts the submission process while storing the selected location information,
     * and takes the user to the next page where they can review their request.
     */
    continue() {
        const position = this.map.getPosition();
        this.requestCreationService.storeLocationInformation(position.lat, position.lng);
    }
}
