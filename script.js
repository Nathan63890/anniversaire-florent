/* =====================================================
   ANNIVERSAIRE FLORENT
   JAVASCRIPT COMPLET
   Ballons + explosions + confettis + musique
   ===================================================== */


/* =====================================================
   ÉLÉMENTS
   ===================================================== */

const balloonsContainer =
    document.getElementById("balloons");

const confettiContainer =
    document.getElementById("confetti");


/* =====================================================
   COULEURS
   ===================================================== */

const balloonColors = [
    "#ff4f81",
    "#ffcc00",
    "#5edbff",
    "#9b6cff",
    "#61e294",
    "#ff7043",
    "#ff66cc"
];

const confettiColors = [
    "#ff4f81",
    "#ffcc00",
    "#5edbff",
    "#9b6cff",
    "#61e294",
    "#ffffff",
    "#ff7043"
];


/* =====================================================
   MUSIQUE
   ===================================================== */

let audioContext = null;
let musicStarted = false;


/*
 * Notes de la mélodie.
 *
 * La musique est générée avec Web Audio.
 * Aucun fichier audio n'est nécessaire.
 */

const melody = [

    // Joyeux anniversaire
    ["G4", 0.35],
    ["G4", 0.35],
    ["A4", 0.7],
    ["G4", 0.7],
    ["C5", 0.7],
    ["B4", 1.2],

    ["G4", 0.35],
    ["G4", 0.35],
    ["A4", 0.7],
    ["G4", 0.7],
    ["D5", 0.7],
    ["C5", 1.2],

    ["G4", 0.35],
    ["G4", 0.35],
    ["G5", 0.7],
    ["E5", 0.7],
    ["C5", 0.7],
    ["B4", 0.7],
    ["A4", 1.2],

    ["F5", 0.35],
    ["F5", 0.35],
    ["E5", 0.7],
    ["C5", 0.7],
    ["D5", 0.7],
    ["C5", 1.5]
];


/* Fréquences des notes */

const frequencies = {

    "C4": 261.63,
    "D4": 293.66,
    "E4": 329.63,
    "F4": 349.23,
    "G4": 392.00,
    "A4": 440.00,
    "B4": 493.88,

    "C5": 523.25,
    "D5": 587.33,
    "E5": 659.25,
    "F5": 698.46,
    "G5": 783.99,
    "A5": 880.00,
    "B5": 987.77,

    "G5": 783.99
};


/* =====================================================
   JOUER UNE NOTE
   ===================================================== */

function playNote(note, startTime, duration) {

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value =
        frequencies[note];


    /*
     * Volume doux
     */

    gain.gain.setValueAtTime(
        0,
        startTime
    );

    gain.gain.linearRampToValueAtTime(
        0.10,
        startTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start(
        startTime
    );

    oscillator.stop(
        startTime + duration + 0.05
    );
}


/* =====================================================
   JOUER LA MÉLODIE
   ===================================================== */

function playBirthdayMusic() {

    if (!audioContext) {
        return;
    }


    let time =
        audioContext.currentTime + 0.1;


    for (const [note, duration] of melody) {

        playNote(
            note,
            time,
            duration
        );

        time += duration + 0.03;
    }


    /*
     * Recommence après la fin
     */

    const totalDuration =
        melody.reduce(
            (total, item) =>
                total + item[1] + 0.03,
            0
        );


    setTimeout(
        function() {

            if (musicStarted) {
                playBirthdayMusic();
            }

        },
        totalDuration * 1000
    );
}


/* =====================================================
   DÉMARRER LA MUSIQUE
   ===================================================== */

function startMusic() {

    if (musicStarted) {
        return;
    }

    musicStarted = true;


    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        audioContext.resume().then(
            function() {

                playBirthdayMusic();

            }
        );

    } catch (error) {

        console.log(
            "Impossible de démarrer la musique :",
            error
        );

    }
}


/* =====================================================
   PREMIER TOUCHER
   ===================================================== */

document.addEventListener(
    "pointerdown",
    function() {

        startMusic();

    },
    {
        once: true
    }
);


/* =====================================================
   CRÉER UN BALLON
   ===================================================== */

