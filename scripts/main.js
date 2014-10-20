/*
    - underscorejs : 1.6
    - sudoku solver : http://attractivechaos.github.io/plb/kudoku.html
 */

var G = {
    PRELOAD: null
};

var BASE_URL = '';

window.onload = function()
{
var manifest = [
        { id: 'easy', src: BASE_URL + 'maps/easy.txt' },
        { id: 'medium', src: BASE_URL + 'maps/medium.txt' },
        { id: 'hard', src: BASE_URL + 'maps/hard.txt' }
    ];

G.PRELOAD = new createjs.LoadQueue();

G.PRELOAD.on( 'complete', function()
    {
    Grid.init();
    Solver.init();
    HighScore.load();
    HighScore.updateTable();
    Menu.init();
    Timer.init();

    Sudoku.initPuzzles();
    Sudoku.openMap( Menu.getDifficulty() );
    Timer.start();
    });
G.PRELOAD.loadManifest( manifest, true );
};

