
/**
 * Module dependencies.
 */
var express   = require('express'),
    stylus    = require('stylus'),
    nib       = require('nib'),
    dinoipsum = require(__dirname + '/dinoipsum/index.js'),
    fs        = require('fs'),
    http      = require('http'),
    path      = require('path');

var app = express();
var allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
};

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(allowCrossDomain);
  app.use(express.compress());
  app.use(stylus.middleware({
    src: __dirname ,
    dest: __dirname + '/public',
    compile: function(str, path) {
      return stylus(str)
        .import('../components/flatui/bootstrap/css/bootstrap.css')
        .import('../components/flatui/css/flat-ui.css')
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
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: 2592000000  }));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  fs.createReadStream(__dirname + '/public/index.html').pipe(res);
});

app.get('/api', function(req, res) {
  req.query.format = req.query.format || 'html';
  res.type(req.query.format);
  dinoipsum.getDinos(req.query).then(function(dinos) {
    res.end(dinos);
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
