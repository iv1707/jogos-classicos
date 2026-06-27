let jogadorAtual = "X";

let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let jogoAtivo = true;

const combinacoesVitoria = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

function jogar(posicao){

    if(tabuleiro[posicao] !== "" || !jogoAtivo){
        return;
    }

    tabuleiro[posicao] = jogadorAtual;

    const casas =
        document.querySelectorAll(".casa");

    casas[posicao].innerText =
        jogadorAtual;

    verificarVitoria();

    if(jogoAtivo){

        jogadorAtual =
            jogadorAtual === "X"
            ? "O"
            : "X";

        document.getElementById("status")
            .innerText =
            "Vez do jogador " + jogadorAtual;

    }

}

function verificarVitoria(){

    for(let combinacao of combinacoesVitoria){

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];

        if(
            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ){

            document.getElementById("status")
                .innerText =
                "🎉 Jogador " +
                tabuleiro[a] +
                " venceu!";

            jogoAtivo = false;

            return;
        }

    }

    if(!tabuleiro.includes("")){

        document.getElementById("status")
            .innerText =
            "🤝 Empate!";

        jogoAtivo = false;

    }

}

function reiniciar(){

    jogadorAtual = "X";

    jogoAtivo = true;

    tabuleiro = [
        "", "", "",
        "", "", ""
    ];

    tabuleiro.push("", "", "");

    const casas =
        document.querySelectorAll(".casa");

    casas.forEach(casa => {

        casa.innerText = "";

    });

    document.getElementById("status")
        .innerText =
        "Vez do jogador X";

}
