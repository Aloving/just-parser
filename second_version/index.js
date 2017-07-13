const JustParser = require('./dist').default;

const firstParser = new JustParser(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const secondParser = new JustParser(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const firstParse = firstParser
  .parseURL()
  .hashAction('ADD', 'hash')
  .queryAction('ADD', {
    name: 'john',
    age: '23',
  })
  .queryAction('ADD', {
    lname: 'travolta',
  })
  .queryAction('REMOVE', ['lname', 'age'])
  .toString();

const secondParse = secondParser.parseURL().parsedUrl;

console.log(firstParse);
console.log(secondParse);
