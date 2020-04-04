import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Request} from '../../../models/request/request';
import {User} from '../../../models/user/user';
import {Page} from '../../../models/page';
import {Asset} from '../../../models/asset';

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
     * @param lineItems
     * @param assets
     */
    async createDeliveryRequest(description: string, dropOffLocation: string, longitude: number, latitude: number, lineItems: any[], assets: number[]): Promise<Request> {
        return Promise.resolve(new Request({
            description: description,
            drop_off_location: dropOffLocation,
            longitude: longitude,
            latitude: latitude,
            lineItems: lineItems,
        }));
    }


    /**
     * Runes the upload request, the file contents should be a base 64 encoded string
     *
     * @param user
     * @param fileContents
     */
    async uploadAsset(user: User, fileContents: string): Promise<Asset> {
        return Promise.resolve(new Asset({}));
        // return this.requestHandler.post('users/' + user.id + '/assets', true, false, {
        //     file_contents: fileContents,
        // }).then(response => {
        //     return Promise.resolve(new Asset(response));
        // });
    }

    /**
     * Allows the currently logged inu ser to accept the request
     *
     * @param request
     */
    async acceptDeliveryRequest(request: Request): Promise<Request> {
        return Promise.resolve(request);
    }

    /**
     * Allows the current logged in user to complete a delivery request
     *
     * @param request
     */
    async completeDeliveryRequest(request: Request): Promise<Request> {
        return Promise.resolve(request);
    }

    /**
     * Searches for currently available requests around a given area
     *
     * @param longitude
     * @param latitude
     */
    async searchAvailableRequests(longitude: number, latitude: number): Promise<Page<Request>> {
        return Promise.resolve(new Page({
            data: [{
                longitude: longitude,
                latitude: latitude,
            }]
        }, Request));
    }
}