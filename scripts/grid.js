(function(window)
{
function Grid()
{

}

var GRID = [];

Grid.init = function()
{
var size = 9;
var container = document.createElement( 'table' );


for (var line = 0 ; line < size ; line++)
    {
    GRID[ line ] = [];
    var row = document.createElement( 'tr' );

    for (var column = 0 ; column < size ; column++)
        {
        var td = document.createElement( 'td' );

        td.id = 'td' + line + column;

        GRID[ line ][ column ] = new Entry( td );

        row.appendChild( td );
        }

    container.appendChild( row );
    }

document.body.appendChild( container );
};



window.Grid = Grid;

}(window));