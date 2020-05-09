import {Injectable} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {Request} from '../../models/request/request';
import {Observable, PartialObserver, Subscriber} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompletingRequestService {

    /**
     * The pending request that we currently have
     */
    completingRequest: Request;

    /**
     * The observable object
     */
    completingRequestRefreshedObservable: Observable<Request>;

    /**
     * All current subscribers
     */
    completingRequestSubscribers: Subscriber<Request>[] = [];

    /**
     * Default Constructor
     * @param requestsProvider
     */
    constructor(private requestsProvider: RequestsProvider) {
        this.completingRequestRefreshedObservable = new Observable<Request>(subscriber => {
            this.completingRequestSubscribers.push(subscriber);
        });
    }

    /**
     * Gets the completing request
     */
    getCompletingRequest(): Promise<Request> {
        if (this.completingRequest && this.completingRequest.requested_items.length == 0) {
            return this.requestsProvider.deliveryRequests.refreshRequest(this.completingRequest)
        }
        return Promise.resolve(this.completingRequest);
    }

    /**
     * Allows someone to listen for changes to a pending request properly
     * @param observer
     */
    listenForCompletingRequestChanges(observer: PartialObserver<Request>) {
        this.completingRequestRefreshedObservable.subscribe(observer);
    }

    /**
     * Sets the completing request and waits for the refresh
     * @param completingRequest
     */
    setCompletingRequest(completingRequest: Request) {
        this.completingRequest = completingRequest;
        this.completingRequestSubscribers.forEach(subscriber => {
            subscriber.next(this.completingRequest);
        });
    }
}