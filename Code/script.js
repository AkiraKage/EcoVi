const images = ['./Img/bottle.png','./Img/box.png','./Img/plastic bottle.png','./Img/garbage_black.png'];

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

let icons = document.getElementsByClassName('cell');
let i1, j1, i2, j2
for(let y = 0; y < icons.length; y++){
        icons[y].addEventListener("click", () => {
            const clickedicon = icons[y];
            const i = clickedicon.getAttribute('i');
            const j = clickedicon.getAttribute('j');
            console.log(i, j);

            if(i1 == undefined) {
                i1 = i;
                j1 = j;
                console.log(i1,j1)
                clickedicon.style.backgroundColor = 'lightblue';
            } else if(i1 != i && j1 != j) {
                i2 = i;
                j2 = j;
                clickedicon.style.backgroundColor = 'lightblue';

                if((i1==i2 && j1==j2-1) || (i1==i2 && j1==j2+1) || (i1==i2-1 && j1==j2) || (i1==i2+1 && j1==j2)) {
                    swap(i1,i2,j1,j2);
                } else {
                    alert("no");
                }
            }
        })
}
function swap(i1,i2,j1,j2){
    let temp = matrix[i1][j1];
    matrix[i1][j1] = matrix[i2][j2];
    matrix[i2][j2] = temp;
    i1 = undefined;
    i2 = i1;
    j1 = i1;
    j2 = i1;
}
