import {Component, OnInit} from '@angular/core';
import {Platform, ToastController, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {BasePage} from '../base.page';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';
import {RequestsProvider} from '../../providers/requests/requests';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-qr-scanner',
    templateUrl: 'qr-scanner.page.html',
    styleUrls: ['qr-scanner.page.scss'],
})
export class QRScannerPage extends BasePage implements ViewWillEnter, ViewWillLeave {

    private me: User = null;

    /**
     * Default Constructor
     * @param platform
     * @param userService
     * @param toastController
     * @param requests
     * @param qrScanner
     */
    constructor(private platform: Platform,
                private userService: UserService,
                private toastController: ToastController,
                private requests: RequestsProvider,
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
                        this.qrScanner.scan().subscribe(this.readQRCode.bind(this));
                    } else {
                        this.qrScanner.openSettings();
                    }
                }).catch(console.error);
            });
        });
    }

    /**
     * Cleans everything up properly
     */
    ionViewWillLeave(): void
    {
        (window.document.querySelector('body') as HTMLElement).classList.remove('qr-active');
        this.qrScanner.hide().catch(console.error);
        this.qrScanner.destroy().catch(console.error);
    }

    /**
     * Reads the qr text
     * @param text
     */
    readQRCode(text: string): void
    {
        const parts = text.split(';');
        if (parts.length === 2) {
            if (parts[0] === 'accept-request') {
                // this.requests.deliveryRequests.acceptDeliveryRequest(parts[1]);
                return;
            }
        }

        this.toastController.create({
            header: 'Error Reading QR Code. Please Try Again.',
            duration: 2000,
        }).then(toast => toast.present());
    }
}
