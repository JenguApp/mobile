import {Component, OnInit, ViewChild} from '@angular/core';
import {StateManagerService} from '../../services/state-manager';
import {IonTabs, NavController, Platform} from '@ionic/angular';
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
     * The main tabs for the page
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

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
                private userService: UserService)
    {
        super(platform, storageProvider);
    }

    /**
     * loads the current state
     */
    ngOnInit(): void
    {
        super.ngOnInit();
        this.platform.ready().then(() => this.loadInitialState());
    }

    /**
     * Loads the logged in user object
     */
    loadInitialState()
    {
        this.userService.getMe().then(me => {
            this.me = me;
            this.storageProvider.loadCurrentActiveRequest().then(request => {
                this.stateManager.navigateToCurrentPage(this.navController, request).catch(console.error);
            }).catch(() => {
                this.requests.deliveryRequests.loadMyRequests(me).then(requests => {
                    const request = requests.data.length > 0 ? requests.data[0] : null;
                    if (!request.completed_at) {
                        this.currentRequestService.setCurrentRequest(request);
                        this.stateManager.navigateToCurrentPage(this.navController, request).catch(console.error);
                    } else {
                        this.goToDefaultTab();
                    }
                });
            });
            if (this.tabs && this.tabs.ionTabsDidChange) {
                this.tabs.ionTabsDidChange.subscribe({
                    next: tab => {
                        this.storageProvider.saveDefaultHomePageTab(tab.tab).catch(console.error);
                    }
                });
            }
        });
    }

    /**
     * Takes the user to the default tab
     */
    goToDefaultTab()
    {
        this.storageProvider.loadDefaultHomePageTab()
            .then(tab => this.goToTab(tab))
            .catch(() => this.goToTab('locations-map'));
    }

    /**
     * Takes the user to the passed in tab
     * @param tab
     */
    goToTab(tab: string)
    {
        this.tabs.select(tab).catch(console.error);
    }
}
