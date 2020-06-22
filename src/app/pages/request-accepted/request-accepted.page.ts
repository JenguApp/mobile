import {Component} from '@angular/core';
import {BaseRequestingDeliveriesPage} from '../base-requesting-deliveries.page';

@Component({
    selector: 'app-request-accepted',
    templateUrl: './request-accepted.page.html',
    styleUrls: ['./request-accepted.page.scss']
})
export class RequestAcceptedPage extends BaseRequestingDeliveriesPage {

    /**
     * sets up our request properly
     */
    requestUpdated() {
        this.userService.cacheUser(this.currentRequest.requested_by);

    }

    /**
     * Takes us home in this situation
     */
    noActiveRequest() {
        this.navController.navigateRoot('/home').catch(console.error);
    }
}
