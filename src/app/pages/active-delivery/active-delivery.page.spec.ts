import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActiveDeliveryPage} from './active-delivery.page';
import {ComponentsModule} from '../../components/components.module';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('ActiveDeliveryPage', () => {
    let component: ActiveDeliveryPage;
    let fixture: ComponentFixture<ActiveDeliveryPage>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        const resolveSpy = Promise.resolve();
        navController = jasmine.createSpyObj('NavController', {navigateRoot: resolveSpy});
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule.forRoot(),
            ],
            providers: [
                { provide: AlertController, useValue: alertController },
                { provide: NavController, useValue: navController },
                { provide: Geolocation, useValue: new Geolocation() },
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock()) },
            ],
            declarations: [
                ActiveDeliveryPage,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveDeliveryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
