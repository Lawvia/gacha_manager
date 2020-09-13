const express = require('express')
const router = express.Router()
const c_auth = require('./controller_auth')
const c_genre = require('./controller_genre')
const c_admin = require('../admin/controller_admin')
const c_games = require('./controller_games')
// const c_surat_peringatan = require('./controller_surat_peringatan')
// const c_performance_appraisal = require('./controller_performance_appraisal')
// const c_history_pekerjaan = require('./controller_history_pekerjaan')
// const c_perwakilan = require('./controller_perwakilan')
// const c_agency = require('./controller_agency')
const c_change_password = require('./controller_change_password')
// const c_email = require('./controller_email')

router.use('/auth', c_auth)
// router.use('/training', c_train)
router.use("/admin", c_admin)

router.use(async function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/panels/auth')
        return
    } else {
        next()
    }
});

router.get('/', function(req, res) {
    res.render("pages/welcome", { user: req.user })
});

router.use('/genre', c_genre)
router.use('/games', c_games)
// router.use('/surat_peringatan', c_surat_peringatan)
// router.use('/performance_appraisal', c_performance_appraisal)
// router.use('/history_pekerjaan', c_history_pekerjaan)
// router.use('/perwakilan', c_perwakilan)
// router.use('/agency', c_agency)
router.use('/change_password', c_change_password)
// router.use('/email', c_email)

module.exports = router