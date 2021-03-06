import {Component} from '@angular/core';
import {BaseRequestingDeliveriesPage} from '../base-requesting-deliveries.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {NavController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-requesting-deliveries',
    templateUrl: './requesting-deliveries.page.html',
    styleUrls: ['./requesting-deliveries.page.scss']
})
export class RequestingDeliveriesPage extends BaseRequestingDeliveriesPage {

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
     * This should always be called
     */
    noActiveRequest() {}

    /**
     * This means that there is a current request, so we want to take the user to the appropriate page
     */
    requestUpdated() {
        this.currentRequestService.navigateToCurrentPage(this.navController, 'request');
    }
}
