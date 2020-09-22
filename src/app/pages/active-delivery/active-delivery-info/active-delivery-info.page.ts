import {Component, OnInit} from '@angular/core';
import {Request} from '../../../models/request/request';
import {AlertController} from '@ionic/angular';
import {RequestsProvider} from '../../../providers/requests/requests';
import {LaunchNavigator} from '@ionic-native/launch-navigator/ngx';
import {CurrentRequestService} from '../../../services/data-services/current-request.service';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import {ApplicationModes} from '../../../application-modes';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-active-delivery-info',
    templateUrl: './active-delivery-info.page.html',
    styleUrls: ['./active-delivery-info.page.scss'],
})
export class ActiveDeliveryInfoPage implements OnInit
{
    /**
     * The request that the user is currently completing
     */
    completingRequest: Request = null;

    /**
     * Whether or not the user has opened the navigation app
     */
    hasNavigated = false;

    /**
     * Default Constructor
     * @param alertController
     * @param currentRequestService
     * @param requests
     * @param lightBox
     * @param lightBoxConfig
     * @param launchNavigator
     */
    constructor(private alertController: AlertController,
                private currentRequestService: CurrentRequestService,
                private requests: RequestsProvider,
                private lightBox: Lightbox,
                private lightBoxConfig: LightboxConfig,
                private launchNavigator: LaunchNavigator)
    {
        this.lightBoxConfig.centerVertically = true;
        this.lightBoxConfig.alwaysShowNavOnTouchDevices = true;
        this.lightBoxConfig.enableTransition = false;
    }

    /**
     * Gets the current application mode
     */
    isDistributionCenter(): boolean
    {
        return environment.mode === ApplicationModes.DISTRIBUTION_CENTER;
    }

    /**
     * Sets everything up
     */
    ngOnInit(): void
    {
        this.currentRequestService.getCurrentRequest().then(completingRequest => {
            this.completingRequest = completingRequest;
        });
    }

    /**
     * Opens the navigation properly
     */
    openNavigation()
    {
        this.launchNavigator.navigate([this.completingRequest.latitude, this.completingRequest.longitude]).then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
        );
        this.hasNavigated = true;
    }

    /**
     * handles the complete function
     * @param completingRequest
     */
    complete(completingRequest: Request)
    {
        this.alertController.create({
            header: 'Completing Request',
            message: 'Please make sure that you have followed all drop off instructions before you complete the request.',
            buttons: [
                {
                    text: 'One Moment',
                },
                {
                    text: 'All Set!',
                    handler: () => {
                        this.requests.deliveryRequests.completeDeliveryRequest(completingRequest).then((request) => {
                            this.currentRequestService.setCurrentRequest(request);
                            this.completingRequest = request;
                        });
                    }
                }
            ]
        }).then(alert => {
            alert.present().catch(console.error);
        });
    }

    /**
     * Opens an asset for full view
     */
    openImage(asset)
    {
        this.lightBox.open([{
            src: asset.url,
            caption: asset.caption,
        } as any]);
    }
}
