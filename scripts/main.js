/*
    - underscorejs : 1.6
 */

window.onload = function()
{
Grid.init();
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