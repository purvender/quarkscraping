const mongodb = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://quarkscrap:quarkscrap@cluster0.nezws.mongodb.net/test?retryWrites=true&w=majority";

async function connect() {
  try {
    const client = await mongodb.connect(connectionString, {
      useNewUrlParser: true,
    });
    console.log("connected to mongodb");
    return client;
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
