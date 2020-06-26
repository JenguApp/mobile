import {Component} from '@angular/core';
import {BaseRequestingDeliveriesPage} from '../base-requesting-deliveries.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-request-accepted',
    templateUrl: './request-accepted.page.html',
    styleUrls: ['./request-accepted.page.scss']
})
export class RequestAcceptedPage extends BaseRequestingDeliveriesPage {

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
        this.userService.cacheUser(this.currentRequest.completed_by);

    }

    /**
     * Takes us home in this situation
     */
    noActiveRequest() {
        this.navController.navigateRoot('/home').catch(console.error);
    }
}
