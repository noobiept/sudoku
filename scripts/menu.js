(function(window)
{
function Menu()
{

}

var MESSAGE = null;
var MESSAGE_F = null;


Menu.init = function()
{
var container = document.querySelector( '#Menu' );

    // new map
var newMap = container.querySelector( '#Menu-newMap' );

newMap.onclick = function()
    {
    Timer.restart();
    Sudoku.generateMap();
    };

    // reset map
var resetMap = container.querySelector( '#Menu-resetMap' );

resetMap.onclick = function()
    {
    Timer.restart();
    Sudoku.resetMap();
    };


    // validate map
var validateMap = container.querySelector( '#Menu-validateMap' );

validateMap.onclick = function()
    {
    var isValid = Sudoku.isValidSoFar();

    if ( isValid )
        {
        if ( Sudoku.isMapSolvable() )
            {
            Menu.showMessage( 'Valid so far.' );
            }

        else
            {
            Menu.showMessage( "Map isn't solvable right now." );
            }
        }

    else
        {
        Menu.showMessage( 'Invalid.' );
        }
    };

    // message
MESSAGE = container.querySelector( '#Menu-message' );
};


Menu.showMessage = function( text )
{
if ( MESSAGE_F )
    {
    window.clearTimeout( MESSAGE_F );
    MESSAGE_F = null;
    }

MESSAGE.innerHTML = text;

MESSAGE_F = window.setTimeout( function() { MESSAGE.innerHTML = ''; }, 2000 );
};


window.Menu = Menu;

}(window));