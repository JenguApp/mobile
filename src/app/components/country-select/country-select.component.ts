import {Component, Input, OnInit, ViewChild} from '@angular/core';
import country from 'country-list-js';
import {IonSelect} from '@ionic/angular';

@Component({
    selector: 'app-country-select',
    templateUrl: './country-select.component.html',
    styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

    /**
     * The actual select element
     */
    @ViewChild('selectElement', {static: true})
    selectElement: IonSelect;

    /**
     * Whether or not this component is required
     */
    @Input()
    required: boolean;

    /**
     * The value for the select
     */
    _value: string;

    /**
     * The names ordered properly
     */
    orderedNames: string[];

    /**
     * Default constructor
     */
    ngOnInit() {
        this.orderedNames = country.names().sort();
    }

    /**
     * Sets the default value
     * @param value
     */
    @Input()
    set value(value) {
        this._value = value;
    }

    /**
     * Returns our value from the actual element
     */
    get value(): string {
        return this.selectElement.value;
    }
}
