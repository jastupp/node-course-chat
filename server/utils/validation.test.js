const assert = require('expect');
const { isValidString } = require('./validation');


describe('isValidString', () => {

    it('Should reject a non string', () => {
        assert(isValidString(12)).toBe(false);
    });

    it('Should reject just spaces', () => {
        assert(isValidString('      ')).toBe(false);
    });

    it('Should accept string with spaces', () => {
        assert(isValidString('   s   ')).toBe(true);
    });
});