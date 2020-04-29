import {Component, EventEmitter, Output} from '@angular/core';
import {GoogleMapsEvent, Marker, VisibleRegion} from '@ionic-native/google-maps';
import {MapComponent} from '../map.component';
import {RequestsProvider} from '../../../providers/requests/requests';
import {Request} from '../../../models/request/request';

@Component({
    selector: 'app-delivery-map',
    templateUrl: './delivery-map.component.html',
    styleUrls: ['../map.component.scss']
})
export class DeliveryMapComponent extends MapComponent {

    /**
     * The request the user is currently looking at
     */
    request: Request = null;

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider) {
        super();
    }

    /**
     * Allows child classes to setup the map properly after this has been initialized
     */
    afterMapReady() {
        this.loadDeliveryRequests(this.startingLongitude, this.startingLatitude);
        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
            const position = this.map.getCameraTarget();
            this.loadDeliveryRequests(position.lng, position.lat);
        });
    }

    /**
     * Loads all delivery requests
     * @param centerLongitude
     * @param centerLatitude
     */
    loadDeliveryRequests(centerLongitude: number, centerLatitude: number) {

        const visibleRegion = this.map.getVisibleRegion();
        const radius = this.calculateRadius(visibleRegion);
        this.requests.deliveryRequests.searchAvailableRequests(centerLongitude, centerLatitude, radius).then(deliveryRequests => {
            this.map.clear().then(() => {
                deliveryRequests.data.forEach(request => this.addDeliveryRequestToMap(request));
            });
        });
    }

    /**
     * Adds the passed in request to the ma[ [rp[er;u
     * @param deliveryRequest
     */
    addDeliveryRequestToMap(deliveryRequest: Request) {

        let marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: deliveryRequest.latitude,
                lng: deliveryRequest.longitude
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.request = deliveryRequest;
        });
    }

    /**
     * Returns the radius of the visible region
     * @param visibleRegion
     */
    calculateRadius(visibleRegion: VisibleRegion): number {
        const latDiff = visibleRegion.northeast.lat - visibleRegion.southwest.lat;
        const lngDiff = visibleRegion.northeast.lng - visibleRegion.southwest.lng;
        return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)) * 110.574;
    }
}
