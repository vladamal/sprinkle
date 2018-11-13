

var express     = require('express'),
    router      = express.Router(),

    crypto      = require('crypto'),
    color       = require('colors'),
    _           = require('lodash'),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),

    params      = require('../../config/params'),
    userProvider= require('../model/modelUser');



function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

function myHash(password){
    return crypto
        .createHmac('sha512', params.fourtytwo)
        .update(password)
        .digest('hex');
}


router.get('/users', function(req, res) {
    userProvider.getUsers()
        .then(function(users) {
            res.json(users);
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.get('/username', passport.authenticate('jwt', {session:false}), function(req, res) {

    console.log(' route username '.bgCyan);

    var token = req.headers['authorization'].split(" ")[1];
    var username = null;

    jwt.verify(token, params.fourtytwo, function(err, decoded) {
        if (err) {
            console.log('routeUser : verify '.bgRed);
            console.log(err);
            res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            username = decoded.username;

            userProvider.getUserByUsernameSimple(username)
                .then(function(user) {
                    delete user.password;
                    delete user.code;
                    delete user.verified;

                    res.json({
                        success: true,
                        user: user
                    });
                })
                .catch(function(err) {
                    console.log(' getUserSimple '.bgRed);
                    res.json({
                        success: false,
                        message: err
                    });
                });

        }
    });
});

router.post('/', function(req, res) {

    req.checkBody('firstname').notEmpty().isLength({min:4});
    req.checkBody('lastname').notEmpty().isLength({min:4});
    req.checkBody('username').notEmpty().isLength({min:4});
    req.checkBody('password').notEmpty().isLength({min:6});
    req.checkBody('email').notEmpty().isEmail({min:9});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {

        var newUser = req.body;
        newUser.password = myHash(newUser.password);

        var randomstring = require("randomstring");
        var code = randomstring.generate(12);
        newUser.code = code;

        userProvider.saveUser(newUser)
            .then(function(savedPerson) {

                var key         = require('../../sendgrid.json').key,
                    sendgrid    = require('sendgrid')(key),
                    fs          = require("fs"),
                    helper      = require('sendgrid').mail,
                    fromEmail   = new helper.Email('vladimir.malacko@gmail.com'),
                    toEmail     = new helper.Email(newUser.email),
                    subject     = 'Verifikacija dnevnika baste.',
                    content     = new helper.Content('text/html',
                        '<p>Zdravo ' + newUser.firstname + ',</p>'
                        + '<p>Molimo Vas da unesete ovaj kod u polje za verifikaciju.</p>'
                        + '<h2>' + code + '</h2>'),

                    mail        = new helper.Mail(fromEmail, subject, toEmail, content);

                var request = sendgrid.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });

                sendgrid.API(request, function (error, response) {
                    if (error) {
                        console.log(' Error response received '.bgRed);
                        console.log(error);
                    }
                });


                //sendgrid.send({
                //    to      : newUser.email,
                //    from    : 'test@example.com',
                //    subject : 'Hey low ' + ' ' + newUser.username,
                //    text    : 'sprinkle is on!'
                //}, function(err, json){
                //    if(err){
                //        return res.send('error');
                //    }
                //});

                var user = {
                    _id     : savedPerson._id,
                    username: savedPerson.username,
                    email   : savedPerson.email
                };

                res.json(user);
            })

            .catch(function(err) {
                console.log(' Register error '.bgRed);
                if (err.code == 11000) {
                    console.log(' duplicate email or username '.bgRed);
                    if (err.message.indexOf('username') != -1) {
                        console.log(' uname '.bgCyan);
                        res.json({
                            success : false,
                            message  : 'Korisnik sa korisničkim imenom \'' + newUser.username + '\' je već registrovan.'
                        });
                    } else if (err.message.indexOf('email') != -1) {
                        console.log(' mail '.bgCyan);
                        res.json({
                            success : false,
                            message  : 'Korisnik sa email-om \'' + newUser.email + '\' je već registrovan.'
                        });
                    }
                } else {
                    console.log(err);
                    res.json({
                        success : false,
                        message  : 'register catch else',
                        error   : err
                    });
                }
            });

    }
});

router.post('/verify', function(req, res) {
    userProvider.getUserByUsername(req.body.username)
        .then(function(user, err) {

            if(err){
                console.log(' getting user error IF '.bgRed);
                res.send(err);
            }

            if(!user){
                console.log(' ! user login '.red);
                res.json({
                    success: false,
                    message: 'Ne postoji korisničko ime ' + req.body.username
                });
            }

            if (user.verified) {
                res.json({
                    success : false,
                    message  : ' Nije potrebno višestruko verifikovanje naloga! ',
                    error   : err
                });
            } else {
                if (req.body.code === user.code)
                user.verified = true;
                userProvider.saveUser(user)
                    .then(function(newUser){
                        delete newUser.code;
                        delete newUser.createdOn;
                        delete newUser.verified;
                        delete newUser.__v;
                        return newUser;
                    })
                    .then(function(newUser){

                        var token = jwt.sign({ username: newUser.username, email: newUser.email }, params.fourtytwo, {expiresIn: '1d'});
                        console.log(' success '.bgGreen);

                        delete newUser.password;
                        res.json({
                            success : true,
                            message : 'Va\u0161 nalog je verifikovan.',
                            token   : 'JWT ' + token,
                            user    : newUser
                        });
                    });
            }

        })
        .catch(function(err) {
            console.log(' getting user error CATCH '.bgRed);
            console.log(err);
        })
});

router.post('/login', function(req, res) {

    req.checkBody('username').notEmpty().isLength({min:4});
    req.checkBody('password').notEmpty().isLength({min:4});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        userProvider.getUserByUsername(req.body.username)
            .then(function(user, err){

                if(err){
                    console.log('err'.red);
                    res.send(err);
                }

                if(!user){
                    console.log(' getUserByUsername '.bgRed);
                    res.json({
                        success: false,
                        message: 'Ne postoji korisničko ime ' + req.body.username
                    });
                }

                var passwordCandidate = myHash(req.body.password);
                if(user.password === passwordCandidate){
                    var token = jwt.sign({ username: user.username, email: user.email }, params.fourtytwo, {expiresIn: '1d'});
                    console.log(' success '.bgGreen);
                    res.json({
                        success : true,
                        token   : 'JWT ' + token
                    });
                } else {
                    console.log(' password NOT '.bgRed);

                    //todo
                    // Increment passTryNumber

                    res.json({
                        success : false,
                        message : 'Pogrešna šifra.'
                    });
                }
            });

            //.catch(function(err){
            //    console.log(' getUserByUsername '.bgRed);
            //    res.json({
            //        success: false,
            //        message: err
            //    });
            //})
    }

});

 router.get('/test', passport.authenticate('google', { scope: [ 'email'] }), function(req, res) {

     console.log(' route test '.bgCyan);

 });

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.status(200).json({
//         status: 'Bye!'
//     });
// });


module.exports = router;

