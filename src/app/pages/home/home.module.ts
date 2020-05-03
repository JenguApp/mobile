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
                path: 'delivery-info',
                children: [
                    {
                        path: '',
                        loadChildren: '../delivery-info/delivery-info.module#DeliveryInfoPageModule'
                    }
                ]
            },
            {
                path: 'thread/:user_id',
                children: [
                    {
                        path: '',
                        loadChildren: '../thread/thread.module#ThreadPageModule'
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
