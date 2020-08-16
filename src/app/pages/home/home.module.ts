import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';

import { HomePage } from './home.page';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'browsing-deliveries',
                children: [
                    {
                        path: '',
                        loadChildren: '../browsing-deliveries/browsing-deliveries.module#BrowsingDeliveriesPageModule'
                    }
                ]
            },
            {
                path: 'locations-map',
                children: [
                    {
                        path: '',
                        loadChildren: '../locations-map/locations-map.module#LocationsMapPageModule'
                    }
                ]
            },
            {
                path: 'requesting-deliveries',
                children: [
                    {
                        path: '',
                        loadChildren: '../requesting-deliveries/requesting-deliveries.module#RequestingDeliveriesPageModule'
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
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage]
})
export class HomePageModule {}
