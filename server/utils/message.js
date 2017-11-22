/*jshint esversion: 6 */

var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
