import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {RequestedItemsEditableListComponent} from './requested-items-editable-list.component';
import {RequestedItemEditorComponent} from '../requested-item-editor/requested-item-editor.component';
import {Camera} from '@ionic-native/camera/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';

describe('RequestedItemsEditableListComponent', () => {
    let component: RequestedItemsEditableListComponent;
    let fixture: ComponentFixture<RequestedItemsEditableListComponent>;
    let navController;
    let alertController;
    const camera: Camera = new Camera();
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
                {provide: Camera, useValue: camera},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                RequestedItemEditorComponent,
                RequestedItemsEditableListComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestedItemsEditableListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
