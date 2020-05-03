import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDeliveryComponent } from './state-delivery.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";

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
            ],
            declarations: [
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
