
var jwt      = require('jsonwebtoken'),
    params   = require('../../config/params');

function getUser(token, callback){
    jwt.verify(token, params.fourtytwo, function(err, decoded) {
        if (err) {
            console.log('routeUser : verify '.bgRed);
            console.log(err);
            callback(err, false);
        } else {
            callback(decoded.username, true);
        }
    });
}


module.exports = {
    getUser : getUser
};