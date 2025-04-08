const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const cors = require("cors");
const express = require('express');

const bindRoutes = require("./routes/routeResolver");

const app = express();
const port = 3030;
const RUN_WITH_MONGO = true;


const corsOptions = {
  origin: '*'
};

app.use(cors());

// app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


const mongoDB = "mongodb://mongo_db:27017/";

// to soft prevent SQL injections
mongoose.set('strictQuery', true);




if (RUN_WITH_MONGO) {
  mongoose.connect( mongoDB,{'dbName':'testDB'}).then( async () => {
    try {
        // Create GridFS bucket using native connection
      await bindRoutes(app, mongoose.connection.db);
      // Start the Express server
      app.listen(port, () => {
        console.warn(`Server is running on http://localhost:${port}`);
      });
    }
    catch(error) {
      console.error(error.message);
    }
  });
}
else {
  bindRoutes(app);
  // Start the Express server
  app.listen(port, () => {
      console.warn(`Server is running on http://localhost:${port}`);
    });
}

