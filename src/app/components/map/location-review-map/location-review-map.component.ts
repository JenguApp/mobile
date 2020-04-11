import {Component} from '@angular/core';
import {MapComponent} from '../map.component';

@Component({
    selector: 'app-location-review-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationReviewMapComponent extends MapComponent {

    /**
     * The map cannot be moved while in this view
     */
    movable = false;
}
