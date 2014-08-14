(function(window)
{
function Sudoku()
{

}

var ERRORS_HIGHLIGHTED = false;
var PUZZLES = {};

Sudoku.initPuzzles = function()
{
var difficulties = [ 'easy', 'medium', 'hard' ];

for (var a = 0 ; a < difficulties.length ; a++)
    {
    var difficulty = difficulties[ a ];
    var puzzles = G.PRELOAD.getResult( difficulty );

    PUZZLES[ difficulty ] = puzzles.split( '\n' );
    }
};


/*
    Checks if there's any mistake so far, and highlights the entries with mistakes

    To be valid, each column/line/sub-grid has to have only of of the digits
 */

Sudoku.isValidSoFar = function()
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
};


Sudoku.removeErrorsHighlight = function()
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
};


function clearMap()
{
Sudoku.removeErrorsHighlight();
Grid.clear();
}

/*
    Difference between clearMap and resetMap is that resetMap will keep the initial given digits
 */

Sudoku.resetMap = function()
{
Sudoku.removeErrorsHighlight();
Grid.reset();
};


Sudoku.openMap = function( difficulty )
{
clearMap();
Menu.showMessage( 'New map (' + difficulty + ')' );

var puzzles = PUZZLES[ difficulty ];

var index = getRandomInt( 0, puzzles.length - 1 );

var map = puzzles[ index ];


var isValid = Solver.isValid( map );

if ( isValid === false )
    {
    console.log( 'Not solvable.' );
    }

else
    {
    console.log( 'Solvable.' );
    }

for (var a = 0 ; a < map.length ; a++)
    {
    var digit = parseInt( map[ a ], 10 );

    if ( !_.isNaN( digit ) )
        {
        var line = Math.floor( a / 9 );
        var column = a % 9;

        Grid.setValue( column, line, digit, true );
        }
    }
};



Sudoku.solveMap = function()
{
var result = Solver.solve( Grid.getGridString() );

if ( result.length === 0 )
    {
    Menu.showMessage( 'Not solvable.' );
    return;
    }

var solution = result[ 0 ];

for (var a = 0 ; a < solution.length ; a++)
    {
    var digit = parseInt( solution[ a ], 10 );

    if ( !_.isNaN( digit ) )
        {
       var line = Math.floor( a / 9 );
        var column = a % 9;

        Grid.setValue( column, line, digit );
        }
    }


Menu.showMessage( 'Solved.' );
};


Sudoku.isMapSolvable = function()
{
var isValid = Solver.isValid( Grid.getGridString() );

if ( isValid === false )
    {
    return false;
    }

else
    {
    return true;
    }
};



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



window.Sudoku = Sudoku;

}(window));