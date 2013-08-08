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
    var $dinoOutput = $('#dino-output');

    // output format dropdown menu
    $('select[name="format"]')
      .selectpicker({ style: 'btn-inverse', menuStyle: 'dropdown-inverse' });

    // give me dinos! button click handler
    $('#submit-form').on('click', function (e) {
      e.stopPropagation();

      var $target = $($(this).attr('href')),
          url     = '/api/?' + $('input[name], select[name]').serialize(),
          setDinoParagraphs = function (html) {
            html = typeof html === 'string'
               ? html
               : JSON.stringify(html, null, 4);

            $dinoOutput.text(html);
            $target.modal('toggle');
          };

      $.get(url).then(setDinoParagraphs);
    });

    // reset button click handler.
    $('#reset-form').on('click', function (e) {
      e.preventDefault();
      $('input[name]').val('');
    });

    // Select output button click handler.
    $('#select-output').on('click', function() {
      var element = $dinoOutput.get(0),
          range,
          selection;

      if (document.body.createTextRange) { //ms
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) { //all others
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    // prettyprint usage examples
    prettify.prettyPrint();
});
