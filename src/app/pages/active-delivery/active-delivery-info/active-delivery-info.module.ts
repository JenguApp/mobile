import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../../components/components.module';
import {ActiveDeliveryInfoPage} from './active-delivery-info.page';
import {LightboxModule} from "ngx-lightbox";

const routes: Routes = [
  {
    path: '',
    component: ActiveDeliveryInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    LightboxModule,
  ],
  declarations: [ActiveDeliveryInfoPage]
})
export class ActiveDeliveryInfoPageModule {}
