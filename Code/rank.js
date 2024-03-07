let saved = localStorage.getItem('savedplayers');
let savedPlayers;

if (saved) {
    savedPlayers = JSON.parse(saved);
    console.log(savedPlayers);

    for (let i = 0; i < savedPlayers.length; i++) {
        let min = i;
        for (let j = i + 1; j < savedPlayers.length; j++) {
            if (savedPlayers[j].points > savedPlayers[min].points) {
                min = j;
            }
        }
        if (min !== i) {
            swap(min, i);
        }
    }

    for (let i = 0; i < 5; i++) {
        let player = savedPlayers[i];
        if (player != undefined) {
            document.getElementById(`p${i + 1}`).innerHTML = `${player.name}`;
            document.getElementById(`pp${i + 1}`).innerHTML = `Punti: ${player.points}`;
        } else {
            document.getElementById(`p${i + 1}`).innerHTML = "Non registrato";
        }
    }
} else {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`p${i + 1}`).innerHTML = "Non registrato";
    }
}

function swap(a, b) {
    let temp = savedPlayers[a];
    savedPlayers[a] = savedPlayers[b];
    savedPlayers[b] = temp;
}