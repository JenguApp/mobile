import {RequestedItem} from '../../models/request/requested-item';
import {Injectable} from '@angular/core';

export enum Mode {
    UNSET,
    PUBLIC,
    LOCATION,
}
@Injectable({
    providedIn: 'root'
})
export class RequestCreationService
{
    /**
     * The request mode
     */
    mode: Mode = Mode.UNSET;

    /**
     * The description the user put in on the first page
     */
    description: string = '';

    /**
     * All line items the user entered
     */
    lineItems: RequestedItem[] = [];

    /**
     * The latitude the user has selected
     */
    latitude: number = null;

    /**
     * The longitude the user selected
     */
    longitude: number = null;

    /**
     * Stores all initial information that we need
     * @param mode
     * @param description
     * @param lineItems
     */
    storeInitialInformation(mode: Mode, description: string, lineItems: RequestedItem[])
    {
        this.mode = mode;
        this.description = description;
        this.lineItems = lineItems;
    }

    /**
     * Stores all information related to the location of the request
     * @param latitude
     * @param longitude
     */
    storeLocationInformation(latitude: number, longitude: number)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    /**
     * Returns the description we currently have
     */
    getDescription(): string
    {
        return this.description;
    }

    /**
     * Returns all line items we are storing
     */
    getLineItems(): RequestedItem[]
    {
        return this.lineItems;
    }

    /**
     * Gets the latitude the user selected
     */
    getLatitude(): number
    {
        return this.latitude;
    }

    /**
     * Gets the longitude the user selected
     */
    getLongitude(): number
    {
        return this.longitude;
    }

    /**
     * Clears all pending data
     */
    clear()
    {
        this.mode = Mode.UNSET;
        this.description = '';
        this.lineItems = [];
        this.latitude = null;
        this.longitude = null;
    }
}
