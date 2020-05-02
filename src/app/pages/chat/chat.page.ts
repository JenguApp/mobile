import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import CompletingRequestService from '../../services/data-services/completing-request.service';
import {RequestsProvider} from '../../providers/requests/requests';

@Component({
    selector: 'app-delivery-info',
    templateUrl: './delivery-info.page.html',
    styleUrls: ['./delivery-info.page.scss'],
})
export class ChatPage implements OnInit {

    /**
     * The request the user is completing
     */
    completingRequest: Request;

    /**
     * Default Constructor
     * @param completingRequestService
     * @param requests
     */
    constructor(private completingRequestService: CompletingRequestService,
                private requests: RequestsProvider) {
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void {
        this.completingRequestService.getCompletingRequest().then(completingRequest => {
            this.completingRequest = completingRequest;
        });
    }
}
