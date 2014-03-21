"use strict";

var wait = require('co-wait');

var retry = function *(fn, options) {
  options = options || {};
  var retries = 'retries' in options ? options.retries : 6;
  var interval = 'interval' in options ? options.interval : 1000;
  var factor = 'factor' in options ? options.factor : 2;
  var attempts = retries + 1;
  while (true) {
    try {
      return yield fn();
    } catch (err) {
      attempts--;
      if (!attempts) throw err;
      yield wait(interval);
      interval = interval * factor;
    }
  }
};

module.exports = retry;
