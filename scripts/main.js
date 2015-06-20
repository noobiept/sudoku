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

