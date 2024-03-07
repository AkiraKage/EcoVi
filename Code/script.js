const images = ['./Img/bottle.png', './Img/box.png', './Img/plastic bottle.png', './Img/garbage.png', './Img/recycle.png', './Img/earth.png'];

const parsedUrl = new URL(window.location.href);
let playername = parsedUrl.searchParams.get('playername');
console.log(playername);
let col = parseInt(parsedUrl.searchParams.get('col'));
console.log("col: " + col);

let saved = []
let player = {
    "name" : playername,
    "points" : 0
}
let saveindex;

let stored = localStorage.getItem('savedplayers');
if (stored) {
    saved = JSON.parse(stored);
    for (let i = 0; i < saved.length; i++) {
        if (saved[i].name == playername) {
            saveindex = i;
        }
    }
    if (saveindex == undefined) {
        saved.push(player);
        saveindex = saved.length - 1;
    }
} else {
    saved.push(player);
    saveindex = saved.length - 1;
    localStorage.setItem('savedplayers', JSON.stringify(saved));
}

function updatePoints(){
    if(points > saved[saveindex].points){
        saved[saveindex].points = points;
        localStorage.setItem('savedplayers', JSON.stringify(saved));
    }
}

//randomizzazione numeri nella matrice
let matrix = [];
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


//primo caricamento immagini
document.getElementById("contenitore").style.gridTemplateColumns = `repeat(${col}, 1fr)`
for (let i = 0; i < col; i++) {
    for (let j = 0; j < col; j++) {
        document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
    }
}


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

            if (i1 == undefined) {
                i1 = i;
                j1 = j;
                pos1 = `${i1} ${j1}`
                clickedicon.style.backgroundColor = 'lightblue';
                if (matrix[i1][j1] == 4) {
                    riciclo(i1, j1);
                    console.log("potere del riciclo");
                    i1 = undefined;
                    j1 = undefined;

                    found = true;
                    controllo();
                    updateGrid();

                } else if (matrix[i1][j1] == 5) {
                    natura(i1, j1);
                    console.log("amore della natura");
                    i1 = undefined;
                    j1 = undefined;

                    found = true;
                    controllo();
                    updateGrid();
                }

            } else if (i1 != undefined && i2 == undefined) {
                pos2 = `${i} ${j}`
                if (pos1 != pos2) {
                    i2 = i;
                    j2 = j;
                    if (matrix[i2][j2] == 4) {
                        riciclo(i2, j2);
                        console.log("potere del riciclo");
                        i1 = undefined;
                        j1 = undefined;
                        i2 = undefined;
                        j2 = undefined;

                        found = true;
                        controllo();
                        updateGrid();
                        return;
                    } else if (matrix[i1][j1] == 5) {
                        natura(i2, j2);
                        console.log("amore della natura");
                        i1 = undefined;
                        j1 = undefined;
    
                        found = true;
                        controllo();
                        updateGrid();
                    }
                    if ((i1 == i2 && Math.abs(j1 - j2) == 1) || (j1 == j2 && Math.abs(i1 - i2) == 1)) {
                        clickedicon.style.backgroundColor = 'lightblue';
                        setTimeout(() => {
                            swap(i1, i2, j1, j2);
                            let temp1 = i1
                            let temp2 = i2
                            let temp3 = j1
                            let temp4 = j2
                            i1 = undefined;
                            i2 = undefined;
                            j1 = undefined;
                            j2 = undefined;
                            controllo();
                            if (count == 0) {
                                swap(temp1, temp2, temp3, temp4)
                                errore += 1;
                                errorcontrol();
                            } else {
                                errore = 0;
                                document.getElementById('error1').style.backgroundColor = 'white';
                                document.getElementById('error2').style.backgroundColor = 'white';
                            }
                            count = 0
                            updateGrid();
                        }, 350);
                    } else {
                        clickedicon.style.backgroundColor = 'red';
                        setTimeout(() => {
                            i1 = undefined;
                            i2 = undefined;
                            i2 = undefined;
                            j2 = undefined;
                            updateGrid();
                        }, 100);
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
            if (matrix[i][j] == undefined) {
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
            } else if (matrix[i][j] == "pr") {
                matrix[i][j] = 4
            } else if (matrix[i][j] == "an") {
                matrix[i][j] = 5
            }
            controllo();
            document.getElementById("contenitore").innerHTML += `<div class='cell' i='${i}' j='${j}'><img src='${images[matrix[i][j]]}'></div>`
        }
        clickcheck();
    }
    updatePoints();
}

let tris = 0;
let quad = 0;
let cinquina = 0;
let glasscount = 0
let papercount = 0
let plasticcount = 0
let waste = 0
let points = player.points;
let count = 0
let errore = 0


