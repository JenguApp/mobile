import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../base.page';
import {Location} from '../../../models/organization/location';
import {LocationService} from '../../../services/data-services/location.service';
import {Organization} from '../../../models/organization/organization';
import {OrganizationService} from '../../../services/organization.service';
import {RequestsProvider} from '../../../providers/requests/requests';
import {RequestedItem} from '../../../models/request/requested-item';

@Component({
    selector: 'app-location-requested-items',
    templateUrl: './location-requested-items.page.html',
    styleUrls: ['./location-requested-items.page.scss']
})
export class LocationRequestedItemsPage extends BasePage implements OnInit{

    /**
     * The location
     */
    location: Location;

    /**
     * The organization related to the location
     */
    organization: Organization;

    /**
     * The requested items at the location
     */
    requestedItems: RequestedItem[] = [];

    /**
     * Default Constructor
     * @param locationService
     * @param route
     * @param changeDetection
     * @param requests
     * @param organizationService
     */
    constructor(private route: ActivatedRoute,
                private changeDetection: ChangeDetectorRef,
                private requests: RequestsProvider,
                private locationService: LocationService,
                private organizationService: OrganizationService) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
        this.location = this.locationService.getLocation(locationId);
        if (this.location) {
            this.organizationService.getOrganization(this.location.organization_id).then(organization => {
                this.organization = organization;
            });
            this.loadRequestedItemsPage(1);
        }
    }

    /**
     * Loads a page of requested items
     * @param pageNumber
     */
    loadRequestedItemsPage(pageNumber) {
        this.requests.locationRequestedItems.loadRequestedItems(this.location.id, pageNumber).then(page => {
            this.mergeRequestedItems(page.data);
            if (page.last_page > page.current_page) {
                this.loadRequestedItemsPage(pageNumber + 1);
            }
        });
    }

    /**
     * Merges the passed in locations into the local instance of locations
     * @param requestedItems
     */
    mergeRequestedItems(requestedItems: RequestedItem[]) {
        requestedItems.forEach(requestedItem => {
            const index = this.requestedItems.findIndex(i => i.id === requestedItem.id);
            if (index !== -1) {
                this.requestedItems[index] = requestedItem;
            } else {
                this.requestedItems.push(requestedItem);
            }
        });
    }
}
