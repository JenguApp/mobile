import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import { PendingRequestService } from '../../services/data-services/pending-request.service';

@Component({
    selector: 'app-request-accepted-info',
    templateUrl: './request-accepted-info.page.html',
    styleUrls: ['./request-accepted-info.page.scss'],
})
export class RequestAcceptedInfoPage implements OnInit {

    /**
     * The request that the user is currently completing
     */
    pendingRequest: Request = null;

    /**
     * Default Constructor
     * @param pendingRequestService
     */
    constructor(private pendingRequestService: PendingRequestService) {
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void {
        this.pendingRequest = this.pendingRequestService.getPendingRequest();
    }
}
