"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('Basic Mocha Test', () => {
    it('should return true for a simple assertion', () => {
        const result = true;
        (0, chai_1.expect)(result).to.be.true;
    });
    it('should correctly add two numbers', () => {
        const sum = 2 + 3;
        (0, chai_1.expect)(sum).to.equal(5);
    });
    it('should return a string', () => {
        const message = 'Hello, Mocha!';
        (0, chai_1.expect)(message).to.be.a('string');
        (0, chai_1.expect)(message).to.equal('Hello, Mocha!');
    });
});
//# sourceMappingURL=app.test.js.map