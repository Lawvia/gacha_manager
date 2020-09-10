const express = require('express')
const router = express.Router()
const model = require('../../models/model_ms_panel_users')
const saltRounds = 10;
const bcrypt = require('bcrypt')

module.exports = router

//View panel_users
router.use(function(req, res, next) {
        res.locals.message_success = req.flash('message_success');
        res.locals.message_fail = req.flash('message_fail');
        res.locals.message_warning = req.flash('message_warning');
        next()
    }),

    router.get("/", async function(req, res) {
        var [result, err] = await model.getGroups()
        res.render('admin/ms_panel_users', {
            user: req.user,
            groups: result
        })
    }),

    //add user
    router.post('/add_user', async function(req, res) {
        res.setHeader('Content-Type', 'application/json')
        var [user, err] = await model.selectUser(req.body.username)
        if (user) {
            res.status(200).send(JSON.stringify({
                status: "FAILED",
                message: "Username have been used"
            }))
            return
        }
        var items = req.body.items ? req.body.items.filter(word => word.length > 0) : []
        var hash = bcrypt.hashSync('Admin132', saltRounds);
        var [ret, err] = await model.addUser({
            username: req.body.username,
            password: hash,
            role: req.body.role,
        })
        var [userGroup, err] = await model.selectUser(req.body.username)
        for (let i = 0; i < items.length; i++) {
            var element = items[i]
            var [tr, err] = await model.addgroup({
                id_users: userGroup.id_panel_users,
                id_groups: element
            })
        }
        res.status(200).send(JSON.stringify({
                status: "SUCCESS",
            }))
            // res.redirect('/admin/ms_panel_users')
    }),

    // ajaxList
    router.post("/list", async function(req, res) {
        var start = req.body.start
        var length = req.body.length
        var order = req.body.columns[req.body.order[0].column].data
        var direction = req.body.order[0].dir
        var search = req.body.search.value
        var [ret, err] = await model.getList({
            start: parseInt(start),
            length: parseInt(length),
            search: search,
            order: order,
            direction: direction,
            id_panel_users: req.body.id_panel_users,
        })
        var [count, err] = await model.count({
            start: parseInt(start),
            length: parseInt(length),
            search: search,
            order: order,
            direction: direction,
            id_panel_users: req.body.id_panel_users,
        })
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({
            data: ret,
            recordsTotal: count,
            recordsFiltered: count,
        }));
    }),

    //get by id_panel_users
    router.post("/get", async function(req, res) {
        var [result, error] = await model.getById(req.body.id_panel_users);
        var [users_groups, error] = await model.getUserGroup(req.body.id_panel_users); //id2nya tr
        var [group, err] = await model.getGroupsByIdUsers(req.body.id_panel_users) //group name and id dari master di join ke tr
        var list_group = group
        var groups = []
        for (let index = 0; index < group.length; index++) {
            groups.push(list_group[index])
        }
        result['groups'] = groups
        console.log(result.groups)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({
            data: result,
        }))
    }),

    //update list
    router.post('/edit_user', async function(req, res) {
        res.setHeader('Content-Type', 'application/json')
        var items = req.body.items ? req.body.items.filter(word => word.length > 0) : []
        var coupon_groups = req.body.coupon_groups ? req.body.coupon_groups.filter(word => word.length > 0) : []
        var pwk_groups = req.body.pwk_groups ? req.body.pwk_groups.filter(word => word.length > 0) : []
        var [del, err] = await model.deleteUserGroup(req.body.id_panel_users)
        for (let i = 0; i < items.length; i++) {
            var element = items[i]
            var [tr, err] = await model.addgroup({
                id_users: req.body.id_panel_users,
                id_groups: element
            })
        }
        res.status(200).send(JSON.stringify({ status: "SUCCESS" }))
        return
    }),

    //resetPassword
    router.post('/reset_password', async(req, res) => {
        var [curr, err] = await model.getById(req.body.id_panel_users)
        var hash = bcrypt.hashSync('Admin132', saltRounds);
        var [result, error] = await model.resetPassword({
            id_panel_users: req.body.id_panel_users,
            password: hash
        });
        res.redirect('/panels/admin/ms_panel_users');
    })

//active
router.post('/active', async function(req, res) {
    var [curr, err] = await model.getById(req.body.id_panel_users)
    var [result, error] = await model.isActive({
        id_panel_users: req.body.id_panel_users,
        active: curr.active == 1 ? 0 : 1
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        status: "SUCCESS"
    }));
})