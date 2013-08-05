var RSVP        = require('rsvp');
var listOfDinos = require(__dirname + '/dinos.json');

/**
 * Generates a list of random dinosaur names.
 * @param  {Object}  options
 *                    - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                    - words      {Number} the number of words per paragraph (defaults to 30).
 * @return {Promise} promise.
 */
var generateListOfDinos = function generateListOfDinos(options) {
  return RSVP.Promise(function(resolve, reject) {
    var paragraphs = [];
    var numberOfParagraphs = options.paragraphs || 10;
    var wordsPerParagraph  = options.words      || 30;

    for (var i = 0; i < numberOfParagraphs; i++) {
      paragraphs[i] = [];

    for (var j = 0; j < wordsPerParagraph; j++) {
      paragraphs[i].push(listOfDinos[~~(Math.random() * listOfDinos.length)]);
    }
  }

    resolve(paragraphs);
  });
};

/**
 * Converts an array of paragraphs to an HTML string.
 * @param  {Array}   paragraphs an array of paragraphs.
 * @return {Promise} promise.
 */
var toHTML = function toHTML(paragraphs) {
  return RSVP.Promise(function(resolve, reject) {
    var html = '';

    for (var i = 0, length = paragraphs.length; i < length; i++) {
      html += '<p>' + paragraphs[i].join(' ') + '.</p>';
    }

    resolve(html);
  });
};

/**
 * Converts an array of paragraphs to a stringified JSON object.
 * @param  {Array}   paragraphs an array of paragraphs.
 * @return {Promise} promise.
 */
var toJSON = function toJSON(paragraphs) {
  return RSVP.Promise(function(resolve, reject) {
    resolve(JSON.stringify(paragraphs));
  });
};

/**
 * Converts an array of paragraphs to plain text.
 * @param  {Array}   paragraphs an array of paragraphs.
 * @return {Promise} promise.
 */
var toPlainText = function toPlainText(paragraphs) {
  return RSVP.Promise(function(resolve, reject) {
    var text = '';

    for (var i = 0, length = paragraphs.length; i < length; i++) {
      text += paragraphs[i].join(' ') + '.\n\n';
    }

    resolve(text);
  });
};


/**
 * Get a list of dinosaurs.
 * @param  {Object}  options
 *                    - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                    - words      {Number} the number of words per paragraph (defaults to 30).
 *                    - format     {String} the requested format response (defaults to ('html').
 * @return {Promise} promise.
 */
exports.getDinos = function(options) {
  var format = options.format || 'html';

  return generateListOfDinos(options).then(function(paragraphs) {
    if (format === 'html') return toHTML(paragraphs);
    if (format === 'json') return toJSON(paragraphs);
    if (format === 'text') return toPlainText(paragraphs);
  });
};

