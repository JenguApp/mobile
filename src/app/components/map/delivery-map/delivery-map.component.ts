import {Component} from '@angular/core';
import {GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {MapComponent} from '../map.component';

@Component({
    selector: 'app-delivery-map',
    templateUrl: '../map.component.html',
    styleUrls: ['../map.component.scss']
})
export class DeliveryMapComponent extends MapComponent {

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        let marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: 43.0741904,
                lng: -89.3809802
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
        });
    }
}
