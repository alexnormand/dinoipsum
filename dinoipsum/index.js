var listOfDinos = require(__dirname + '/dinos.json');

exports.getDinos = function (numberOfParagraphs, wordsPerParagraph) {
  numberOfParagraphs = numberOfParagraphs || 10;
  wordsPerParagraph  = wordsPerParagraph  || 35;

  var paragraphs = [];

  for (var i = 0; i < numberOfParagraphs; i++) {
    paragraphs[i] = [];

    for (var j = 0; j < wordsPerParagraph; j++) {
      paragraphs[i].push(listOfDinos[Math.floor(Math.random() * listOfDinos.length)]);
    }
  }

  return paragraphs.map(function (p) {
    return '<p>' + p.join(' ') + '</p>';
  }).join('');
};

