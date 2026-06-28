// =====================================
// VARIÁVEIS DO JOGO
// =====================================

let tabuleiro = [];

let jogadorAtual = "vermelha";

let pecaSelecionada = null;

let modoJogo = "2jogadores";

// =====================================
// CRIAR TABULEIRO INICIAL
// =====================================

function criarTabuleiro() {

    tabuleiro = [];

    for (let linha = 0; linha < 8; linha++) {

        tabuleiro[linha] = [];

        for (let coluna = 0; coluna < 8; coluna++) {

            tabuleiro[linha][coluna] = null;

            // Peças azuis
            if (
                linha < 3 &&
                (linha + coluna) % 2 === 1
            ) {

                tabuleiro[linha][coluna] = {
                    cor: "azul",
                    dama: false
                };

            }

            // Peças vermelhas
            if (
                linha > 4 &&
                (linha + coluna) % 2 === 1
            ) {

                tabuleiro[linha][coluna] = {
                    cor: "vermelha",
                    dama: false
                };

            }

        }

    }

}

// =====================================
// DESENHAR TABULEIRO
// =====================================

function desenharTabuleiro() {

    const elemento =
        document.getElementById(
            "tabuleiroDama"
        );

    elemento.innerHTML = "";

    for (let linha = 0; linha < 8; linha++) {

        for (let coluna = 0; coluna < 8; coluna++) {

            const casa =
                document.createElement("div");

            casa.classList.add(
                "casa-dama"
            );

            if (
                (linha + coluna) % 2 === 0
            ) {

                casa.classList.add(
                    "clara"
                );

            } else {

                casa.classList.add(
                    "escura"
                );

                casa.onclick = () =>
                    clicarCasa(
                        linha,
                        coluna
                    );

            }

            const peca =
                tabuleiro[linha][coluna];

            if (peca) {

                const divPeca =
                    document.createElement(
                        "div"
                    );

                divPeca.classList.add(
                    "peca"
                );

                divPeca.classList.add(
                    peca.cor
                );

                if (peca.dama) {

                    divPeca.classList.add(
                        "dama"
                    );

                }

                casa.appendChild(
                    divPeca
                );

            }

            elemento.appendChild(
                casa
            );

        }

    }

}

// =====================================
// CLICAR NA CASA
// =====================================

function clicarCasa(
    linha,
    coluna
) {

    const peca =
        tabuleiro[linha][coluna];

    // Selecionar peça
    if (
        peca &&
        peca.cor === jogadorAtual
    ) {

        pecaSelecionada = {
            linha,
            coluna
        };

        return;

    }

    // Mover peça
    if (pecaSelecionada) {

        moverPeca(
            pecaSelecionada.linha,
            pecaSelecionada.coluna,
            linha,
            coluna
        );

    }

}

// =====================================
// MOVER PEÇA
// =====================================

function moverPeca(
    origemLinha,
    origemColuna,
    destinoLinha,
    destinoColuna
) {

    if (
        tabuleiro[destinoLinha][destinoColuna]
    ) {

        return;

    }

    const peca =
        tabuleiro[
            origemLinha
        ][
            origemColuna
        ];

    let direcao =
        peca.cor === "vermelha"
        ? -1
        : 1;

    let movimentoValido = false;

    // Movimento normal
    if (
        destinoLinha ===
            origemLinha + direcao &&
        (
            destinoColuna ===
                origemColuna - 1 ||
            destinoColuna ===
                origemColuna + 1
        )
    ) {

        movimentoValido = true;

    }

    // Movimento da dama
    if (
        peca.dama &&
        Math.abs(
            destinoLinha -
            origemLinha
        ) === 1 &&
        Math.abs(
            destinoColuna -
            origemColuna
        ) === 1
    ) {

        movimentoValido = true;

    }

    if (!movimentoValido) {

        return;

    }

    // Move
    tabuleiro[
        destinoLinha
    ][
        destinoColuna
    ] = peca;

    tabuleiro[
        origemLinha
    ][
        origemColuna
    ] = null;

    pecaSelecionada = null;

    trocarJogador();

    desenharTabuleiro();

}

// =====================================
// TROCAR JOGADOR
// =====================================

function trocarJogador() {

    jogadorAtual =
        jogadorAtual === "vermelha"
        ? "azul"
        : "vermelha";

    document.getElementById(
        "statusDama"
    ).innerText =

        jogadorAtual === "vermelha"

        ? "Vez das peças vermelhas 🔴"

        : "Vez das peças azuis 🔵";

}

// =====================================
// REINICIAR
// =====================================

function reiniciarDama() {

    modoJogo =
        document.getElementById(
            "modoDama"
        ).value;

    jogadorAtual = "vermelha";

    pecaSelecionada = null;

    criarTabuleiro();

    desenharTabuleiro();

    document.getElementById(
        "statusDama"
    ).innerText =

        "Vez das peças vermelhas 🔴";

}

// =====================================
// INICIAR
// =====================================

reiniciarDama();
