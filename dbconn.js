require('dotenv/config');

const { MongoClient } = require('mongodb');

const connectionString = "mongodb+srv://user:testiHomma@cluster0.jh2mu.mongodb.net/fsapp?retryWrites=true&w=majority"
const client = new MongoClient(connectionString);

let dbConnection;
module.exports = {

//Connect to database
    connectToServer: function(callback){

        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err)
            }

            dbConnection = db.db('fsapp');
            console.log('DB connected');

            return callback();
        });
    },
    getDb: function () {
        return dbConnection;
      },
};