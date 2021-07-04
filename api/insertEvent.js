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



module.exports = async (req, res) => {

    // new Date object
    const ts = Date.now();

    console.log( ts);

    // create a document to insert event

    const newEvent = {
        title: 'event',
        properties: {
          message: {
            bsonType:  "Welcome to this new event" //req.body.msg
          },
          totRegistered: {
            bsonType: 6
          },
          venue: {
            bsonType: "location of event"//req.body.venue
          },
          posterKey: {
            bsonType: "path for poster"//req.body.posterName + ts
          },
          date: {
            bsonType: "date of event"//req.body.date
          },
          name: {
            bsonType: "test event"//req.body.event_name
          }
        }
    };

    test = await eventsCollection.insertOne(newEvent)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => console.error(`Failed to insert item: ${err}`));

    console.log("test",test);

    // Select the users collection from the database
    const events = await eventsCollection.find({}).toArray();

    // Respond with a JSON string of all users in the collection
    res.status(200).json({ events });
};

