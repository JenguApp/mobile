import {Injectable} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {Request} from '../../models/request/request';
import {Observable, PartialObserver, Subscriber} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export default class PendingRequestService {

    /**
     * The pending request that we currently have
     */
    pendingRequest: Request;

    /**
     * The observable object
     */
    pendingRequestRefreshedObservable: Observable<Request|number>;

    /**
     * All current subscribers
     */
    pendingRequestSubscribers: Subscriber<Request|number>[] = [];

    /**
     * The pending timeout if there is one
     */
    pendingTimeout = null;

    /**
     * Default Constructor
     * @param requestsProvider
     */
    constructor(private requestsProvider: RequestsProvider) {
        this.pendingRequestRefreshedObservable = new Observable<Request|number>(subscriber => {
            this.pendingRequestSubscribers.push(subscriber);
        });
    }

    /**
     * Allows someone to listen for changes to a pending request properly
     * @param observer
     */
    listenForPendingRequestChanges(observer: PartialObserver<Request|number>) {
        this.pendingRequestRefreshedObservable.subscribe(observer);
    }

    /**
     * Sets the pending request and waits for the refresh
     * @param pendingRequest
     */
    setPendingRequest(pendingRequest: Request) {
        this.pendingRequest = pendingRequest;
        this.waitForRequestRefresh(10);
    }

    /**
     * Whether or not there is currently a pending request
     */
    hasPendingRequest(): boolean {
        return this.pendingRequest !== null;
    }

    /**
     * Waits for the request to refresh in the passed in amount of seconds
     * @param seconds
     */
    waitForRequestRefresh(seconds: number) {
        if (this.pendingTimeout) {
            clearTimeout(this.pendingTimeout);
        }
        this.pendingTimeout = setTimeout(() => {
            if (this.pendingRequest) {
                this.refreshRequest(this.pendingRequest);
            } else {
                this.pendingRequestSubscribers.forEach(subscriber => {
                    subscriber.error();
                });
                this.pendingRequest = null;
            }
        }, seconds * 1000);
        this.pendingRequestSubscribers.forEach(subscriber => {
            subscriber.next(seconds);
        })
    }

    /**
     * Runs the request refresh
     * @param pendingRequest
     */
    refreshRequest(pendingRequest: Request) {
        this.requestsProvider.deliveryRequests.refreshRequest(pendingRequest).then(request => {
            if (request.completed_by_id) {
                this.pendingRequestSubscribers.forEach(subscriber => {
                    subscriber.next(request);
                    subscriber.complete();
                });
                this.pendingRequest = null;
            } else {
                this.waitForRequestRefresh(10);
            }
        });
    }
}