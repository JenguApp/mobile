import {BaseModel} from '../base-model';
import {Organization} from './organization';
import {RequestedItem} from '../request/requested-item';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our location model
 */
export class Location extends BaseModel {

    /**
     * The location name
     */
    name: string;

    /**
     * The first line of the address
     */
    address_line_1: string;

    /**
     * The second line of the address if there is one
     */
    address_line_2: string;

    /**
     * The city for the location
     */
    city: string;

    /**
     * The postal code for the location if there is one
     */
    postal_code: string;

    /**
     * The region (province, state, etc...) of the location
     */
    region: string;

    /**
     * The country for this location
     */
    country: string;

    /**
     * The latitude for this location
     */
    latitude: number;

    /**
     * The longitude for this location
     */
    longitude: number;

    /**
     * The organization for this location
     */
    organization: Organization;

    /**
     * The items that are available at this location
     */
    requested_items: RequestedItem[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization: new Relation('model', Organization),
            requested_items: new Relation('array', RequestedItem),
        });
    }
}
