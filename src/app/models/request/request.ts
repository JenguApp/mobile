import {BaseModel} from '../base-model';
import {Asset} from '../asset';
import {Relation} from '../relation';
import {RequestedItem} from './requested-item';
import {User} from '../user/user';
import {SafetyReport} from './safety-report';

export class Request extends BaseModel
{
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
     * The id of the user completing the request
     */
    completed_by_id: number;

    /**
     * The id of the user completing the request
     */
    requested_by_id: number;

    /**
     * The timestamp for when it was created
     */
    created_at: Date;

    /**
     * Any assets uploaded for this request
     */
    assets: Asset[];

    /**
     * The optional canceled at date time
     */
    canceled_at: Date;

    /**
     * The optional completed at date time
     */
    completed_at: Date;

    /**
     * The user that completed this request
     */
    completed_by: User;

    /**
     * The user that created this request
     */
    requested_by: User;

    /**
     * All line items in the request
     */
    requested_items: RequestedItem[];

    /**
     * The safety report made if there was one
     */
    safety_report: SafetyReport;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data)
    {
        super(data, {
            assets: new Relation('array', Asset),
            completed_by: new Relation('model', User),
            requested_by: new Relation('model', User),
            requested_items: new Relation('array', RequestedItem),
            safety_report: new Relation('model', SafetyReport),
        }, [
            'created_at',
            'canceled_at',
            'completed_at',
        ]);
    }

    /**
     * Formats the created at time to be readable
     */
    formatCreatedAtDate(): string
    {
        return this.created_at.getHours() + ':' + this.created_at.getMinutes();
    }
}
