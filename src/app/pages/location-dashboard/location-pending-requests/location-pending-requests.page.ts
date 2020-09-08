import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../base.page';
import {Location} from '../../../models/organization/location';
import {LocationService} from '../../../services/data-services/location.service';
import {Organization} from '../../../models/organization/organization';
import {OrganizationService} from '../../../services/organization.service';
import {RequestsProvider} from '../../../providers/requests/requests';
import {RequestedItem} from '../../../models/request/requested-item';
import {
    RequestedItemsEditableListComponent
} from '../../../components/requested-items-editable-list/requested-items-editable-list.component';
import {Platform} from '@ionic/angular';
import {Request} from '../../../models/request/request';

@Component({
    selector: 'app-location-pending-requests',
    templateUrl: './location-pending-requests.page.html',
    styleUrls: ['./location-pending-requests.page.scss']
})
export class LocationPendingRequestsPage extends BasePage implements OnInit{

    /**
     * The location
     */
    location: Location;

    /**
     * All requests that are currently pending for delivery
     */
    pendingRequests: Request[] = [];

    /**
     * The current request that is in view
     */
    currentRequest: Request = null;

    /**
     * Whether or not the QR code is currently visible
     */
    qrCodeOpen = false;

    /**
     * All requested items available at the location
     */
    locationRequestedItems: RequestedItem[] = [];

    /**
     * Default Constructor
     * @param platform
     * @param route
     * @param requests
     * @param locationService
     */
    constructor(private platform: Platform,
                private route: ActivatedRoute,
                private requests: RequestsProvider,
                private locationService: LocationService)
    {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void
    {
        const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
        this.platform.ready().then(() => {
            this.locationService.getLocation(locationId).then(location => {
                this.location = location;
                this.locationService.getLocationRequestedItems(location.id).then(locationRequestedItems => {
                    this.locationRequestedItems = locationRequestedItems;
                    this.loadPendingRequestsPage(1);
                });
            });
        });
    }

    /**
     * loads a page of pending requests
     * @param pageNumber
     */
    loadPendingRequestsPage(pageNumber: number)
    {
        this.requests.locationDeliveriesRequests.loadPendingRequests(this.location.id, pageNumber).then(page => {
            this.pendingRequests = page.mergeData(this.pendingRequests);
            if (page.current_page < page.last_page) {
                this.loadPendingRequestsPage(pageNumber + 1);
            }
        });
    }

    /**
     * Puts the passed in request into the viewer window
     * @param request
     */
    viewRequestDetails(request: Request)
    {
        this.currentRequest = request;
    }

    /**
     * Removes the current request
     */
    clearCurrentRequest()
    {
        this.currentRequest = null;
    }

    /**
     * Gets the requested item name
     * @param requestedItem
     */
    getRequestedItemName(requestedItem: RequestedItem): string|null
    {
        const locationRequestedItem = this.locationRequestedItems.find(i => i.id === requestedItem.parent_requested_item_id);
        return locationRequestedItem ? locationRequestedItem.name : null;
    }

    /**
     * Opens the qr code
     */
    openQRCode(qrCodeOpen = true)
    {
        this.qrCodeOpen = qrCodeOpen;
    }

    /**
     * Makes sure it was assigned, and then remove the request from the list
     */
    checkIfAssignedProperly()
    {
        // TODO update current request to make sure it was assigned, and then remove the request from the list
    }
}
