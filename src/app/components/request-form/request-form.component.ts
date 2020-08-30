import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild,} from '@angular/core';
import {RequestedItem} from '../../models/request/requested-item';
import {User} from '../../models/user/user';
import {IonTextarea, NavController} from '@ionic/angular';
import {Mode, RequestCreationService} from '../../services/data-services/request-creation.service';
import {RequestedItemsEditableListComponent} from '../requested-items-editable-list/requested-items-editable-list.component';
import {Location} from '../../models/organization/location';
import {LocationAvailableItemsComponent} from '../location-available-items/location-available-items.component';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements AfterViewInit
{
    /**
     * The currently logged in user
     */
    @Input()
    user: User;

    /**
     * Whether or not this component is in the review process, which will mean that you cannot submit the form
     */
    @Input()
    reviewForm: boolean = false;

    /**
     * The description the user entered
     */
    @ViewChild('description', {static: false})
    descriptionTextArea: IonTextarea;

    /**
     * The requested items editor
     */
    @ViewChild('requestedItemsEditor', {static: false})
    requestedItemsEditor: RequestedItemsEditableListComponent;

    /**
     * The location available items editor
     */
    @ViewChild('locationAvailableItemsEditor', {static: false})
    locationAvailableItemsEditor: LocationAvailableItemsComponent;

    /**
     * All requested items the user has entered so far
     */
    @Input()
    requestedItems: RequestedItem[] = [];

    /**
     * Default Constructor
     * @param requestCreationService
     * @param changeDetection
     * @param navController
     */
    constructor(private requestCreationService: RequestCreationService,
                public changeDetection: ChangeDetectorRef,
                private navController: NavController)
    {}

    /**
     * Inits the form properly
     */
    ngAfterViewInit(): void
    {
        this.descriptionTextArea.value = this.requestCreationService.getDescription();
        this.requestedItems = this.requestCreationService.getLineItems();
    }

    /**
     * Gets the mode of the form
     */
    getMode(): Mode
    {
        return this.requestCreationService.getMode() ? this.requestCreationService.getMode() : Mode.PUBLIC;
    }

    /**
     * Gets the mode the request form is in
     */
    isPublicRequest(): boolean
    {
        return this.getMode() === Mode.PUBLIC;
    }

    /**
     * Gets the mode the request form is in
     */
    isLocationRequest(): boolean
    {
        return this.getMode() === Mode.LOCATION;
    }

    /**
     * Gets the location that the user is requesting for
     */
    getLocation(): Location
    {
        return this.requestCreationService.getLocation();
    }

    /**
     * Stores the information into the form
     */
    storeForm()
    {
        const requestedItems = this.isPublicRequest() ? this.requestedItemsEditor.getCurrentRequestedItems() : this.locationAvailableItemsEditor.enteredQuantities;
        this.requestCreationService.storeInitialInformation(this.getMode(), this.descriptionTextArea.value, requestedItems);
    }

    /**
     * Submits the form and takes us to the next step
     */
    submit()
    {
        this.storeForm();
        this.navController.navigateForward('location-selection').catch(console.error);
    }
}
