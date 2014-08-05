(function(window)
{
function Solver( grid )
{
this.grid = grid;
this.grid_size = grid.length;
}


Solver.prototype.isValidDigit = function( refColumn, refLine, digit )
{
var grid = this.grid;
var size = this.grid_size;


    // check column
for (var line = 0 ; line < size ; line++)
    {
    var value = grid[ line ][ refColumn ];

    if ( line !== refLine && value === digit )
        {
        return false;
        }
    }

    // check line
for (var column = 0 ; column < size ; column++)
    {
    var value = grid[ refLine ][ column ];

    if ( column !== refColumn && value === digit )
        {
        return false;
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

        if ( line !== refLine && column !== refColumn && value === digit )
            {
            return false;
            }
        }
    }


return true;
};


Solver.prototype.backtrack = function( line, column )
{
column++;

if ( column >= this.grid_size )
    {
    column = 0;
    line++;

    if ( line >= this.grid_size )
        {
        return true;
        }
    }

var value = this.grid[ line ][ column ];

if ( value !== 0 )
    {
    if ( !this.isValidDigit( column, line, value ) )
        {
        return false;
        }

    return this.backtrack( line, column );
    }
else
    {
    for (var a = 1 ; a < 10 ; a++)
        {
        this.grid[ line ][ column ] = a;

        if ( this.isValidDigit( column, line, a ) )
            {
            if ( this.backtrack( line, column ) )
                {
                return true;
                }
            }
        }

    this.grid[ line ][ column ] = 0;
    return false;
    }
};



Solver.prototype.solve = function()
{
return this.backtrack( 0, -1 );
};



window.Solver = Solver;

}(window));