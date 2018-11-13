

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaPlant = mongoose.Schema({
    icon            : { type: String, required: true, trim: true },
    label           : { type: String, required: true, trim: true },

    notes           : { type: String, trim: true, default: '' },
    description     : { type: String, trim: true, default: '' },
    withdrawal      : { type: String, trim: true, default: '' },

    color           : { type: String, required: false, trim: true },
    sizeX           : { type: Number, required: true },
    sizeY           : { type: Number, required: true },
    col             : { type: Number, required: true },
    row             : { type: Number, required: true },

    //type            : { type : mongoose.Schema.ObjectId, ref: 'type' },
    sort            : { type : mongoose.Schema.ObjectId, ref: 'sort' },

    datePlanting    : { type: Date,   default: Date.now },
    logSprinkle     : { type: Array,   default: [] },

    archived        : { type: Boolean, default: false }
});

var Plant = mongoose.model('plant', schemaPlant);

function savePlant(plant){
    return Plant(plant).saveAsync();
}
function archivePlant(id){
    return Plant.updateAsync(
        { _id: (id) },
        { $set: { archived: true } })

        .catch(function (err) {
            console.log(' [modelPlant] ERROR '.bgRed);
            console.log(err);
        });
}
function clearPlants(){
    Plant.find({}, function(err, docs) {
            if (err) {
                console.log(err)
                return err;
            } else {
                for (var i=0; i<docs.length; i++) {
                    docs[i].remove();
                }
            }
        }
    );
}
function insertPlants(plants){
    var docs = [];
    for (var i=0; i<plants.length; i++) {
        Plant(plants[i]).saveAsync()
            .then(function(doc) {
                docs.push(doc);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    return docs;
}
function getPlants(){
    return Plant.find({ "archived":false }).sort({type:1});
}

module.exports = {
    getPlants   : getPlants,
    clearPlants : clearPlants,
    insertPlants: insertPlants,

    savePlant   : savePlant,
    archivePlant: archivePlant
};