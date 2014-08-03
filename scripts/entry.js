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
}


window.Entry = Entry;

}(window));