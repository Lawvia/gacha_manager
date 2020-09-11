const express = require('express')
const router = express.Router()
const model = require("../../models/model_ms_genre")

router.use(function(req, res, next) {
    res.locals.message_success = req.flash('message_success');
    res.locals.message_fail = req.flash('message_fail');
    res.locals.message_warning = req.flash('message_warning');
    next()
}),

router.get("/", async function(req, res) {
    var [result, err] = await model.getGenres()
        // var result = groups.list
    res.render('config/ms_genre', {
        user: req.user,
        genres: result
    })
}),

router.post("/get", async function(req, res) {
    var [result, error] = await model.getById(req.body.genre_id);
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