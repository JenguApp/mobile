import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {StorageProvider} from '../providers/storage/storage';

export type State = 'request' | 'deliver';

@Injectable({
    providedIn: 'root'
})
export class StateManagerService {

    /**
     * The currently loaded state
     */
    currentState: State = null;

    /**
     * The observer for when the state has changed internally in the app
     */
    stateChangeObserver: Observable<State>;

    /**
     * The subscribers to the state change
     */
    stateChangeSubscribers: Subscriber<State>[] = [];

    /**
     * Default Constructor
     * @param storageProvider
     */
    constructor(private storageProvider: StorageProvider) {
        this.stateChangeObserver = new Observable<State>((subscriber) => {
            this.stateChangeSubscribers.push(subscriber);
        })
    }

    /**
     * Gets the current state stored properly
     */
    async getCurrentState(): Promise<State> {
        if (this.currentState) {
            return Promise.resolve(this.currentState);
        } else {
            return this.storageProvider.loadCurrentState().then(state => {
                this.currentState = state as State;
                return Promise.resolve(this.currentState);
            }).catch(() => {
                return Promise.resolve('request' as State);
            });
        }
    }

    /**
     * Sets the current state properly
     * @param currentState
     */
    setCurrentState(currentState: State) {
        this.currentState = currentState;
        this.stateChangeSubscribers.forEach(subscriber => {
            subscriber.next(currentState);
        });
        this.storageProvider.saveCurrentState(currentState).catch(console.error);
    }
}