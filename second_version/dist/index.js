'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JustParser = function () {
  /**
  * Create a paraser
  * @param {String} userUrl - url for parse;
  */
  function JustParser(userUrl) {
    _classCallCheck(this, JustParser);

    this.userUrl = userUrl;
    this.parsedUrl = null;
  }

  /**
  * parseURL {@func} modify global parsedUrl
  * of throw error if url isnt a string
  */


  _createClass(JustParser, [{
    key: 'parseURL',
    value: function parseURL() {
      if (typeof this.userUrl === 'string') {
        var parsedUrl = _url2.default.parse(this.userUrl, true);
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

  }, {
    key: 'hashAction',
    value: function hashAction(action, hash) {
      var _parsedUrl = this.parsedUrl ? Object.assign({}, this.parsedUrl) : Object.assign({}, this.parseURL().parsedUrl);

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

  }, {
    key: 'queryAction',
    value: function queryAction(action, query) {
      var _parsedUrl = this.parsedUrl ? Object.assign({}, this.parsedUrl) : Object.assign({}, this.parseURL().parsedUrl);

      // in case there is something else in query
      if (!query) {
        throw new Error('query can not be empty or anything other than an array or object');
      }

      switch (action) {
        case 'REMOVE':
          if (!Array.isArray(query)) {
            throw new Error('a query with REMOVE action must be an array');
          }
          query.forEach(function (qr) {
            return delete _parsedUrl.query[qr];
          });
          this.parsedUrl = _parsedUrl;
          return this;

        case 'UPDATE':
        case 'ADD':
          if (Array.isArray(query)) {
            throw new Error('a query with ADD or UPDATE action must be an object');
          }
          Object.keys(query).forEach(function (qr) {
            return _parsedUrl.query[qr] = query[qr];
          });
          this.parsedUrl = _parsedUrl;
          return this;

        default:
          return this;
      }
    }

    /**
    * @return {String} - parserUrl as string
    */

  }, {
    key: 'toString',
    value: function toString() {
      return this.parsedUrl ? _url2.default.format(this.parsedUrl) : this.userUrl;
    }
  }]);

  return JustParser;
}();

exports.default = JustParser;