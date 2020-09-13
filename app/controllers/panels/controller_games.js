const express = require('express')
const router = express.Router()
const multer = require('multer');
const moment = require('moment')
const path = require('path')
const fs = require('fs')

const model = require("../../models/model_ms_games")
const model_genre  = require("../../models/model_ms_genre")
const config_multer = require('../../config/multer')

// Multer Setup
var imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, config_multer.config.images.destination)
    },
    filename: function(req, file, cb) {
        cb(null, moment.now() + path.extname(file.originalname))
    }
})

var imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: config_multer.config.images.maxFileSize
    }
}).single('games_icon')

router.use(function(req, res, next) {
    res.locals.message_success = req.flash('message_success');
    res.locals.message_fail = req.flash('message_fail');
    res.locals.message_warning = req.flash('message_warning');
    next()
}),

router.get("/", async function(req, res) {
    var [result, err] = await model.getGames()
    var [genres, err] = await model_genre.getGenres()
    var arr = [];

    for (let i=0; i < result.length; i++){
        var [countSaved, error] = await model.getCountSaved(result[i].id);
       
        arr.push(countSaved);
    }
    // console.log(arr);

    res.render('config/ms_games', {
        user: req.user,
        games: result,
        genres: genres,
        saved: arr
    })
}),

router.post("/get", async function(req, res) {
    var [result, error] = await model.getById(req.body.games_id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: result
    }))
}),

router.post("/input", async function(req, res) {
    var genre_id = req.body.genre_id
    var genre_name = req.body.genre_name

    var data_input = {
        genre_id: genre_id,
        genre_name: genre_name
    }
    if (!genre_id) {
        var [result, error] = await model.addGenre(data_input);
        req.flash('message_success', "Success insert data")
        res.redirect('/panels/genre')
    } else {
        var [result, error] = await model.updateGenre(data_input);
        req.flash('message_success', "Success update data")
        res.redirect('/panels/genre')
    }
})

module.exports = router