const board = document.querySelector("#board");
const slider = document.querySelector("#slider");
const label = document.querySelector("label");
const resetBtn = document.querySelector("#reset");
const rainbowBtn = document.querySelector("#rainbow");
const shadeBtn = document.querySelector("#shade");
let color = "#000"
let size = 4;

function createGrid(val) {
    board.style.gridTemplateColumns = `repeat(${val}, 1fr)`
    board.style.gridTemplateRows = `repeat(${val}, 1fr)`

    for (let i = 1; i <= val * val; i++) {
        const div = document.createElement("div");
        div.classList.add("sqr");
        board.appendChild(div);
        colorDiv(div);
    }
}

function clearGrid() {
    board.innerHTML = ""
}

function restartGrid() {
    board.style.gridTemplateColumns = `repeat(16, 1fr)`
    board.style.gridTemplateRows = `repeat(16, 1fr)`
    rainbowBtn.checked = false;
    shadeBtn.checked = false;
    color = "#000"

    for (let i = 1; i <= 16 * 16; i++) {
        const div = document.createElement("div");
        div.classList.add("sqr");
        board.appendChild(div);
        colorDiv(div);
    }
}

function getColor() {
    color = `hsl(${Math.floor(Math.random()*360)}, 75%, 50%)`
}





function colorDiv(div) {
    div.addEventListener("mouseover", (e) => {
        if(rainbowBtn.checked) {
            getColor();
            e.target.style.backgroundColor = `${color}`;
        } else if(shadeBtn.checked) {
            e.target.style.backgroundColor = `${color}`;
        } else {
            e.target.style.backgroundColor = `#000`
        }
    })
}


function updateSize(val) {
    size = val;
}

slider.addEventListener("change", (e) => {
    label.innerText =   `${e.target.value} x ${e.target.value}`;
    updateSize(e.target.value);
    clearGrid();
    createGrid(e.target.value);
})

resetBtn.addEventListener("click", () => {
    label.innerText = `16 x 16`
    slider.value = 16;
    clearGrid()
    restartGrid();
})

window.onload = e => {
    restartGrid()
}


