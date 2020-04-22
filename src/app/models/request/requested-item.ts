import {BaseModel} from '../base-model';
import {Asset} from '../asset';
import {Relation} from '../relation';
import {RequestsProvider} from '../../providers/requests/requests';
import {User} from '../user/user';
import {ChangeDetectorRef} from '@angular/core';

export class RequestedItem extends BaseModel {

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

    /**
     * replaces the asset properly
     * @param requests
     * @param user
     * @param imageData
     * @param changeDetection
     */
    replaceAsset(requests: RequestsProvider, user: User, imageData: string, changeDetection: ChangeDetectorRef) {
        requests.deliveryRequests.uploadAsset(user, imageData).then(asset => {
            this.asset = asset;
            changeDetection.detectChanges();
        });
    }
}