var listOfDinos = require(__dirname + '/dinos.json');

exports.getDinos = function (options) {
  var paragraphs = [];
  var numberOfParagraphs = options.paragraphs || 10;
  var wordsPerParagraph  = options.words      || 30;

  for (var i = 0; i < numberOfParagraphs; i++) {
    paragraphs[i] = [];

    for (var j = 0; j < wordsPerParagraph; j++) {
      paragraphs[i].push(listOfDinos[~~(Math.random() * listOfDinos.length)]);
    }
  }

  return paragraphs.map(function (p) {
    return '<p>' + p.join(' ') + '</p>';
  }).join('');
};

