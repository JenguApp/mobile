import { Component, OnInit } from '@angular/core';
import {Request} from '../../models/request/request';
import {LocationManagerService} from '../../services/location-manager/location-manager';
import {AlertController, ToastController} from '@ionic/angular';
import CompletingRequestService from '../../services/data-services/completing-request.service';
import {RequestsProvider} from '../../providers/requests/requests';
import PendingRequestService from '../../services/data-services/pending-request.service';

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
     * @param locationManager
     * @param alertController
     * @param toastController
     * @param pendingRequestService
     * @param requests
     */
    constructor(private locationManager: LocationManagerService,
                private alertController: AlertController,
                private toastController: ToastController,
                private pendingRequestService: PendingRequestService,
                private requests: RequestsProvider) {
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void {
        this.pendingRequest = this.pendingRequestService.getPendingRequest();
    }
}
