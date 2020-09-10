const express = require('express')
const router = express.Router()
const model = require("../../models/model_ms_groups")

router.use(function(req, res, next) {
    res.locals.message_success = req.flash('message_success');
    res.locals.message_fail = req.flash('message_fail');
    res.locals.message_warning = req.flash('message_warning');
    next()
}),

router.get("/", async function(req, res) {
    var [result, err] = await model.getGroups()
        // var result = groups.list
    res.render('admin/ms_panel_users_groups', {
        user: req.user,
        groups: result
    })
}),

router.post("/get", async function(req, res) {
    var [result, error] = await model.getById(req.body.group_id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: result
    }))
}),

router.post("/input", async function(req, res) {
    var group_id = req.body.group_id
    var group_name = req.body.group_name
    var description = req.body.description

    var data_input = {
        group_id: group_id,
        group_name: group_name,
        description: description
    }
    if (!group_id) {
        var [result, error] = await model.addGroup(data_input);
        req.flash('message_success', "Success insert data")
        res.redirect('/panels/admin/ms_panel_users_groups')
    } else {
        var [result, error] = await model.updateGroup(data_input);
        req.flash('message_success', "Success update data")
        res.redirect('/panels/admin/ms_panel_users_groups')
    }
})

module.exports = router