import {ChangeDetectorRef, Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RequestedItemEditorComponent} from '../requested-item-editor/requested-item-editor.component';
import {RequestedItem} from '../../models/request/requested-item';
import IsEntity from '../../models/contracts/is-entity';

@Component({
    selector: 'app-requested-items-editable-list',
    templateUrl: './requested-items-editable-list.component.html',
    styleUrls: ['./requested-items-editable-list.component.scss']
})
export class RequestedItemsEditableListComponent {

    /**
     * The new item that is being filled in
     */
    @ViewChild('newItem', {static: false})
    newItem: RequestedItemEditorComponent;

    /**
     * all entered items on the page
     */
    @ViewChildren('enteredItems')
    enteredItems: QueryList<RequestedItemEditorComponent>;

    /**
     * The entity we use to process our uploads
     */
    @Input()
    entity: IsEntity;

    /**
     * All requested items the user has entered so far
     */
    @Input()
    requestedItems: RequestedItem[] = [];

    /**
     * The change detection to help notify when to detect changes
     */
    @Input()
    changeDetection: ChangeDetectorRef;

    /**
     * Whether or not we should show the quantity inputs
     */
    @Input()
    showQuantity: boolean;

    /**
     * Removes an item from the list of requested items
     * @param removedItem
     */
    removeItem(removedItem: RequestedItemEditorComponent) {
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
     * Gets the current items the user has entered
     */
    getCurrentRequestedItems(): RequestedItem[] {
        const requestedItems = this.enteredItems
            .map(element => element.getRequestedItemModel())
            .filter(requestedItem => requestedItem.name.length > 0 || requestedItem.asset);
        const newItem = this.newItem.getRequestedItemModel();
        if (newItem.name && newItem.name.length > 0 || newItem.asset) {
            requestedItems.push(newItem);
        }

        return requestedItems;
    }
}
