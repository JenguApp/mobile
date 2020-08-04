import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { RequestsProvider } from '../../providers/requests/requests';
import {Organization} from '../../models/organization/organization';
import {AlertController, NavController} from '@ionic/angular';
import {Location} from '../../models/organization/location';
import {LocationService} from '../../services/data-services/location.service';

@Component({
    selector: 'app-organization-location-management',
    templateUrl: './organization-location-management.component.html',
    styleUrls: ['./organization-location-management.component.scss']
})
export class OrganizationLocationManagementComponent implements OnChanges, OnInit {

    /**
     * The organization we are managing
     */
    @Input()
    organization: Organization;

    /**
     * Whether or not the managers load has been kicked off
     */
    locationsLoaded = false;

    /**
     * The organization managers for this organization
     */
    locations: Location[] = [];

    /**
     * Default Constructor
     * @param requests
     * @param alertController
     * @param locationService
     * @param navController
     */
    constructor(private requests: RequestsProvider,
                private alertController: AlertController,
                private locationService: LocationService,
                private changeDetection: ChangeDetectorRef,
                private navController: NavController) {
    }

    /**
     * Registers our location observer
     */
    ngOnInit(): void {
        this.locationService.getLocationObserver().subscribe({
            next: location => this.mergeLocations([location])
        });
    }

    /**
     * loads the managers when we are all set
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this.locationsLoaded && this.organization) {
            this.locationsLoaded = true;
            this.loadLocationPage(1);
        }
    }

    /**
     * Loads a page of managers off of the server
     * @param pageNumber
     */
    loadLocationPage(pageNumber) {
        this.requests.organization.loadOrganizationLocations(this.organization, pageNumber).then(page => {
            this.mergeLocations(page.data);
            if (page.last_page > pageNumber) {
                this.loadLocationPage(pageNumber + 1);
            }
        });
    }

    /**
     * Merges the passed in locations into the local instance of locations
     * @param locations
     */
    mergeLocations(locations: Location[]) {
        locations.forEach(location => {
            const index = this.locations.findIndex(i => i.id === location.id);
            if (index !== -1) {
                this.locations[index] = location;
            } else {
                this.locations.push(location);
            }
        });
        console.log('locations', this.locations);
        this.changeDetection.detectChanges();
    }

    /**
     * Makes sure the user wants to delete the organization manager
     * @param location
     */
    promptDeletion(location: Location) {
        let alert;
        this.alertController.create({
            header: 'Are you sure?',
            message: 'This cannot be undone.',
            buttons: [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.requests.organization.deleteOrganizationLocation(location).then(() => {
                            alert.dismiss();
                            this.locations =
                                this.locations.filter(i => i.id != location.id);
                        });
                    }
                }
            ]
        }).then(a => {
            alert = a;
            alert.present();
        });
    }

    /**
     * Takes the user to the location manager
     * @param location
     */
    goToLocationEditor(location: Location = null) {
        const url = location ?
            '/organization-location-dashboard/' + location.id : '/organization-location-creation/' + this.organization.id;
        this.navController.navigateForward(url).catch(console.error);
    }
}
