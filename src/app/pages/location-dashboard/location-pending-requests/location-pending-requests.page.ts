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
     * Default Constructor
     * @param locationService
     * @param route
     * @param requests
     */
    constructor(private route: ActivatedRoute,
                private requests: RequestsProvider,
                private locationService: LocationService) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
        this.locationService.getLocation(locationId).then(location => {
            this.location = location;
        });
    }
}
