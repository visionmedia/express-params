
/**
 * Module dependencies.
 */

var express = require('express')
  , should = require('should')
  , params = require('../');

module.exports = {
  '.version': function(){
    params.version.should.match(/^\d+\.\d+\.\d+$/);
  }
}