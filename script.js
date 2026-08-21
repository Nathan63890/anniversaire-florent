/* =====================================================
   ANNIVERSAIRE FLORENT
   JAVASCRIPT COMPLET
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
   CRÉER UN BALLON
   ===================================================== */

function createBalloon() {

    const balloon =
        document.createElement("div");

    balloon.className = "balloon";


    /* -------------------------------------------------
       COULEUR
       ------------------------------------------------- */

    const color =
        balloonColors[
            Math.floor(
                Math.random() *
                balloonColors.length
            )
        ];

    balloon.style.background = color;


    /* -------------------------------------------------
       TAILLE
       ------------------------------------------------- */

    const size =
        window.innerWidth < 600
            ? 35 + Math.random() * 20
            : 45 + Math.random() * 30;

    balloon.style.width =
        `${size}px`;

    balloon.style.height =
        `${size * 1.25}px`;


    /* -------------------------------------------------
       POSITION HORIZONTALE
       ------------------------------------------------- */

    balloon.style.left =
        `${Math.random() * 95}%`;


    /* -------------------------------------------------
       VITESSE
       ------------------------------------------------- */

    const duration =
        7 + Math.random() * 6;

    balloon.style.animationDuration =
        `${duration}s`;


    /* =================================================
       CLIC / TOUCHER
       ================================================= */

    balloon.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            explodeBalloon(balloon);
        }
    );


    /* -------------------------------------------------
       AJOUTER LE BALLON
       ------------------------------------------------- */

    balloonsContainer.appendChild(
        balloon
    );


    /* -------------------------------------------------
       SUPPRIMER APRÈS LE VOL
       ------------------------------------------------- */

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

    /* Évite une double explosion */

    if (
        balloon.dataset.exploded === "true"
    ) {
        return;
    }

    balloon.dataset.exploded =
        "true";


    /* -------------------------------------------------
       POSITION DU BALLON
       ------------------------------------------------- */

    const rect =
        balloon.getBoundingClientRect();

    const x =
        rect.left +
        rect.width / 2;

    const y =
        rect.top +
        rect.height / 2;


    /* -------------------------------------------------
       FAIRE DISPARAÎTRE LE BALLON
       ------------------------------------------------- */

    balloon.style.display =
        "none";


    /* -------------------------------------------------
       CRÉER L'EXPLOSION
       ------------------------------------------------- */

    createExplosion(
        x,
        y
    );
}


/* =====================================================
   EXPLOSION
   ===================================================== */

function createExplosion(x, y) {

    /* =================================================
       FLASH BLANC
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
       PARTICULES RONDES
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


        /* -------------------------------------------------
           POSITION DE DÉPART
           ------------------------------------------------- */

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;


        /* -------------------------------------------------
           COULEUR
           ------------------------------------------------- */

        particle.style.background =
            balloonColors[
                Math.floor(
                    Math.random() *
                    balloonColors.length
                )
            ];


        /* -------------------------------------------------
           TAILLE
           ------------------------------------------------- */

        const size =
            5 +
            Math.random() *
            10;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        /* -------------------------------------------------
           DIRECTION
           ------------------------------------------------- */

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


        /* -------------------------------------------------
           AJOUTER
           ------------------------------------------------- */

        confettiContainer.appendChild(
            particle
        );


        /* -------------------------------------------------
           SUPPRIMER
           ------------------------------------------------- */

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
            4000
        );
    }
}


/* =====================================================
   PREMIÈRE PLUIE DE CONFETTIS
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