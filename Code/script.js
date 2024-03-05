const images = ['./Img/bottle.png', './Img/box.png', './Img/plastic bottle.png', './Img/garbage.png'];
const riciclo = './Img/recycle.png';
const natura = './Img/recycle.png';

const parsedUrl = new URL(window.location.href);
let col = parseInt(parsedUrl.searchParams.get('col'));
console.log("col: " + col);

let matrix;
//let storedmatrix = localStorage.getItem('matrix');
//if(storedmatrix){
//    matrix = JSON.parse(storedmatrix);
//} else {

//randomizzazione numeri nella matrice
matrix = [];
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
//}

//primo caricamento immagini
document.getElementById("contenitore").style.gridTemplateColumns = `repeat(${col}, 1fr)`
for (let i = 0; i < col; i++) {
    for (let j = 0; j < col; j++) {
        document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
    }
}

//localStorage.setItem('matrix', JSON.stringify(matrix));

let icons = document.getElementsByClassName('cell');
let i1, j1, pos1, i2, j2, pos2;
clickcheck();

function clickcheck() {
    for (let y = 0; y < icons.length; y++) {
        icons[y].addEventListener("click", () => {
            const clickedicon = icons[y];
            const i = clickedicon.getAttribute('i');
            const j = clickedicon.getAttribute('j');
            console.log(i, j);

            if (i1 == null) {
                i1 = i;
                j1 = j;
                pos1 = `${i1} ${j1}`
                clickedicon.style.backgroundColor = 'lightblue';

            } else if (i1 != null && i2 == null) {
                pos2 = `${i} ${j}`
                if (pos1 != pos2) {
                    i2 = i;
                    j2 = j;
                    if ((i1 == i2 && Math.abs(j1 - j2) == 1) || (j1 == j2 && Math.abs(i1 - i2) == 1)) {
                        clickedicon.style.backgroundColor = 'lightblue';
                        setTimeout(() => {
                            swap(i1, i2, j1, j2);
                            i1 = null;
                            i2 = null;
                            j1 = null;
                            j2 = null;
                            controllo();
                            updateGrid();
                            //localStorage.setItem('matrix', JSON.stringify(matrix));
                        }, 350);
                    } else {
                        alert("no");
                        i1 = null;
                        i2 = null;
                        i2 = null;
                        j2 = null;
                        updateGrid();
                    }
                }
            }
        })
    }
}

function swap(i1, i2, j1, j2) {
    let temp = matrix[i1][j1];
    matrix[i1][j1] = matrix[i2][j2];
    matrix[i2][j2] = temp;
    return matrix, i1, i2, j1, j2;
}

function updateGrid() {
    document.getElementById("contenitore").innerHTML = '';
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] == null) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * 4);
                } while (
                    (i >= 2 && matrix[i - 1][j] == randomIndex && matrix[i - 2][j] == randomIndex) ||
                    (i < col - 2 && matrix[i + 1][j] == randomIndex && matrix[i + 2][j] == randomIndex) ||      
                    (i >= 1 && i < col - 1 && matrix[i - 1][j] == randomIndex && matrix[i + 1][j] == randomIndex) ||              
                    (j >= 2 && matrix[i][j - 1] == randomIndex && matrix[i][j - 2] == randomIndex) ||
                    (j < col - 2 && matrix[j + 1][j] == randomIndex && matrix[j + 2][j] == randomIndex) || 
                    (j >= 1 && j < col - 1 && matrix[i][j - 1] == randomIndex && matrix[i][j + 1] == randomIndex)
                )
                matrix[i][j] = randomIndex;
            }
            controllo();
            document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
        }
        clickcheck();
    }
}

let tris = 0;
let quad = 0;
let cinquina = 0;
let points = 0
let somma4 = 0
let somma5 = 0
let somma6 = 0
let somma7 = 0
let papercount = 0
let glasscount = 0
let drycount = 0
let plasticcount = 0
let target;
let comboX;
let comboY;
let count = 0;
let totpoints = 0;


