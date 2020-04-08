import {Component, Input, OnInit} from '@angular/core';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';

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
     * Gets everything set
     */
    ngOnInit() {

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.startingLatitude,
                    lng: this.startingLongitude,
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);
        this.afterMapReady();
    }

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {}
}
