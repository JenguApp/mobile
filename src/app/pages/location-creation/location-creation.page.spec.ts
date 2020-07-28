import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {LocationCreationPage} from './location-creation.page';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('LocationCreationPage', () => {
    let component: LocationCreationPage;
    let fixture: ComponentFixture<LocationCreationPage>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
            ],
            declarations: [
                LocationCreationPage,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationCreationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
