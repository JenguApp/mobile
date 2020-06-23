import {Component} from '@angular/core';
import {BaseDeliveringPage} from '../base-delivering.page';

@Component({
    selector: 'app-active-delivery',
    templateUrl: './active-delivery.page.html',
    styleUrls: ['./active-delivery.page.scss']
})
export class ActiveDeliveryPage extends BaseDeliveringPage {

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
