import {RequestedItem} from '../../models/request/requested-item';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export default class RequestCreationService {

    /**
     * The description the user put in on the first page
     */
    description: string = '';

    /**
     * All line items the user entered
     */
    lineItems: RequestedItem[] = [];

    /**
     * Stores all initial information that we need
     * @param description
     * @param lineItems
     */
    storeInitialInformation(description: string, lineItems: RequestedItem[]) {
        this.description = description;
        this.lineItems = lineItems;
    }

    /**
     * Returns the description we currently have
     */
    getDescription(): string {
        return this.description;
    }

    /**
     * Returns all line items we are storing
     */
    getLineItems(): RequestedItem[] {
        return this.lineItems;
    }

    /**
     * Clears all pending data
     */
    clear() {
        this.description = '';
        this.lineItems = [];
    }
}