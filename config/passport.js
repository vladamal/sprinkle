
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt,

    User        = require('../server/model/modelUser'),
    params      = require('./params');


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey   = params.fourtytwo;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done){
        User.getUserByUsername(jwt_payload.username)
            .then(function (user, err) {

                if (err) {
                    console.log(' passport use '.bgRed);
                    console.log(err);
                    return done(err, false);
                }

                if (!user) {
                    console.log(' passport use !user '.bgRed);
                    return done(null, false);
                }

                console.log(' passport use '.bgGreen);
                return done(null, user);

            })
            .catch(function (err) {
                console.log(' passport use catch '.bgRed);
                console.log(err);
            });
    }))
};


