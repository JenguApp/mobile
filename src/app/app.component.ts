import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageProvider} from './providers/storage/storage';
import {environment} from '../environments/environment';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {State, StateManagerService} from './services/state-manager';
import {ActivationStart, Router, RouterOutlet} from '@angular/router';

/**
 * Main entry of the app
 */
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    @ViewChild(RouterOutlet, {static: false})
    outlet: RouterOutlet;

    /**
     * Whether or not the user is currently logged in
     */
    static LOGGED_IN = false;

    /**
     * The current state the app is in
     */
    currentState: State = 'request';

    /**
     * Default Constructor
     * @param platform
     * @param splashScreen
     * @param statusBar
     * @param authManagerService
     * @param navCtl
     * @param menuCtl
     * @param storage
     * @param router
     * @param stateManagerService
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authManagerService: AuthManagerService,
        private navCtl: NavController,
        private menuCtl: MenuController,
        private storage: StorageProvider,
        private router: Router,
        private stateManagerService: StateManagerService,
    ) {
        this.initializeApp();
    }

    /**
     * Runs everything needed to initialize the app properly
     */
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();

            this.router.events.subscribe(e => {
                if (e instanceof ActivationStart) {
                    this.outlet.deactivate();
                }
            });
            this.stateManagerService.getCurrentState().then(state => {
                this.currentState = state;
            });
            this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
            this.storage.loadAuthToken()
                .then(token => {
                    this.navCtl.navigateRoot('/home').catch(console.error);
                    AppComponent.LOGGED_IN = true;
                }).catch(error => {
                if (environment.sign_up_enabled) {
                    this.navCtl.navigateRoot('/sign-up').catch(console.error);
                } else {
                    this.navCtl.navigateRoot('/sign-in').catch(console.error);
                }
            });
        });
    }

    /**
     * Takes the user to a page that is passed in properl
     * @param page
     */
    goTo(page: string) {
        this.menuCtl.close('side-menu').catch(console.error);
        if (page === 'home') {
            this.navCtl.navigateRoot(page).catch(console.error);
        } else {
            this.navCtl.navigateForward(page).catch(console.error);
        }
    }

    /**
     * Handles our state selection
     * @param event
     */
    selectState(event) {
        const state = event.detail.value as State;
        this.stateManagerService.setCurrentState(state);
        this.menuCtl.close('side-menu').catch(console.error);
    }

    /**
     * Whether or not the user is logged in
     * This is used for component binding
     */
    isLoggedIn() {
        return AppComponent.LOGGED_IN;
    }

    /**
     * Whether or not this app has subscriptions enabled
     */
    hasSubscriptions() {
        return environment.subscriptions_enabled;
    }

    /**
     * Handles the logout properly
     */
    handleLogout() {
        AppComponent.LOGGED_IN = false;
        this.menuCtl.close('side-menu').catch(console.error);
        this.storage.logOut().catch(console.error);
        this.navCtl.navigateRoot('/sign-in').catch(console.error);
    }
}
