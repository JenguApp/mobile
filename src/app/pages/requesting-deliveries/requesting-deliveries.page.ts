import {Component} from '@angular/core';
import {BaseRequestingDeliveriesPage} from '../base-requesting-deliveries.page';

@Component({
    selector: 'app-requesting-deliveries',
    templateUrl: './requesting-deliveries.page.html',
    styleUrls: ['./requesting-deliveries.page.scss']
})
export class RequestingDeliveriesPage extends BaseRequestingDeliveriesPage {

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
