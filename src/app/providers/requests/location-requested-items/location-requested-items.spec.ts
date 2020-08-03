import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import LocationRequestedItemsRequests from './location-requested-items';
import {RequestedItem} from '../../../models/request/requested-item';

describe('Test the auth requests', () => {
    let requestHandler : RequestHandlerProvider;
    let locationRequestedItemsRequests : LocationRequestedItemsRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        locationRequestedItemsRequests = new LocationRequestedItemsRequests(requestHandler);
    });

    it('Creates a request properly for creating an organization', async () => {
        const data = {
            name: 'An Item'
        };
        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve(data));
        let result = await locationRequestedItemsRequests.createRequestedItem(12, data);
        expect(result.constructor).toBe(RequestedItem);
    });
});
