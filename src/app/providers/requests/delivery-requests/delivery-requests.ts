import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Request} from '../../../models/request/request';
import {User} from '../../../models/user/user';
import {Page} from '../../../models/page';
import {Asset} from '../../../models/asset';
import {RequestedItem} from '../../../models/request/requested-item';

/**
 * All requests needed for deliveries
 */
export default class DeliveryRequests {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Creates a delivery request with everything needed for it
     *
     * @param description
     * @param dropOffLocation
     * @param longitude
     * @param latitude
     * @param requestedItems
     * @param assets
     */
    async createDeliveryRequest(description: string, dropOffLocation: string, longitude: number, latitude: number, requestedItems: RequestedItem[], assets: number[]): Promise<Request> {
        const data: any = {
            longitude: longitude,
            latitude: latitude,
            requested_items: requestedItems.map(item => {
                const itemData: any = {};
                if (item.name && item.name.length) {
                    itemData.name = item.name;
                }
                if (item.asset && item.asset.id) {
                    itemData.asset_id = item.asset.id;
                }

                return itemData;
            }).filter((i => i != {})),
        };

        if (description && description.length) {
            data.description = description;
        }
        if (dropOffLocation && dropOffLocation.length) {
            data.drop_off_location = dropOffLocation;
        }

        return this.requestHandler.post('requests', true, true, data).then(data => {
            return Promise.resolve(new Request(data));
        });
    }

    /**
     * Allows the currently logged inu ser to accept the request
     *
     * @param request
     */
    async refreshRequest(request: Request): Promise<Request> {
        return this.requestHandler.get('requests/' + request.id, true, false, {}).then(data => {
            return Promise.resolve(new Request(data));
        });
    }


    /**
     * Runes the upload request, the file contents should be a base 64 encoded string
     *
     * @param user
     * @param fileContents
     */
    async uploadAsset(user: User, fileContents: string): Promise<Asset> {
        return this.requestHandler.post('users/' + user.id + '/assets', true, false, {
            file_contents: fileContents,
        }).then(response => {
            return Promise.resolve(new Asset(response));
        });
    }

    /**
     * Allows the currently logged inu ser to accept the request
     *
     * @param request
     */
    async acceptDeliveryRequest(request: Request): Promise<Request> {
        return this.requestHandler.post('requests/' + request.id, true, true, {
            accept: true,
        }).then(data => {
            return Promise.resolve(new Request(data));
        });
    }

    /**
     * Allows the current logged in user to complete a delivery request
     *
     * @param request
     */
    async completeDeliveryRequest(request: Request): Promise<Request> {
        return this.requestHandler.post('requests/' + request.id, true, true, {
            completed: true,
        }).then(data => {
            return Promise.resolve(new Request(data));
        });
    }

    /**
     * Searches for currently available requests around a given area
     *
     * @param longitude
     * @param latitude
     * @param radius
     */
    async searchAvailableRequests(longitude: number, latitude: number, radius: number): Promise<Page<Request>> {
        return this.requestHandler.get('requests', true, false, ['createdBy'], {}, {}, {}, 50, null, {
            radius: radius,
            latitude: latitude,
            longitude: longitude,
        }).then(data => {
            return Promise.resolve(new Page(data, Request));
        });
    }
}