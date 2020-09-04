import {Component, OnInit, ViewChild} from '@angular/core';
import { RequestCreationService } from '../../services/data-services/request-creation.service';
import {IonTextarea, NavController} from '@ionic/angular';
import {RequestFormComponent} from '../../components/request-form/request-form.component';
import {RequestsProvider} from '../../providers/requests/requests';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

@Component({
    selector: 'app-request-review',
    templateUrl: './request-review.page.html',
    styleUrls: ['./request-review.page.scss'],
})
export class RequestReviewPage implements OnInit {

    /**
     * THe input field for the drop off notes
     */
    @ViewChild('dropOffNotes', {static: false})
    dropOffNotesTextarea: IonTextarea;

    /**
     * The request details form
     */
    @ViewChild('requestForm', {static: false})
    requestForm: RequestFormComponent;

    /**
     * The latitude the user selected
     */
    latitude: number;

    /**
     * The longitude the user selected
     */
    longitude: number;

    /**
     * Default Constructor
     * @param requestCreationService
     * @param pendingRequestService
     * @param navController
     * @param requests
     */
    constructor(private requestCreationService: RequestCreationService,
                private pendingRequestService: CurrentRequestService,
                private navController: NavController,
                private requests: RequestsProvider) {
    }

    /**
     * Loads the needed data out of our request creation service
     */
    ngOnInit(): void {
        this.latitude = this.requestCreationService.getLatitude();
        this.longitude = this.requestCreationService.getLongitude();
    }

    /**
     * Submits the data to the server properly
     */
    submit() {
        this.requestForm.storeForm();
        this.requests.deliveryRequests.createDeliveryRequest(
            this.requestCreationService.getDescription(),
            this.dropOffNotesTextarea.value,
            this.longitude,
            this.latitude,
            this.requestCreationService.getLineItems(),
            [],
            this.requestCreationService.getLocation(),
        ).then(request => {
            this.requestCreationService.clear();
            this.pendingRequestService.setCurrentRequest(request);
            this.pendingRequestService.notifyRequest(request);
            this.navController.navigateRoot('/pending-request').catch(console.error);
        }).catch(error => {
            //TODO handle error properly
        });
    }
}
