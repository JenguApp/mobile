import {Component} from '@angular/core';
import {GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {MapComponent} from '../map.component';

@Component({
    selector: 'app-location-select-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationSelectMapComponent extends MapComponent {

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        let marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            draggable: true,
            position: {
                lat: this.startingLatitude,
                lng: this.startingLongitude
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
        });
    }
}
