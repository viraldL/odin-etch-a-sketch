const board = document.querySelector("#board");
const slider = document.querySelector("#slider");
const label = document.querySelector("label");
const resetBtn = document.querySelector("#reset");
const rainbowBtn = document.querySelector("#rainbow");
const shadeBtn = document.querySelector("#shade");
const defaultBtn = document.querySelector("#default");
const colorChanger = document.querySelector(`input[type="color"]`)
let color = "rgb(0,0,0)";
let size = 4;
let mode = "default"

function createGrid(val) {
    board.style.gridTemplateColumns = `repeat(${val}, 1fr)`
    board.style.gridTemplateRows = `repeat(${val}, 1fr)`

    for (let i = 1; i <= val * val; i++) {
        const div = document.createElement("div");
        div.classList.add("sqr");
        div.style.backgroundColor = "rgb(255, 255, 255)";
        board.appendChild(div);
        colorDiv(div);
    }
}

rainbowBtn.onclick = () => {
    mode = "rainbow";
    defaultBtn.style.opacity = "1";
    shadeBtn.style.opacity = "1";
    rainbowBtn.style.opacity = "0.5"
}
shadeBtn.onclick = () => {
    mode = "shade";
    defaultBtn.style.opacity = "1";
    shadeBtn.style.opacity = "0.5";
    rainbowBtn.style.opacity = "1"
}
defaultBtn.onclick = () => {
    mode = "default";
    defaultBtn.style.opacity = "0.5";
    shadeBtn.style.opacity = "1";
    rainbowBtn.style.opacity = "1"
}

function clearGrid() {
    board.innerHTML = ""
}

function restartGrid() {
    board.style.gridTemplateColumns = `repeat(16, 1fr)`
    board.style.gridTemplateRows = `repeat(16, 1fr)`
    rainbowBtn.checked = false;
    shadeBtn.checked = false;
    color = "rgb(0,0,0)"

    for (let i = 1; i <= 16 * 16; i++) {
        const div = document.createElement("div");
        div.classList.add("sqr");
        div.style.backgroundColor = "rgb(255, 255, 255)";
        board.appendChild(div);
        colorDiv(div);
    }
}

function shadeTheColor(div) {
    let rgb = div.style.backgroundColor;
    rgb = rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    if(r > 0){
        r-=25;
    }

    if(g > 0){
        g-=25;
    }

    if(b > 0){
        b-=25;
    }
    div.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function getColor() {
    color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
}

//sorry for that name lol
function getColor2() {
    color = colorChanger.value;
}

function colorDiv(div) {
    div.addEventListener("mouseover", (e) => {
        if(mode === "rainbow") {
            getColor();
            e.target.style.backgroundColor = `${color}`;
        } else if(mode === "shade") {
            shadeTheColor(e.target);
        } else {
            getColor2()
            e.target.style.backgroundColor = `${color}`
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
    createBg()
    fadeIn()
    setTimeout(fadeOut(), 1000);
}



//bg animation 
const bgDiv = document.querySelector(".bg"); 
function createBg() {
    for(let i = 0; i <= 60; i++) {
        let div = document.createElement("div")
        div.classList.add("bgStyle");
        bgDiv.appendChild(div);
    }
}

function fadeIn() {
    setInterval(() => {
        let selected = Math.floor(Math.random()*61);
        const selectedSqr = document.querySelector(`.bg .bgStyle:nth-child(${selected})`)
        selectedSqr.style.opacity = "0.05";
    }, 100);
}

function fadeOut() {
    setInterval(() => {
        let selected = Math.floor(Math.random()*61);
        const selectedSqr = document.querySelector(`.bg .bgStyle:nth-child(${selected})`)
        selectedSqr.style.opacity = "0";
    }, 100);
}