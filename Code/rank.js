function swap(a, b) {
    let temp = savedPlayers[a];
    savedPlayers[a] = savedPlayers[b];
    savedPlayers[b] = temp;
}

let savedPlayers = JSON.parse(localStorage.getItem('savedplayers'));
for (let i = 0; i < savedPlayers.length; i++) {
    let min = i;
    for (let j = i + 1; j < savedPlayers.length; j++) {
        if (savedPlayers[j].points < savedPlayers[min].points) {
            min = j;
        }
    }
    if (min !== i) {
        swap(min, i);
    }
}

for (let i = 0; i < 5; i++) {
    let player = savedPlayers[i];
    document.getElementById(`p${i + 1}`).value = `${player.name} - Punti: ${player.points}`;
}