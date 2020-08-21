import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Request} from '../../models/request/request';

@Component({
    selector: 'app-marker-details-window',
    templateUrl: './marker-details-window.component.html',
    styleUrls: ['./marker-details-window.component.scss']
})
export class MarkerDetailsWindowComponent {

    /**
     * The emitter for when the user closes the window
     */
    @Output()
    close: EventEmitter<any> = new EventEmitter<any>();
}
