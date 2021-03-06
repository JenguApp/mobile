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
import {AvailableRequestInfoWindowComponent} from './available-request-info-window/available-request-info-window.component';
import {DeliveryCompletedComponent} from './delivery-completed/delivery-completed.component';
import {MapComponent} from './map/map.component';
import {OrganizationUsersManagementComponent} from './organization-users-management/organization-users-management.component';
import {OrganizationLocationManagementComponent} from './organization-location-management/organization-location-management.component';
import {CountrySelectComponent} from './country-select/country-select.component';
import {RequestedItemsEditableListComponent} from './requested-items-editable-list/requested-items-editable-list.component';
import {RequestedItemEditorComponent} from './requested-item-editor/requested-item-editor.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        AvailableRequestInfoWindowComponent,
        CountrySelectComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        OrganizationUsersManagementComponent,
        RatingBarComponent,
        DeliveryCompletedComponent,
        DeliveryMapComponent,
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
        AvailableRequestInfoWindowComponent,
        CountrySelectComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        OrganizationUsersManagementComponent,
        RatingBarComponent,
        DeliveryCompletedComponent,
        DeliveryMapComponent,
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
