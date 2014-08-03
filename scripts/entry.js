(function(window)
{
function Entry( container )
{
var input = document.createElement( 'input' );

input.type = 'number';
input.min = 1;
input.max = 9;
input.className = 'EntryInput';

container.appendChild( input );

this.input = input;
}

/*
    Returns a integer (or NaN)
 */

Entry.prototype.getValue = function()
{
return parseInt( this.input.value, 10 );
};


window.Entry = Entry;

}(window));