import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {RequestedItem} from '../../models/request/requested-item';
import {LocationService} from '../../services/data-services/location.service';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {RequestCreationService} from '../../services/data-services/request-creation.service';

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
     * @param requestCreationService
     */
    constructor(private locationService: LocationService,
                private requestCreationService: RequestCreationService)
    {}

    /**
     * Loads our requested items data when the location id changes
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['locationId'] && changes['locationId'].previousValue !== changes['locationId'].currentValue) {
            this.requestCreationService.getLineItems().forEach(item => {
                this.enteredQuantities[item.parent_requested_item_id] = item;
            });
            this.locationService.getLocationRequestedItems(this.locationId).then(data => {
                this.requestedItems = this.compact ? data.slice(0, 3) : data;
            });
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
            parent_requested_item_id: requestedItem.id,
            quantity: event.detail.value - 0
        };
    }

    /**
     * Gets the entered quantity for the passed in quantity
     * @param requestedItem
     */
    getItemEnteredQuantity(requestedItem: RequestedItem)
    {
        return this.enteredQuantities[requestedItem.id] ? this.enteredQuantities[requestedItem.id].quantity : '';
    }
}
