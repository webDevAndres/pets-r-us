let express = require('express');
let passport = require('passport');
let User = require('./models/users');

let router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('info', 'You must be logged in to see this page.');
        res.redirect('/login');
    }
}


router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});



router.get('/', function (req, res) {
    res.render('index', {
        appPage: 'Home'
    });
});

router.get('/grooming', function (req, res) {
    res.render('grooming', {
        appPage: 'Grooming'
    });
});

router.get('/boarding', function (req, res) {
    res.render('boarding', {
        appPage: 'Boarding'
    });
});

router.get('/training', function (req, res) {
    res.render('training', {
        appPage: 'Training'
    });
});

router.get('/appointment', function (req, res) {
    res.render('appointment', {
        appPage: 'Appointments'
    });
});

router.get('/registration', function (req, res) {
    User.find().sort({ createdAt: 'descending' }).exec(function (err, users) {
        if (err) { return next(err); }
        res.render('registration', {
            appPage: 'Register',
            users: users
        });
    });
});

router.post('/registration', function (req, res, next) {
    let username = req.body.txtUserName;
    let password = req.body.password;
    let email = req.body.email;

    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/registration');
        }
        let newUser = new User({ //creates a new instance of the User model with the username, password and email
            username: username,
            password: password,
            email: email
        });
        newUser.save(next); // saves the new user to the database and continues to the next request handler
    });
}, passport.authenticate("login", { // authenticates the user
    successRedirect: '/registration',
    failureRedirect: '/registration',
    failureFlash: true
}));

router.get('/login', function (req, res) {
    res.render('login', {
        appPage: 'Login'
    });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    res.redirect('/registration');
});

router.get('/profile', ensureAuthenticated, function (req, res) {
    User.find().sort({ createdAt: 'descending' }).exec(function (err, users) {
        if (err) { return next(err); }
        res.render('profile', {
            appPage: 'Profile',
            user: users
        });
    });
});


router.get('/edit', ensureAuthenticated, function (req, res) {
    res.render('edit', {
        appPage: 'Edit'
    });
});

router.post('/edit', ensureAuthenticated, function (req, res, next) {
    req.user.username = req.body.username;
    req.user.email = req.body.email;

    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash('info', 'Profile updated!');
        res.redirect('/edit');
    });
});

router.get('/users/:username', function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) { return next(404); }
        res.render('profile', {
            user: user,
            appPage: 'Profile'
        });
    });
});



module.exports = router;