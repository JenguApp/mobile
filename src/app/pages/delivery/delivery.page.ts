import {Component, OnInit, ViewChild} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {IonTabs, NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {StorageProvider} from '../../providers/storage/storage';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.page.html',
    styleUrls: ['./delivery.page.scss']
})
export class DeliveryPage implements OnInit {

    /**
     * The currently logged in user
     */
    me: User;

    /**
     * The tabs controller
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

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
    currentRequest: Request = null;

    /**
     * Default Constructor
     * @param locationManager
     * @param navController
     * @param currentRequestService
     * @param userService
     * @param storage
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private navController: NavController,
                private currentRequestService: CurrentRequestService,
                private userService: UserService,
                private storage: StorageProvider,
                private requests: RequestsProvider) {
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        this.me = this.userService.getMe();
        if (!this.me) {
            this.navController.navigateRoot('/home').catch(console.error);
            return;
        }
        this.locationManager.getPosition().then(position => {
            this.currentPosition = position;
        }).catch(error => {
            console.error(error);
        });

        this.currentRequestService.listenForCurrentRequestChanges({
            next: currentRequest => {
                this.setRequest(currentRequest);
            },
        });
        this.currentRequestService.getCurrentRequest().then(currentRequest => {
            this.setRequest(currentRequest);
            this.currentRequestDataLoaded = true;
        }).catch(() => {
            this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                for (let i = 0; i < requestsPage.data.length; i++) {
                    const request = requestsPage.data[i];
                    if (request.completed_by_id == this.me.id && !request.completed_at) {
                        this.currentRequestService.setCurrentRequest(request);
                        this.setRequest(request);
                        break;
                    }
                }
                this.currentRequestDataLoaded = true;
            });
        });
    }

    /**
     * Sets the request properly
     * @param request
     */
    setRequest(request: Request) {
        this.currentRequest = request;
        this.checkForDefaultTab();
        this.userService.cacheUser(this.currentRequest.requested_by);
    }

    /**
     * Checks to see if our default tab has been set
     */
    checkForDefaultTab() {
        if (this.currentRequest && !this.currentRequest.completed_at) {
            setTimeout(() => {
                if (this.tabs.getSelected() == undefined) {
                    this.tabs.select('delivery-info').catch(console.error);
                }
            }, 100);
        }
    }
}
