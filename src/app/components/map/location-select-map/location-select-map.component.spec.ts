import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSelectMapComponent } from './location-select-map.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {GoogleMaps} from '@ionic-native/google-maps';

describe('DeliveryMapComponent', () => {
    let component: LocationSelectMapComponent;
    let fixture: ComponentFixture<LocationSelectMapComponent>;
    let navController;
    let alertController;

    beforeEach(async(() => {
        const spy = jasmine.createSpy().and.callFake(function (name) {
            return {
                one: () => {
                    return Promise.resolve();
                }
            } as any;
        });
        GoogleMaps.create = spy;
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
                LocationSelectMapComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationSelectMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
