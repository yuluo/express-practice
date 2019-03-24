var express = require('express');
var router = express.Router();
const dataServices = require('../services/data');
const jp = require( 'jsonpath' );
const utils = require( '../services/utils' );

var errorMessage = 'There are no trades in the given date range';
// Routes related to stocks
router.get('/:stockSymbol/trades', function(req, res, next) {
    let data = dataServices.getByStock( req.params.stockSymbol );
    if ( data.length === 0 ) {
        res.status( 404 ).send( { "message": errorMessage } );
    } else {
        if ( req.query.type ) {
            data = data.filter( function( item ) {
                return item.type === req.query.type;
            } );
        }

        if ( req.query.start ) {
            data = utils.fillterByStart( data, req.query.start );
        }

        if ( req.query.end ) {
            data = utils.filterByEnd( data, req.query.end );
        }

        res.status( 200 ).send( data );
    }
} );

router.get('/:stockSymbol/price', function(req, res, next) {
    let data = dataServices.getByStock( req.params.stockSymbol );
    if ( data.length === 0 ) {
        res.status( 404 ).send( { "message": errorMessage } );
    } else {
        if ( req.query.start ) {
            data = utils.fillterByStart( data, req.query.start );
        }

        if ( req.query.end) {
            data = utils.filterByEnd( data, req.query.end );
        }

        let prices = jp.query( data, '$..price' );
        let max = Math.max.apply( null, prices );
        let min = Math.min.apply( null, prices );
        let stock = {
            "symbol": req.params.stockSymbol,
            "highest": max,
            "lowest": min
        };

        res.status( 200 ).send( stock );
    }
});

module.exports = router;