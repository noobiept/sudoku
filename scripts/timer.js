(function(window)
{
function Timer()
{

}

var TIME_PASSED = 0;
var INTERVAL_F = null;
var HTML_ELEMENT = null;


Timer.init = function()
{
HTML_ELEMENT = document.querySelector( '#Menu-timer' );
HTML_ELEMENT.innerHTML = Timer.toString();
};


Timer.start = function()
{
var interval = 1000;

INTERVAL_F = window.setInterval( function()
    {
    TIME_PASSED += interval;

    HTML_ELEMENT.innerHTML = Timer.toString();

    }, interval );
};

Timer.restart = function()
{
if ( INTERVAL_F )
    {
    window.clearInterval( INTERVAL_F );
    INTERVAL_F = null;
    }

TIME_PASSED = 0;
HTML_ELEMENT.innerHTML = Timer.toString();

Timer.start();
};


Timer.toString = function()
{
return Utilities.timeToString( TIME_PASSED );
};

/*
    Returns the time it has passed so far, in seconds.
 */

Timer.getTime = function()
{
return TIME_PASSED / 1000;
};


window.Timer = Timer;

}(window));