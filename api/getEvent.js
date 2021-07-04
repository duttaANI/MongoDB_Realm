

// Initializing stitch
const {
  Stitch,
  RemoteMongoClient,
  ServerApiKeyCredential
} = require('mongodb-stitch-server-sdk');

// call env path
require('dotenv').config({ path: '../../.env' });

// Mongo API key for authentication
const mongoAPIKey = process.env.MONGO_API_KEY;
const credential = new ServerApiKeyCredential(mongoAPIKey);

// Initilize client
const stitchApp = Stitch.initializeDefaultAppClient(process.env.STITCH_APP_NAME);
const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
const eventsCollection = mongodb
  .db(process.env.CLUBHUB_DB)
  .collection(process.env.EVENTS_COLLECTION);

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  var eventName = "test event"
  await stitchApp.callFunction('realm_get_event', [eventName]).then(async (result1) => {
    const result3 = JSON.stringify(result1);
    if (result1) {
      console.log(result3);
      // Respond with a JSON string of all users in the collection
      res.status(200).json({ result1 });
    }
    else {
      console.error('event does not exist.');
    }
  });

  
};
