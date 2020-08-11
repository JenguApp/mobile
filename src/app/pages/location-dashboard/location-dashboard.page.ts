import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonTabs, Platform} from '@ionic/angular';
import CanBeHomePage from '../can-be-home.page';
import {StorageProvider} from '../../providers/storage/storage';

@Component({
    selector: 'app-location-dashboard',
    templateUrl: './location-dashboard.page.html',
    styleUrls: ['./location-dashboard.page.scss']
})
export class LocationDashboardPage extends CanBeHomePage implements OnInit
{
    /**
     * The message input
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

    /**
     * The id of the organization
     */
    locationId: number;

    /**
     * Default Constructor
     * @param platform
     * @param storage
     * @param route
     */
    constructor(protected platform: Platform,
                protected storage: StorageProvider,
                private route: ActivatedRoute)
    {
        super(platform, storage);
        this.locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void
    {
        setTimeout(() => {
            this.tabs.select('location-requested-items/' + this.locationId).catch(console.error);
        }, 50);
    }
}
