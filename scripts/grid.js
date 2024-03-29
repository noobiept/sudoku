(function(window)
{
function Grid()
{

}

var GRID = [];          // grid with the entries
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

var gridContainer = document.querySelector( '#GridContainer' );
gridContainer.appendChild( container );
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

var entry = GRID[ line ][ column ];

entry.setValue( value );
entry.setReadOnly( readOnly );
};



Grid.getSize = function()
{
return GRID_SIZE;
};


/*
    format:
        a single string line, with the digits, and with empty/invalid values as a . (dot)
    example:
        '38..9...7....15...5297...3...74....3.931.654.2....37...4...7985...95....9...4..76'
 */

Grid.getGridString = function()
{
var grid = '';

for (var line = 0 ; line < GRID_SIZE ; line++)
    {
    for (var column = 0 ; column < GRID_SIZE ; column++)
        {
        var entry = GRID[ line ][ column ];
        var value = entry.getValue();

        if ( _.isNaN( value ) )
            {
            grid += '.';
            }

        else
            {
            grid += value;
            }
        }
    }

return grid;
};



Grid.clear = function()
{
for (var line = 0 ; line < GRID_SIZE ; line++)
    {
    for (var column = 0 ; column < GRID_SIZE ; column++)
        {
        var entry = GRID[ line ][ column ];

        entry.reset();
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
            entry.reset();
            }
        }
    }
};


window.Grid = Grid;

}(window));