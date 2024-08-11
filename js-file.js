//This function is immediately invoked and stored in the GLOBAL object
//This means we can have private variables due to closure.
//Using a return statement with this technique means that we can
// specify some variables to be usable outside of the function
// by typing GLOBAL.variable. This avoids the danger of other apps
// changing variables.
const GLOBAL = (function() {
    const gridContainer = document.querySelector("#squares-container");
    let numberOfSquaresInRow = 16;


    function createSquare(container) {
        const square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
    }

    function createRow(container) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let i = 0; i < numberOfSquaresInRow; i += 1) {
            createSquare(row);
        }

        container.appendChild(row);
    }

    function createGrid(container) {
        for (let i = 0; i < numberOfSquaresInRow; i+=1) {
            createRow(container);
        }
    }
    
    createGrid(gridContainer)

    return {
        //variables defined here are usable outside of the GLOBAL variable

    }
}());