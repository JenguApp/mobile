import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRequestInfoWindowComponent } from './available-request-info-window.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";

describe('AvailableRequestInfoWindowComponent', () => {
    let component: AvailableRequestInfoWindowComponent;
    let fixture: ComponentFixture<AvailableRequestInfoWindowComponent>;
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
                AvailableRequestInfoWindowComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AvailableRequestInfoWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
