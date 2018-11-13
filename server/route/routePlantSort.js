
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors'),

    sortProvider= require('../model/modelPlantSort');


router.post('/', function(req, res) {


    console.log(req.body)

    req.checkBody('name').notEmpty().isLength({min:4});
    req.checkBody('color').notEmpty().isLength({min:4});
    req.checkBody('taste').notEmpty().isLength({min:4});
    //req.checkBody('date').notEmpty().isLength({min:4});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        sortProvider.saveSort(req.body)
            .then(function(sort) {
                res.json(sort);
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


module.exports = router;