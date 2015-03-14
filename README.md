# co-retry [![Build Status](https://travis-ci.org/mvila/co-retry.svg?branch=master)](https://travis-ci.org/mvila/co-retry)
Retries generators that throw an error.

## Installation
In your project folder, type:

    npm install co-retry

## Example
Suppose you have a generator function (or any yieldable object constructors supported by [co](https://github.com/visionmedia/co)):

    var job = function *() {
      console.log('Doing something...');
      throw new Error('Failure!!!');
    };

Just wrap that function with co-retry before yielding it.

    var retry = require('co-retry');

    yield retry(job);

## API
### retry(fn, [options])

co-retry will re-run your generator if it throws an error.

    yield retry(job);

If you need to call `fn` with a context and some arguments, simply use the ES5 `bind` feature.

    yield retry(job.bind(ctx, arg1, arg2));

#### Options
The following options are available:

##### retries
The number of times to retry `fn` before giving up and rethrowing the last error caught. *Default: 6.*

    // In case of error, job will be called 1 + 10 times.
    yield retry(job, { retries: 10 });

##### interval
The number of milliseconds to wait between attempts. *Default: 1000.*

##### factor
The factor by which the interval should be multiplied per attempt. If set to 2 with an interval of 5000, the first retry will execute after 5 seconds, the second after 10, the third after 20, and so on. *Default: 2.*

This allows an exponential back-off scheme. For a smaller gap between retries, floats like 1.2 can be used to grow the interval at a slower rate.

## Inspiration
API and documentation heavily inspired from [node-attempt](https://github.com/TomFrost/node-attempt) created by Tom Frost. Thanks to him.

## License
co-retry is distributed under the MIT license.
