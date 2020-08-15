import {Injectable} from '@angular/core';
import {Location} from '../../models/organization/location';
import {Observable, Subscriber} from 'rxjs';
import {RequestsProvider} from '../../providers/requests/requests';
import {StorageProvider} from '../../providers/storage/storage';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    /**
     * All loaded locations in the system
     */
    loadedLocations: any = {};

    /**
     * The logout observer
     */
    readonly locationObserver: Observable<Location>;

    /**
     * The subscriber for the logout
     */
    private locationSubscribers: Subscriber<Location>[] = [];

    /**
     * Default Constructor
     * @param requests
     * @param storageProvider
     */
    constructor(private requests: RequestsProvider,
                private storageProvider: StorageProvider) {
        this.locationObserver = new Observable((subscriber) => {
            this.locationSubscribers.push(subscriber);
        });
    }

    /**
     * Gets the observer for the auth refreshed events
     */
    getLocationObserver(): Observable<Location> {
        return this.locationObserver;
    }

    /**
     * Sets a location object into cache
     * @param location
     */
    cacheLocation(location: Location) {
        this.loadedLocations[location.id] = location;
        this.locationSubscribers.forEach(subscriber => subscriber.next(location));
    }

    /**
     * Gets a location by an id
     * @param id
     */
    getLocation(id: number): Promise<Location>
    {
        return this.loadedLocations[id] ? Promise.resolve(this.loadedLocations[id]) :
            this.requests.locationRequests.loadLocation(id).then(location => {
                this.loadedLocations[id] = location;
                return Promise.resolve(location);
            });
    }
}
