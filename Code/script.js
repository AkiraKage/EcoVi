const images = ['./Img/bottle.png','./Img/box.png','./Img/plastic bottle.png','./Img/garbage_black.png']

const matrix = [];
for (let i = 0; i < 5; i++) {
    matrix.push([]);
    for (let j = 0; j < 5; j++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 4);
        } while (
            (i >= 2 && matrix[i - 1][j] == randomIndex && matrix[i - 2][j] == randomIndex) ||
            (j >= 2 && matrix[i][j - 1] == randomIndex && matrix[i][j - 2] == randomIndex)
        )
        matrix[i].push(randomIndex);
    }
}

let col = matrix.length
document.getElementById("contenitore").style.gridTemplateColumns = `repeat(${col}, 1fr)`
for (let i = 0; i < col; i++) {
    for(let j = 0; j < col; j++){
        document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
    }
}

 
let icons = document.getElementsByClassName('cell')
for(let i = 0; i < icons.length; i++){
        icons[i].addEventListener("click", (e) => {
            const clickedicon = e.currentTarget;
            const row = clickedicon.getAttribute('i');
            const col = clickedicon.getAttribute('j');
            console.log(row, col);           
    })
}

