import {Injectable} from '@angular/core';
import {StorageProvider} from '../providers/storage/storage';
import {Events} from '@ionic/angular';

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
     * Default Constructor
     * @param storageProvider
     * @param events
     */
    constructor(private storageProvider: StorageProvider,
                private events: Events)
    {}

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
        this.events.publish('state-changed', currentState);
        this.storageProvider.saveCurrentState(currentState).catch(console.error);
    }
}