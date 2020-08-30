import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {RequestsProvider} from '../../../providers/requests/requests';
import RequestsProviderMock from '../../../providers/requests/requests.mock';
import {StorageProvider} from '../../../providers/storage/storage';
import {NativeStorageMock} from '../../../../../test-config/mocks/plugins';
import {LocationPendingRequestsPage} from './location-pending-requests.page';

describe('LocationPendingRequestsPage', () => {
    let component: LocationPendingRequestsPage;
    let fixture: ComponentFixture<LocationPendingRequestsPage>;
    let navController;
    let alertController;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            organization_id: 1234
        });
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                {provide: ActivatedRoute, useValue: activatedRoute},
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock()) },
            ],
            declarations: [
                LocationPendingRequestsPage,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationPendingRequestsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