let found = false;
function controllo() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < col; j++) {
            if(matrix[i][j] < 4){
                // controllo sequenze orizzontali
                if (j >= 2 && matrix[i][j] != undefined && matrix[i][j] == matrix[i][j - 1] && matrix[i][j] == matrix[i][j - 2]) {
                    if (j <= col - 2 && matrix[i][j + 1] == matrix[i][j]) {
                        if (j <= col - 3 && matrix[i][j + 2] == matrix[i][j]) {
                            if (matrix[i][j] == 0) {
                                points += 25;
                                glasscount += 5;
                                if (glasscount >= 50) {
                                    glasscount = 50;
                                }
                                document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 1) {
                                points += 10;
                                papercount += 5;
                                if (papercount >= 50) {
                                    papercount = 50;
                                }
                                document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 2) {
                                points += 15;
                                plasticcount += 5;
                                if (plasticcount >= 50) {
                                    plasticcount = 50;
                                }
                                document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 3) {
                                points += 5;
                                waste += 5;
                                if (waste >= 50) {
                                    waste = 50;
                                }
                                document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            }
                            found = true;
                            matrix[i][j] = undefined;
                            matrix[i][j - 1] = undefined;
                            matrix[i][j - 2] = undefined;
                            matrix[i][j + 1] = undefined;
                            matrix[i][j + 2] = 5;
                            count += 1
                        } else {
                            if (matrix[i][j] == 0) {
                                points += 20;
                                glasscount += 4;
                                if (glasscount >= 50) {
                                    glasscount = 50;
                                }
                                document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 1) {
                                points += 8;
                                papercount += 4;
                                if (papercount >= 50) {
                                    papercount = 50;
                                }
                                document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 2) {
                                points += 12;
                                plasticcount += 4;
                                if (plasticcount >= 50) {
                                    plasticcount = 50;
                                }
                                document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 3) {
                                points += 4;
                                waste += 4;
                                if (waste >= 50) {
                                    waste = 50;
                                }
                                document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            }

                            found = true;
                            matrix[i][j] = undefined;
                            matrix[i][j - 1] = undefined;
                            matrix[i][j - 2] = undefined;
                            matrix[i][j + 1] = 4;
                            count += 1;
                        }
                    } else {
                        if (matrix[i][j] == 0) {
                            points += 15;
                            glasscount += 3;
                            if (glasscount >= 50) {
                                glasscount = 50;
                            }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 1) {
                            points += 6;
                            papercount += 3;
                            if (papercount >= 50) {
                                papercount = 50;
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 2) {
                            points += 9;
                            plasticcount += 3;
                            if (plasticcount >= 50) {
                                plasticcount = 50;
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 3) {
                            points += 3
                            waste += 3
                            if (waste >= 50) {
                                waste = 50;
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }
                        found = true;
                        matrix[i][j] = undefined;
                        matrix[i][j - 1] = undefined;
                        matrix[i][j - 2] = undefined;
                        count += 1;
                    }
                }

                // controllo sequenze verticali
                if (i >= 2 && matrix[i][j] != undefined && matrix[i][j] == matrix[i - 1][j] && matrix[i][j] == matrix[i - 2][j]) {
                    if (i <= col - 2 && matrix[i + 1][j] == matrix[i][j]) {
                        if (i <= col - 3 && matrix[i + 2][j] == matrix[i][j]) {
                            if (matrix[i][j] == 0) {
                                points += 25;
                                glasscount += 5;
                                if (glasscount >= 50) {
                                    glasscount = 50;
                                }
                                document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 1) {
                                points += 10;
                                papercount += 5;
                                if (papercount >= 50) {
                                    papercount = 50;
                                }
                                document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 2) {
                                points += 15;
                                plasticcount += 5;
                                if (plasticcount >= 50) {
                                    plasticcount = 50;
                                }
                                document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 3) {
                                points += 5;
                                waste += 5;
                                if (waste >= 50) {
                                    waste = 50;
                                }
                                document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            }

                            found = true;
                            matrix[i][j] = 5;
                            matrix[i - 1][j] = undefined;
                            matrix[i - 2][j] = undefined;
                            matrix[i + 1][j] = undefined;
                            matrix[i + 2][j] = undefined;
                            count += 1;

                        } else {
                            if (matrix[i][j] == 0) {
                                points += 20;
                                glasscount += 4;
                                if (glasscount >= 50) {
                                    glasscount = 50;
                                }
                                document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 1) {
                                points += 8;
                                papercount += 4;
                                if (papercount >= 50) {
                                    papercount = 50;
                                }
                                document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 2) {
                                points += 12;
                                plasticcount += 4;
                                if (plasticcount >= 50) {
                                    plasticcount = 50;
                                }
                                document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            } else if (matrix[i][j] == 3) {
                                points += 4;
                                waste += 4;
                                if (waste >= 50) {
                                    waste = 50;
                                }
                                document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                                document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                            }

                            found = true;
                            matrix[i][j] = 4;
                            matrix[i - 1][j] = undefined;
                            matrix[i - 2][j] = undefined;
                            matrix[i + 1][j] = undefined;
                            count += 1;

                        }
                    } else {
                        if (matrix[i][j] == 0) {
                            points += 15;
                            glasscount += 3;
                            if (glasscount >= 50) {
                                glasscount = 50;
                            }
                            document.getElementById("p5").innerHTML = "Bottiglie di vetro per vincere : " + glasscount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 1) {
                            points += 6;
                            papercount += 3;
                            if (papercount >= 50) {
                                papercount = 50;
                            }
                            document.getElementById("p6").innerHTML = "Scatole di cartone per vincere : " + papercount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 2) {
                            points += 9;
                            plasticcount += 3;
                            if (plasticcount >= 50) {
                                plasticcount = 50;
                            }
                            document.getElementById("p7").innerHTML = "Bottiglie di plastica per vincere : " + plasticcount + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        } else if (matrix[i][j] == 3) {
                            points += 3;
                            waste += 3;
                            if (waste >= 50) {
                                waste = 50;
                            }
                            document.getElementById("p8").innerHTML = "Sacchetti spazzatura per vincere : " + waste + "/50"
                            document.getElementById("p4").innerHTML = "Punteggio totale : " + points;
                        }

                        found = true;
                        matrix[i][j] = undefined;
                        matrix[i - 1][j] = undefined;
                        matrix[i - 2][j] = undefined;
                        count += 1
                    }
                }
            }
        }
    }
    updatePoints();
    //aggiornamento matrice per spostare valori undefined in cima
    console.log('found: ' + found);
    if (found) {
        found = false;
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < col; j++) {
                if (matrix[i][j] == undefined) {
                    let n = i;
                    while (n > 0) {
                        swap(n, n - 1, j, j)
                        n--;
                    }
                }
            }
        }
        controllo();
        updateGrid();
        pointcontrol();
    } else {
        return found;
    }
}

