import {Request} from './request';
import {Asset} from '../asset';
import {User} from '../user/user';
import {SafetyReport} from './safety-report';
import {RequestedItem} from './requested-item';

describe('Test Line Item Model', () => {

    it('Make sure that the membership plan model is being built properly', () => {
        const model = new Request({
            id: 4,
            description: 'A Description',
            assets: [{
                id: 235,
            }],
            completedBy: {
                id: 234,
            },
            createdBy: {
                id: 234,
            },
            lineItems: [{
                id: 234,
            }],
            safetyReport: {
                id: 234,
            },
        });

        expect(model).toBeTruthy();
        expect(model.assets[0].constructor).toBe(Asset);
        expect(model.completedBy.constructor).toBe(User);
        expect(model.createdBy.constructor).toBe(User);
        expect(model.requestedItems[0].constructor).toBe(RequestedItem);
        expect(model.safetyReport.constructor).toBe(SafetyReport);
    });
});
