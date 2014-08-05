/*
    - underscorejs : 1.6
 */

window.onload = function()
{
Grid.init();
Menu.init();

generateMap();
};

var ERRORS_HIGHLIGHTED = false;


/*
    Checks if there's any mistake so far, and highlights the entries with mistakes

    To be valid, each column/line/sub-grid has to have only of of the digits
 */

function isValidSoFar()
{
var size = 9;
var isValid = true;

    // will be used to tell if there's a repeating digit
    // key is the digit (number 1-9)
    // value is a Entry reference to the previous found
var digitsFound = {};
var column = 0;
var line = 0;
var entry;
var value;

    // check the columns
for (column = 0 ; column < size ; column++)
    {
        // need to reset it for every check
    digitsFound = {};

    for (line = 0 ; line < size ; line++)
        {
        entry = Grid.getEntry( column, line );
        value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                    // mark the previous entry as well
                digitsFound[ value ].setValid( false );
                entry.setValid( false );

                isValid = false;
                }

            digitsFound[ value ] = entry;
            }
        }
    }


    // check the lines
for (line = 0 ; line < size ; line++)
    {
    digitsFound = {};

    for (column = 0 ; column < size ; column++)
        {
        entry = Grid.getEntry( column, line );
        value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                digitsFound[ value ].setValid( false );
                entry.setValid( false );

                isValid = false;
                }

            digitsFound[ value ] = entry;
            }
        }
    }


    // check the sub-grids
var getNextSubGrid = Grid.getSubGrids();

var subGrid = getNextSubGrid();

while( subGrid !== null )
    {
    digitsFound = {};

    for (var a = 0 ; a < subGrid.length ; a++)
        {
        entry = subGrid[ a ];
        value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                digitsFound[ value ].setValid( false );
                entry.setValid( false );

                isValid = false;
                }

            digitsFound[ value ] = entry;
            }
        }

    subGrid = getNextSubGrid();
    }


if ( !isValid )
    {
    ERRORS_HIGHLIGHTED = true;
    }

return isValid;
}


function removeErrorsHighlight()
{
if ( !ERRORS_HIGHLIGHTED )
    {
    return;
    }

var size = Grid.getSize();

for (var line = 0 ; line < size ; line++)
    {
    for (var column = 0 ; column < size ; column++)
        {
        var entry = Grid.getEntry( column, line );

        entry.setValid( true );
        }
    }

ERRORS_HIGHLIGHTED = false;
}


function clearMap()
{
Grid.clear();
}

/*
    Difference between clearMap and resetMap is that resetMap will keep the initial given digits
 */

function resetMap()
{
Grid.reset();
}



function generateMap()
{
clearMap();

var size = Grid.getSize();
var positions = [];

for (var line = 0 ; line < size ; line++)
    {
    for (var column = 0 ; column < size ; column++)
        {
        positions.push({
                column: column,
                line: line
            });
        }
    }

var howMany = 5;
var selectedPositions = severalRandomInts( 0, positions.length - 1, howMany );
var grid = Grid.getGridValue();

for (var a = 0 ; a < howMany ; a++)
    {
    var position = positions[ selectedPositions[ a ] ];
    var validDigits = getValidDigits( grid, position.column, position.line );

    var index = getRandomInt( 0, validDigits.length - 1 );
    var digit = validDigits[ index ];

    Grid.setValue( position.column, position.line, digit, true );
    }

    // check if its valid
var gridCopy = deepClone( grid );
var solver = new Solver( gridCopy );

var isValid = solver.solve();   //HERE if its not valid, need to try again

console.log( 'Is valid?', isValid );
}


function solveMap()
{
var size = Grid.getSize();

var solver = new Solver( Grid.getGridValue() );

var isSolvable = solver.solve();

console.log( 'is solvable?', isSolvable );

for (var line = 0 ; line < size ; line++)
    {
    for (var column = 0 ; column < size ; column++)
        {
        Grid.setValue( column, line, solver.grid[ line ][ column ] );
        }
    }
}


function getValidDigits( grid, refColumn, refLine )
{
var size = 9;
var digits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    // check the column
for (var line = 0 ; line < size ; line++)
    {
    var value = grid[ line ][ refColumn ];

    var index = digits.indexOf( value );

    if ( index >= 0 )
        {
        digits.splice( index, 1 );
        }
    }

    // check the line
for (var column = 0 ; column < size ; column++)
    {
    var value = grid[ refLine ][ column ];

    var index = digits.indexOf( value );

    if ( index >= 0 )
        {
        digits.splice( index, 1 );
        }
    }

    // check the sub-grid
var startColumn = refColumn - refColumn % 3;
var startLine = refLine - refLine % 3;
var subGridSize = 3;
var endColumn = startColumn + subGridSize;
var endLine = startLine + subGridSize;

for (var line = startLine ; line < endLine ; line++)
    {
    for (var column = startColumn ; column < endColumn ; column++)
        {
        var value = grid[ line ][ column ];

        var index = digits.indexOf( value );

        if ( index >= 0 )
            {
            digits.splice( index, 1 );
            }
        }
    }

return digits;
}