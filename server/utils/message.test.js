/*jshint esversion: 6 */

var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'Someone';
    let text = 'Testing-testing, 1-2-3'

    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});
