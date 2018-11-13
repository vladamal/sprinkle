

var mongoose = require('mongoose'),
    Promise  = require('bluebird');

Promise.promisifyAll(mongoose);

var schemaPlantType = mongoose.Schema({
    name            : { type: String, required: true, unique: true, trim: true },
    icon            : { type: String, trim: true },

    sorts           : [{ type : mongoose.Schema.ObjectId, ref: 'sort' }]
});

var PlantType = mongoose.model('type', schemaPlantType);

function saveType(type){
    return PlantType(type).saveAsync();
}

function getTypes(){
    return PlantType.find().execAsync();
}

function getSorts(id){
    return PlantType.findOne({_id:id}).populate('sorts').execAsync();
}

function insertTypes(types){
    var docs = [];
    for (var i=0; i<types.length; i++) {
       PlantType(types[i]).saveAsync()
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
    getTypes        : getTypes,
    getSorts        : getSorts,
    saveType        : saveType,
    insertTypes     : insertTypes
};