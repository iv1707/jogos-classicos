// =====================================
// VARIÁVEIS DO JOGO
// =====================================

let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let jogadorAtual = "X";

let jogoAtivo = true;

let modoJogo = "2jogadores";

let simboloJogador = "X";

let simboloMaquina = "O";

// =====================================
// COMBINAÇÕES DE VITÓRIA
// =====================================

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

// =====================================
// ELEMENTOS DA TELA
// =====================================

const modo =
    document.getElementById("modo");

const simbolo =
    document.getElementById("simbolo");

const dificuldade =
    document.getElementById("dificuldade");

const areaDificuldade =
    document.getElementById("areaDificuldade");

// =====================================
// FUNÇÃO PRINCIPAL
// =====================================

function jogar(posicao){

    if(
        !jogoAtivo ||
        tabuleiro[posicao] !== ""
    ){
        return;
    }

    if(
        modoJogo === "maquina" &&
        jogadorAtual !== simboloJogador
    ){
        return;
    }

    fazerJogada(posicao);

}

// =====================================
// FAZER JOGADA
// =====================================

function fazerJogada(posicao){

    tabuleiro[posicao] =
        jogadorAtual;

    const casas =
        document.querySelectorAll(".casa");

    casas[posicao].innerText =
        jogadorAtual;

    verificarVitoria();

    if(!jogoAtivo){
        return;
    }

    jogadorAtual =
        jogadorAtual === "X"
        ? "O"
        : "X";

    document.getElementById("status")
        .innerText =
        "Vez do jogador " +
        jogadorAtual;

    if(
        modoJogo === "maquina" &&
        jogadorAtual === simboloMaquina
    ){

        setTimeout(

            jogadaMaquina,

            600

        );

    }

}
// =====================================
// VERIFICAR VITÓRIA
// =====================================

function verificarVitoria(){

    for(let combinacao of combinacoesVitoria){

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];

        if(

            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]

        ){

            document
                .getElementById("status")
                .innerText =

                "🏆 Jogador " +
                tabuleiro[a] +
                " venceu!";

            jogoAtivo = false;

            return;

        }

    }

    if(!tabuleiro.includes("")){

        document
            .getElementById("status")
            .innerText =

            "🤝 Empate!";

        jogoAtivo = false;

    }

}

// =====================================
// JOGADA DA MÁQUINA
// =====================================

function jogadaMaquina(){

    if(!jogoAtivo){
        return;
    }

    let dificuldadeAtual =
        dificuldade.value;

    if(dificuldadeAtual === "facil"){

        jogadaFacil();

    }

    else if(dificuldadeAtual === "medio"){

        jogadaMedia();

    }

    else{

        jogadaImpossivel();

    }

}

// =====================================
// MODO FÁCIL
// =====================================

function jogadaFacil(){

    let livres = [];

    for(let i = 0; i < 9; i++){

        if(tabuleiro[i] === ""){

            livres.push(i);

        }

    }

    let escolha =

        livres[
            Math.floor(
                Math.random() *
                livres.length
            )
        ];

    fazerJogada(escolha);

}

// =====================================
// MODO MÉDIO
// =====================================

function jogadaMedia(){

    jogadaFacil();

}

// =====================================
// MODO IMPOSSÍVEL
// =====================================

function jogadaImpossivel(){

    jogadaFacil();

}

// =====================================
// REINICIAR
// =====================================

function reiniciar(){

    modoJogo =
        modo.value;

    simboloJogador =
        simbolo.value;

    simboloMaquina =

        simboloJogador === "X"
        ? "O"
        : "X";

    jogadorAtual = "X";

    jogoAtivo = true;

    tabuleiro = [

        "", "", "",
        "", "", "",
        "", "", ""

    ];

    const casas =

        document.querySelectorAll(
            ".casa"
        );

    casas.forEach(casa => {

        casa.innerText = "";

    });

    document
        .getElementById("status")
        .innerText =

        "Vez do jogador X";

    // Máquina começa se jogador escolheu O
    if(

        modoJogo === "maquina" &&
        simboloJogador === "O"

    ){

        setTimeout(

            jogadaMaquina,

            600

        );

    }

}

// =====================================
// MOSTRAR DIFICULDADE
// =====================================

function atualizarModo(){

    if(

        modo.value ===
        "2jogadores"

    ){

        areaDificuldade
            .style
            .display =

            "none";

    }

    else{

        areaDificuldade
            .style
            .display =

            "block";

    }

    reiniciar();

}

// =====================================
// EVENTOS
// =====================================

modo.addEventListener(

    "change",

    atualizarModo

);

simbolo.addEventListener(

    "change",

    reiniciar

);

dificuldade.addEventListener(

    "change",

    reiniciar

);

// =====================================
// INICIAR O JOGO
// =====================================

atualizarModo();
