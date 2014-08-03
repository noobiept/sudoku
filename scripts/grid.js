(function(window)
{
function Grid()
{

}

var GRID = [];
var GRID_SIZE = 9;

Grid.init = function()
{
var size = GRID_SIZE;
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



Grid.getSubGrids = function()
{
var subGridSize = 3;
var startColumn = 0;
var startLine = 0;

return function()
    {
    if ( startColumn >= GRID_SIZE || startLine >= GRID_SIZE )
        {
        return null;
        }

    var entries = [];
    var endColumn = startColumn + subGridSize;
    var endLine = startLine + subGridSize;

    for (var column = startColumn ; column < endColumn ; column++)
        {
        for (var line = startLine ; line < endLine ; line++)
            {
            entries.push( GRID[ line ][ column ] );
            }
        }

        // new line
    if ( endColumn >= GRID_SIZE )
        {
        startColumn = 0;
        startLine += subGridSize;
        }

    else
        {
        startColumn += subGridSize;
        }

    return entries;
    };
};


Grid.getEntry = function( column, line )
{
return GRID[ line ][ column ];
};



window.Grid = Grid;

}(window));