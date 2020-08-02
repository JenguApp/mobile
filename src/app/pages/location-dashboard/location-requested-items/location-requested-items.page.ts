import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../base.page';
import {Location} from '../../../models/organization/location';
import {LocationService} from '../../../services/data-services/location.service';

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
     * Default Constructor
     * @param locationService
     * @param route
     */
    constructor(private locationService: LocationService,
                private route: ActivatedRoute) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
        this.location = this.locationService.getLocation(locationId);
    }
}
