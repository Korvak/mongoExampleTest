// @ts-nocheck
const express = require("express");
const ConfigTable = require("../schemas/configSchema");

// @ts-check

function createRoute(app, connection, path) {
    
    let router = express.Router();

    router.get("/test", async (req, res) => {
        res.json({"result" : "test"});
    });

    router.get("/getById", async (req, res) => {
        let id = req.query.id;
        let result = await ConfigTable.findById(id);

        res.json({"result" : result});
    });

    router.get("/getByName", async (req, res) => {
        let name = req.query.name;
        let result = await ConfigTable.findOne({"name" : name});

        res.json({"result" : result});
    });

    router.get("/getAll", async (req, res) => {

        let result = await ConfigTable.find({});

        res.json({"result" : result});
    });

    router.get("/filterByData", async (req, res) => {
        let temp = {}
        let search = req.query.search;
        search = JSON.parse(search);
        //we parse it into json and compress it properly
        for (let field of Object.keys( search ) ) {
            temp[`data.${field}`] = search[field];
        }
        search = temp;
        //then we remove all the strange things but we dont rn
        let result = await ConfigTable.find(search);
        console.warn(search, result);
        res.json( {"result" : result} );
    });

    router.post("/add", async (req,res) => {

        let data = req.body;
        let jsonData = JSON.parse( data.data );
        data.data = jsonData;
        let result = await ConfigTable.insertOne(data);

        res.json({"result" : result});
    });

    router.post("/update", async (req,res) => {
        let result = undefined;
        let data = req.body;
        let jsonData = JSON.parse( data.data );
        data.data = jsonData;
        if (data.id !== undefined) {
            result = await ConfigTable.findByIdAndUpdate(data.id, data);
        }
        else {
            result = await ConfigTable.updateOne(data);
        }
        res.json({"result" : result});
    });



    app.use(path, router);

    return router;
}

module.exports = createRoute;