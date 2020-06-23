import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {ActiveDeliveryPage} from './active-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveDeliveryPage,
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
        path: 'active-delivery-info',
        children: [
          {
            path: '',
            loadChildren: './active-delivery-info/active-delivery-info.module#ActiveDeliveryInfoPageModule'
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
  declarations: [ActiveDeliveryPage]
})
export class ActiveDeliveryPageModule {}
