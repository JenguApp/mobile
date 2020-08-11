import {Component, OnInit} from '@angular/core';
import {State, StateManagerService} from '../../services/state-manager';
import {NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {StorageProvider} from '../../providers/storage/storage';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import CanBeHomePage from '../can-be-home.page';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends CanBeHomePage implements OnInit {

    /**
     * The Logged in user
     */
    me: User = null;

    /**
     * The current state the application is in
     */
    currentState: State = null;

    /**
     * Default Constructor
     * @param stateManager
     * @param platform
     * @param storageProvider
     * @param requests
     * @param navController
     * @param currentRequestService
     * @param userService
     */
    constructor(protected platform: Platform,
                protected storageProvider: StorageProvider,
                private stateManager: StateManagerService,
                private requests: RequestsProvider,
                private navController: NavController,
                private currentRequestService: CurrentRequestService,
                private userService: UserService) {
        super(platform, storageProvider);
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        super.ngOnInit();
        this.platform.ready().then(() => {
            this.loadMe();
            this.loadInitialState();
        });
    }

    /**
     * Loads the logged in user object
     */
    loadMe() {
        this.userService.getMe().then(me => {
            this.me = me;
            this.finalizeLoad();
        });
    }

    /**
     * deterines our initial states properly
     */
    loadInitialState() {
        this.storageProvider.loadLoggedInUserId().then(userId => {
            this.storageProvider.loadCurrentActiveRequest().then(request => {
                this.currentState = request.completed_by_id == userId ?
                    'deliver' : 'request';
                this.storageProvider.saveCurrentState(this.currentState).catch(console.error);
                this.finalizeLoad();
            }).catch(e => {
                this.loadDefaultState();
            });
        }).catch(e => {
            this.loadDefaultState();
        });
    }

    /**
     * Loads the default state
     */
    loadDefaultState() {
        this.stateManager.getCurrentState().then(state => {
            this.currentState = state;
            this.finalizeLoad();
        });
    }

    /**
     * Finalizes the load, and checks for all needed data to be set
     */
    finalizeLoad() {
        if (this.me && this.currentState) {
            this.currentRequestService.navigateToCurrentPage(this.navController, this.currentState);
        }
    }
}
