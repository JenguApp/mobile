import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Page} from '../../../models/page';
import {RequestedItem} from '../../../models/request/requested-item';
import {Location} from '../../../models/organization/location';

/**
 * All requests needed for handling authentication within the app
 */
export default class LocationRequestedItemsRequests {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Loads an organization based on the id passed in
     *
     * @param locationId
     * @param pageNumber
     * @param showLoading
     */
    async loadRequestedItems(locationId: any, pageNumber = 1, showLoading = false): Promise<Page<RequestedItem>> {
        return this.requestHandler.get('locations/' + locationId + '/requested-items', true, showLoading, [], {}, null, null, 100, pageNumber).then(data => {
            return Promise.resolve(new Page(data, RequestedItem));
        });
    }

    /**
     * Runs the sign in request
     *
     * @param locationId
     * @param requestedItemData
     */
    async createRequestedItem(locationId: any, requestedItemData: any): Promise<RequestedItem> {

        return this.requestHandler.post('locations/' + locationId + '/requested-items', true, true, requestedItemData).then(data => {
            return Promise.resolve(new RequestedItem(data));
        });
    }

    /**
     * Runs the sign in request
     *
     * @param requestedItem
     * @param requestedItemData
     */
    async updatedRequestedItem(requestedItem: RequestedItem, requestedItemData: any): Promise<RequestedItem> {

        return this.requestHandler.patch('locations/' + requestedItem.location_id + '/requested-items', true, true, requestedItemData)
            .then(data => {
                return Promise.resolve(new RequestedItem(data));
            }
        );
    }

    /**
     * Delete the organization manager properly
     * @param requestedItem
     */
    async deleteOrganizationManager(requestedItem: RequestedItem): Promise<any> {
        return this.requestHandler.delete('locations/' + requestedItem.location_id + '/requested-items/' + requestedItem.id, true, true);
    }
}
