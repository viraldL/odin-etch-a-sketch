const board = document.querySelector("#board")
const slider = document.querySelector("#slider");
const label = document.querySelector("label");
let size = 4;

function createGrid(val) {
    board.style.gridTemplateColumns = `repeat(${val}, 1fr)`
    board.style.gridTemplateRows = `repeat(${val}, 1fr)`

    for (let i = 1; i <= val * val; i++) {
        const div = document.createElement("div");
        div.classList.add("sqr");
        board.appendChild(div);
    }
}

function clearGrid() {
    board.innerHTML = ""
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


