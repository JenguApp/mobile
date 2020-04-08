import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMapComponent } from './delivery-map.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";

describe('DeliveryMapComponent', () => {
    let component: DeliveryMapComponent;
    let fixture: ComponentFixture<DeliveryMapComponent>;
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
            ],
            declarations: [
                DeliveryMapComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeliveryMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
