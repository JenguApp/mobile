import {Component, Input, OnInit} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';

@Component({
    selector: 'app-state-delivery',
    templateUrl: './state-delivery.component.html',
    styleUrls: ['./state-delivery.component.scss']
})
export class StateDeliveryComponent implements OnInit {

    /**
     * The currently logged in user
     */
    @Input()
    me: User;

    /**
     * Whether or not the users current request has loaded
     */
    currentRequestDataLoaded = false;

    /**
     * The current coordinates
     */
    currentPosition: Geoposition = null;

    /**
     * The request that the user is currently completing
     */
    completingRequest: Request = null;

    /**
     * Default Constructor
     * @param locationManager
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private requests: RequestsProvider) {
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        this.locationManager.getPosition().then(position => {
            this.currentPosition = position;
        }).catch(error => {
            console.error(error);
        });

        this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
            for (let i = 0; i < requestsPage.data.length; i++) {
                const request = requestsPage.data[i];
                if (request.completed_by_id == this.me.id && !request.completed_at) {
                    this.completingRequest = request;
                    break;
                }
            }
            this.currentRequestDataLoaded = true;
        });
    }

    /**
     * THe request hte user is completing
     * @param request
     */
    setCompletingRequest(request: Request) {
        // TODO run real load
        this.completingRequest = request;
    }
}
