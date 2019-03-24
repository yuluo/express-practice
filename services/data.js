const jp = require( 'jsonpath' );

var tradeData = [];

var dataServices = {
    insert: function( data ) {
        let ids = jp.query( tradeData, '$.*.id' );
        if ( !ids.includes( data.id ) ) {
            tradeData.push( data );
            return true;
        }
        return false;
    },

    getAll: function() {
        tradeData.sort( this._ascending );
        return tradeData;
    },

    getByUserId: function( userId ) {
        let query = '$[?(@.user.id==' + userId + ')]';
        let data = jp.query( tradeData, query );
        data.sort( this._ascending );
        return data;
    },

    getByStock: function( stock ) {
        let query = '$[?(@.symbol=="' + stock + '")]';
        let data = jp.query( tradeData, query );
        data.sort( this._ascending );
        return data;
    },

    deleteAll: function() {
        tradeData = [];
        return true;
    },

    _ascending: function(a, b) {
        return a.id - b.id;
    }
};


module.exports = dataServices;