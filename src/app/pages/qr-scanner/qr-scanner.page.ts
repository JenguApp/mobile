import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {BasePage} from '../base.page';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-qr-scanner',
    templateUrl: 'qr-scanner.page.html',
    styleUrls: ['qr-scanner.page.scss'],
})
export class QRScannerPage extends BasePage implements OnInit {

    private me: User = null;

    /**
     * Default Constructor
     * @param platform
     * @param userService
     */
    constructor(private platform: Platform,
                private userService: UserService)
    {
        super();
    }

    /**
     * loads the current state
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            this.userService.getMe().then(me => {
                this.me = me;
            });
        });
    }
}
