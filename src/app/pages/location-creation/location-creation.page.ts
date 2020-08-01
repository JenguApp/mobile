import {Component, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {OrganizationService} from '../../services/organization.service';
import {NavController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {OrganizationManager} from '../../models/organization/organization-manager';
import Role from '../../models/user/role';
import {CountrySelectComponent} from '../../components/country-select/country-select.component';

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
     * The action the user is running
     */
    action: string;

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
     * @param navController
     */
    constructor(private formBuilder: FormBuilder,
                private requestsProvider: RequestsProvider,
                private organizationService: OrganizationService,
                private userService: UserService,
                private navController: NavController) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {

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

            const name = this.form.controls['name'].value;

            this.requestsProvider.organization.createOrganization(name).then(organization => {
                const organizationManager = new OrganizationManager({role_id: Role.ADMINISTRATOR});
                organizationManager.organization = organization;
                organization.organization_managers.push(organizationManager);
                this.organizationService.cacheOrganization(organization);
                this.me.organization_managers.push(organizationManager);
                this.userService.storeMe(this.me);
                this.navController.navigateRoot('/organization-dashboard/' + organization.id).catch(console.error);
            });
        }
    }
}
