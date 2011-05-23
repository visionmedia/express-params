
/**
 * Module dependencies.
 */

var express = require('express')
  , should = require('should')
  , assert = require('assert')
  , params = require('../');

module.exports = {
  '.version': function(){
    params.version.should.match(/^\d+\.\d+\.\d+$/);
  },
  
  'arity < 3': function(){
    var app = express.createServer();
    params.extend(app);

    app.param('id', Number);
    app.param('error', function(){ throw new Error('fail') });
    app.param('lib', function(val){ return false; });

    app.get('/project/:lib', function(req, res, next){
      res.send('project ' + req.params.lib);
    });

    app.get('/user/:id', function(req, res, next){
      var id = req.params.id;
      res.send('typeof ' + typeof id + ' ' + id);
    });

    app.get('/error/:error', function(req, res, next){
      
    });

    assert.response(app,
      { url: '/project/express' },
      { status: 404 });

    assert.response(app,
      { url: '/user/2' },
      { body: 'typeof number 2' });

    assert.response(app,
      { url: '/user/tj' },
      { status: 404 });

    assert.response(app,
      { url: '/error/hey' },
      { status: 500 });
  }
}