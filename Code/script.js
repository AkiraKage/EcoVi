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

for(let i = 0; i < matrix.length; i++){
    matrix[i].addEventListener("click", () => {
        console.log(i, array[i])
        matrix[i].innerHTML = array[i]
})
}

function selectfn (i) {
    console.log(i, matrix[i])
}