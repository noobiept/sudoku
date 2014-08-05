(function(window)
{
function Grid()
{

}

var GRID = [];          // grid with the entries
var GRID_VALUE = [];    // grid with just the value
var GRID_SIZE = 9;

Grid.init = function()
{
var size = GRID_SIZE;
var container = document.createElement( 'table' );


for (var line = 0 ; line < size ; line++)
    {
    GRID[ line ] = [];
    GRID_VALUE[ line ] = [];
    var row = document.createElement( 'tr' );

    for (var column = 0 ; column < size ; column++)
        {
        var td = document.createElement( 'td' );

        td.id = 'td' + line + column;

        GRID[ line ][ column ] = new Entry( td );
        GRID_VALUE[ line ][ column ] = 0;

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

Grid.setValue = function( column, line, value, readOnly )
{
if ( typeof readOnly === 'undefined' )
    {
    readOnly = false;
    }

GRID_VALUE[ line ][ column ] = value;

var entry = GRID[ line ][ column ];

entry.setValue( value );
entry.setReadOnly( readOnly );
};

Grid.getValue = function( column, line )
{
return GRID_VALUE[ line ][ column ];
};



Grid.getSize = function()
{
return GRID_SIZE;
};


Grid.getGridValue = function()
{
return GRID_VALUE;
};


Grid.clear = function()
{
for (var line = 0 ; line < GRID_SIZE ; line++)
    {
    for (var column = 0 ; column < GRID_SIZE ; column++)
        {
        var entry = GRID[ line ][ column ];

        entry.reset();

        GRID_VALUE[ line ][ column ] = 0;
        }
    }
};

Grid.reset = function()
{
for (var line = 0 ; line < GRID_SIZE ; line++)
    {
    for (var column = 0 ; column < GRID_SIZE ; column++)
        {
        var entry = GRID[ line ][ column ];

        if ( !entry.isReadOnly() )
            {
            GRID_VALUE[ line ][ column ] = 0;
            entry.reset();
            }
        }
    }
};


window.Grid = Grid;

}(window));