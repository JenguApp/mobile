import {Component, Input, OnInit} from '@angular/core';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from '@ionic-native/google-maps';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    /**
     * The passed in latitude
     */
    @Input()
    startingLatitude: number;

    /**
     * The passed in longitude
     */
    @Input()
    startingLongitude: number;

    /**
     * The google map
     */
    map: GoogleMap;

    /**
     * Most maps are movable, but some components may override this to display a static map
     */
    movable = true;

    /**
     * Gets everything set
     */
    ngOnInit() {

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.startingLatitude,
                    lng: this.startingLongitude,
                },
                zoom: 18,
                tilt: 30
            }
        };

        if (!this.movable) {
            mapOptions.gestures = {
                scroll: false,
                tilt: false,
                zoom: false,
                rotate: false,
            };
        }

        this.map = GoogleMaps.create('map_canvas', mapOptions);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.afterMapReady();
        });
    }

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {}
}
