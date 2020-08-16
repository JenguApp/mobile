import {Component} from '@angular/core';
import {MapComponent} from '../map.component';
import {RequestsProvider} from '../../../providers/requests/requests';

@Component({
    selector: 'app-location-browse-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationBrowseMapComponent extends MapComponent {

    /**
     * All makers currently on the map with the id used as the index
     */
    markersOnMap = [];

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider)
    {
        super();
    }

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        this.requests.locationRequests.queryLocations(this.startingLatitude, this.startingLongitude, 50).then(page => {
            page.data.forEach(location => {

                if (this.markersOnMap[location.id] == null) {
                    this.markersOnMap[location.id] = this.map.addMarkerSync({
                        title: location.name,
                        icon: 'blue',
                        animation: 'DROP',
                        draggable: true,
                        position: {
                            lat: location.latitude,
                            lng: location.longitude,
                        }
                    });
                }
            });
        });
    }
}
