import {BasePage} from './base.page';
import {User} from '../models/user/user';
import {Request} from '../models/request/request';
import {RequestsProvider} from '../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../services/user.service';
import {CurrentRequestService} from '../services/data-services/current-request.service';
import {Page} from '../models/page';
import {OnInit} from '@angular/core';

/**
 * This class is used as our base class for all pages the interact with requests
 */
export abstract class BaseRequestPage extends BasePage implements OnInit {

    /**
     * The Logged in user
     */
    me: User = null;

    /**
     * Whether or not the users current request has loaded
     */
    currentRequestDataLoaded = false;

    /**
     * Whether or not there is a pending request
     */
    currentRequest: Request = null;

    /**
     * Default Constructor
     * @param requests
     * @param navController
     * @param userService
     * @param currentRequestService
     */
    constructor(protected requests: RequestsProvider,
                protected navController: NavController,
                protected userService: UserService,
                protected currentRequestService: CurrentRequestService) {
        super();
    }

    /**
     * Loads information on the users current requests
     */
    ngOnInit(): void {
        this.userService.getMe().then(me => {
            this.me = me;
            this.currentRequestService.listenForCurrentRequestChanges({
                next: completingRequest => {
                    this.setRequest(completingRequest);
                },
            });
            this.currentRequestService.getCurrentRequest().then(request => {
                this.setRequest(request, true);
                this.currentRequestDataLoaded = true;
            }).catch(() => {
                this.requests.deliveryRequests.loadMyRequests(this.me).then(requestsPage => {
                    const request = this.findCurrentRequest(requestsPage);
                    this.currentRequestService.setCurrentRequest(request);
                    this.currentRequestDataLoaded = true;
                    this.setRequest(request);
                });
            });
        }).catch(() => {
            this.navController.navigateRoot('/home').catch(console.error);
        });
    }

    /**
     * Sets our request data, and runs our update functions
     * @param request
     * @param notify
     */
    protected setRequest(request: Request, notify = false) {
        this.currentRequest = request;
        if (notify) {
            this.currentRequestService.notifyRequest(request);
        }
        if (!request) {
            this.noActiveRequest();
        } else {
            this.requestUpdated();
        }
    }

    /**
     * Helps our filtering find a request
     * @param request
     */
    abstract findCurrentRequest(request: Page<Request>): Request;

    /**
     * Allows our child classes to receive a call whenever our request is updated
     */
    abstract requestUpdated();

    /**
     * Allows our child classes to respond to cases where there is not current request found
     */
    abstract noActiveRequest();
}
