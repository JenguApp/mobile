import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertController, NavController } from "@ionic/angular";
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {LocationPage} from './location.page';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('LocationPage', () => {
    let component: LocationPage;
    let fixture: ComponentFixture<LocationPage>;
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
            providers: [
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                {provide: ActivatedRoute, useValue: activatedRoute},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                LocationPage,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
