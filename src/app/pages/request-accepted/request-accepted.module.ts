import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {RequestAcceptedPage} from './request-accepted.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: RequestAcceptedPage,
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
            loadChildren: './request-accepted-info/request-accepted-info.module#RequestAcceptedInfoPageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/request-accepted/tabs/request-accepted-info',
    pathMatch: 'full'
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
  declarations: [RequestAcceptedPage]
})
export class RequestAcceptedPageModule {}
