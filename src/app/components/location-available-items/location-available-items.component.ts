import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
     * All items that are available
     */
    requestedItems: RequestedItem[];

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider)
    {}

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['locationId'] && changes['locationId'].previousValue !== changes['locationId'].currentValue) {
            this.requestedItems = [];
            this.requests.locationRequestedItems.loadRequestedItems(changes['locationId'].currentValue).then(data => {
                this.requestedItems = data.data;
            });
        }
    }
}
