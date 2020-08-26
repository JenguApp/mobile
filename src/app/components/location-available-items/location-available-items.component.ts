import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {RequestedItem} from '../../models/request/requested-item';

@Component({
    selector: 'app-location-available-items',
    templateUrl: './location-available-items.component.html',
    styleUrls: ['./location-available-items.component.scss']
})
export class LocationAvailableItemsComponent implements OnChanges
{
    /**
     * The location id we are searching for
     */
    @Input()
    locationId: number;

    /**
     * Whether or not we are displaying this component in compact mode
     */
    @Input()
    compact = false;

    /**
     * Whether or not the delivery is available
     */
    @Input()
    deliveryAvailable = false;

    /**
     * All items that are available
     */
    requestedItems: RequestedItem[];

    /**
     * All quantities the user has entered with the requested item id used as the key
     */
    enteredQuantities: any[] = [];

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider)
    {}

    /**
     * Loads our requested items data when the location id changes
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['locationId'] && changes['locationId'].previousValue !== changes['locationId'].currentValue) {
            this.requestedItems = [];
            this.loadPage(1);
        }
    }

    /**
     * Sets the selected quantity for the requested item
     * @param requestedItem
     * @param event
     */
    setRequestedItemQuantity(requestedItem: RequestedItem, event)
    {
        this.enteredQuantities[requestedItem.id] = {
            parentRequestedItem: requestedItem,
            parent_requested_item: requestedItem.id,
            quantity: event.detail.value - 0
        };
    }

    /**
     * Loads a page of data
     * @param pageNumber
     */
    loadPage(pageNumber: number): void
    {
        this.requests.locationRequestedItems.loadRequestedItems(this.locationId, pageNumber, false).then(page => {
            this.requestedItems = this.compact ? page.data.slice(0, 3) : page.mergeData(this.requestedItems);
            if (page.last_page > page.current_page && !this.compact) {
                this.loadPage(pageNumber + 1);
            }
        });
    }
}
