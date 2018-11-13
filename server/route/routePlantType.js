
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors'),

    typeProvider= require('../model/modelPlantType');


router.post('/', function(req, res) {

    req.checkBody('name').notEmpty().isLength({min:4});
    //req.checkBody('icon').notEmpty().isLength({min:4});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        typeProvider.saveType(req.body)
            .then(function(type) {
                res.json(type);
            })
            .catch(function(err) {
                console.log(err);
                if (err.code == 11000) {
                    console.log(' duplicate type name '.bgRed);
                    if (err.message.indexOf('name') != -1) {
                        console.log(' type name '.bgCyan);
                        res.json({
                            success: false,
                            message: 'Vocka sa imenom \'' + req.body.name + '\' ve\u0107 postoji.'
                        });
                    }
                }
            });
    }

});
router.get('/s', function(req, res){
    typeProvider.getTypes()
        .then(function(data){
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
});
router.get('/:id/sorts', function(req, res){
    typeProvider.getSorts(req.params.id)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = router;