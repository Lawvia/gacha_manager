const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const c_main = require('./app/controllers/controller_main')
const app_config = require('./app/config/app.json')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require("./app/module/passport")
const flash = require('express-flash');



// Enable proxy for get secure https
app.enable("trust proxy")

// Views
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(helmet({
    frameguard: false
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '/public')))
app.use(session({
    secret: app_config.secret,
    resave: false,
    unset: 'destroy',
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(flash());

app.use('/', c_main)

http.listen(app_config.port, () => console.log('gacha_manager listening on port ' + app_config.port))
