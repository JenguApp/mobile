import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../../components/components.module';
import {LocationPendingRequestsPage} from './location-pending-requests.page';
import {QRCodeModule} from 'angularx-qrcode';


const routes: Routes = [
  {
    path: '',
    component: LocationPendingRequestsPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [LocationPendingRequestsPage]
})
export class LocationPendingRequestsPageModule {}