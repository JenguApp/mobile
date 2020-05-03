import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormItemComponent } from './request-form-item.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";

describe('RequestFormItemComponent', () => {
    let component: RequestFormItemComponent;
    let fixture: ComponentFixture<RequestFormItemComponent>;
    let navController;
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
            ],
            declarations: [
                RequestFormItemComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestFormItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
