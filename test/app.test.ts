import { expect } from 'chai';

describe('Basic Mocha Test', () => {
  it('should return true for a simple assertion', () => {
    const result = true;
    expect(result).to.be.true;
  });

  it('should correctly add two numbers', () => {
    const sum = 2 + 3;
    expect(sum).to.equal(5);
  });

  it('should return a string', () => {
    const message = 'Hello, Mocha!';
    expect(message).to.be.a('string');
    expect(message).to.equal('Hello, Mocha!');
  });
});
