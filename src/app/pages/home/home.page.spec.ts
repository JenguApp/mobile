import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ComponentsModule} from '../../components/components.module';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {CurrentRequestService} from '../../services/data-services/current-request.service';
import {navControllerStub} from '../../../../test-config/mocks-ionic';
import {HomePage} from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        alertController = new AlertController();
        const storageProvider = new StorageProvider(new NativeStorageMock());
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navControllerStub},
                {provide: Geolocation, useValue: new Geolocation()},
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: CurrentRequestService, useValue: new CurrentRequestService(storageProvider, requestsProvider) },
                { provide: StorageProvider, useValue: storageProvider },
            ],
            declarations: [
                HomePage,
            ]
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
