/*
    - underscorejs : 1.6
    - sudoku solver : http://attractivechaos.github.io/plb/kudoku.html
 */

var G = {
    PRELOAD: null
};

window.onload = function()
{
var manifest = [
        { id: 'easy', src: 'maps/easy.txt' },
        { id: 'medium', src: 'maps/medium.txt' },
        { id: 'hard', src: 'maps/hard.txt' }
    ];

G.PRELOAD = new createjs.LoadQueue();

G.PRELOAD.on( 'complete', function()
    {
    Grid.init();
    Solver.init();
    Menu.init();
    Timer.init();

    Sudoku.initPuzzles();
    Sudoku.openMap( 'easy' );
    Timer.start();
    });
G.PRELOAD.loadManifest( manifest, true );
};

