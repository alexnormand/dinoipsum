
/**
 * Module dependencies.
 */
var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    fs      = require('fs'),
    http    = require('http'),
    path    = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.compress());
  app.use(stylus.middleware({
    src: __dirname ,
    dest: __dirname + '/public',
    compile: function(str, path) {
      return stylus(str)
        .import('../components/flat-ui/css/bootstrap.css')
        .import('../components/flat-ui/css/flat-ui.css')
        .import('../components/google-code-prettify/src/prettify.css')
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
    }
  }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  fs.createReadStream(__dirname + '/public/index.html').pipe(res);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
