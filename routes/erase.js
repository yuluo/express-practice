var express = require('express');
var router = express.Router();
const dataServices = require('../services/data');

// Route to delete all trades
router.delete('/', function(req, res, next) {
    dataServices.deleteAll();
    res.status( 200 ).send( {} );
} );

module.exports = router;
