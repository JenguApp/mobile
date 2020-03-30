import {Injectable} from '@angular/core';
import {StorageProvider} from '../providers/storage/storage';

export type State = 'request' | 'deliver';

@Injectable({
    providedIn: 'root'
})
export class StateManagerService {

    /**
     * The currently loaded state
     */
    currentState: State;

    /**
     * Default Constructor
     * @param storageProvider
     */
    constructor(private storageProvider: StorageProvider) {}

    /**
     * Gets the current state stored properly
     */
    async getCurrentState(): Promise<State> {
        if (this.currentState) {
            return Promise.resolve(this.currentState);
        } else {
            return this.storageProvider.loadCurrentState().then(state => {
                this.currentState = state.length > 0 ? state as State : 'request';
                return Promise.resolve(this.currentState);
            });
        }
    }

    /**
     * Sets the current state properly
     * @param currentState
     */
    setCurrentState(currentState: State) {
        this.currentState = currentState;
        this.storageProvider.saveCurrentState(currentState).catch(console.error);
    }
}