import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {RequestFormComponent} from '../../components/request-form/request-form.component';
import {RequestFormItemComponent} from '../../components/request-form/request-form-item/request-form-item.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {RequestingDeliveriesPage} from './requesting-deliveries.page';
import {ComponentsModule} from '../../components/components.module';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('RequestingDeliveriesPage', () => {
    let component: RequestingDeliveriesPage;
    let fixture: ComponentFixture<RequestingDeliveriesPage>;
    let navController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    let alertController;

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
                RequestingDeliveriesPage,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestingDeliveriesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
