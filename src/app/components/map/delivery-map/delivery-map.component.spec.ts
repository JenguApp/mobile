import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMapComponent } from './delivery-map.component';
import { CommonModule } from "@angular/common";
import {AlertController, IonicModule, NavController, ToastController} from '@ionic/angular';
import {GoogleMaps, VisibleRegion} from '@ionic-native/google-maps';
import {AvailableRequestInfoWindowComponent} from '../../available-request-info-window/available-request-info-window.component';
import {RequestsProvider} from '../../../providers/requests/requests';
import RequestsProviderMock from '../../../providers/requests/requests.mock';

describe('DeliveryMapComponent', () => {
    let component: DeliveryMapComponent;
    let fixture: ComponentFixture<DeliveryMapComponent>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        const spy = jasmine.createSpy().and.callFake(function (name) {
            return {
                one: () => {
                    return Promise.resolve();
                },
                getVisibleRegion() {
                    return {
                        northeast: {},
                        southwest: {}
                    } as VisibleRegion;
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
                {provide: ToastController, useValue: new ToastController()},
                {provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                AvailableRequestInfoWindowComponent,
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
