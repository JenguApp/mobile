import {Component, Input} from '@angular/core';
import {RequestedItem} from '../../models/request/requested-item';
import {User} from '../../models/user/user';

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
     * All requested items the user has entered so far
     */
    requestedItems: RequestedItem[] = [];
}
