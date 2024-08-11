//This function is immediately invoked and stored in the GLOBAL object
//This means we can have private variables due to closure.
//Using a return statement with this technique means that we can
// specify some variables to be usable outside of the function
// by typing GLOBAL.variable. This avoids the danger of other apps
// changing variables.
const GLOBAL = (function() {
    //anything defined here is inaccessible outside of GLOBAL
    const gridContainer = document.querySelector("#squares-container");
    const resetButton = document.querySelector("#reset-button");
    let numberOfSquaresInRow = 16;

    function initializeResetButton(button) {
        button.addEventListener("click", resetGrid);
    }
    function createSquareIn(container) {
        const square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
    }
    function createRowIn(container) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let i = 0; i < numberOfSquaresInRow; i += 1) {
            createSquareIn(row);
        }

        container.appendChild(row);
    }
    function createGridIn(container) {
        for (let i = 0; i < numberOfSquaresInRow; i+=1) {
            createRowIn(container);
        }
        addListenersTo(container);
    }

    //minor functions
    function highlightSquare(event) {
        if (event.target.classList.contains("square")) {
            event.target.classList.add("highlighted");
        }
    }
    function addListenersTo(container) {
        container.addEventListener("mouseover", highlightSquare);
    } 
    function clearGrid(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    function resetGrid() {
        numberOfSquaresInRow = getSizeInput();
        clearGrid(gridContainer);
        createGridIn(gridContainer);
    }
    function getSizeInput() {
        let num = Number(prompt("Enter the desired size between 1 and 100:", "16"));

        if (num < 1 || num > 100) {
            return getSizeInput()
        } else {
            return num
        }
    }
    
    //page setup
    createGridIn(gridContainer);
    initializeResetButton(resetButton);

    return {
        //anything defined here is usable outside of GLOBAL

    }
}());