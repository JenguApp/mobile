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
     * The id of the location this may be related to
     */
    location_id: number;

    /**
     * The name the user entered for the line item
     */
    name?: string;

    /**
     * The available quantity for the requested item
     */
    quantity?: number;

    /**
     * The max amount available per request
     */
    max_quantity_per_request?: number;

    /**
     * The id of the requested item that this is related to
     */
    parent_requested_item_id?: number;

    /**
     * An asset that was potentially attached
     */
    asset: Asset;

    /**
     * The potential parent requested item if set
     */
    parent_requested_item?: RequestedItem;

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
     * Gets the proper name of the item
     */
    getProperName(): string
    {
        return this.parent_requested_item ? this.parent_requested_item.name : this.name;
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

    /**
     * Returns the maximum quantity the user can request if there is one
     */
    getMaximumPossibleQuantity(): number|null
    {
        if (this.max_quantity_per_request) {
            if (this.quantity) {
                return this.max_quantity_per_request > this.quantity ? this.quantity : this.max_quantity_per_request;
            }
            return this.max_quantity_per_request;
        } else if (this.quantity) {
            return this.quantity;
        }

        return null;
    }
}
