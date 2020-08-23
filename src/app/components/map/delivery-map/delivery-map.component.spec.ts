import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMapComponent } from './delivery-map.component';
import { CommonModule } from "@angular/common";
import {AlertController, IonicModule, NavController, ToastController} from '@ionic/angular';
import {GoogleMaps, VisibleRegion} from '@ionic-native/google-maps';
import {RequestsProvider} from '../../../providers/requests/requests';
import RequestsProviderMock from '../../../providers/requests/requests.mock';
import {Observable} from 'rxjs';
import {StorageProvider} from '../../../providers/storage/storage';
import {NativeStorageMock} from '../../../../../test-config/mocks/plugins';
import {CurrentRequestService} from '../../../services/data-services/current-request.service';
import {MarkerDetailsWindowComponent} from '../../marker-details-window/marker-details-window.component';

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
                on: () => {
                    return {
                        subscribe: () => {}
                    } as Observable<any>
                },
                getVisibleRegion() {
                    return {
                        northeast: {},
                        southwest: {}
                    } as VisibleRegion;
                },
                clear() {
                    return Promise.resolve();
                }
            } as any;
        });
        GoogleMaps.create = spy;
        const storageProvider = new StorageProvider(new NativeStorageMock());
        const resolveSpy = Promise.resolve();
        navController = jasmine.createSpyObj('NavController', {navigateRoot: resolveSpy});
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                { provide: AlertController, useValue: alertController },
                { provide: ToastController, useValue: new ToastController() },
                { provide: NavController, useValue: navController },
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: CurrentRequestService, useValue: new CurrentRequestService(storageProvider, requestsProvider) },
                { provide: StorageProvider, useValue: storageProvider },
            ],
            declarations: [
                MarkerDetailsWindowComponent,
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
