var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/food');

// database connection event
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: `);
});

module.exports = mongoose;
