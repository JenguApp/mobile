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
            completed_by: {
                id: 234,
            },
            requested_by: {
                id: 234,
            },
            requested_items: [{
                id: 234,
            }],
            safety_report: {
                id: 234,
            },
        });

        expect(model).toBeTruthy();
        expect(model.assets[0].constructor).toBe(Asset);
        expect(model.completed_by.constructor).toBe(User);
        expect(model.requested_by.constructor).toBe(User);
        expect(model.requested_items[0].constructor).toBe(RequestedItem);
        expect(model.safety_report.constructor).toBe(SafetyReport);
    });
});
