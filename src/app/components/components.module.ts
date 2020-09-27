import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {LoggedOutHeaderComponent} from './logged-out-header/logged-out-header.component';
import {LoggedInHeaderComponent} from './logged-in-header/logged-in-header.component';
import {RouterModule} from '@angular/router';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';
import {RequestFormComponent} from './request-form/request-form.component';
import {DeliveryMapComponent} from './map/delivery-map/delivery-map.component';
import {LocationSelectMapComponent} from './map/location-select-map/location-select-map.component';
import {LocationReviewMapComponent} from './map/location-review-map/location-review-map.component';
import {DeliveryCompletedComponent} from './delivery-completed/delivery-completed.component';
import {MapComponent} from './map/map.component';
import {OrganizationUsersManagementComponent} from './organization-users-management/organization-users-management.component';
import {OrganizationLocationManagementComponent} from './organization-location-management/organization-location-management.component';
import {CountrySelectComponent} from './country-select/country-select.component';
import {RequestedItemsEditableListComponent} from './requested-items-editable-list/requested-items-editable-list.component';
import {RequestedItemEditorComponent} from './requested-item-editor/requested-item-editor.component';
import {LocationBrowseMapComponent} from './map/location-browse-map/location-browse-map.component';
import {LocationAvailableItemsComponent} from './location-available-items/location-available-items.component';
import {OverlayWindowComponent} from './overlay-window/overlay-window.component';
import {MenuComponent} from './menu/menu.component';
import {MenuButtonWithNotificationsComponent} from './menu-button-with-notifications/menu-button-with-notifications.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        CountrySelectComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        MenuComponent,
        MenuButtonWithNotificationsComponent,
        OrganizationUsersManagementComponent,
        OverlayWindowComponent,
        RatingBarComponent,

        DeliveryCompletedComponent,
        DeliveryMapComponent,
        LocationAvailableItemsComponent,
        LocationBrowseMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        MapComponent,
        OrganizationLocationManagementComponent,
        RequestFormComponent,
        RequestedItemsEditableListComponent,
        RequestedItemEditorComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        CountrySelectComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        MenuComponent,
        MenuButtonWithNotificationsComponent,
        OrganizationUsersManagementComponent,
        OverlayWindowComponent,
        RatingBarComponent,

        DeliveryCompletedComponent,
        DeliveryMapComponent,
        LocationAvailableItemsComponent,
        LocationBrowseMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        MapComponent,
        OrganizationLocationManagementComponent,
        RequestFormComponent,
        RequestedItemsEditableListComponent,
        RequestedItemEditorComponent,
    ],
})
export class ComponentsModule {}
