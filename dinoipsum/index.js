var listOfDinos = require(__dirname + '/dinos.json');

/**
 * Generates a list of random dinosaur names.
 * @param {Object} options
 *                   - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                   - words      {Number} the number of words per paragraph (defaults to 30).
 * @param {Function} callback.
 */
var generateListOfDinos = function generateListOfDinos(options, callback) {
  var paragraphs = [];
  var numberOfParagraphs = options.paragraphs || 10;
  var wordsPerParagraph  = options.words      || 30;

  for (var i = 0; i < numberOfParagraphs; i++) {
    paragraphs[i] = [];

    for (var j = 0; j < wordsPerParagraph; j++) {
      paragraphs[i].push(listOfDinos[~~(Math.random() * listOfDinos.length)]);
    }
  }

  callback(null, paragraphs);
};

/**
 * Converts an array of paragraphs to an HTML string.
 * @param {Array}    paragraphs an array of paragraphs.
 * @param {Function} callback.
 */
var toHTML = function toHTML(paragraphs, callback) {
  var html =  paragraphs.map(function (p) {
    return '<p>' + p.join(' ') + '.</p>';
  }).join('');

  callback(null, html);
};

/**
 * Converts an array of paragraphs to a stringified JSON object.
 * @param {Array}    paragraphs an array of paragraphs.
 * @param {Function} callback.
 */
var toJSON = function toJSON(paragraphs, callback) {
  callback(null, JSON.stringify(paragraphs));
};

/**
 * Converts an array of paragraphs to plain text.
 * @param {Array}    paragraphs an array of paragraphs.
 * @param {Function} callback.
 */
var toPlainText = function toPlainText(paragraphs, callback) {
  var text = paragraphs.map(function (p) {
    return p.join(' ') + '.\n\n';
  }).join('');

  callback(null, text);
};


/**
 * Get a list of dinosaurs.
 * @param {Object} options
 *                   - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                   - words      {Number} the number of words per paragraph (defaults to 30).
 *                   - format     {String} the requested format response (defaults to ('html').
 * @param {Function} callback.
 */
exports.getDinos = function(options, callback) {
  var format     = options.format || 'html';

  generateListOfDinos(options, function(err, paragraphs) {
    if (format === 'html') toHTML(paragraphs, callback);
    if (format === 'json') toJSON(paragraphs, callback);
    if (format === 'text') toPlainText(paragraphs, callback);
  });
};

