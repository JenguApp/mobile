import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { RequestsProvider } from '../../providers/requests/requests';
import {Organization} from '../../models/organization/organization';
import {AlertController, NavController} from '@ionic/angular';
import {Location} from '../../models/organization/location';

@Component({
    selector: 'app-organization-location-management',
    templateUrl: './organization-location-management.component.html',
    styleUrls: ['./organization-location-management.component.scss']
})
export class OrganizationLocationManagementComponent implements OnChanges {

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
     * @param navController
     */
    constructor(private requests: RequestsProvider,
                private alertController: AlertController,
                private navController: NavController) {
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
            this.locations = this.locations.concat(page.data);
            if (page.last_page > pageNumber) {
                this.loadLocationPage(pageNumber + 1);
            }
        });
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
}
