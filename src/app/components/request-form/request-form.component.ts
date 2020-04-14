import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RequestedItem} from '../../models/request/requested-item';
import {User} from '../../models/user/user';
import {RequestFormItemComponent} from './request-form-item/request-form-item.component';
import {IonTextarea, NavController} from '@ionic/angular';
import RequestCreationService from '../../services/data-services/request-creation.service';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements AfterViewInit {

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
     * The new item that is being filled in
     */
    @ViewChild('newItem', {static: false})
    newItem: RequestFormItemComponent;

    /**
     * The description the user entered
     */
    @ViewChild('description', {static: false})
    descriptionTextArea: IonTextarea;

    /**
     * all entered items on the page
     */
    @ViewChildren('enteredItems')
    enteredItems: QueryList<RequestFormItemComponent>;

    /**
     * All requested items the user has entered so far
     */
    requestedItems: RequestedItem[] = [];

    /**
     * Default Constructor
     * @param requestCreationService
     * @param navController
     */
    constructor(private requestCreationService: RequestCreationService,
                private navController: NavController) {
    }

    /**
     * Inits the form properly
     */
    ngAfterViewInit(): void {
        this.descriptionTextArea.value = this.requestCreationService.getDescription();
        this.requestedItems = this.requestCreationService.getLineItems();
    }

    /**
     * Removes an item from the list of requested items
     * @param removedItem
     */
    removeItem(removedItem: RequestFormItemComponent) {
        this.requestedItems =
            this.enteredItems.filter(i => i != removedItem)
                            .map(i => i.getRequestedItemModel());
    }

    /**
     * Adds an item properly
     */
    addItem() {
        this.requestedItems.push(this.newItem.getRequestedItemModel());
        this.newItem.clear();
    }

    /**
     * Stores the information into the form
     */
    storeForm() {
        const requestedItems = this.enteredItems
            .map(element => element.getRequestedItemModel())
            .filter(requestedItem => requestedItem.name.length > 0 || requestedItem.asset);
        const newItem = this.newItem.getRequestedItemModel();
        if (newItem.name.length > 0 || newItem.asset) {
            requestedItems.push(newItem);
        }
        this.requestCreationService.storeInitialInformation(this.descriptionTextArea.value, requestedItems);
    }

    /**
     * Submits the form and takes us to the next step
     */
    submit() {
        this.storeForm();
        this.navController.navigateForward('location-selection').catch(console.error);
    }
}
