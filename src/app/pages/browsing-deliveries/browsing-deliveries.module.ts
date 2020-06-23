import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {BrowsingDeliveriesPage} from './browsing-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: BrowsingDeliveriesPage,
    children: [
      {
        path: 'thread/:user_id',
        children: [
          {
            path: '',
            loadChildren: '../thread/thread.module#ThreadPageModule'
          }
        ]
      },
      {
        path: 'delivery-info',
        children: [
          {
            path: '',
            loadChildren: '../delivery-info/delivery-info.module#DeliveryInfoPageModule'
          }
        ]
      },
    ]
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
  ],
  declarations: [BrowsingDeliveriesPage]
})
export class BrowsingDeliveriesModule {}
