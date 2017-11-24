/*jshint esversion: 6 */

var expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    var notString = {data: 'notARealString'};

    expect(isRealString(notString)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var wrongString = '        ';

    expect(isRealString(wrongString)).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    var correctString = '        This should still be accepted....      ';

    expect(isRealString(correctString)).toBe(true);
  });
});
