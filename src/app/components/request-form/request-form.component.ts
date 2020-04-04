import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RequestedItem} from '../../models/request/requested-item';
import {User} from '../../models/user/user';
import {RequestFormItemComponent} from './request-form-item/request-form-item.component';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {

    /**
     * The currently logged in user
     */
    @Input()
    user: User;

    /**
     * The new item that is being filled in
     */
    @ViewChild('newItem', {static: false})
    newItem: RequestFormItemComponent;

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
}
