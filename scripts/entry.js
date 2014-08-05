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
input.addEventListener( 'focus', function( event ) { _this.savePreviousValue( event ) } );
input.addEventListener( 'blur', function( event ) { _this.validateInput( event ) }, false );

container.appendChild( input );

this.previous_value = '';
this.input = input;
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
    }

else
    {
    this.input.classList.remove( 'givenDigits' );
    this.input.removeAttribute( 'readonly' );
    }
};


Entry.prototype.savePreviousValue = function( event )
{
this.previous_value = this.input.value;
};



Entry.prototype.validateInput = function( event )
{
var value = parseInt( this.input.value, 10 );

if ( _.isNumber( value ) &&
     !_.isNaN( value ) &&
     value >= 1 &&
     value <= 9 )
    {
    return true;
    }

this.input.value = this.previous_value;
return false;
};


Entry.prototype.reset = function()
{
this.input.value = '';
this.previous_value = '';
};


window.Entry = Entry;

}(window));