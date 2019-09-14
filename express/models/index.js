const mongoose = require('mongoose');
// DB Config key (credentials)
const { MongoURI } = require('../../config/keys');

const MONGOOSE_DEBUG = false;

mongoose.set('debug', MONGOOSE_DEBUG);
mongoose.set('useFindAndModify', false);
// DB Connection settings
const connectionSettings = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
// Connect to MongoDB
mongoose
  .connect(MongoURI, connectionSettings)
  .then(
    () => console.log('connect to mongoDB'),
    err => {
      console.error(`${new Date()} -> Failed to connect to MongoDB!`, err);
      // Close Server
      process.exit(0);
    }
  )
  .catch(err => console.log(err));
// Exports
module.exports.User = require('./User');
