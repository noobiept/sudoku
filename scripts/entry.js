(function(window)
{
function Entry( container )
{
var _this = this;
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

container.appendChild( input );

this.previous_value = '';
this.input = input;
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