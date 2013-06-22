require.config({
  baseUrl: './',
  paths: {
    'jquery'              : '../components/jquery/jquery',
    'bootstrap-modal'     : '../components/bootstrap/js/bootstrap-modal',
    'bootstrap-transition': '../components/bootstrap/js/bootstrap-transition'
  },
  shim: {
    'bootstrap-modal'     : ['jquery'],
    'bootstrap-transition': ['jquery']
  }
});

require(['jquery', 'bootstrap-modal', 'bootstrap-transition']);
