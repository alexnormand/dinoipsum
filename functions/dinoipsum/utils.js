const listOfDinos = require('./dinos.json')

/**
 * Generates a list of random dinosaur names.
 * @param  {Object}  options
 *                    - paragraphs {Number} the number of paragraphs to generate (defaults to 10).
 *                    - words      {Number} the number of words per paragraph (defaults to 30).
 * @return {Array}
 */
const generateListOfDinos = ({ paragraphs=10, words=30 }) => {
  const res = []

  for (var i = 0; i < paragraphs; i++) {
    res[i] = []

    for (var j = 0; j < words; j++) {
      res[i].push(listOfDinos[Math.floor(Math.random() * listOfDinos.length)])
    }
  }

  return res
}

/**
 * Converts an array of paragraphs to a HTML string.
 * @param  {Array}   paragraphs an array of paragraphs.
 * @return {String}
 */
const toHTML = (paragraphs) => paragraphs.reduce((acc, p ) => `${acc}<p>${p.join(' ')}.</p>`, '')

/**
 * Converts an array of paragraphs to a stringified JSON object.
 * @param  {Array} paragraphs an array of paragraphs.
 * @return {String}
 */
const toJSON = (paragraphs) => JSON.stringify(paragraphs)

/**
 * Converts an array of paragraphs to plain text.
 * @param  {Array}   paragraphs an array of paragraphs.
 * @return {String}
 */
const toPlainText = (paragraphs) => paragraphs.reduce((acc, p ) => acc + p.join(' ') + '.\n\n', '')

/**
 * Get a list of dinosaurs.
 * @param  {Object}  options
 *                    - paragraphs {Number} the number of paragraphs to generate. 
 *                    - words      {Number} the number of words per paragraph.
 *                    - format     {String} the requested format response.
 * @return {String} 
 */
exports.getDinos = function({ format, ...options } = {}) {
  const dinos = generateListOfDinos(options)

  switch (format) {
    case 'html':
      return toHTML(dinos)
    case 'json':
      return toJSON(dinos)
    default:
      return toPlainText(dinos)
  }
}

