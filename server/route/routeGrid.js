
var express     = require('express'),
    router      = express.Router(),

    color       = require('colors'),

    gridProvider= require('../model/modelGrid'),
    sortProvider= require('../model/modelPlantSort'),
    typeProvider= require('../model/modelPlantType'),
    userProvider= require('../model/modelUser'),

    sorts       = require('../../webapp/data/sorts.json'),
    types       = require('../../webapp/data/types.json'),

    util        = require('../util/getUser');

router.get('/s', function(req, res) {
    var token   = req.headers['authorization'].split(" ")[1];

    util.getUser(token, test);
    function test(response, success){
        if(success) {
            userProvider.getUserGrids(response).then(function(user){
                if(user.grids.length>0){
                    gridProvider.getOne(user.grids[0]._id).then(function(grid){
                        user.grids[0] = grid;
                        res.json(user.grids)
                    });
                } else {
                    res.json([])
                }
            });
        } else {
            res.send(response);
        }
    }
});

router.get('/:gridId', function(req, res) {
    gridProvider.getOne(req.params.gridId)
        .then(function(grid){
            res.json(grid);
        });
});

router.post('/', function(req, res) {

    req.checkBody('gridName').notEmpty().isLength({min:4});
    req.checkBody('gridType').notEmpty();
    req.checkBody('gridWidth').notEmpty();
    req.checkBody('userId').notEmpty().isLength({min:6});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {

        switch (req.body.gridType) {
            case 0 : req.body.gridType = 'basta'; break;
            case 1 : req.body.gridType = 'njiva'; break;
            case 2 : req.body.gridType = 'vocnjak';
        }

        gridProvider.createGrid(req.body).then(function(grid){
            userProvider.putNewGrid(grid).then(function(){
                res.send(grid);
            });
        }).catch(function(err){
            if (err.code == 11000) {
                console.log(' duplicate grid name '.bgRed);
                if (err.message.indexOf('gridName') != -1) {
                    console.log(' name '.bgCyan);
                    res.json({
                        success : false,
                        message  : 'Mapa sa imenom \'' + req.body.gridName + '\' ve\u0107 postoji.'
                    });
                }
            } else {
                console.log(err);
                res.json({
                    success : false,
                    message  : 'register catch else',
                    error   : err
                });
            }
        });
    }
});

router.post('/init', function(req, res) {
    typeProvider.insertTypes(types);
    sortProvider.insertSorts(sorts);
    res.send('success');
});


module.exports = router;