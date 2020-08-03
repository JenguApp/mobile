import {BaseModel} from '../base-model';
import {Asset} from '../asset';
import {Relation} from '../relation';
import {RequestsProvider} from '../../providers/requests/requests';
import IsEntity from '../contracts/is-entity';

/**
 * Our data wrapper for our requested item
 */
export class RequestedItem extends BaseModel {

    /**
     * The name the user entered for the line item
     */
    name: string;

    /**
     * An asset that was potentially attached
     */
    asset: Asset;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            asset: new Relation('model', Asset)
        });
    }

    /**
     * replaces the asset properly
     * @param requests
     * @param entity
     * @param imageData
     */
    replaceAsset(requests: RequestsProvider, entity: IsEntity, imageData: string): Promise<any> {
        return requests.entityRequests.uploadAsset(entity, imageData).then(asset => {
            this.asset = asset;
            return Promise.resolve();
        });
    }
}