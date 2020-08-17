import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Location} from '../../../models/organization/location';
import {Page} from '../../../models/page';

export default class LocationRequests
{
    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider)
    {}

    /**
     * Loads a location off the server properly
     * @param locationId
     */
    async loadLocation(locationId: any): Promise<Location>
    {
        return this.requestHandler.get('locations/' + locationId, true, true, [
            'requestedItems'
        ]).then(data => new Location(data));
    }

    /**
     * Loads a page of locations
     * @param latitude
     * @param longitude
     * @param radius
     * @param page
     */
    async queryLocations(latitude: number, longitude: number, radius: number, page: number = 1): Promise<Page<Location>>
    {
        return this.requestHandler.get('locations', true, true, [
            'requestedItems',
        ], {}, {}, {}, 10, page, {
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }).then(data => {
            return Promise.resolve(new Page(data, Location));
        });
    }
}
