(function(window)
{
function Entry( container )
{
var _this = this;

    // possible numbers //
var possibleNumbers = document.createElement( 'div' );

possibleNumbers.className = 'possibleNumbers';


    // input entry //
var input = document.createElement( 'input' );

input.type = 'number';
input.min = 1;
input.max = 9;
input.className = 'EntryInput';
input.addEventListener( 'focus', function( event )
    {
    _this.savePreviousValue( event );

    Sudoku.removeErrorsHighlight();
    }, false );
input.addEventListener( 'blur', function( event )
    {
    _this.validateInput( event );

    Sudoku.removeErrorsHighlight();

    if ( Sudoku.checkIfFinished() )
        {
        HighScore.add( Sudoku.getCurrentMapDifficulty(), Timer.getTime() );

        window.alert( 'You win!' );
        Sudoku.openMap( Menu.getDifficulty() );
        }

    }, false );
input.addEventListener( 'keydown', function( event )
    {
    var keyCode = event.keyCode;
    var character = String.fromCharCode( keyCode );

        // be able to use the functions keys (like f5 to refresh)
    if ( keyCode >= Utilities.KEY_CODE.f1 && keyCode <= Utilities.KEY_CODE.f12 )
        {
        return;
        }

   if ( keyCode >= Utilities.KEY_CODE[ '1' ] && keyCode <= Utilities.KEY_CODE[ '9' ] )
        {
        if ( event.altKey )
            {
            input.value = '';

            if ( possibleNumbers.innerHTML.length > 4 )
                {
                possibleNumbers.innerHTML = '';
                }

            var currentText = possibleNumbers.innerHTML;

            if ( currentText.indexOf( character ) >= 0 )
                {
                possibleNumbers.innerHTML = currentText.replace( character, '' );
                }

            else
                {
                possibleNumbers.innerHTML = currentText + character;
                }
            }

        else
            {
            possibleNumbers.innerHTML = '';
            input.value = character;
            }

        }

    event.stopPropagation();
    event.preventDefault();
    return false;

    }, false );

container.appendChild( input );
container.appendChild( possibleNumbers );

this.previous_value = '';
this.input = input;
this.possible_numbers = possibleNumbers;
this.container = container;
this.is_read_only = false;
}

/*
    Returns a integer (or NaN)
 */

Entry.prototype.getValue = function()
{
return parseInt( this.input.value, 10 );
};


Entry.prototype.setValue = function( value )
{
this.input.value = value;
};



Entry.prototype.setReadOnly = function( yesNo )
{
if ( yesNo === true )
    {
    this.input.classList.add( 'givenDigits' );
    this.input.setAttribute( 'readonly', 'readonly' );
    this.is_read_only = true;
    }

else
    {
    this.input.classList.remove( 'givenDigits' );
    this.input.removeAttribute( 'readonly' );
    this.is_read_only = false;
    }
};


Entry.prototype.isReadOnly = function()
{
return this.is_read_only;
};


Entry.prototype.savePreviousValue = function( event )
{
this.previous_value = this.input.value;
};



Entry.prototype.validateInput = function( event )
{
var value = parseInt( this.input.value, 10 );

if ( !_.isNaN( value ) )
    {
    if ( value >= 1 && value <= 9 )
        {
        return true;
        }

    else
        {
        this.input.value = this.previous_value;
        }
    }

else
    {
    this.input.value = '';
    }

return false;
};


Entry.prototype.reset = function()
{
this.setReadOnly( false );
this.input.value = '';
this.previous_value = '';
};


Entry.prototype.setValid = function( yesNo )
{
if ( yesNo === false )
    {
    this.container.classList.add( 'errorValue' );
    this.input.classList.add( 'errorValue' );
    }

else
    {
    this.container.classList.remove( 'errorValue' );
    this.input.classList.remove( 'errorValue' );
    }
};


window.Entry = Entry;

}(window));