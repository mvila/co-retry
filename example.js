var co = require('co');
var retry = require('./');

var job = function *() {
  console.log('Doing something...');
  throw new Error('Failure!!!');
};

co(function *(){
  yield retry(job);
}).catch(function(err) {
  console.error(err.stack);
});
