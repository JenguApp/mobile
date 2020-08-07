import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../base.page';
import {ActivatedRoute} from '@angular/router';
import {IonTabs} from '@ionic/angular';

@Component({
    selector: 'app-location-dashboard',
    templateUrl: './location-dashboard.page.html',
    styleUrls: ['./location-dashboard.page.scss']
})
export class LocationDashboardPage extends BasePage implements OnInit {

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
     * @param route
     */
    constructor(private route: ActivatedRoute) {
        super();
        this.locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void {
        setTimeout(() => {
            this.tabs.select('location-requested-items/' + this.locationId).catch(console.error);
        }, 50);
    }
}
