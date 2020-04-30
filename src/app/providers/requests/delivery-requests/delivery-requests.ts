import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Request} from '../../../models/request/request';
import {User} from '../../../models/user/user';
import {Page} from '../../../models/page';
import {Asset} from '../../../models/asset';
import {RequestedItem} from '../../../models/request/requested-item';
import {ToastController} from '@ionic/angular';

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
     * loads all requests for the logged in user
     * @param user
     */
    async loadMyRequests(user: User): Promise<Page<Request>> {
        return this.requestHandler.get('users/' + user.id + '/requests', true, false, [
            'completedBy',
            'requestedBy',
            'requestedItems',
        ]).then(data => {
            return Promise.resolve(new Page(data, Request));
        })
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
     * Cancels the request properly
     * @param user
     * @param request
     */
    async cancelRequest(user: User, request: Request): Promise<Request> {
        return this.requestHandler.patch('users/' + user.id + '/requests/' + request.id, true, true,{
            cancel: true,
        }).then(data => {
            return Promise.resolve(new Request(data));
        })
    }

    /**
     * Allows the currently logged inu ser to accept the request
     *
     * @param request
     * @param expiredCallback
     */
    async acceptDeliveryRequest(request: Request, expiredCallback: Function): Promise<Request> {
        return this.requestHandler.patch('requests/' + request.id, true, true, {
            accept: true,
        }, {
            400: (error) => {
                const parsedError = JSON.parse(error.error);
                console.error('Validation Error', error, error.error, parsedError);
                let message = 'An error has occurred! If this problem persists, please contact us.';

                if (parsedError.errors && parsedError.errors.accept) {
                    message = parsedError.errors.accept.join(' ');
                }

                expiredCallback(request, message);
            }
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
        return this.requestHandler.patch('requests/' + request.id, true, true, {
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
        return this.requestHandler.get('requests', true, false, ['requestedBy'], {}, {}, {}, 50, null, {
            radius: radius.toString(),
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        }).then(data => {
            return Promise.resolve(new Page(data, Request));
        });
    }
}