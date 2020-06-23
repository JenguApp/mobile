import {BaseRequestPage} from './base-request.page';
import {Page} from '../models/page';
import {Request} from '../models/request/request';

/**
 * Extend any page that will have someone asking for deliveries extend this
 */
export abstract class BaseDeliveringPage extends BaseRequestPage {

    /**
     * Finds our current request by grabbing the one that has not been completed
     * @param requestsPage
     */
    findCurrentRequest(requestsPage: Page<Request>): Request {
        for (let i = 0; i < requestsPage.data.length; i++) {
            const request = requestsPage.data[i];
            if (request.completed_by_id == this.me.id && !request.completed_at) {
                return request;
            }
        }

        return null;
    }
}