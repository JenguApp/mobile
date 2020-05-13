import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReviewMapComponent } from './location-review-map.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {GoogleMaps, Marker} from '@ionic-native/google-maps';

describe('LocationReviewMapComponent', () => {
    let component: LocationReviewMapComponent;
    let fixture: ComponentFixture<LocationReviewMapComponent>;
    let navController;
    let alertController;

    beforeEach(async(() => {
        const spy = jasmine.createSpy().and.callFake(function (name) {
            return {
                one: () => {
                    return Promise.resolve();
                },
                addMarkerSync: (markerData) => {
                    return {} as Marker;
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
                LocationReviewMapComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationReviewMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
