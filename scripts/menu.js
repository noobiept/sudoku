(function(window)
{
function Menu()
{

}

var MESSAGE = null;
var MESSAGE_F = null;
var DIFFICULTY_ELEMENT = null;  // the selected element


Menu.init = function()
{
var container = document.querySelector( '#Menu' );

    // new map
var newMap = container.querySelector( '#Menu-newMap' );

newMap.onclick = function()
    {
    Timer.restart();
    Sudoku.openMap( Menu.getDifficulty() );
    };


var selectDifficulty = function( event )
    {
    if ( DIFFICULTY_ELEMENT !== null )
        {
        DIFFICULTY_ELEMENT.classList.remove( 'Menu-difficultySelected' );
        }

    DIFFICULTY_ELEMENT = event.target;
    DIFFICULTY_ELEMENT.classList.add( 'Menu-difficultySelected' );
    };


    // difficulty selector
var difficultyElements = container.querySelectorAll( '#Menu-difficulty li' );

for (var a = 0 ; a < difficultyElements.length ; a++)
    {
    var element = difficultyElements[ a ];

    element.onclick = selectDifficulty;
    }

    // set the starting difficulty (easy)
DIFFICULTY_ELEMENT = difficultyElements[ 0 ];
DIFFICULTY_ELEMENT.classList.add( 'Menu-difficultySelected' );


    // reset map
var resetMap = container.querySelector( '#Menu-resetMap' );

resetMap.onclick = function()
    {
    Menu.showMessage( 'Map reset.' );
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


Menu.getDifficulty = function()
{
return DIFFICULTY_ELEMENT.getAttribute( 'data-difficulty' );
};


window.Menu = Menu;

}(window));