import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {

    /**
     * The current state of the app
     */
    currentState: State = null;

    /**
     *
     * @param stateManager
     */
    constructor(private stateManager: StateManagerService) {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        this.stateManager.getCurrentState().then(state => {
            this.currentState = state;
        })
    }
}
