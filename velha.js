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

    const casas = document.querySelectorAll(".casa");

    casas[posicao].innerText = jogadorAtual;

    verificarVitoria();

    if(!jogoAtivo){
        return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    document.getElementById("status").innerText =
        "Vez do jogador " + jogadorAtual;

    if(jogadorAtual === "O"){

        setTimeout(jogadaMaquina, 700);

    }

}

function jogadaMaquina(){

    if(!jogoAtivo){
        return;
    }

    const dificuldade =
        document.getElementById("dificuldade").value;

    if(dificuldade === "facil"){

        jogadaFacil();

    }else if(dificuldade === "medio"){

        jogadaMedia();

    }else{

        jogadaImpossivel();

    }

}

function jogadaFacil(){

    let livres = [];

    for(let i = 0; i < 9; i++){

        if(tabuleiro[i] === ""){
            livres.push(i);
        }

    }

    let escolha =
        livres[Math.floor(Math.random() * livres.length)];

    jogar(escolha);

}

function jogadaMedia(){

    for(let i = 0; i < 9; i++){

        if(tabuleiro[i] === ""){

            tabuleiro[i] = "O";

            if(verificarVitoriaSimulada("O")){

                tabuleiro[i] = "";

                jogar(i);

                return;

            }

            tabuleiro[i] = "";

        }

    }

    for(let i = 0; i < 9; i++){

        if(tabuleiro[i] === ""){

            tabuleiro[i] = "X";

            if(verificarVitoriaSimulada("X")){

                tabuleiro[i] = "";

                jogar(i);

                return;

            }

            tabuleiro[i] = "";

        }

    }

    jogadaFacil();

}

function jogadaImpossivel(){

    let melhorPontuacao = -Infinity;
    let melhorJogada;

    for(let i = 0; i < 9; i++){

        if(tabuleiro[i] === ""){

            tabuleiro[i] = "O";

            let pontuacao =
                minimax(tabuleiro, 0, false);

            tabuleiro[i] = "";

            if(pontuacao > melhorPontuacao){

                melhorPontuacao = pontuacao;
                melhorJogada = i;

            }

        }

    }

    jogar(melhorJogada);

}

function minimax(tab, profundidade, maximizando){

    if(verificarVitoriaSimulada("O")) return 10;
    if(verificarVitoriaSimulada("X")) return -10;
    if(!tab.includes("")) return 0;

    if(maximizando){

        let melhor = -Infinity;

        for(let i = 0; i < 9; i++){

            if(tab[i] === ""){

                tab[i] = "O";

                let valor =
                    minimax(tab, profundidade + 1, false);

                tab[i] = "";

                melhor = Math.max(melhor, valor);

            }

        }

        return melhor;

    }else{

        let melhor = Infinity;

        for(let i = 0; i < 9; i++){

            if(tab[i] === ""){

                tab[i] = "X";

                let valor =
                    minimax(tab, profundidade + 1, true);

                tab[i] = "";

                melhor = Math.min(melhor, valor);

            }

        }

        return melhor;

    }

}

function verificarVitoriaSimulada(jogador){

    return combinacoesVitoria.some(comb =>

        tabuleiro[comb[0]] === jogador &&
        tabuleiro[comb[1]] === jogador &&
        tabuleiro[comb[2]] === jogador

    );

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

            document.getElementById("status").innerText =
                "🎉 Jogador " +
                tabuleiro[a] +
                " venceu!";

            jogoAtivo = false;

            return;

        }

    }

    if(!tabuleiro.includes("")){

        document.getElementById("status").innerText =
            "🤝 Empate!";

        jogoAtivo = false;

    }

}

function reiniciar(){

    jogadorAtual = "X";

    jogoAtivo = true;

    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const casas =
        document.querySelectorAll(".casa");

    casas.forEach(casa => {

        casa.innerText = "";

    });

    document.getElementById("status").innerText =
        "Vez do jogador X";

}
