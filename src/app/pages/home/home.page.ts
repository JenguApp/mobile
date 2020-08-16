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
        this.platform.ready().then(() => this.loadInitialState());
    }

    /**
     * Loads the logged in user object
     */
    loadInitialState() {
        this.userService.getMe().then(me => {
            this.me = me;
            this.storageProvider.loadCurrentActiveRequest().then(request => {
                this.stateManager.navigateToCurrentPage(this.navController, request).catch(console.error);
            });
        });
    }
}
