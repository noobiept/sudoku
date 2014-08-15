(function(window)
{
function HighScore()
{

}

var HIGH_SCORE = {};
var SAVE_LIMIT = 5;     // how many scores to save per difficulty

HighScore.add = function( difficulty, value )
{
if ( !HIGH_SCORE[ difficulty ] )
    {
    HIGH_SCORE[ difficulty ] = [];
    }

HIGH_SCORE[ difficulty ].push( value );

    // the lower the value (which represents the time it took to finish the puzzle) the better
HIGH_SCORE[ difficulty ].sort( function( a, b )
    {
    return a - b;
    });

    // if we have more elements than the limit, remove the worse (higher) value
if ( HIGH_SCORE[ difficulty ].length > SAVE_LIMIT )
    {
    HIGH_SCORE[ difficulty ].pop();
    }

HighScore.save();
};


HighScore.get = function( difficulty )
{

};


HighScore.save = function()
{
Utilities.saveObject( 'high_score', HIGH_SCORE );
};


HighScore.load = function()
{
var scoreObj = Utilities.getObject( 'high_score' );

if ( scoreObj !== null )
    {
    HIGH_SCORE = scoreObj;
    }
};


window.HighScore = HighScore;

})(window);