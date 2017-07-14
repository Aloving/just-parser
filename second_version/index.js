const JustParser = require('./dist').default;

const firstParser = new JustParser(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const secondParser = new JustParser(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const thirdParser = new JustParser(
  'https://github.com:30/foo/bar?name=ryan&lname=smith',
);

const fourthParser = new JustParser(
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

const thirdParse = thirdParser.hashAction('ADD', 'something').parsedUrl;

const fourthParse = fourthParser
  .queryAction('ADD', {
    name: 'Bruce',
    age: '60',
  })
  .toString();

console.log(firstParse);
console.log(secondParse);
console.log(thirdParse);
console.log(fourthParse);
