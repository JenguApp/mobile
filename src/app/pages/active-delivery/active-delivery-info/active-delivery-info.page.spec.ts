import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../../providers/requests/requests';
import RequestsProviderMock from '../../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {StorageProvider} from '../../../providers/storage/storage';
import {NativeStorageMock} from '../../../../../test-config/mocks/plugins';
import {LaunchNavigator} from '@ionic-native/launch-navigator/ngx';
import {ActiveDeliveryInfoPage} from './active-delivery-info.page';
import {LightboxModule} from 'ngx-lightbox';
import {CurrentRequestService} from '../../../services/data-services/current-request.service';
import {navControllerStub} from '../../../../../test-config/mocks-ionic';

describe('ActiveDeliveryInfoPage', () => {
    let component: ActiveDeliveryInfoPage;
    let fixture: ComponentFixture<ActiveDeliveryInfoPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        const storageProvider = new StorageProvider(new NativeStorageMock());
        TestBed.configureTestingModule({
            declarations: [
                ActiveDeliveryInfoPage,
            ],
            imports: [
                ReactiveFormsModule,
                LightboxModule,
                ComponentsModule,
            ],
            providers: [
                { provide: ToastController, useValue: new ToastController()},
                { provide: NavController, useValue: navControllerStub},
                { provide: RequestsProvider, useValue: requestsProvider},
                {provide: ActivatedRoute, useValue: activatedRoute},
                { provide: CurrentRequestService, useValue: new CurrentRequestService(storageProvider, requestsProvider) },
                { provide: StorageProvider, useValue: storageProvider },
                {provide: LaunchNavigator, useValue: new LaunchNavigator()}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveDeliveryInfoPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
