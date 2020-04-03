import { Component } from '@angular/core';
import {LineItem} from '../../models/request/line-item';
import {Asset} from '../../models/asset';

@Component({
    selector: 'app-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {

    /**
     * All line items the user has entered so far
     */
    lineItems: LineItem[] = [];

    /**
     * The new asset he user has added
     */
    newItemAsset: Asset = null;
}