function pointcontrol() {
    if (glasscount >= 50 && papercount >= 50 && plasticcount >= 50 && waste >= 50) {
        window.location.href = "classifica.html"
        document.getElementById("p1").innerHTML = "nome " + points;
    }
}

function riciclo(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    if (i + 1 < col) {
        points += calcolaPunti(matrix[i + 1][j]);
        console.log(calcolaPunti(matrix[i + 1][j]));
        matrix[i + 1][j] = undefined;
    }
    if (i - 1 >= 0) {
        points += calcolaPunti(matrix[i - 1][j]);
        console.log(calcolaPunti(matrix[i - 1][j]));
        matrix[i - 1][j] = undefined;
    }
    if (j + 1 < col) {
        points += calcolaPunti(matrix[i][j + 1]);
        console.log(calcolaPunti(matrix[i][j + 1]));
        matrix[i][j + 1] = undefined;
    }
    if (j - 1 >= 0) {
        points += calcolaPunti(matrix[i][j - 1]);
        console.log(calcolaPunti(matrix[i][j - 1]));
        matrix[i][j - 1] = undefined;
    }

    matrix[i][j] = undefined;
    points += calcolaPunti(matrix[i][j]);
    console.log(calcolaPunti(matrix[i][j]));
    updatePoints();

    return {points, matrix}
}

function natura(i, j) {
    /*matrix[i][j] = undefined;
    matrix[i][j+1] = undefined;
    matrix[i][j-1] = undefined;
    matrix[i+1][j] = undefined;
    matrix[i+1][j+1] = undefined;
    matrix[i+1][j-1] = undefined;
    matrix[i-1][j] = undefined;
    matrix[i-1][j+1] = undefined;
    matrix[i-1][j-1] = undefined;
    return matrix;*/
    i = parseInt(i);
    j = parseInt(j);
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x != 0 || y != 0) {
                if (i + x >= 0 && i + x < col && j + y >= 0 && j + y < col && matrix[i + x][j + y] !== undefined) {
                    points += calcolaPunti(matrix[i + x][j + y]);
                    matrix[i + x][j + y] = undefined;
                }
            }
        }
    }
    updatePoints();

    matrix[i][j] = undefined;
    return {points, matrix};
}

function calcolaPunti(el){
    console.log('el'+el)
    let temppoints = 0;
    switch(el){
        //vetro 0, carta 1, plastica 2, secco 3 (pos)
        //vetro 5, carta 2, plastica 3, secco 1 (punti)
        case 0:
            temppoints = 5;
            break;
        case 1:
            temppoints = 2;
            break;
        case 2:
            temppoints = 3;
            break;
        case 3:
            temppoints = 1;
            break;
        case 4||5||undefined:
            temppoints = 0;
            break;
    }
    return temppoints;
}

function errorcontrol() {
    if(errore == 1){
        document.getElementById('error1').style.backgroundColor = 'red';
    }
    if(errore == 2){
        document.getElementById('error2').style.backgroundColor = 'red';
    }
    if (errore == 3) {
        document.getElementById('error3').style.backgroundColor = 'red';
        setTimeout(() => {
            updatePoints();
            document.getElementById('pointsvis').style.filter = 'blur(4px)';
            document.getElementById('contenitore').style.filter = 'blur(4px)';
            document.getElementById("btn1").removeAttribute("disabled")
            //document.getElementById("btn1").style.filter = 'none';
            document.getElementById("divhome").classList.remove("hidden");
            document.getElementById("btn2").removeAttribute("disabled")
            //document.getElementById("btn2").style.filter = 'none';
            errore = 0;           
        }, 1000);

    }
}

function ricarica(){
    location.reload();
}