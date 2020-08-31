import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import LocationDeliveriesRequests from './location-deliveries';
import {Page} from '../../../models/page';
import {Request} from '../../../models/request/request';

describe('Test the location delivery requests', () => {
    let requestHandler : RequestHandlerProvider;
    let locationRequestedItemsRequests : LocationDeliveriesRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        locationRequestedItemsRequests = new LocationDeliveriesRequests(requestHandler);
    });

    it('Creates a request properly for loading the location deliveries', async () => {
        const data = {
            data: [{
                id: 324,
            }, {
                id: 56423,
            }]
        };
        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve(data));

        const result = await locationRequestedItemsRequests.loadPendingRequests(12, 1);
        expect(result.constructor).toBe(Page);
        expect(result.data.length).toBe(2);
        expect(result.data[0].constructor).toBe(Request);
        expect(result.data[1].constructor).toBe(Request);
        expect(result.data[0].id).toBe(324);
        expect(result.data[1].id).toBe(56423);
    });
});
