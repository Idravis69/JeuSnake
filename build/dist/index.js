let snakebody, nourriture, direction, peutbouger, enjeu;
let map;
let vitesse = 5;
let play;
let scs = document.querySelector("#point");
let scores = 1;

function initialisationDesVariables() {
    snakebody = [[0, 0]];
    nourriture = 0;
    direction = "Right";
    peutbouger = false;
    enjeu = false;
}

// Creation et initialisation de la map
function statusDePartie(mapElementId) {
    map = document.getElementById(mapElementId);
    initialisationDesVariables();

    // Generer les pixels de la map
    for (let i = 0; i < 100; i++) {
        let pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        map.appendChild(pixel);
    }

    // Generation du corps du serpent et de la nourriture
    map.children[0].classList.add("snake-body");
    genererLaNourriture();
}

function genererLaNourriture() {
    // Permet de ne pas generer de la nourriture sur le serpent
    while (map.children[nourriture].classList.contains("snake-body")) {
        nourriture = Math.floor(Math.random() * 100);
    }
    // Placing nourriture on the map
    map.children[nourriture].classList.add("nourriture");
}

function startGame() {
    if (!enjeu) {
        peutbouger = true;
        play = setInterval(miseAJourDesPosition, 1000 / vitesse);
        document.getElementById("menu").style.display = "none";
        document.getElementById("map").style.display = "";
        enjeu = true;
    }
}

function pauseGame() {
    if (enjeu) {
        peutbouger = false;
        clearInterval(play);
        document.getElementById("menu-text").innerText =
            "PAUSE\nAppuyer sur ENTRER pour reprendre";
        document.getElementById("menu").style.display = "";
        document.getElementById("map").style.display = "none";
        enjeu = false;
    }
}


function gameOver() {
    clearInterval(play);
    document.getElementById("menu-text").innerText =
        "Game Over\nTon score: " +
        (snakebody.length - 1) +
        "\nAppuie sur ENTRER pour rejouer";
        class Snake {
            constructor(nom, score) {
            score = snakebody.length - 1;
            this.nom = nom;
            this.score = score;
            }
        }
        let blackmamba = new Snake("Blackmamba", 0);
        scs.innerHTML = ("Le score de " + blackmamba.nom + " est de " + blackmamba.score);
    document.getElementById("menu").style.display = "";
    document.getElementById("map").style.display = "none";
    map.innerText = ""; // Vider la map
    statusDePartie(map.id); // Regenerer la map
    scores = 0;
    scs.innerHTML = ("Le score de Blackmamba est de " + scores++);
}

function miseAJourDesPosition() {
    let newPosR, newPosC;
    let head = snakebody[snakebody.length - 1];

    switch (direction) {
        case "Up":
            newPosR = head[0] - 1;
            newPosC = head[1];
            break;
        case "Down":
            newPosR = head[0] + 1;
            newPosC = head[1];
            break;
        case "Left":
            newPosR = head[0];
            newPosC = head[1] - 1;
            break;
        case "Right":
            newPosR = head[0];
            newPosC = head[1] + 1;
            break;
        default:
            break;
    }
    // Voir si le serpent touhe le mur
    if (newPosR < 0 || newPosR > 9 || newPosC < 0 || newPosC > 9) {
        gameOver();
    } else {
        snakebody.push([newPosR, newPosC]);
        updateScreen();
        peutbouger = true;
    }
}

function updateScreen() {
    let tailArray = snakebody.shift();

    let tail = parseInt(tailArray[0] + "" + tailArray[1]);

    let headArray = snakebody[snakebody.length - 1];

    let head = parseInt(headArray[0] + "" + headArray[1]);

    // Voir si le serpent ce touche
    if (map.children[head].classList.contains("snake-body")) {
        gameOver();
    } else {
        // Ajout de nouvelle tete de serpent a chaque pomme manger
        map.children[head].classList.add("snake-body");

        // Enlever la tete du serpent apres son passage 
        map.children[tail].classList.remove("snake-body");

        // Quand le serpent mange la nourriture
        if (head == nourriture) {
            map.children[nourriture].classList.remove("nourriture");
            snakebody.unshift(tailArray);
            scs.innerHTML = ("Le score de Blackmamba est de " + scores++);
            // Quand le serpent atteint la taille maximal
            snakebody.length == 100 && gameOver();
            genererLaNourriture();
        }
    }
}

// Touches pour jouer
document.onkeydown = keyPress;

function keyPress(e) {
    e.preventDefault();
    e = e || window.event;

    // Touche echape
    e.keyCode == 27 && pauseGame();

    // Touche Entree
    e.keyCode == 13 && startGame();
    let up = 38;
    let down = 40;
    let left = 37;
    let right = 39;

    if (peutbouger) {
        peutbouger = false;
        switch (e.keyCode) {
            case left:
                direction != "Right" && (direction = "Left");
                break;
            case up:
                direction != "Down" && (direction = "Up");
                break;
            case right:
                direction != "Left" && (direction = "Right");
                break;
            case down:
                direction != "Up" && (direction = "Down");
                break;
            default:
                peutbouger = true;
                break;
        }
    }
}

// Initialiser la partie

statusDePartie("map");