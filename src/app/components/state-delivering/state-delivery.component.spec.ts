import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDeliveryComponent } from './state-delivery.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {DeliveryMapComponent} from '../map/delivery-map/delivery-map.component';
import {AvailableRequestInfoWindowComponent} from '../available-request-info-window/available-request-info-window.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

describe('StateDeliveryComponent', () => {
    let component: StateDeliveryComponent;
    let fixture: ComponentFixture<StateDeliveryComponent>;
    let navController;
    let alertController;

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                {provide: Geolocation, useValue: new Geolocation()},
            ],
            declarations: [
                AvailableRequestInfoWindowComponent,
                DeliveryMapComponent,
                StateDeliveryComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StateDeliveryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
