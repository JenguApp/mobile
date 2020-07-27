import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CommonModule} from '@angular/common';
import {AlertController, IonicModule, NavController, Platform} from '@ionic/angular';
import {PlatformMock} from '../../../../test-config/mocks-ionic';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {OrganizationLocationManagementComponent} from './organization-location-management.component';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';

describe('OrganizationLocationManagementComponent', () => {
    let component: OrganizationLocationManagementComponent;
    let fixture: ComponentFixture<OrganizationLocationManagementComponent>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                { provide: AlertController, useValue: alertController },
                { provide: NavController, useValue: navController },
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: Platform, useValue: new PlatformMock()},
                { provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock()) },
            ],
            declarations: [
                OrganizationLocationManagementComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationLocationManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
