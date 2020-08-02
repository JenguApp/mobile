import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../../components/components.module';
import {LocationRequestedItemsPage} from './location-requested-items.page';


const routes: Routes = [
  {
    path: '',
    component: LocationRequestedItemsPage,
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
  declarations: [LocationRequestedItemsPage]
})
export class LocationRequestedItemsPageModule {}
