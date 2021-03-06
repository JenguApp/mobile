import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReviewPage } from './request-review.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {Camera} from '@ionic-native/camera/ngx';
import {GoogleMaps} from '@ionic-native/google-maps/ngx';
import {Marker} from '@ionic-native/google-maps';
import {CurrentRequestService} from '../../services/data-services/current-request.service';

describe('RequestReviewPage', () => {
    let component: RequestReviewPage;
    let navController;
    let fixture: ComponentFixture<RequestReviewPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const file: File = new File();
    const fileOpener: FileOpener = new FileOpener();
    const camera: Camera = new Camera();

    beforeEach(async(() => {
        const spy = jasmine.createSpy().and.callFake(function (name) {
            return {
                one: () => {
                    return Promise.resolve();
                },
                addMarkerSync: (markerData) => {
                    return {} as Marker;
                }
            } as any;
        });
        const storageProvider = new StorageProvider(new NativeStorageMock());
        GoogleMaps.create = spy;
        navController = jasmine.createSpyObj('NavController', ['navigateBack']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                RequestReviewPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                { provide: ToastController, useValue: new ToastController()},
                { provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: File, useValue: file},
                {provide: Camera, useValue: camera},
                {provide: FileOpener, useValue: fileOpener},
                {provide: GoogleMaps, useValue: new GoogleMaps()},
                { provide: CurrentRequestService, useValue: new CurrentRequestService(storageProvider, requestsProvider) },
                { provide: StorageProvider, useValue: storageProvider },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestReviewPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        const getMeSubscription = spyOn(requestsProvider.social, 'loadUser');
        getMeSubscription.and.returnValue(Promise.reject());
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
