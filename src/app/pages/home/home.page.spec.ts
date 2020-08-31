import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {IonicModule, NavController} from '@ionic/angular';
import Spy = jasmine.Spy;
import {CurrentRequestService} from '../../services/data-services/current-request.service';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const storageProvider = new StorageProvider(new NativeStorageMock());
    const navController = jasmine.createSpyObj('NavController', ['navigateRoot']);
    (navController.navigateRoot as Spy).and.returnValue(Promise.resolve());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomePage ],
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
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
