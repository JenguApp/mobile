import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {GoogleMaps, Marker} from '@ionic-native/google-maps';
import {LocationBrowseMapComponent} from './location-browse-map.component';
import {RequestsProvider} from '../../../providers/requests/requests';
import RequestsProviderMock from '../../../providers/requests/requests.mock';
import {LocationAvailableItemsComponent} from '../../location-available-items/location-available-items.component';
import {MarkerDetailsWindowComponent} from '../../marker-details-window/marker-details-window.component';

describe('LocationBrowseMapComponent', () => {
    let component: LocationBrowseMapComponent;
    let fixture: ComponentFixture<LocationBrowseMapComponent>;
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
                {provide: RequestsProvider, useValue: new RequestsProviderMock()},
            ],
            declarations: [
                LocationAvailableItemsComponent,
                MarkerDetailsWindowComponent,
                LocationBrowseMapComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationBrowseMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
