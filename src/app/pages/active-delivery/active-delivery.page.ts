import {Component} from '@angular/core';
import {BaseDeliveringPage} from '../base-delivering.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-active-delivery',
    templateUrl: './active-delivery.page.html',
    styleUrls: ['./active-delivery.page.scss']
})
export class ActiveDeliveryPage extends BaseDeliveringPage {

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
        super(requests, navController, userService, currentRequestService);
    }

    /**
     * sets up our request properly
     */
    requestUpdated() {
        if (this.currentRequest.requested_by) {
            this.userService.cacheUser(this.currentRequest.requested_by);
        }
    }

    /**
     * Takes us home in this situation
     */
    noActiveRequest() {
        this.navController.navigateRoot('/home').catch(console.error);
    }
}
