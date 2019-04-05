const { getDinos } = require('./utils.js')
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Content-Type': 'text/html'
}

const filters = {
  format: {
    defaultValue: 'html',
    validate(str) {
      return ['html', 'text', 'json'].includes(str)
    },
    serialize(str) {
      return String(str)
    },
    contentType: {
      html: 'text/html',
      text: 'text/plain',
      json: 'application/json'
    }
  },
  paragraphs: {
    defaultValue: 10,
    validate(n) {
      return Number.isInteger(n) && n < 1e5 && n > 0
    },
    serialize(n) {
      return parseInt(n, 10)
    }
  },
  words: {
    defaultValue: 30,
    validate(n) {
      return Number.isInteger(n) && n < 1e5 && n > 0
    },
    serialize(n) {
      return parseInt(n, 10)
    }
  }
}

const defaultFilterValues = 
  Object.entries(filters).reduce(
    (acc, [key]) => (
      {...acc, [key]: filters[key].defaultValue }
    ), 
    {}
  )

const getSanitizedQueryParams = (queryParams) => 
  Object.entries(queryParams).reduce((acc, [key, value]) => {
    if (!filters[key]) {
      return acc
    }

    const serializedValue = filters[key].serialize(value)

    if (!filters[key].validate(serializedValue)) {
      return acc
    }

    return {
      ...acc,
      [key]: serializedValue
    }
    
  }, {})
     

exports.handler = async function({ queryStringParameters }) {
  const options = {
    ...defaultFilterValues,
    ...getSanitizedQueryParams(queryStringParameters)
  }
  const headers = {
    ...defaultHeaders,
    'Content-Type': filters.format.contentType[options.format]
  }
  const body = getDinos(options)

  return {
    statusCode: 200,
    headers,
    body
  }
}