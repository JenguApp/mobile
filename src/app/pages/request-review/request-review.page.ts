import {Component, OnInit} from '@angular/core';
import RequestCreationService from '../../services/data-services/request-creation.service';

@Component({
    selector: 'app-request-review',
    templateUrl: './request-review.page.html',
    styleUrls: ['./request-review.page.scss'],
})
export class RequestReviewPage implements OnInit {

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
     */
    constructor(private requestCreationService: RequestCreationService) {
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
        //TODO run the server request
    }
}
