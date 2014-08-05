(function(window)
{
function Menu()
{

}

Menu.init = function()
{
var container = document.querySelector( '#Menu' );

    // new map
var newMap = container.querySelector( '#Menu-newMap' );

newMap.onclick = function()
    {
    generateMap();
    };

    // reset map
var resetMap = container.querySelector( '#Menu-resetMap' );

resetMap.onclick = function()
    {
    resetMap();
    };


    // validate map
var validateMap = container.querySelector( '#Menu-validateMap' );

validateMap.onclick = function()
    {
    isValidSoFar();
    };
};


window.Menu = Menu;

}(window));