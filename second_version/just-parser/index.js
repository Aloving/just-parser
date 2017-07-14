import url from 'url';

class JustParser {
  /**
  * Create a paraser
  * @param {String} userUrl - url for parse;
  */
  constructor(userUrl) {
    this.userUrl = userUrl;
    this.parsedUrl = null;
  }

  /**
  * parseURL {@func} modify global parsedUrl
  * of throw error if url isnt a string
  */
  parseURL() {
    if (typeof this.userUrl === 'string') {
      const parsedUrl = url.parse(this.userUrl, true);
      delete parsedUrl.search;
      delete parsedUrl.slashes;
      this.parsedUrl = parsedUrl;
      return this;
    }

    throw new Error('argument must be a string');
  }

  /**
  * @param {String} action - that need to do with parser obj
  * @param {String}? hash - hash that need to insert
  * @return {class @JustParser}
  */
  hashAction(action, hash) {
    const _parsedUrl = this.parsedUrl
      ? Object.assign({}, this.parsedUrl)
      : Object.assign({}, this.parseURL().parsedUrl);

    switch (action) {
      case 'DELETE':
        _parsedUrl.hash = null;
        this.parsedUrl = _parsedUrl;
        return this;
      case 'UPDATE':
      case 'ADD':
        _parsedUrl.hash = hash;
        this.parsedUrl = _parsedUrl;
        return this;
      default:
        return this;
    }
  }

  /**
  * @param {String} action - that need to do with parser obj
  * @param {[String]|Object} query - update information, can be Array of Object for
  * different situations, Array for Delete action and object for Update / Add
  * @return {class @JustParser}
  */
  queryAction(action, query) {
    const _parsedUrl = this.parsedUrl
      ? Object.assign({}, this.parsedUrl)
      : Object.assign({}, this.parseURL().parsedUrl);

    // in case there is something else in query
    if (!query) {
      throw new Error(
        'query can not be empty or anything other than an array or object',
      );
    }

    switch (action) {
      case 'REMOVE':
        if (!Array.isArray(query)) {
          throw new Error('a query with REMOVE action must be an array');
        }
        query.forEach(qr => delete _parsedUrl.query[qr]);
        this.parsedUrl = _parsedUrl;
        return this;

      case 'UPDATE':
      case 'ADD':
        if (Array.isArray(query)) {
          throw new Error('a query with REMOVE action must be an object');
        }
        Object.keys(query).forEach(qr => (_parsedUrl.query[qr] = query[qr]));
        this.parsedUrl = _parsedUrl;
        return this;

      default:
        return this;
    }
  }

  /**
  * @return {String} - parserUrl as string
  */
  toString() {
    return this.parsedUrl ? url.format(this.parsedUrl) : this.userUrl;
  }
}

export default JustParser;
