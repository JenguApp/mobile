import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {AvailableRequestInfoWindowComponent} from '../../components/available-request-info-window/available-request-info-window.component';
import {DeliveryMapComponent} from '../../components/map/delivery-map/delivery-map.component';
import {ActiveDeliveryPage} from './active-delivery.page';

describe('ActiveDeliveryPage', () => {
    let component: ActiveDeliveryPage;
    let fixture: ComponentFixture<ActiveDeliveryPage>;
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
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                {provide: Geolocation, useValue: new Geolocation()},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                AvailableRequestInfoWindowComponent,
                DeliveryMapComponent,
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
