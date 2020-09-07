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
export class RequestAcceptedPage extends BaseRequestingDeliveriesPage
{
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
                protected currentRequestService: CurrentRequestService)
    {
        super(requests, navController, userService, currentRequestService);
    }

    /**
     * Gets everything ready
     */
    ionViewWillEnter(): void
    {
        super.ionViewWillEnter();
        this.setRefreshTimer();
    }

    /**
     * sets up our request properly
     */
    requestUpdated()
    {
        if (this.currentRequest.completed_by) {
            this.userService.cacheUser(this.currentRequest.completed_by);
        }
        this.setRefreshTimer();
    }

    /**
     * Awaits for the refresh
     */
    setRefreshTimer()
    {
        this.currentRequestService.waitForRequestRefresh(60);
    }

    /**
     * Takes us home in this situation
     */
    noActiveRequest()
    {
        this.navController.navigateRoot('/home').catch(console.error);
    }
}
