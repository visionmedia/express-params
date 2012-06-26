
/*!
 * express-params
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.3';

/**
 * Add all param functions to `app`.
 *
 * @param {express.HTTPServer} app
 * @api public
 */

exports.extend = function(app){
  exports.extend.returnValue(app);
  exports.extend.regexp(app);
};

/**
 * Adds `RegExp` support.
 *
 * @param {express.HTTPServer} app
 * @api public
 */

exports.extend.regexp = function(app){
  app.param(function(name, fn){
    if (fn instanceof RegExp) {
      return function(req, res, next, val){
        var captures;
        if (captures = fn.exec(String(val))) {
          req.params[name] = captures;
          next();
        } else {
          next('route');
        }
      }
    }
  });
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
      return function(req, res, next, val){
        val = req.params[name] = fn(val);
        if (exports.invalidParamReturnValue(val)) {
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

exports.invalidParamReturnValue = function(val){
  return null == val
    || false === val
    || ('number' == typeof val && isNaN(val));
};