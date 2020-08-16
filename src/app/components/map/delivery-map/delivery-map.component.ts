import {ChangeDetectorRef, Component} from '@angular/core';
import {GoogleMapsEvent, Marker, VisibleRegion} from '@ionic-native/google-maps';
import {MapComponent} from '../map.component';
import {RequestsProvider} from '../../../providers/requests/requests';
import {Request} from '../../../models/request/request';
import {NavController, ToastController} from '@ionic/angular';
import {CurrentRequestService} from '../../../services/data-services/current-request.service';
import {StateManagerService} from '../../../services/state-manager';

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
     * All markers that are currently on the map
     */
    currentMarkers: Marker[] = [];

    /**
     * Default Constructor
     * @param requests
     * @param toastController
     * @param currentRequestService
     * @param stateManagerService
     * @param navController
     * @param changeDetection
     */
    constructor(private requests: RequestsProvider,
                private toastController: ToastController,
                private currentRequestService: CurrentRequestService,
                private stateManagerService: StateManagerService,
                private navController: NavController,
                private changeDetection: ChangeDetectorRef) {
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
                this.currentMarkers = [];
                deliveryRequests.data.forEach(request => this.addDeliveryRequestToMap(request));
            });
        });
    }

    /**
     * Clears out the request properly
     */
    clearRequest() {
        this.request = null;
    }

    /**
     * Adds the passed in request to the ma[ [rp[er;u
     * @param deliveryRequest
     */
    addDeliveryRequestToMap(deliveryRequest: Request) {

        let marker: Marker = this.map.addMarkerSync({
            title: deliveryRequest.requested_by.name,
            icon: '#7d2674',
            animation: 'DROP',
            position: {
                lat: deliveryRequest.latitude,
                lng: deliveryRequest.longitude
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.request = deliveryRequest;
            this.changeDetection.detectChanges();
        });
        this.currentMarkers[deliveryRequest.id] = marker;
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

    /**
     * Handles an expired request by removing it from the map and telling the user why it is expired
     * @param request
     * @param message
     */
    handleExpiredRequest(request: Request, message: string) {
        let marker = this.currentMarkers[request.id];

        if (marker) {
            marker.remove();
        }

        this.toastController.create({
            message: message,
            duration: 2500,
        }).then(toast => {
            toast.present().catch(console.error);
        })
    }

    /**
     * The callback for when the
     * @param request
     */
    acceptRequest(request: Request) {
        this.request = null;
        this.requests.deliveryRequests.acceptDeliveryRequest(request, this.handleExpiredRequest.bind(this)).then((request) => {
            this.currentRequestService.setCurrentRequest(request);
            this.stateManagerService.navigateToCurrentPage(this.navController, request).catch(console.error);
        });
    }
}
