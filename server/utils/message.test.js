/*jshint esversion: 6 */

var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'Someone';
    let text = 'Testing-testing, 1-2-3'

    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Test user';
    let coords = {lat: 30,lng: -16};

    let message = generateLocationMessage(from, coords);

    expect(typeof message.createdAt).toBe('number');
    expect(typeof message.url).toBe('string');
    expect(message.url).toBe(`https://www.google.com/maps?q=${coords.lat},${coords.lng}`);
  });
});
