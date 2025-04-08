// @ts-nocheck
const express = require("express");
const { GridFSBucket } = require('mongodb');
const mongoose = require("mongoose");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// @ts-check

async function createRouter(app, connection) {
    const router  = express.Router();
    const bucket = new GridFSBucket( connection.db, { bucketName: 'uploads' });
    console.warn("bucket : ", bucket);


    router.get("/test", async function(req,res) {
        res.json({"result" : "test"});
    });
    
    router.post("/saveFile", upload.single("file"), async (req, res) => {
        console.warn(req.file);
        const { originalname, buffer, mimetype } = req.file;
        

        res.json({"name" : originalname});
    });


    router.get('/downloadByName/:filename', (req, res) => {

        let filename = req.params.filename;
        let downloadStream = bucket.openDownloadStreamByName(filename);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        downloadStream.pipe(res);
        downloadStream.on('error', () => res.status(404).send('File not found'));
    });

    router.post('/uploadFile', upload.single('file'), (req, res) => {
        let { originalname, buffer, mimetype } = req.file;

        req.file.fileSize
    
        let uploadStream = bucket.openUploadStream(originalname, {
          contentType: mimetype,
          metadata: {
            uploadedAt: new Date()
          }
        });
    
        uploadStream.end(buffer);
    
        uploadStream.on('finish', () => {
          res.send(
                {
                    "data" : {
                        "fname" : originalname,
                        "id" : uploadStream.id
                    }
                }
            );
        });
    
        uploadStream.on('error', (err) => {
          console.error(err);
          res.status(500).send('Upload failed');
        });

    });

    app.use("/files", router);
    return router;
}



module.exports = createRouter;