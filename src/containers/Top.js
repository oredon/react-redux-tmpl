if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Top.prod');
} else {
  module.exports = require('./Top.dev');
}