import {BaseModel} from '../base-model';
import {Asset} from '../asset';
import {Relation} from '../relation';
import {RequestedItem} from './requested-item';
import {User} from '../user/user';
import {SafetyReport} from './safety-report';

export class Request extends BaseModel {

    /**
     * The description the user entered for the request
     */
    description: string;

    /**
     * The latitude of the request
     */
    latitude: number;

    /**
     * The longitude of the request
     */
    longitude: number;

    /**
     * The instructions on how to drop off the items
     */
    drop_off_location: string;

    /**
     * Any assets uploaded for this request
     */
    assets: Asset[];

    /**
     * The user that completed this request
     */
    completedBy: User;

    /**
     * The user that created this request
     */
    createdBy: User;

    /**
     * All line items in the request
     */
    requestedItems: RequestedItem[];

    /**
     * The safety report made if there was one
     */
    safetyReport: SafetyReport;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            assets: new Relation('array', Asset),
            completedBy: new Relation('model', User),
            createdBy: new Relation('model', User),
            requestedItems: new Relation('array', RequestedItem),
            safetyReport: new Relation('model', SafetyReport),
        });
    }
}