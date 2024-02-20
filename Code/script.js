const images = ['./Img/bottle.png','./Img/box.png','./Img/plastic bottle.png','./Img/garbage_black.png']


const matrix = [];
for (let i = 0; i < 5; i++) {
    matrix.push([]);
    for (let j = 0; j < 5; j++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 4);
        } while (
            (i >= 2 && matrix[i - 1][j] === randomIndex && matrix[i - 2][j] === randomIndex) ||
            (j >= 2 && matrix[i][j - 1] === randomIndex && matrix[i][j - 2] === randomIndex)
        );
        matrix[i].push(randomIndex);
    }
}
/*
const table = document.querySelector('table');
for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('td');
        const img = document.createElement('img');
        img.src = images[matrix[i][j]];
        cell.appendChild(img);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
*/

let row=5
let col=5
document.getElementById("contenitore").style.gridTemplateColumns = "repeat(" + col + ", 1fr)"

let array = []
for (let i = 0; i < row * col ; i++) {
  array.push(i)

}


//disegna le card
console.log(array)
for (let i = 0; i < array.length; i++) {
    let randomIndex2 = Math.floor(Math.random() * 4);
    let s = "<div class='card'><img src='./Img/bottle.png' ></div>" 
    let a = "<div class='card'><img src='./Img/box.png' alt='Immagine'></div>"
    let b = "<div class='card'><img src='./Img/plastic bottle.png' alt='Immagine'></div>"
    let c = "<div class='card'><img src='./Img/garbage_black.png' alt='Immagine'></div>"
    if(randomIndex2 == 0) {
        document.getElementById("contenitore").innerHTML += s; 
        }
        else if(randomIndex2 == 1) {
            document.getElementById("contenitore").innerHTML += a; 
            }
        else    if(randomIndex2 == 2) {
                document.getElementById("contenitore").innerHTML += b; 
                }
              else  if(randomIndex2 == 3) {
                    document.getElementById("contenitore").innerHTML += c; 
                    }

    

}

/*
for (let i = 0; i < array.length; i++) {
    let randomIndex2 = Math.floor(Math.random() * images.length);
    if(randomIndex2 == 0) {
    let s = "<div class='card'><img src='./Img/bottle.png' alt='Immagine'></div>"
    document.getElementById("contenitore").innerHTML += s; 
    }
    else if(randomIndex2 == 1) {
        let s = "<div class='card'><img src='./Img/box.png' alt='Immagine'></div>"
        document.getElementById("contenitore").innerHTML += s; 
        }
    else    if(randomIndex2 == 2) {
            let s = "<div class='card'><img src='./Img/plastic bottle.png' alt='Immagine'></div>"
            document.getElementById("contenitore").innerHTML += s; 
            }
          else  if(randomIndex2 == 3) {
                let s = "<div class='card'><img src='./Img/garbage_black.png' alt='Immagine'></div>"
                document.getElementById("contenitore").innerHTML += s; 
                }
    document.getElementById("contenitore").innerHTML += s;

}
*/