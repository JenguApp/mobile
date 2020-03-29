import {SafetyReport} from './safety-report';

describe('Test Safety Report Model', () => {

    it('Make sure that the membership plan model is being built properly', () => {
        const model = new SafetyReport({
            id: 4,
            description: 'A Description',
        });

        expect(model).toBeTruthy();
    });
});
