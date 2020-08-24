import {Component} from '@angular/core';
import {MapComponent} from '../map.component';

@Component({
    selector: 'app-location-review-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationReviewMapComponent extends MapComponent
{
    /**
     * Overrides the id to avoid clashing bugs
     */
    id = 'location_review';

    /**
     * The map cannot be moved while in this view
     */
    movable = false;

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            draggable: false,
            position: {
                lat: this.startingLatitude,
                lng: this.startingLongitude
            }
        });
    }
}
