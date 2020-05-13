import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../base.page';
import {State, StateManagerService} from '../../services/state-manager';
import {NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';

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
     * The Logged in user
     */
    me: User = null;

    /**
     * Default Constructor
     * @param stateManager
     * @param platform
     * @param requests
     * @param navController
     * @param userService
     */
    constructor(private stateManager: StateManagerService,
                private platform: Platform,
                private requests: RequestsProvider,
                private navController: NavController,
                private userService: UserService) {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void {
        this.stateManager.stateChangeObserver.subscribe(state => {
            this.currentState = state;
        });
        this.platform.ready().then(() => {

            this.stateManager.getCurrentState().then(state => {
                this.currentState = state;
                this.navController.navigateRoot('/home').catch(console.error);
            });
            this.me = this.userService.getMe();
            if (!this.me) {
                this.requests.auth.loadInitialInformation().then(user => {
                    this.userService.storeMe(user);
                    this.me = user;
                });
            }
        });
    }
}
