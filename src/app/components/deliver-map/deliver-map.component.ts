import {Component, Input, OnInit} from '@angular/core';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';

@Component({
    selector: 'app-deliver-map',
    templateUrl: './deliver-map.component.html',
    styleUrls: ['./deliver-map.component.scss']
})
export class DeliverMapComponent implements OnInit {

    /**
     * The passed in latitude
     */
    @Input()
    lat: number;

    /**
     * The passed in longitude
     */
    @Input()
    lng: number;

    /**
     * The google map
     */
    map: GoogleMap;

    /**
     * Gets everything set
     */
    ngOnInit() {

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.lat,
                    lng: this.lng,
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

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
