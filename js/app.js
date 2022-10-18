const loto = {
    buttonStart : document.querySelector('.btnStart'),
    tirages : [],
    itv1 : "",
    itv5 : "",

    joueur : {
        nom : "Player 2",
        board : [],
        numeroCochés : [],
        score : 0,
        boardElement : document.getElementById('boardJoueur'),
        btnBingo : document.querySelector('.btnBingo'),
    },

    dealer : {
        nom : "Dealer",
        board : [],
        numeroCochés : [],
        score : 0,
        boardElement : document.getElementById('boardDealer'),
    },    
    
    init: function() {
        loto.buttonStart.addEventListener('click', loto.start);
        cellNameJoueur = loto.joueur.boardElement.querySelector('h2');
        cellNameJoueur.textContent = loto.joueur.nom;
        loto.joueur.btnBingo.addEventListener('click', loto.handleBtnBingo);
    },
    
    start: function(){
        // réinitialiser le jeu
        loto.tirages = [];
        loto.joueur.numeroCochés = [];
        loto.dealer.numeroCochés = [];
        let elementCochés = loto.joueur.boardElement.querySelectorAll('.celluleCheck');
        for (let elem of elementCochés) {
            elem.classList.remove('celluleCheck');
        }

        // Création des grilles joueur & dealer
        loto.createBoardJoueur(loto.joueur);
        loto.createBoardDealer(loto.dealer);

        let counter = 5;
        loto.itv1 = setInterval(() => {
            if (counter > 0){
                counter--;
                let counterElem = document.querySelector('.affichageDecompte');
                counterElem.textContent = counter;
            } else {
                counter = 5;
                let counterElem = document.querySelector('.affichageDecompte');
                counterElem.textContent = counter;
            }
        }, 1000)
        
        loto.itv5 = setInterval(() => {
            loto.getRamdonNumber();
            if (loto.tirages.length === 90){
                clearInterval(loto.itv5);
            }
        }, 6000);
    },
    
    getRamdonNumber : function(){
        let number;
        do {
            number = Math.round(Math.random() * 89 + 1);
        }
        while (loto.tirages.includes(number));
        loto.displayTirages(number);
    },
    
    displayTirages : function(number) {
        let affichageNumeroElem = document.querySelector('.affichageNumero');
        affichageNumeroElem.textContent = number;
        
        loto.tirages.push(number);
        let affichageDernierNumeroElem = document.querySelector('.affichageDernierNumero');
        affichageDernierNumeroElem.textContent = loto.tirages[loto.tirages.length - 2];
    },
    
    createBoardJoueur : function(player){
        // reinitialisation des board
        player.board = [];
        // récuperer les case avec la classe numero
        const tab = player.boardElement.querySelectorAll('.numero');
        // boucler sur ce tableau pour insérer un  nombre aléatoire
        for (let cell of tab) {
            // générer un nombre aléatoire
            let number;
            do {
                number = Math.round(Math.random() * 89 + 1);
            }
            while (player.board.includes(number));
            // insérer ce nombre dans cell avec textcontent
            cell.textContent = number;            
            player.board.push(number);
            // add event pour le click
            cell.addEventListener('click', loto.toggleClassOnNumero);
        }
    },

    toggleClassOnNumero : function(michel){
        michel.currentTarget.classList.toggle('celluleCheck');
    },

    createBoardDealer : function(player){
        // reinitialisation des board
        player.board = [];
        // récuperer les case avec la classe numero
        const tab = player.boardElement.querySelectorAll('.numero');
        // boucler sur ce tableau pour insérer un  nombre aléatoire
        for (let cell of tab) {
            // générer un nombre aléatoire
            let number;
            do {
                number = Math.round(Math.random() * 89 + 1);
            }
            while (player.board.includes(number));
            // insérer ce nombre dans cell avec textcontent
            cell.textContent = number;
            player.board.push(number);
        }
    },

    handleBtnBingo : function () {
        loto.verificationCelluleCheck();
        loto.stopInterval();
    },

    verificationCelluleCheck : function() {
        // remplisse du tableau loto.joueur.numeroCochés 
        let elementCochés = loto.joueur.boardElement.querySelectorAll('.celluleCheck');
        
        for (let cell of elementCochés){
            // récupérer le nombre qui est dans la cellule
            let nbrExtract = parseInt(cell.textContent);
            // l'ajouter à notre tableau loto.joueur.numeroCochés
            loto.joueur.numeroCochés.push(nbrExtract);
        }
                
        // vérifier si il a coché moins de 15 numéros
        if (loto.joueur.numeroCochés.length !== 15){
            loto.dealer.score++;
            let defeat = document.createElement('div'); 
            defeat.textContent = " Tu n'as même pas le bon nombre de numéros cochés IDIOT !"
            loto.joueur.boardElement.appendChild(defeat);
        } else {
            let counter = 0;
            for (let number of loto.joueur.numeroCochés){
                if (loto.tirages.includes(number)){
                    counter++;
                    // TO DO mettre la cellule en vert (avec le numero apparent)
                } else {    
                    loto.dealer.score++;                 
                    let defeat = document.createElement('div'); 
                    defeat.textContent = `T'es un Looser Brenda !! le ${number} n'a pas été tiré`;
                    loto.joueur.boardElement.appendChild(defeat);
                    break;
                }
            }
            if (counter === 15) {
                let victory = document.createElement('div'); 
                victory.textContent = `Good Job Dude !`;
                loto.joueur.boardElement.appendChild(victory);
                loto.joueur.score++;
            }
                
        }
        
        loto.displayScore();
    },

    stopInterval : function() {
        clearInterval(loto.itv1);
        clearInterval(loto.itv5);
    },

    displayScore : function() {
        let cellScore = document.querySelector('.containerScore');
        cellScore.textContent = `${loto.joueur.score} - SCORE - ${loto.dealer.score}`;
    }
    
}

loto.init();

// TODO
// gestion du remplissage du tableau du dealer
// gestion de la victoire du dealer
// faire du CSS