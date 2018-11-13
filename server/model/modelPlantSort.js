

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaPlantSort = mongoose.Schema({
    type           :  { type : mongoose.Schema.ObjectId, ref: 'type' },

    name            : { type: String, required: true, unique: true, trim: true },
    icon            : { type: String, trim: true },

    color           : { type: String, trim: true },
    taste           : { type: String, trim: true },

    //dateBlooming    : { type: Date,   default: Date.now },
    //dateHarvest     : { type: Date,   default: Date.now }

    dateBlooming    : { type: Number,   default: 1 },
    dateHarvest     : { type: Number,   default: 1 }
});

var PlantSort = mongoose.model('sort', schemaPlantSort);

function saveSort(sort){
    return PlantSort(sort).saveAsync();
}

function getSorts(){
    return PlantSort.find({});
}

function insertSorts(sorts){
    var docs = [];
    for (var i=0; i<sorts.length; i++) {
        PlantSort(sorts[i]).saveAsync()
            .then(function(doc) {
                docs.push(doc);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    return docs;
}

module.exports = {
    getSorts   : getSorts,
    saveSort   : saveSort,
    insertSorts: insertSorts
};