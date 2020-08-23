import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonTabs, Platform} from '@ionic/angular';
import {StorageProvider} from '../../providers/storage/storage';
import {BasePage} from '../base.page';
import {LocationService} from '../../services/data-services/location.service';
import {Location} from '../../models/organization/location';
import {LocationAvailableItemsComponent} from '../../components/location-available-items/location-available-items.component';
import {RequestsProvider} from '../../providers/requests/requests';
import {RequestCreationService} from '../../services/data-services/request-creation.service';
import {RequestedItem} from '../../models/request/requested-item';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss']
})
export class LocationPage extends BasePage implements OnInit
{
    /**
     * The location we are viewing the details of
     */
    location: Location;

    /**
     * Default Constructor
     * @param platform
     * @param route
     * @param locationService
     * @param requests
     * @param requestCreationService
     */
    constructor(private platform: Platform,
                private route: ActivatedRoute,
                private locationService: LocationService,
                private requests: RequestsProvider,
                private requestCreationService: RequestCreationService)
    {
        super();
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
            this.locationService.getLocation(locationId).then(location => {
                this.location = location;
            });
        });
    }

    /**
     * Opens the directions
     */
    getDirections(): void
    {
    }

    /**
     * Posts the request to the server
     * @param availableItemsComponent
     */
    requestDelivery(availableItemsComponent: LocationAvailableItemsComponent): void
    {
        const requestedItems = availableItemsComponent.enteredQuantities
            .filter(quantity => quantity > 0)
            .map((quantity, requestedItemId) => {
                return new RequestedItem({
                    location_id: this.location.id,
                    quantity: quantity,
                    parent_requested_item_id: requestedItemId,
                });
            }
        );

        this.requestCreationService.storeInitialInformation('', requestedItems);
    }
}