function createBalloon() {

    const balloon =
        document.createElement("div");

    balloon.className =
        "balloon";


    /* Couleur */

    const color =
        balloonColors[
            Math.floor(
                Math.random() *
                balloonColors.length
            )
        ];

    balloon.style.background =
        color;


    /* Taille */

    const size =
        window.innerWidth < 600
            ? 35 + Math.random() * 20
            : 45 + Math.random() * 30;

    balloon.style.width =
        `${size}px`;

    balloon.style.height =
        `${size * 1.25}px`;


    /* Position */

    balloon.style.left =
        `${Math.random() * 95}%`;


    /* Vitesse */

    const duration =
        7 + Math.random() * 6;

    balloon.style.animationDuration =
        `${duration}s`;


    /* =================================================
       TOUCHER / CLIC
       ================================================= */

    balloon.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            /*
             * Si c'est le premier toucher,
             * la musique démarre.
             */

            startMusic();

            explodeBalloon(
                balloon
            );
        }
    );


    /* Ajouter */

    balloonsContainer.appendChild(
        balloon
    );


    /* Supprimer après le vol */

    setTimeout(
        function() {

            if (
                balloon.isConnected
            ) {

                balloon.remove();

            }

        },
        duration * 1000 + 500
    );
}


/* =====================================================
   EXPLOSION DU BALLON
   ===================================================== */

function explodeBalloon(balloon) {

    if (
        balloon.dataset.exploded === "true"
    ) {
        return;
    }

    balloon.dataset.exploded =
        "true";


    /* Position */

    const rect =
        balloon.getBoundingClientRect();

    const x =
        rect.left +
        rect.width / 2;

    const y =
        rect.top +
        rect.height / 2;


    /* Faire disparaître */

    balloon.style.display =
        "none";


    /* Explosion */

    createExplosion(
        x,
        y
    );
}


/* =====================================================
   CRÉER L'EXPLOSION
   ===================================================== */

function createExplosion(x, y) {


    /* =================================================
       FLASH
       ================================================= */

    const flash =
        document.createElement("div");

    flash.className =
        "balloon-flash";

    flash.style.left =
        `${x}px`;

    flash.style.top =
        `${y}px`;


    confettiContainer.appendChild(
        flash
    );


    setTimeout(
        function() {

            flash.remove();

        },
        400
    );


    /* =================================================
       PARTICULES
       ================================================= */

    const amount = 28;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("div");

        particle.className =
            "balloon-particle";


        /* Position */

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;


        /* Couleur */

        particle.style.background =
            balloonColors[
                Math.floor(
                    Math.random() *
                    balloonColors.length
                )
            ];


        /* Taille */

        const size =
            5 +
            Math.random() *
            10;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        /* Direction */

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            70 +
            Math.random() *
            130;


        const endX =
            Math.cos(angle) *
            distance;

        const endY =
            Math.sin(angle) *
            distance;


        particle.style.setProperty(
            "--x",
            `${endX}px`
        );

        particle.style.setProperty(
            "--y",
            `${endY}px`
        );


        /* Ajouter */

        confettiContainer.appendChild(
            particle
        );


        /* Supprimer */

        setTimeout(
            function() {

                particle.remove();

            },
            1000
        );
    }
}


/* =====================================================
   BALLONS AU DÉMARRAGE
   ===================================================== */

for (
    let i = 0;
    i < 8;
    i++
) {

    setTimeout(
        function() {

            createBalloon();

        },
        i * 500
    );
}


/* =====================================================
   NOUVEAU BALLON TOUTES LES 0,9 SECONDES
   ===================================================== */

setInterval(
    function() {

        createBalloon();

    },
    900
);


/* =====================================================
   CONFETTIS
   ===================================================== */

function createConfetti() {

    const amount = 80;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti-piece";


        /* Couleur */

        confetti.style.background =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];


        /* Position */

        confetti.style.left =
            `${Math.random() * 100}%`;


        /* Taille */

        confetti.style.width =
            `${5 + Math.random() * 8}px`;

        confetti.style.height =
            `${8 + Math.random() * 12}px`;


        /* Durée */

        const duration =
            2.5 +
            Math.random() *
            2;

        confetti.style.animationDuration =
            `${duration}s`;


        /* Délai */

        confetti.style.animationDelay =
            `${Math.random() * 0.5}s`;


        /* Ajouter */

        confettiContainer.appendChild(
            confetti
        );


        /* Supprimer */

        setTimeout(
            function() {

                confetti.remove();

            },
            4500
        );
    }
}


/* =====================================================
   PREMIÈRE PLUIE
   ===================================================== */

createConfetti();


/* =====================================================
   CONFETTIS TOUTES LES 5 SECONDES
   ===================================================== */

setInterval(
    function() {

        createConfetti();

    },
    5000
);
