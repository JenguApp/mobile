import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {RequestingDeliveriesPage} from './requesting-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: RequestingDeliveriesPage,
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
        path: 'request-accepted-info',
        children: [
          {
            path: '',
            loadChildren: '../request-accepted-info/request-accepted-info.module#RequestAcceptedInfoPageModule'
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
  declarations: [RequestingDeliveriesPage]
})
export class RequestingDeliveriesPageModule {}
