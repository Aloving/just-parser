const justParser = require('./dist');

const parsedUrl = justParser.parseURL(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const withNewHash = justParser.hashAction(parsedUrl, 'hash');
const queries = justParser.queryAction(withNewHash, {
  name: 'john',
  lname: 'travolta',
});
const tostring = justParser.toString(queries);

console.log(tostring);
