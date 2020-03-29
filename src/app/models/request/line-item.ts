import {BaseModel} from '../base-model';
import {Asset} from '../asset';
import {Relation} from '../relation';

export class LineItem extends BaseModel {

    /**
     * The name the user entered for the line item
     */
    name: string;

    /**
     * An asset that was potentially attached
     */
    asset: Asset;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            asset: new Relation('model', Asset)
        });
    }
}