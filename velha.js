// =========================
// VARIÁVEIS DO JOGO
// =========================

// Jogador que está na vez
let jogadorAtual = "X";

// Estado do tabuleiro
let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// Verifica se o jogo ainda está ativo
let jogoAtivo = true;

// =========================
// COMBINAÇÕES DE VITÓRIA
// =========================

const combinacoesVitoria = [

    // Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonais
    [0, 4, 8],
    [2, 4, 6]

];

// =========================
// FUNÇÃO DE JOGAR
// =========================

function jogar(posicao) {

    // Impede jogar em casa ocupada
    // ou após o fim da partida
    if (tabuleiro[posicao] !== "" || !jogoAtivo) {
        return;
    }

    // Marca a posição
    tabuleiro[posicao] = jogadorAtual;

    // Atualiza a tela
    const casas =
        document.querySelectorAll(".casa");

    casas[posicao].innerText =
        jogadorAtual;

    // Verifica vitória
    verificarVitoria();

    // Se o jogo acabou, para aqui
    if (!jogoAtivo) {
        return;
    }

    // Troca o jogador
    jogadorAtual =
        jogadorAtual === "X"
            ? "O"
            : "X";

    // Atualiza o status
    document.getElementById("status")
        .innerText =
        "Vez do jogador " +
        jogadorAtual;

}

// =========================
// VERIFICAR VITÓRIA
// =========================

function verificarVitoria() {

    // Percorre todas as combinações
    for (let combinacao of combinacoesVitoria) {

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];

        // Se as 3 posições forem iguais
        if (

            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]

        ) {

            document.getElementById("status")
                .innerText =
                "🏆 Jogador " +
                tabuleiro[a] +
                " venceu!";

            jogoAtivo = false;

            return;

        }

    }

    // Verifica empate
    if (!tabuleiro.includes("")) {

        document.getElementById("status")
            .innerText =
            "🤝 Empate!";

        jogoAtivo = false;

    }

}

// =========================
// REINICIAR PARTIDA
// =========================

function reiniciar() {

    // Reinicia as variáveis
    jogadorAtual = "X";

    jogoAtivo = true;

    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    // Limpa o tabuleiro
    const casas =
        document.querySelectorAll(".casa");

    casas.forEach(casa => {

        casa.innerText = "";

    });

    // Atualiza o status
    document.getElementById("status")
        .innerText =
        "Vez do jogador X";

}
