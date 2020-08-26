import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild,} from '@angular/core';
import {RequestedItem} from '../../models/request/requested-item';
import {User} from '../../models/user/user';
import {IonTextarea, NavController} from '@ionic/angular';
import {Mode, RequestCreationService} from '../../services/data-services/request-creation.service';
import {RequestedItemsEditableListComponent} from '../requested-items-editable-list/requested-items-editable-list.component';

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
     * All requested items the user has entered so far
     */
    requestedItems: RequestedItem[] = [];

    /**
     * Default Constructor
     * @param requestCreationService
     * @param changeDetection
     * @param navController
     */
    constructor(private requestCreationService: RequestCreationService,
                public changeDetection: ChangeDetectorRef,
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
     * Stores the information into the form
     */
    storeForm() {
        const requestedItems = this.requestedItemsEditor.getCurrentRequestedItems();
        this.requestCreationService.storeInitialInformation(Mode.PUBLIC, this.descriptionTextArea.value, requestedItems);
    }

    /**
     * Submits the form and takes us to the next step
     */
    submit() {
        this.storeForm();
        this.navController.navigateForward('location-selection').catch(console.error);
    }
}
