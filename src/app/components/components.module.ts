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

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
        DeliveryMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        RequestFormComponent,
        RequestFormItemComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
        DeliveryMapComponent,
        LocationReviewMapComponent,
        LocationSelectMapComponent,
        RequestFormComponent,
        RequestFormItemComponent,
    ],
})
export class ComponentsModule {}
