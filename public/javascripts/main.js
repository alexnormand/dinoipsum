require.config({
  baseUrl: './',
  paths: {
    'jquery'               : '../components/jquery/jquery',
    'bootstrap-modal'      : '../components/bootstrap/js/bootstrap-modal',
    'bootstrap-transition' : '../components/bootstrap/js/bootstrap-transition',
    'prettify'             : '../components/google-code-prettify/src/prettify'
  },
  shim: {
    'bootstrap-modal'     : ['jquery'],
    'bootstrap-transition': ['jquery']
  }
});

require(['jquery', 'prettify', 'bootstrap-modal', 'bootstrap-transition'], function ($, prettify) {
  prettify.prettyPrint();
});
