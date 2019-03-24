var express = require('express');
var router = express.Router();
const dataServices = require('../services/data');

// Routes related to trades
router.post('/', function(req, res, next) {
    let success = dataServices.insert( req.body );

    if ( success ) {
        res.status( 201 ).send( req.body );
    } else {
        res.status( 400 ).send( { "error": "id exists" } );
    }
});

router.get('/', function(req, res, next) {
    let data = dataServices.getAll();
    res.status( 200 ).send( data );
});

router.get('/users/:userId', function(req, res, next) {
    let data = dataServices.getByUserId( req.params.userId );

    if ( data.length === 0 ) {
        res.status( 404 ).send( { "error": "no record found" } );
    } else {
        res.status( 200 ).send( data );
    }

} );

module.exports = router;