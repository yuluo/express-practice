var utils = {
    fillterByStart: function( data, start ) {
        let startDate = new Date( start + ' 00:00:00' );
        return data.filter( function( item ) {
            let timestamp = new Date( item.timestamp );
            return timestamp >= startDate;
        } );
    },
    
    filterByEnd: function( data, end ) {
        let endDate = new Date( end + ' 23:59:59' );
        return data.filter( function( item ) {
            let timestamp = new Date( item.timestamp );            
            return timestamp <= endDate;
        } );
    }
};

module.exports = utils;