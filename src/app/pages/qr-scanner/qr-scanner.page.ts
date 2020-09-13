import {Component, OnInit} from '@angular/core';
import {Platform, ViewWillEnter} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {BasePage} from '../base.page';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-qr-scanner',
    templateUrl: 'qr-scanner.page.html',
    styleUrls: ['qr-scanner.page.scss'],
})
export class QRScannerPage extends BasePage implements ViewWillEnter {

    private me: User = null;

    /**
     * Default Constructor
     * @param platform
     * @param userService
     * @param qrScanner
     */
    constructor(private platform: Platform,
                private userService: UserService,
                private qrScanner: QRScanner)
    {
        super();
    }

    /**
     * loads the current state
     */
    ionViewWillEnter(): void
    {
        this.platform.ready().then(() => {
            (window.document.querySelector('body') as HTMLElement).classList.add('qr-active');
            this.userService.getMe().then(me => {
                this.me = me;
                this.qrScanner.prepare().then(status => {
                    if (status.authorized) {
                        this.qrScanner.show().catch(console.error);
                        this.qrScanner.scan().subscribe((text: string) => {
                            alert(text);
                            // TODO handle scan success
                        });
                    } else {
                        console.error('Permission Denied', status);
                    }
                }).catch(console.error);
            });
        });
    }
}
