import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-request-accepted-info',
    templateUrl: './request-accepted-info.page.html',
    styleUrls: ['./request-accepted-info.page.scss'],
})
export class RequestAcceptedInfoPage implements OnInit {

    /**
     * The request that the user is currently completing
     */
    currentRequest: Request = null;

    /**
     * Default Constructor
     * @param currentRequestService
     */
    constructor(private currentRequestService: CurrentRequestService) {
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void {
        this.currentRequestService.getCurrentRequest().then(request => {
            this.currentRequest = request;
        });
        this.currentRequestService.listenForCurrentRequestChanges({
            next: request => {
                this.currentRequest = request;
                if (!request.completed_at) {
                    this.currentRequestService.waitForRequestRefresh(30);
                }
            }
        });
        this.currentRequestService.waitForRequestRefresh(30);
    }
}
