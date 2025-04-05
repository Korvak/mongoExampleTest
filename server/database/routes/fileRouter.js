// @ts-nocheck
const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const multer = require('multer');
const upload = multer();

// @ts-check

let router = express.Router();

router.get("/find", async (req,res) => {

});

router.post("/addFile",express.raw({ type: 'application/octet-stream', limit: '15mb' }), async (req, res) => {

});

router.post("/saveFile", upload.single("file"), async (req, res) => {
    const fileBuffer = req.file.buffer; // binary data
    const fname = req.file.originalname;
    console.warn(fname);
    res.json({"name" : fname});
});


module.exports = router;