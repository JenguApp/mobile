import {Component} from '@angular/core';
import {MapComponent} from '../map.component';
import {RequestsProvider} from '../../../providers/requests/requests';
import {GoogleMapsEvent} from '@ionic-native/google-maps';
import {Location} from '../../../models/organization/location';

@Component({
    selector: 'app-location-browse-map',
    templateUrl: './location-browse-map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationBrowseMapComponent extends MapComponent {

    /**
     * All makers currently on the map with the id used as the index
     */
    markersOnMap = [];

    /**
     * The overriding map id
     */
    id = 'location_browse_map';

    /**
     * The current selected location
     */
    location: Location;

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
    afterMapReady()
    {
        this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe({
            next: () => this.loadLocations()
        });
        this.loadLocations();
    }

    /**
     * Loads locations based on the current map position
     */
    loadLocations()
    {
        const latLng = this.map.getCameraTarget();
        this.requests.locationRequests.queryLocations(latLng.lat, latLng.lng, 50).then(page => {
            page.data.forEach(location => {

                if (this.markersOnMap[location.id] == null) {
                    const marker = this.map.addMarkerSync({
                        title: location.name,
                        icon: 'blue',
                        animation: 'DROP',
                        draggable: true,
                        position: {
                            lat: location.latitude,
                            lng: location.longitude,
                        },
                    });
                    this.markersOnMap[location.id].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                        this.location = location;
                    });

                    this.markersOnMap[location.id] = marker;
                }
            });
        });
    }

    /**
     * Clears the selected location out for us
     */
    clearLocation()
    {
        this.location = null;
    }

    /**
     * 
     */
    goToLocation()
    {
        // TODO go to the location page
    }
}
