import {Component} from '@angular/core';
import {GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {MapComponent} from '../map.component';
import {ILatLng} from '@ionic-native/google-maps/ngx';

@Component({
    selector: 'app-location-select-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class LocationSelectMapComponent extends MapComponent {

    /**
     * The marker on the map that lets the user select the location
     */
    selectMarker: Marker;

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        this.selectMarker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            draggable: true,
            position: {
                lat: this.startingLatitude,
                lng: this.startingLongitude
            }
        });
    }

    /**
     * Gets the current position the user has selected
     */
    getPosition(): ILatLng {
        return this.selectMarker.getPosition();
    }
}
