const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require("cors");

const fileRouter = require("./routes/fileRouter");
const reportRouter = require("./routes/reportRouter");

const app = express();
const port = 3030;

// app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(cors());
app.options('*', cors()); //allows all, including same origin, must be changed when in prod

const mongoDB = "mongodb://mongo_db:27017/";

// to soft prevent SQL injections
mongoose.set('strictQuery', true);

mongoose.connect( mongoDB,{'dbName':'ticketsDB'}).then( async () => {
    try {
      app.use('/files', fileRouter);
      app.use('/reports', reportRouter);

      // Start the Express server
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
      
    }
    catch(error) {
      console.error("unable to insert data into TicketTable");
    }
});