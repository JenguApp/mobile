import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {NavController} from '@ionic/angular';
import Spy = jasmine.Spy;
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {QRScannerPage} from './qr-scanner.page';

describe('QRScannerPage', () => {
    let component: QRScannerPage;
    let fixture: ComponentFixture<QRScannerPage>;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const storageProvider = new StorageProvider(new NativeStorageMock());
    const navController = jasmine.createSpyObj('NavController', ['navigateRoot']);
    (navController.navigateRoot as Spy).and.returnValue(Promise.resolve());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QRScannerPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: CurrentRequestService, useValue: new CurrentRequestService(storageProvider, requestsProvider) },
                { provide: StorageProvider, useValue: storageProvider },
                { provide: NavController, useValue: navController},
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QRScannerPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
