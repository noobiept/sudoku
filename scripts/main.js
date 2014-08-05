/*
    - underscorejs : 1.6
 */

window.onload = function()
{
Grid.init();
Menu.init();

generateMap();
};


/*
    Checks if there's any mistake so far

    To be valid, each column/line/sub-grid has to have only of of the digits
 */

function isValidSoFar()
{
var size = 9;

    // check the columns
for (var column = 0 ; column < size ; column++)
    {
    var digitsFound = {};

    for (var line = 0 ; line < size ; line++)
        {
        var entry = Grid.getEntry( column, line );
        var value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                return false;
                }

            digitsFound[ value ] = true;
            }
        }
    }


    // check the lines
for (var line = 0 ; line < size ; line++)
    {
    var digitsFound = {};

    for (var column = 0 ; column < size ; column++)
        {
        var entry = Grid.getEntry( column, line );
        var value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                return false;
                }

            digitsFound[ value ] = true;
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
        var entry = subGrid[ a ];
        var value = entry.getValue();

        if ( !_.isNaN( value ) )
            {
            if ( digitsFound[ value ] )
                {
                return false;
                }

            digitsFound[ value ] = true;
            }
        }

    subGrid = getNextSubGrid();
    }

return true;
}

function clearMap()
{
Grid.clear();
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