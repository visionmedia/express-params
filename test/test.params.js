
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
  },
  
  'regexp': function(){
    var app = express.createServer();
    params.extend(app);

    app.param('range', /^(\w+)\.\.(\w+)?$/);

    app.get('/range/:range', function(req, res, next){
      var range = req.params.range;
      res.send('from ' + range[1] + ' to ' + range[2]);
    });

    app.param('username', /^[a-z_]+$/);

    app.get('/user/:username', function(req, res, next){
      var username = req.params.username;
      res.send('user ' + username);
    });

    assert.response(app,
      { url: '/user/tj' },
      { body: 'user tj' });

    assert.response(app,
      { url: '/user/23' },
      { status: 404 });

    assert.response(app,
      { url: '/range/1..5' },
      { body: 'from 1 to 5' });
  }
}