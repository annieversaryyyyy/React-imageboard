const express = require("express");
const fileDb = require('../fileDb');
const path = require("path");
const router = express.Router();
// const upload = multer({storage});
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', (req,res) => {
    let messages = [];
    if (req.query.datetime){
        const date = new Date(req.query.datetime);
        if (isNaN(date.getDate())) {
            res.status(400).send({error: 'Date not valid'});
        }
    } else {
        messages = fileDb.getItems();
    }
    res.send(messages);
});

router.post('/', upload.single('image'), (req, res) => {
    if (!req.body.message ) {
        return res.status(400).send({error: 'Message must be present in the request'});
    }

    const post = {
        author: req.body.author,
        message: req.body.message,
    };

    if (req.file) {
        post.image = req.file.filename;
    }

    fileDb.addItem(post);
    res.send(post);
});

module.exports = router;
