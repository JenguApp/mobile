import { Component } from '@angular/core';
import {Events, MenuController, NavController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    /**
     * Default Constructor
     * @param events
     * @param navCtl
     * @param menuCtl
     */
    constructor(
        private events: Events,
        private navCtl: NavController,
        private menuCtl: MenuController,
    ) {}

    /**
     * Takes the user to a page that is passed in properl
     * @param page
     */
    goTo(page: string) {
        this.menuCtl.close('side-menu').catch(console.error);
        this.navCtl.navigateBack(page).catch(console.error);
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
     * Sends the logout event
     */
    handleLogout() {
        this.events.publish('logout');
    }
}
