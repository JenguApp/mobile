import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Page} from '../../../models/page';
import {Request} from '../../../models/request/request';

export default class LocationDeliveriesRequests
{
    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider)
    {}

    /**
     *
     * @param locationId
     * @param pageNumber
     */
    loadPendingRequests(locationId: number, pageNumber: number): Promise<Page<Request>>
    {
        return this.requestHandler.get('locations/' + locationId + '/requests', true, false, [
            'requestedBy',
            'requestedItems',
        ], null, {completed_by_id: 'null', canceled_at: 'null'}, {}, 20, pageNumber, {
            'order[created_at]': 'ASC',
        }).then(response => {
            return Promise.resolve(new Page(response, Request));
        });
    }
}
