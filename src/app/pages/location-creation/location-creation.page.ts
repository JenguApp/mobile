import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {OrganizationService} from '../../services/organization.service';
import {NavController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {Location} from '../../models/organization/location';
import {UserService} from '../../services/user.service';
import {CountrySelectComponent} from '../../components/country-select/country-select.component';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../services/data-services/location.service';

@Component({
    selector: 'app-location-creation',
    templateUrl: './location-creation.page.html',
    styleUrls: ['./location-creation.page.scss']
})
export class LocationCreationPage extends BasePage implements OnInit{

    /**
     * The Country Select Component
     */
    @ViewChild('countrySelectComponent', {static: true})
    countrySelectComponent: CountrySelectComponent;

    /**
     * The id of the organization we are creating our location for
     */
    organizationId: number = null;

    /**
     * The loaded location
     */
    location: Location = null;

    /**
     * The form object that helps us validate the sign in form
     */
    form: FormGroup;

    /**
     * Whether or not the user has a validation error with the country
     */
    countryValidationError = false;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * The logged in user
     */
    me: User;

    /**
     * Default Constructor
     * @param formBuilder
     * @param requestsProvider
     * @param organizationService
     * @param userService
     * @param locationService
     * @param route
     * @param navController
     */
    constructor(private formBuilder: FormBuilder,
                private requestsProvider: RequestsProvider,
                private organizationService: OrganizationService,
                private userService: UserService,
                private locationService: LocationService,
                private route: ActivatedRoute,
                private navController: NavController) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {

        const maybeOrganizationId = this.route.snapshot.paramMap.get('organization_id');
        if (maybeOrganizationId) {
            this.organizationId = parseInt(maybeOrganizationId, 0);
        } else {
            const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
            this.location = this.locationService.getLocation(locationId);
        }

        this.form = this.formBuilder.group({

            name: ['', Validators.compose([
                Validators.required,
            ])],
            address_line_1: ['', Validators.compose([
                Validators.required,
            ])],
            address_line_2: ['', Validators.compose([])],
            city: ['', Validators.compose([
                Validators.required,
            ])],
            postal_code: ['', Validators.compose([])],
            region: ['', Validators.compose([])],
            country: ['', Validators.compose([
                Validators.required,
            ])],
        });
        this.userService.getMe().then(me => {
            this.me = me;
        });
    }

    /**
     * Runs the submission to the server
     */
    submit () {
        this.submitted = true;

        this.countryValidationError = !this.countrySelectComponent.value;

        if (this.form.valid && !this.countryValidationError) {

            const locationData = {};

            const request = this.location ?
                this.requestsProvider.organization.updateOrganizationLocation(this.location, locationData) :
                this.requestsProvider.organization.createOrganizationLocation(this.organizationId, locationData);
            request.then(location => {
                this.locationService.cacheLocation(location);
                if (!this.location) {
                    // TODO take user to main location management page
                }
            });
        }
    }
}
