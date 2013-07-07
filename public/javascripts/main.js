require.config({
  baseUrl: './',
  paths: {
    'jquery'               : '../components/jquery/jquery',
    'bootstrap-modal'      : '../components/bootstrap/js/bootstrap-modal',
    'bootstrap-transition' : '../components/bootstrap/js/bootstrap-transition',
    'bootstrap-dropdown'   : '../components/bootstrap/js/bootstrap-dropdown',
    'bootstrap-select'   : '../components/flatui/js/bootstrap-select',
    'prettify'             : '../components/google-code-prettify/src/prettify'
  },
  shim: {
    'bootstrap-modal'     : ['jquery'],
    'bootstrap-transition': ['jquery'],
    'bootstrap-dropdown'  : ['jquery'],
    'bootstrap-select'    : ['bootstrap-dropdown']
  }
});

require([
  'jquery',
  'prettify',
  'bootstrap-modal',
  'bootstrap-transition',
  'bootstrap-dropdown',
  'bootstrap-select'
  ],
  function ($, prettify) {
    // output format dropdown menu
    $('select[name="format"]')
      .selectpicker({ style: 'btn-inverse', menuStyle: 'dropdown-inverse' });

    // modal click handler
    $('[data-toggle=modal]').on('click', function (e) {
      e.stopPropagation();

      var $target = $($(this).attr('href')),
          url     = '/get/?' + $('input[name], select[name]').serialize(),
          setDinoParagraphs = function (html) {
            $('#dino-output').text(html);
            $target.modal('toggle');
          };

      $.get(url).then(setDinoParagraphs);
    });


    // prettyprint usage examples
    prettify.prettyPrint();
});
