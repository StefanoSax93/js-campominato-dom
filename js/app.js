/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.
*/


const gridContainer = document.querySelector(".grid-container");
let punteggio = 0;
let gameOver = false;
//importo il bottone per avviare la partita
const btnPlay = document.getElementById("btnPlay");

btnPlay.addEventListener("click", function () {
  punteggio = 0;
  gameOver = false;

  generateGrid();
});  
//creo la funzione per genereare le bombe
function generateBombs(maxNumber, maxBombsNumber = 16) {
  //creo un array dove inserire la lista di bombe generate
  const bombsList = [];
  
  do {
    // genero un numero casuale tra 1 e il numero massimo
    const bombsNumber = Math.floor(Math.random() * maxNumber) + 1;
    // se il numero generato non è presente nell'array, lo aggiungo
    if (!bombsList.includes(bombsNumber)) {
      bombsList.push(bombsNumber);
    }
  } while (bombsList.length < maxBombsNumber);

  return bombsList;
};

function generateGrid() {
  //creo una variabile per la difficoltà
  let difficulty = document.getElementById("selectDifficulty").value;
  //numero di celle da generare
  const totCells = 8 * 8;

  const bombsList = generateBombs(totCells);

  //stampa in html la griglia
  renderGrid(totCells, bombsList);
};

function renderGrid(totCells, bombsList, levelClass) {
  
  gridContainer.innerHTML = "";
  // creo ogni singola cella necessaria
  for (let i = 1; i <= totCells; i++) {
    let randomNumber = i;
    // creo un div che rappresenta una singola cella
    const cell = document.createElement("div");
    // aggiungo le classi per stilizzare la cella
    cell.classList.add("cell","d-flex","justify-content-center","align-items-center");
    // inserisco il numero all interno della cella
    cell.innerHTML = `<span>${randomNumber}</span>`;

    cell.dataset.indice = i;

    // Aggiungo la funzione con gli eventi per la cella
    addCellEventListeners(cell, bombsList);
    

    gridContainer.append(cell);
}
};
// creo una funzione per il game over
function gameOverFunction() {
  alert("Hai perso! hai totalizzato " + punteggio + " punti");
}
// creo la funzione per aggiungere gli eventi alla cella
function addCellEventListeners(cell, bombsList) {
  cell.addEventListener("click", function () {
    if(this.classList.contains("bg-danger") || this.classList.contains("bg-secondary") || gameOver) {
      return;
    }

    const cellIndex = +this.dataset.indice;

    cell.classList.add("bg-secondary","text-white");

    if(bombsList.includes(cellIndex)) {
      cell.classList.add("bg-danger");
      gameOver = true;
      gameOverFunction();
    }else {
      punteggio++;
    };

    console.log("cliccato cella numero: ", cellIndex);
  });
};



const btnDelete = document.getElementById("btnDelete");

btnDelete.addEventListener("click", function () {
    gridContainer.innerHTML = "";
});