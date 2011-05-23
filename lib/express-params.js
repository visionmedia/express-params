
/*!
 * express-params
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Add all param functions to `app`.
 *
 * @param {express.HTTPServer} app
 * @api public
 */

exports.extend = function(app){
  exports.extend.returnValue(app);
};

/**
 * Treat functions with arity < 3 to
 * return a value, replacing the raw
 * param string.
 *
 * @param {express.HTTPServer} app
 * @api public
 */

exports.extend.returnValue = function(app){
  app.param(function(name, fn){
    if (fn.length < 3) {
      return function(req, res, next){
        var val = req.params[name];
        val = req.params[name] = fn(val);
        if (invalidParamReturnValue(val)) {
          next('route');
        } else {
          next();
        }
      };
    }
  });
};

/**
 * Check if `val` is an invalid return value, aka:
 *
 *   - is `null` or `undefined`
 *   - is `false`
 *   - is `NaN`
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function invalidParamReturnValue(val){
  return null == val
    || false === val
    || ('number' == typeof val && isNaN(val));
};