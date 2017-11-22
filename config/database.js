var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

// database connection event
mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${mongoose.connection.host}:${mongoose.connection.port}`);
});

module.exports = mongoose;