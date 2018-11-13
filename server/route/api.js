
var express     = require('express'),
    router      = express.Router();


router.use('/user',     require('./routeUser'));
router.use('/grid',     require('./routeGrid'));
router.use('/plant',    require('./routePlant'));
router.use('/type',     require('./routePlantType'));
router.use('/sort',     require('./routePlantSort'));


module.exports = router;