let found = false;
function controllo() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < col; j++) {
            // controllo sequenze orizzontali
            if (j >= 2 && matrix[i][j] != null && matrix[i][j] == matrix[i][j - 1] && matrix[i][j] == matrix[i][j - 2]) {
                if (j <= col - 2 && matrix[i][j + 1] == matrix[i][j]) {
                    if (j <= col - 3 && matrix[i][j + 2] == matrix[i][j]) {
                        if(matrix[i][j] == 0){
                            
                            points += 25
                            somma4 += 5
                            if(somma4>=50){
                                somma4=50
                            }
                            
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50" 
                        document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 1){
                            points += 10
                            somma5 += 5
                            if(somma5>=50){
                                somma5=50
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 2){
                            points += 15
                            somma6 += 5
                            if(somma6>=50){
                                somma6=50
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 3){
                            points += 5
                            somma7 += 5
                            if(somma7>=50){
                                somma7=50
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }
                        comboX = cinquina;
                        found = true;
                        target = matrix[i][j];
                        matrix[i][j] = null;
                        matrix[i][j - 1] = null;
                        matrix[i][j - 2] = null;
                        matrix[i][j + 1] = null;
                        matrix[i][j + 2] = null;
                    } else {
                        if(matrix[i][j] == 0){
                            points += 20
                            somma4 += 4
                            if(somma4>=50){
                                somma4=50
                            }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 1){
                            points += 8 
                            somma5 += 4
                            if(somma5>=50){
                                somma5=50
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 2){
                            points += 12
                            somma6 += 4
                            if(somma6>=50){
                                somma6=50
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 3){
                            points += 4
                            somma7 += 4
                            if(somma7>=50){
                                somma7=50
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }
                        
                        comboX = quad;
                        found = true;
                        target = matrix[i][j];
                        matrix[i][j] = null;
                        matrix[i][j - 1] = null;
                        matrix[i][j - 2] = null;
                        matrix[i][j + 1] = null;
                    }
                } else {
                    if(matrix[i][j] == 0){
                        points += 15
                        somma4 += 3
                        if(somma4>=50){
                            somma4=50
                        }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 1){
                        points += 6
                        somma5 += 3
                        if(somma5>=50){
                            somma5=50
                        }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 2){
                        points += 9
                        somma6 += 3
                        if(somma6>=50){
                            somma6=50
                        }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 3){
                        points += 3
                        somma7 += 3
                        if(somma7>=50){
                            somma7=50
                        }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }
                    comboX = tris;
                    found = true;
                    target = matrix[i][j];
                    matrix[i][j] = null;
                    matrix[i][j - 1] = null;
                    matrix[i][j - 2] = null;
                }
            }

            // controllo sequenze verticali
            if (i >= 2 && matrix[i][j] != null && matrix[i][j] == matrix[i - 1][j] && matrix[i][j] == matrix[i - 2][j]) {
                if (i <= col - 2 && matrix[i + 1][j] == matrix[i][j]) {
                    if (i <= col - 3 && matrix[i + 2][j] == matrix[i][j]) {
                        if(matrix[i][j] == 0){
                            points += 25
                            somma4 += 5
                            if(somma4>=50){
                                somma4=50
                            }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 1){
                            points += 10
                            somma5 += 5
                            if(somma5>=50){
                                somma5=50
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50" 
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 2){
                            points += 15
                            somma6 += 5
                            if(somma6>=50){
                                somma6=50
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 3){
                            points += 5
                            somma7 += 5
                            if(somma7>=50){
                                somma7=50
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }
                        comboY = cinquina;
                        found = true;
                        target = matrix[i][j];
                        matrix[i][j] = null;
                        matrix[i - 1][j] = null;
                        matrix[i - 2][j] = null;
                        matrix[i + 1][j] = null;
                        matrix[i + 2][j] = null;

                    } else {
                        if(matrix[i][j] == 0){
                            points += 20
                            somma4 += 4
                            if(somma4>=50){
                                somma4=50
                            }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 1){
                            points += 8
                            somma5 += 4
                            if(somma5>=50){
                                somma5=50
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50" 
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 2){
                            points += 12
                            somma6 += 4
                            if(somma6>=50){
                                somma6=50
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }else if(matrix[i][j] == 3){
                            points += 4
                            somma7 += 4
                            if(somma7>=50){
                                somma7=50
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }
                        comboY = quad;
                        found = true;
                        target = matrix[i][j];
                        matrix[i][j] = null;
                        matrix[i - 1][j] = null;
                        matrix[i - 2][j] = null;
                        matrix[i + 1][j] = null;

                    }
                } else {
                    if(matrix[i][j] == 0){
                        points += 15
                        somma4 += 3
                        if(somma4>=50){
                            somma4=50
                        }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + somma4 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 1){
                        points += 6
                        somma5 += 3
                        if(somma5>=50){
                            somma5=50
                        }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + somma5 + "/50" 
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 2){
                        points += 9
                        somma6 += 3
                        if(somma6>=50){
                            somma6=50
                        }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + somma6 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }else if(matrix[i][j] == 3){
                        points += 3
                        somma7 += 3
                        if(somma7>=50){
                            somma7=50
                        }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + somma7 + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                    }
                    comboY = tris;
                    found = true;
                    target = matrix[i][j];
                    matrix[i][j] = null;
                    matrix[i - 1][j] = null;
                    matrix[i - 2][j] = null;
                }
            }
            switch(target){
                //vetro
                case "0":
                    target = 5;
                    break;
                //carta
                case "1":
                    target = 2;
                    break;
                //plastica
                case "2":
                    target = 3;
                    break;
                //secco
                case "3":
                    target = 1;
                    break;
            }
            switch(comboX){
                case "tris":
                    break;
            }
        }
    }
    //aggiornamento matrice per spostare valori undefined in cima
    console.log('found: ' + found);
    if(found){
        found = false;
        for(let i = 0; i < col; i++){
            for(let j = 0; j < col; j++){
                if(matrix[i][j] == null){
                    let n = i;
                    while(n > 0){
                        swap(n, n - 1, j, j)
                        n--;

                    }
                }
            }
        }
        controllo();
        controlla();
    } else {
        return found;
    }
}


function controlla(){
    if(somma4 >= 50 && somma5 >= 50 && somma6 >= 50 && somma7 >= 50 ){
        window.location.href = "classifica.html"
        
        document.getElementById("p1").innerHTML = "nome " + points

    }
}


