const express = require("express");
const passport = require("passport");
const path = require('path')
const Strategy = require("passport-google-oauth2").Strategy
const app = express();
    const session = require("express-session");
let pro;

const bodyParser = require('body-parser');









app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('login')
})


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null,user)
})

passport.use(new Strategy({
    clientID:"230820724159-blqip733tr4q1r637u3538jrmaavn4vo.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3400/callback",
    passReqToCallback:true,
    scope: ['profile', 'email']
},
( request, accessToken, refreshToken, profile, done ) => {
pro = profile
done(null, profile)
}))




    

    app.use(new session({
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: false
    }))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  true}));

app.use(express.json());
app.use(express.urlencoded({extended:     true}));


app.get('/callback', passport.authenticate('google', { failureRedirect:"/" }), (req, res) =>[
    res.redirect('/info')
])

app.get('/info', (req, res) => {
       if(!req.isAuthenticated() || !req.user)
        return res.redirect("/callback")

 res.render('info', {
user:pro,
img:pro.picture
    })
})
app.listen(3400, () => {
    console.log('done !')
})