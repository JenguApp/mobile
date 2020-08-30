import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {RequestedItem} from '../../models/request/requested-item';
import {LocationService} from '../../services/data-services/location.service';

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
     * @param locationService
     */
    constructor(private locationService: LocationService)
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
        this.locationService.getLocationRequestedItems(this.locationId).then(data => {
            this.requestedItems = this.compact ? data.slice(0, 3) : data;
        });
    }
}
