import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {LocationManagementPage} from './location-management.page';
import {ComponentsModule} from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: LocationManagementPage,
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
  declarations: [LocationManagementPage]
})
export class LocationManagementPageModule {}
