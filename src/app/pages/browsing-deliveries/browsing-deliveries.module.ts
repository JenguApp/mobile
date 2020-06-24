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
export class BrowsingDeliveriesPageModule {}
