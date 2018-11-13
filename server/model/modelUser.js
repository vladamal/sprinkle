

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaUser = mongoose.Schema({
    firstname   : { type: String, required: true, unique: false, trim: true, minlength: [4, 'Firstname must be at least 4 characters.'], maxlength: [42, 'Firstname must be less than 42 characters.'] },
    lastname    : { type: String, required: true, unique: false, trim: true, minlength: [4, 'Lastname must be at least 4 characters.'], maxlength: [42, 'Lastname must be less than 42 characters.'] },
    username    : { type: String, required: true, unique: true, trim: true, minlength: [4, 'Lastname must be at least 4 characters.'], maxlength: [24, 'Username must be less than 24 characters.'] },
    email       : { type: String, required: true, unique: true, trim: true },
    password    : { type: String, required: true, unique: true, trim: true },

    passTryNumber:{ type: Number, default: 0 },
    code        : { type: String, default: '' },
    verified    : { type: Boolean, default: false },

    grids       : [{ type : mongoose.Schema.ObjectId, ref: 'grid' }],

    createdOn   : { type: Date,   default: Date.now }
});

var User = mongoose.model('user', schemaUser);



function getUserByUsernameSimple(uname){
    return User.findOne({username:uname},{_id:1, username:1, firstname:1, lastname:1, email:1}).execAsync();
}

function getUserByUsername(uname){
    return User.findOne({username:uname}).exec(); // exec?
}

function getUserById(id, callback){
    return User.findById(id, callback).execAsync();
}

function getUserGrids(uname){
    return User.findOne({username:uname}).populate('grids').execAsync();
}


function getUsers(){
    return User.find({},{_id:1, username:1, firstname:1, lastname:1}).execAsync();
}

function saveUser(user){
    return User(user).saveAsync();
}

function putNewGrid(grid){
    return User.findByIdAndUpdate(
        grid.userId,
        { $push: { grids: grid._id }},
        { safe: true, upsert: true, new : true});
}

module.exports = {
    getUserByUsername   : getUserByUsername,
    getUserByUsernameSimple : getUserByUsernameSimple,
    getUserById         : getUserById,
    getUserGrids        : getUserGrids,
    getUsers            : getUsers,
    saveUser            : saveUser,
    putNewGrid          : putNewGrid
};