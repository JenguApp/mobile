import {Component, Input, ViewChild} from '@angular/core';
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
     * All requested items the user has entered so far
     */
    requestedItems: RequestedItem[] = [];

    /**
     * Adds an item properly
     */
    addItem() {
        this.requestedItems.push(this.newItem.getRequestedItemModel());
        this.newItem.clear();
    }
}
