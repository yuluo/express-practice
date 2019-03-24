const chai = require( 'chai' );
const expect = chai.expect;
const dataService = require( '../services/data' );
const dataTemplate = require( './mock/data-template.json' );

describe( 'unit test for data service', function() {
    var data = {};

    beforeEach( function() {
        dataService.deleteAll();
        dataService.insert( dataTemplate );
        data = JSON.parse( JSON.stringify( dataTemplate ) );
    } );

    it( 'should reject trade with same id', function() {
        let result = dataService.insert( data );

        expect( result ).to.equal( false );
    } );

    it( 'should accept trade with different id', function() {
        data.id = 2;
        let result = dataService.insert( data );

        expect( result ).to.equal( true );
    } );

    it( 'should retrive all the trade', function() {
        let result = dataService.getAll();

        expect( result.length ).to.equal( 1 );
    } );

    it( 'should return trade in ascending order of the data', function() {
        data.id = 2;
        dataService.insert( data );
        let result = dataService.getAll();

        expect( result[ 0 ].id ).to.equal( 1 );
        expect( result[ 1 ].id ).to.equal( 2 );
    } );

    it( 'should filter by userid', function() {
        data.user.id = 2;
        data.id = 2;
        dataService.insert( data );
        let result = dataService.getByUserId( 1 );

        expect( result[ 0 ].user.id ).to.equal( 1 );
    } );

    it( 'should filter by stock symbol', function() {
        data.id = 2;
        data.symbol = 'AD'
        dataService.insert( data );
        let result = dataService.getByStock( 'AC' );

        expect( result[ 0 ].symbol ).to.equal( 'AC' );
    } );

    it( 'should delete all the trade', function() {
        dataService.deleteAll();
        let result = dataService.getAll();

        expect( result.length ).to.equal( 0 );
    } );

} );