import url from 'url';

/**
  * @parsedUrl = {
  *  protocol: {String},
  *  host: {String}
  *  port: {String|null}
  *  hostname: {String}
  *  hash: {Strin|null}
  *  query: {Object}
  *  pathname: {String}
  *  path: {String}
  * }
*/

/**
  * Parse url
  * @param {string} urlString - url as string.
  * @return {@parsedUrl}
*/
function parseURL(urlString) {
  if (typeof urlString === 'string') {
    const parsedUrl = url.parse(urlString, true);
    delete parsedUrl.search;
    delete parsedUrl.slashes;
    return parsedUrl;
  }

  throw new Error('argument must be a string');
}

/**
  * hash action
  * @param {@parsedUrl} parsedUrl - parsed url from @func parseURL
  * @param {String} hash - hash what need to insert, if string is empty delete the hash
  * @return {@parsedUrl}
*/
function hashAction(parsedUrl, hash) {
  const _parsedUrl = Object.assign({}, parsedUrl);
  if (!hash.length) {
    _parsedUrl.hash = null;
    return _parsedUrl;
  }
  _parsedUrl.hash = `#${hash}`;
  return _parsedUrl;
}

/**
  * @query = {
  *  key: value<String>
  * }
  * query action
  * @param {@parsedUrl} parsedUrl - parsed url from @func parseURL
  * @param {@query} query
  * @return {@parsedUrl}
*/
function queryAction(parsedUrl, query) {
  const _parsedUrl = Object.assign({}, parsedUrl);

  _parsedUrl.query = query;
  return _parsedUrl;
}

/**
  * hash action
  * @param {@parsedUrl} parsedUrl - parsed url from @func parseURL
  * @return {String} - finished url
*/
function toString(parsedUrl) {
  let _parsedUrl = Object.assign({}, parsedUrl);
  const urlasstr = url.format(_parsedUrl);
  return urlasstr;
}

export { parseURL, hashAction, queryAction, toString };
