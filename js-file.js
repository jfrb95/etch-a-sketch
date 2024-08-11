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
    const rainbowButton = document.querySelector("#rainbow-button");
    const shaderButton = document.querySelector("#shader-button");
    const defaultButton = document.querySelector("#default-button");
    
    let rainbow = false;
    let shader = false;
    
    let red = 0;
    let green = 0;
    let blue = 0;
    let opacity = 100;

    let numberOfSquaresInRow = 16;

    function initializeButtons() {
        initializeResetButton()
        initializeRainbowButton()
        initializeShaderButton()
        initializeDefaultButton()
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
            if (rainbow) {
                red = Math.floor(Math.random() * 255);
                green = Math.floor(Math.random() * 255);
                blue = Math.floor(Math.random() * 255);
            } else if (shader) {
                const tempOpacity = Number(event.target.style.opacity);
                opacity = (tempOpacity + 10 / 100);
                color = event.target.style.background;
                if (event.target.style.background !== "rgb(0, 0, 0)") {
                    opacity = 0.1;
                }
            }

            event.target.style.background = `rgb(${red}, ${green}, ${blue})`;
            event.target.style.opacity = opacity;
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
    function initializeResetButton() {
        resetButton.addEventListener("click", resetGrid);
    }
    function initializeRainbowButton() {
        rainbowButton.addEventListener("click", () => {
            shader = false;
            rainbow = true;
            opacity = 100;
        });
    }
    function initializeShaderButton() {
        shaderButton.addEventListener("click", () => {
            rainbow = false;
            shader = true;
            red = 0;
            green = 0;
            blue = 0;
        });
    }
    function initializeDefaultButton() {
        defaultButton.addEventListener("click", () => {
            rainbow = false;
            shader = false;
            red = 0;
            green = 0;
            blue = 0;
            opacity = 100;
        })
    }
    
    //page setup
    createGridIn(gridContainer);
    initializeButtons();

    return {
        //anything defined here is usable outside of GLOBAL

    }
}());