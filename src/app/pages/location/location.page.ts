import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonTextarea, NavController, Platform, ToastController} from '@ionic/angular';
import {BasePage} from '../base.page';
import {LocationService} from '../../services/data-services/location.service';
import {Location} from '../../models/organization/location';
import {LocationAvailableItemsComponent} from '../../components/location-available-items/location-available-items.component';
import {RequestCreationService} from '../../services/data-services/request-creation.service';
import {RequestedItem} from '../../models/request/requested-item';
import {LaunchNavigator} from '@ionic-native/launch-navigator/ngx';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss']
})
export class LocationPage extends BasePage implements OnInit
{
    /**
     * The input that holds the user entered description of the request
     */
    @ViewChild('descriptionTextArea', {static: false})
    descriptionTextArea: IonTextarea;

    /**
     * The component that allows the user to select what items they want delivered
     */
    @ViewChild('availableItemsComponent', {static: false})
    availableItemsComponent: LocationAvailableItemsComponent;

    /**
     * The location we are viewing the details of
     */
    location: Location;

    /**
     * Default Constructor
     * @param platform
     * @param route
     * @param locationService
     * @param navController
     * @param requestCreationService
     * @param launchNavigator
     * @param toastController
     */
    constructor(private platform: Platform,
                private route: ActivatedRoute,
                private locationService: LocationService,
                private navController: NavController,
                private requestCreationService: RequestCreationService,
                private launchNavigator: LaunchNavigator,
                private toastController: ToastController)
    {
        super();
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            const locationId = parseInt(this.route.snapshot.paramMap.get('location_id'), 0);
            this.locationService.getLocation(locationId).then(location => {
                this.location = location;
            });
        });
    }

    /**
     * Opens the directions
     */
    getDirections(): void
    {
        this.launchNavigator.navigate([this.location.latitude, this.location.longitude]).then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
        );
    }

    /**
     * Posts the request to the server
     */
    requestDelivery(): void
    {
        const description = this.descriptionTextArea.value;
        const requestedItems = this.availableItemsComponent.enteredQuantities
            .filter(quantity => quantity > 0)
            .map((quantity, requestedItemId) => {
                return new RequestedItem({
                    location_id: this.location.id,
                    quantity: quantity,
                    parent_requested_item_id: requestedItemId,
                });
            }
        );

        if (requestedItems.length === 0) {
            this.toastController.create({
                message: 'Please enter the item quantities that you need.',
                duration: 2000,
            }).then(toast => {
                toast.present();
            });
        } else {
            this.requestCreationService.storeInitialInformation(description, requestedItems);
            this.navController.navigateForward('location-selection').catch(console.error);
        }
    }
}
