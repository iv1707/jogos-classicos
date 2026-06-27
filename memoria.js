const emojis = [
    "🎮", "🎮",
    "🚀", "🚀",
    "⚽", "⚽",
    "🍕", "🍕",
    "🐱", "🐱",
    "👑", "👑",
    "🔥", "🔥",
    "🎵", "🎵"
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let movimentos = 0;

function embaralhar(lista) {

    return lista.sort(() => Math.random() - 0.5);

}

function iniciarJogo() {

    const tabuleiro =
        document.getElementById("tabuleiroMemoria");

    tabuleiro.innerHTML = "";

    movimentos = 0;

    document.getElementById("movimentos")
        .innerText = "Movimentos: 0";

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    const cartas =
        embaralhar([...emojis]);

    cartas.forEach(emoji => {

        const carta =
            document.createElement("div");

        carta.className = "carta";

        carta.dataset.emoji = emoji;

        carta.onclick = () => virarCarta(carta);

        tabuleiro.appendChild(carta);

    });

}

function virarCarta(carta) {

    if (
        bloqueado ||
        carta.classList.contains("virada")
    ) {
        return;
    }

    carta.innerText =
        carta.dataset.emoji;

    carta.classList.add("virada");

    if (!primeiraCarta) {

        primeiraCarta = carta;
        return;

    }

    segundaCarta = carta;

    movimentos++;

    document.getElementById("movimentos")
        .innerText =
        "Movimentos: " + movimentos;

    if (
        primeiraCarta.dataset.emoji ===
        segundaCarta.dataset.emoji
    ) {

        primeiraCarta = null;
        segundaCarta = null;

        verificarVitoria();

    } else {

        bloqueado = true;

        setTimeout(() => {

            primeiraCarta.innerText = "";
            segundaCarta.innerText = "";

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;

            bloqueado = false;

        }, 1000);

    }

}

function verificarVitoria() {

    const cartas =
        document.querySelectorAll(".carta");

    const venceu =
        [...cartas].every(carta =>
            carta.classList.contains("virada")
        );

    if (venceu) {

        setTimeout(() => {

            alert(
                "🎉 Parabéns! Você venceu em " +
                movimentos +
                " movimentos!"
            );

        }, 300);

    }

}

iniciarJogo();
