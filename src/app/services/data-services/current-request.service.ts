import {Injectable} from '@angular/core';
import {RequestsProvider} from '../../providers/requests/requests';
import {Request} from '../../models/request/request';
import {Observable, PartialObserver, Subscriber} from 'rxjs';
import {StorageProvider} from '../../providers/storage/storage';
import {NavController} from '@ionic/angular';
import {State} from '../state-manager';

@Injectable({
    providedIn: 'root'
})
export class CurrentRequestService {

    /**
     * The pending request that we currently have
     */
    currentRequest: Request;

    /**
     * The observable object
     */
    currentRequestRefreshedObservable: Observable<Request>;

    /**
     * All current subscribers
     */
    currentRequestSubscribers: Subscriber<Request>[] = [];

    /**
     * The pending timeout if there is one
     */
    refreshTimeout = null;

    /**
     * THe last time the request was refreshed
     */
    lastRefresh: number = null;

    /**
     * Default Constructor
     * @param storageProvider
     * @param requestsProvider
     */
    constructor(private storageProvider: StorageProvider,
                private requestsProvider: RequestsProvider) {
        this.storageProvider.loadCurrentActiveRequest().then(request => {
            this.currentRequest = request;
            this.refreshRequest(request).catch(console.error);
        }).catch(console.error);
        this.currentRequestRefreshedObservable = new Observable<Request>(subscriber => {
            this.currentRequestSubscribers.push(subscriber);
        });
    }

    /**
     * Allows someone to listen for changes to a pending request properly
     * @param observer
     */
    listenForCurrentRequestChanges(observer: PartialObserver<Request>) {
        this.currentRequestRefreshedObservable.subscribe(observer);
    }

    /**
     * Sets the pending request and waits for the refresh
     * @param currentRequest
     */
    setCurrentRequest(currentRequest: Request) {
        this.currentRequest = currentRequest;
        if (currentRequest) {
            this.storageProvider.saveCurrentActiveRequest(currentRequest).catch(console.error);
            this.currentRequestSubscribers.forEach(subscriber => {
                subscriber.next(currentRequest);
            });
        } else {
            this.storageProvider.clearCurrentActiveRequest().catch(console.error);
            this.currentRequestSubscribers.forEach(subscriber => {
                subscriber.complete();
            });
        }
    }

    /**
     * Gets the completing request
     */
    getCurrentRequest(): Promise<Request> {
        if (this.currentRequest) {
            if (!this.lastRefresh || this.lastRefresh < Date.now() - (10 * 60 * 1000)) {
                return this.refreshRequest(this.currentRequest);
            } else {
                return Promise.resolve(this.currentRequest);
            }
        }
        return Promise.reject();
    }

    /**
     * Whether or not there is currently a pending request
     */
    hasPendingRequest(): boolean {
        return this.currentRequest !== null;
    }

    /**
     * Waits for the request to refresh in the passed in amount of seconds
     * @param seconds
     */
    waitForRequestRefresh(seconds: number) {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }
        this.refreshTimeout = setTimeout(() => {
            if (this.currentRequest) {
                this.refreshRequest(this.currentRequest);
            } else {
                this.currentRequestSubscribers.forEach(subscriber => {
                    subscriber.error();
                });
            }
        }, seconds * 1000);
    }

    /**
     * Runs the request refresh
     * @param request
     */
    refreshRequest(request: Request): Promise<Request> {
        return this.requestsProvider.deliveryRequests.refreshRequest(request).then(request => {
            this.setCurrentRequest(request);
            return Promise.resolve(request);
        });
    }


    /**
     * Helper function to take us to the state root
     * @param navController
     * @param state
     */
    navigateToCurrentPage(navController: NavController, state: State) {
        this.getCurrentRequest().then(async request => {
            const userId = await this.storageProvider.loadLoggedInUserId();
            if (userId == request.completed_by_id) {
                navController.navigateRoot('/active-delivery').catch(console.error);
            } else if (userId == request.requested_by_id) {
                const route = request.completed_by_id == null ? '/pending-request' : '/request-accepted';
                navController.navigateRoot(route).catch(console.error);
            } else {
                this.navigateToDefaultState(navController, state);
            }
        }).catch(() => {
            this.navigateToDefaultState(navController, state);
        });
    }

    /**
     *
     * @param navController
     * @param state
     */
    navigateToDefaultState(navController: NavController, state: State) {

        const route = state == 'deliver' ? '/browsing-deliveries' : '/requesting-deliveries';
        navController.navigateRoot(route).catch(console.error);
    }
}