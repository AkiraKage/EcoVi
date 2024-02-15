const images = ['./Img/bottle.png','./Img/box.png','./Img/plastic bottle.png','./Img/garbage_black.png']

const matrix = [];
for (let i = 0; i < 5; i++) {
    matrix.push([]);
    for (let j = 0; j < 5; j++) {
        matrix[i].push(Math.floor(Math.random() * 4));
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