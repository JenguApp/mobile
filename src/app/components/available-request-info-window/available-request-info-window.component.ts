import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Request} from '../../models/request/request';

@Component({
    selector: 'app-available-request-info-window',
    templateUrl: './available-request-info-window.component.html',
    styleUrls: ['./available-request-info-window.component.scss']
})
export class AvailableRequestInfoWindowComponent {

    /**
     * The request the user is viewing
     */
    @Input()
    request: Request;

    /**
     * The emitter for when the user closes the window
     */
    @Output()
    close: EventEmitter<any> = new EventEmitter<any>();

    /**
     * The output emitter when the request is accepted
     */
    @Output()
    accepted: EventEmitter<Request> = new EventEmitter<Request>();
}
