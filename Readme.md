
# express-params

  Express param functions.

## RegExp

  Regular expressions can be used to extract data from pathname
  segments as shown below. When matched `req.params.range` contains
  the capture groups of the `regexp.exec()` call.

    app.param('range', /^(\w+)\.\.(\w+)?$/);

    app.get('/range/:range', function(req, res, next){
      var range = req.params.range;
      res.send('from ' + range[1] + ' to ' + range[2]);
    });

  Another use-case for regular expression parameters is to validate input,
  for example here we may want to route via numeric id, followed by a route
  which will accept other values.

    app.param('uid', /^[0-9]+$/);

    app.get('/user/:uid', function(req, res, next){
      var uid = req.params.uid;
      res.send('user ' + uid);
    });

    app.get('/user/:name', function(req, res, next){
      var name = req.params.name;
      res.send('user ' + name);
    });

## Running Tests

 First install dependencies:
 
     $ npm install -g

 Then run the tests:
 
     $ make test

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.