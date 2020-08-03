import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormComponent } from './request-form.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {Camera} from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {navControllerStub} from '../../../../test-config/mocks-ionic';
import {RequestedItemsEditableListComponent} from '../requested-items-editable-list/requested-items-editable-list.component';
import {RequestedItemEditorComponent} from '../requested-item-editor/requested-item-editor.component';

describe('RequestFormComponent', () => {
    let component: RequestFormComponent;
    let fixture: ComponentFixture<RequestFormComponent>;
    let alertController;
    const camera: Camera = new Camera();
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navControllerStub},
                {provide: Camera, useValue: camera},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                RequestedItemEditorComponent,
                RequestedItemsEditableListComponent,
                RequestFormComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
