/*
    - underscorejs : 1.6
    - sudoku solver : http://attractivechaos.github.io/plb/kudoku.html
 */

window.onload = function()
{
Grid.init();
Solver.init();
Menu.init();
Timer.init();

Sudoku.openMap();
Timer.start();
};

