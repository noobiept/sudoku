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
HighScore.updateTable();
};


/*
    Update the html table, with the current high-scores
 */

HighScore.updateTable = function()
{
var table = document.querySelector( '#HighScore' );

    // clear the previous scores
var previousRows = table.querySelectorAll( 'tr:not(#HighScore-header)' );
var a;
var difficulties = [ 'easy', 'medium', 'hard' ];

for (a = 0 ; a < previousRows.length ; a++)
    {
    table.removeChild( previousRows[ a ] );
    }

    // create the new rows, with the updated scores
for (a = 0 ; a < SAVE_LIMIT ; a++)
    {
    var row = document.createElement( 'tr' );

    for (var b = 0 ; b < difficulties.length ; b++)
        {
        var difficulty = difficulties[ b ];

        var td = document.createElement( 'td' );

        if ( typeof HIGH_SCORE[ difficulty ] !== 'undefined' &&
             typeof HIGH_SCORE[ difficulty ][ a ] !== 'undefined' )
            {
            td.innerHTML = HIGH_SCORE[ difficulty ][ a ] + 's';
            }

        else
            {
            td.innerHTML = '-';
            }


        row.appendChild( td );
        }

    table.appendChild( row );
    }
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