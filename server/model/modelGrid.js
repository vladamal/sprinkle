

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaGrid = mongoose.Schema({
    gridName    : { type: String, required: true, unique: true, trim: true, minlength: [4, 'Name of the grid must be at least 4 characters.'], maxlength: [24, 'Name of the grid must be less than 24 characters.'] },
    gridType    : { type: String, required: true, trim: true },
    gridWidth   : { type: Number, default: 0 },
    userId      : { type: String, default: '' },

    plants      : [{ type : mongoose.Schema.ObjectId, ref: 'plant' }]
});

var Grid = mongoose.model('grid', schemaGrid);


function getGridByUserId(id, callback){
    return Grid.findById(id, callback).execAsync();
}

function getGrids(userId){
    return Grid.find({userId:userId}).execAsync();
}

function getOne(gridId){
    return Grid.findById(gridId).populate('plants').execAsync();
}

function createGrid(grid){
    return Grid(grid).saveAsync();
}

function putNewPlant(plantId, gridId){
    return Grid.findByIdAndUpdate(
        gridId,
        { $push: { plants: plantId }},
        { safe: true, upsert: true, new : true});
}


function injectPlants(plants){
    Grid.find({}).execAsync().then(function(grid){
        for (var j=0; j<plants.length; j++) {
            grid[0].plants.push(plants[j]._id);
        }
        return Grid(grid[0]).saveAsync()
            .then(function(doc) {
                //console.log(doc);
            })
            .catch(function(err) {
                console.log('model grid config : catch'.bgRed);
                console.log(err);
            });
    });
}


module.exports = {
    getGridByUserId : getGridByUserId,
    getGrids        : getGrids,
    createGrid      : createGrid,
    putNewPlant     : putNewPlant,

    injectPlants    : injectPlants,
    getOne          : getOne
};