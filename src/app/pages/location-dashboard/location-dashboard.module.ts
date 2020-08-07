import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {LocationDashboardPage} from './location-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: LocationDashboardPage,
    children: [
      {
        path: 'location-requested-items/:location_id',
        children: [
          {
            path: '',
            loadChildren: './location-requested-items/location-requested-items.module#LocationRequestedItemsPageModule'
          }
        ]
      },
      {
        path: 'location-editor/:location_id',
        children: [
          {
            path: '',
            loadChildren: '../location-creation/location-creation.module#LocationCreationPageModule'
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
  declarations: [LocationDashboardPage]
})
export class LocationDashboardPageModule {}
