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
import {RequestFormItemComponent} from './request-form/request-form-item/request-form-item.component';
import {DeliveryMapComponent} from './map/delivery-map/delivery-map.component';
import {LocationSelectMapComponent} from './map/location-select-map/location-select-map.component';
import {LocationReviewMapComponent} from './map/location-review-map/location-review-map.component';
import {AvailableRequestInfoWindowComponent} from './available-request-info-window/available-request-info-window.component';
import {StateDeliveryComponent} from './state-delivering/state-delivery.component';
import {StateRequestingDeliveriesComponent} from './state-requesting-deliveries/state-requesting-deliveries.component';
import {DeliveryCompletedComponent} from './delivery-completed/delivery-completed.component';
import {MapComponent} from './map/map.component';

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
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
        DeliveryCompletedComponent,
        DeliveryMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        MapComponent,
        RequestFormComponent,
        RequestFormItemComponent,
        StateDeliveryComponent,
        StateRequestingDeliveriesComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        AvailableRequestInfoWindowComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
        DeliveryCompletedComponent,
        DeliveryMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        MapComponent,
        RequestFormComponent,
        RequestFormItemComponent,
        StateDeliveryComponent,
        StateRequestingDeliveriesComponent,
    ],
})
export class ComponentsModule {}
