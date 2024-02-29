const images = ['./Img/bottle.png','./Img/box.png','./Img/plastic bottle.png','./Img/garbage.png'];

const parsedUrl = new URL(window.location.href);
let col = parseInt(parsedUrl.searchParams.get('col'));
console.log("col: " + col);

const matrix = [];
for (let i = 0; i < col; i++) {
    matrix.push([]);
    for (let j = 0; j < col; j++) {
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


document.getElementById("contenitore").style.gridTemplateColumns = `repeat(${col}, 1fr)`
for (let i = 0; i < col; i++) {
    for(let j = 0; j < col; j++){
        document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
    }
}

let icons = document.getElementsByClassName('cell');
let i1, j1, pos1, i2, j2, pos2, click1, click2
clickcheck();

function clickcheck(){
    for(let y = 0; y < icons.length; y++){
        icons[y].addEventListener("click", () => {
            const clickedicon = icons[y];
            const i = clickedicon.getAttribute('i');
            const j = clickedicon.getAttribute('j');
            console.log(i, j);
            

            if(i1 == undefined) {
                i1 = i;
                j1 = j;
                pos1 = `${i1} ${j1}`
                click1 = y;
                clickedicon.style.backgroundColor = 'lightblue';

            } else if(i1 != undefined && i2 == undefined) {
                pos2 = `${i} ${j}`
                click2 = y;
                if(pos1 != pos2){
                    i2 = i;
                    j2 = j;
                    if((i1 == i2 && Math.abs(j1 - j2) == 1) || (j1 == j2 && Math.abs(i1 - i2) == 1)) {
                        clickedicon.style.backgroundColor = 'lightblue';
                        setTimeout(()=>{
                            swap(i1,i2,j1,j2);
                            updateGrid();
                            i1 = undefined;
                            i2 = undefined;
                            j1 = undefined;
                            j2 = undefined;
                            controllo();
                            console.log(tris)
                            tris = 0
                            
                        }, 350);
                    } else {
                        alert("no");
                        i1 = undefined;
                        i2 = undefined;
                        i2 = undefined;
                        j2 = undefined;
                        updateGrid();
                    }
                }
            }
        })
    }
}

function swap(i1,i2,j1,j2){
    let temp = matrix[i1][j1];
    matrix[i1][j1] = matrix[i2][j2];
    matrix[i2][j2] = temp;
    return matrix, i1, i2, j1, j2;
}

function updateGrid() {
    document.getElementById("contenitore").innerHTML = '';
    for (let i = 0; i < col; i++) {
        for(let j = 0; j < col; j++){
            document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
            clickcheck();
        }
    }
}
let tris =0
let quad = 0
let cinquina = 0
function controllo(){
    for (let i = 0; i<col; i++ ) {
        for (let j = 0; j<col; j++) {
            // Controlla le sequenze orizzontali
            if (j <= 2 && matrix[i][j] == matrix[i][j+1] && matrix[i][j] == matrix[i][j+2]) {

               
                   

                    
                     if(matrix[i][j+3] != undefined){
                    if(matrix[i][j+3] == matrix[i][j+2]){
                        if(matrix[i][j+3] == matrix[i][j+4]){

                    matrix[i][j] = undefined
                    matrix[i][j+1] = undefined
                    matrix[i][j+2] = undefined
                    matrix[i][j+3] = undefined
                    matrix[i][j+4] = undefined
                    cinquina += 1

                        }else{quad += 1;
                        matrix[i][j] = undefined
                        matrix[i][j+1] = undefined
                        matrix[i][j+2] = undefined
                        matrix[i][j+3] = undefined
                    }} else {
                        tris += 1;
                        matrix[i][j] = undefined
                        matrix[i][j+1] = undefined
                        matrix[i][j+2] = undefined
                    }
                } else {
                    tris += 1;
                    matrix[i][j] = undefined
                    matrix[i][j+1] = undefined
                    matrix[i][j+2] = undefined
                }
            }
            // Controlla le sequenze verticali
            if (i <= 2 && matrix[i][j] == matrix[i+1][j] && matrix[i][j] == matrix[i+2][j]) {

                 if(matrix[i+3][j] != undefined){
                    if(matrix[i+3][j] == matrix[i+2][j]){
                        if(matrix[i][j+3] == matrix[i][j+4]){

                            matrix[i][j] = undefined
                            matrix[i][j+1] = undefined
                            matrix[i][j+2] = undefined
                            matrix[i][j+3] = undefined
                            matrix[i][j+4] = undefined
                            cinquina += 1
        
                                }}else{quad += 1;
                        matrix[i][j] = undefined
                        matrix[i][j+1] = undefined
                        matrix[i][j+2] = undefined
                        matrix[i][j+3] = undefined

                    } /*else {
                        tris += 1;
                        matrix[i][j] = undefined
                        matrix[i+1][j] = undefined
                        matrix[i+2][j] = undefined
                    }  */
                } else {
                    tris += 1;
                    matrix[i][j] = undefined
                    matrix[i+1][j] = undefined
                    matrix[i+2][j] = undefined
                }
            }
        }
    }
    updateGrid()
    
    console.log(tris)
}


console.log(tris)