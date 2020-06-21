import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {Request} from '../../models/request/request';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {IonTabs, NavController} from '@ionic/angular';
import { CompletingRequestService } from '../../services/data-services/completing-request.service';
import {UserService} from '../../services/user.service';
import {StorageProvider} from '../../providers/storage/storage';

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
    completingRequest: Request = null;

    /**
     * Default Constructor
     * @param locationManager
     * @param navController
     * @param completingRequestService
     * @param userService
     * @param storage
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private navController: NavController,
                private completingRequestService: CompletingRequestService,
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

        this.completingRequestService.listenForCompletingRequestChanges({
            next: completingRequest => {
                this.completingRequest = completingRequest;
                this.checkForDefaultTab();
            },
        });
        this.storage.loadCurrentActiveRequest().then(request => {

        })
        this.completingRequestService.getCompletingRequest().then(completingRequest => {
            this.completingRequest = completingRequest;
            if (!this.completingRequest) {
                this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                    for (let i = 0; i < requestsPage.data.length; i++) {
                        const request = requestsPage.data[i];
                        if (request.completed_by_id == this.me.id && !request.completed_at) {
                            this.completingRequestService.setCompletingRequest(request);
                            break;
                        }
                    }
                    this.currentRequestDataLoaded = true;
                    this.userService.cacheUser(this.completingRequest.requested_by);
                });
            } else {
                this.currentRequestDataLoaded = true;
                this.checkForDefaultTab();
                this.userService.cacheUser(this.completingRequest.requested_by);
            }
        });
    }

    /**
     * Checks to see if our default tab has been set
     */
    checkForDefaultTab() {
        if (this.completingRequest && !this.completingRequest.completed_at) {
            setTimeout(() => {
                if (this.tabs.getSelected() == undefined) {
                    this.tabs.select('delivery-info').catch(console.error);
                }
            }, 100);
        }
    }
}
