//This function is immediately invoked and stored in the GLOBAL object
//This means we can have private variables due to closure.
//Using a return statement with this technique means that we can
// specify some variables to be usable outside of the function
// by typing GLOBAL.variable. This avoids the danger of other apps
// changing variables.
const GLOBAL = (function() {
    const squaresContainer = document.querySelector("#squares-container");
    
    function createSquare() {
        const square = document.createElement("div");
        square.classList.add("square");
        squaresContainer.appendChild(square);
    }

    for (let i = 0; i < 16; i += 1) {

    }
    return {
        //variables defined here are usable outside of the function

    }
}());