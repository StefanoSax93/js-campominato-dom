/*Consegna
Generare una griglia di gioco quadrata , in cui ogni cella contiene un numero incrementale tra quelli compresi tra 1 e 100
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
Bonus
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.*/

const gridContainer = document.querySelector(".grid-container");

function createGrid(xCells, yCells) {
  // quantità di celle da creare
  const cellsNumber = xCells * yCells;

    console.log(cellsNumber);

  gridContainer.style.width = `calc(var(--cell-size) * ${xCells})`;

  // variabile dove inserire i numeri random generati
const numeriGenerati = [];
let randomNumber=0;
  // creo ogni singola cella necessaria
for (let i = 0; i < cellsNumber; i++) {
    randomNumber += 1;
    numeriGenerati.push(randomNumber);
    // creo un div che rappresenta una singola cella
    const cell = document.createElement("div");
    // aggiungo le classi per stilizzare la cella
    cell.classList.add("cell","d-flex","justify-content-center","align-items-center");
    // inserisco il numero all interno della cella
    cell.innerHTML = `<span>${randomNumber}</span>`;

    // Aggiungo un event listener sul click della cella
    cell.addEventListener("click", function () {
      // this = l'elemento che ha generato l'evento usato nel addEventListener
    console.log("hai cliccato il numero", this.innerText);

    const numero = parseInt(this.innerText);

    if (numero) {
        this.classList.toggle("bg-secondary");
        this.classList.toggle("text-white");
    } 
    
    });

    gridContainer.append(cell);
}
}
createGrid(10, 10);
//importo il bottone per selezionare la difficoltà
const btnDifficulty = document.getElementById("btnDifficulty");
const btnDelete = document.getElementById("btnDelete");

//creo un event listener sul bottone
btnDifficulty.addEventListener("click", function () {
    //creo le condizioni per la selezione della difficoltà
    const difficulty = document.getElementById("selectDifficulty").value;
    //ogni volta che clicko la tabella si deve aggiornare in base al valore selezionato
    gridContainer.innerHTML = "";
    //creo le condizioni
    if (difficulty === "easy") {
        createGrid(7, 7);
    } else if (difficulty === "medium") {
        createGrid(9, 9);
    } else if (difficulty === "hard") {
        createGrid(10, 10);
    }
});

btnDelete.addEventListener("click", function () {
    gridContainer.innerHTML = "";
});