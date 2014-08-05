(function(window)
{
function Menu()
{

}

Menu.init = function()
{
var container = document.querySelector( '#Menu' );

var newMap = container.querySelector( '#Menu-newMap' );

newMap.onclick = generateMap;

var validateMap = container.querySelector( '#Menu-validateMap' );

validateMap.onclick = function()
    {
    console.log( isValidSoFar() );
    };
};


window.Menu = Menu;

}(window));