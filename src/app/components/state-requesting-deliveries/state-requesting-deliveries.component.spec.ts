import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRequestingDeliveriesComponent } from './state-requesting-deliveries.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {RequestFormComponent} from '../request-form/request-form.component';
import {RequestFormItemComponent} from '../request-form/request-form-item/request-form-item.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';

describe('StateRequestingDeliveriesComponent', () => {
    let component: StateRequestingDeliveriesComponent;
    let fixture: ComponentFixture<StateRequestingDeliveriesComponent>;
    let navController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    let alertController;

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
                RequestFormItemComponent,
                RequestFormComponent,
                StateRequestingDeliveriesComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StateRequestingDeliveriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});