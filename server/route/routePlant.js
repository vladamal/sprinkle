
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors'),

    plantProvider= require('../model/modelPlant'),
    gridProvider= require('../model/modelGrid'),
    plants      = require('../../webapp/data/categories.json');

router.get('/s', function(req, res) {
    plantProvider.getPlants()
        .then(function(plants){
            res.json(plants);
        });
});

router.post('/drop', function(req, res) {
    res.send(plantProvider.clearPlants());
});
router.post('/init', function(req, res) {
    var plantsDB = plantProvider.insertPlants(plants);
    gridProvider.injectPlants(plantsDB);
    res.json(plantsDB);
});

router.post('/', function(req, res) {

    req.checkBody('icon').notEmpty().isLength({min:4});
    req.checkBody('label').notEmpty().isLength({min:3});
    req.checkBody('type').notEmpty().isLength({min:4});
    req.checkBody('sort').notEmpty().isLength({min:4});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        var newPlant = req.body;
        var grid     = req.body.grid;

        delete newPlant.numberOfPlants;
        delete newPlant.grid;

        plantProvider.savePlant(newPlant).then(function(plant) {
            gridProvider.putNewPlant(plant._id, grid).then(function(test){
                res.json({
                    success: true,
                    plant: plant
                })
            });
        }).catch(function(err) {
            console.log('savePlant catch'.bgRed);
            console.log(err);
            res.json({
                success: false,
                message: err
            });
        });

    }

});

router.patch('/', function(req, res) {

    if (req.body.id) {
        plantProvider.archivePlant(req.body.id).then(
            function(data){
                res.json({ id:req.body.id, archived: true });
            },
            function(err){
                res.json(err);
            });
    } else {
        res.send('missing parameter'.bgRed);
    }
});


module.exports = router;