var listOfDinos = require(__dirname + '/dinos.json');

/**
 * Generates a list of random dinosaur names.
 * @param  {Object} options
 *                   - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                   - words      {Number} the number of words per paragraph (defaults to 30).
 * @return {String}
 */
var generateListOfDinos = function generateListOfDinos(options) {
  var paragraphs = [];
  var numberOfParagraphs = options.paragraphs || 10;
  var wordsPerParagraph  = options.words      || 30;

  for (var i = 0; i < numberOfParagraphs; i++) {
    paragraphs[i] = [];

    for (var j = 0; j < wordsPerParagraph; j++) {
      paragraphs[i].push(listOfDinos[~~(Math.random() * listOfDinos.length)]);
    }
  }

  return paragraphs;
};

/**
 * Converts an array of paragraphs to an HTML string.
 * @param  {Array}  paragraphs an array of paragraphs.
 * @return {String}
 */
var toHTML = function toHTML(paragraphs) {
  return paragraphs.map(function (p) {
    return '<p>' + p.join(' ') + '</p>';
  }).join('');
};

/**
 * Converts an array of paragraphs to a stringified JSON object.
 * @param  {Array}  paragraphs an array of paragraphs.
 * @return {String}
 */
var toJSON = function toJSON(paragraphs) {
  return JSON.stringify(paragraphs);
};

/**
 * Converts an array of paragraphs to plain text.
 * @param  {Array}  paragraphs an array of paragraphs.
 * @return {String}
 */
var toPlainText = function toPlainText(paragraphs) {
  return paragraphs.map(function (p) {
    return p.join(' ') + '\n\n';
  }).join('');
};

/**
 * Get a list of dinosaurs.
 * @param  {Object} options
 *                   - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                   - words      {Number} the number of words per paragraph (defaults to 30).
 *                   - format     {String} the requested format response (defaults to ('html').
 * @return {String}
 */
exports.getDinos = function (options) {
  var format     = options.format || 'html';
  var paragraphs = generateListOfDinos(options);

  if (format === 'html' ) return toHTML(paragraphs);
  if (format === 'json' ) return toJSON(paragraphs);
  if (format === 'text')  return toPlainText(paragraphs);
};

