ctx = document.getElementById('tela').getContext('2d');
let play = false;

//Variáveis Bolinha
let raioBolinha = 10;
let posXBolinha = 300;
let posYBolinha = 200;
let velocidadeBolinha = 2;
let velocidadeXBolinha = velocidadeBolinha;
let velocidadeYBolinha = velocidadeBolinha;

//Variáveis Raquete Jogador
let larguraRaquete = 5;
let comprimentoRaquete = 90;
let posXRaqueteJogador = 5;
let posYRaqueteJogador = 200-45;
let velocidadeRaquete = 30;
let pontuacaoJogador = 0;

//Variáveis Oponente
let pontuacaoOponente = 0;
let posXRaqueteOponente = 600-5 - larguraRaquete;
let posYRaqueteOponente = 200-45;
let velocidadeYOponente;

//Elementos html
let jogador = document.querySelector('#pontuacaoJogador');
let oponente = document.querySelector('#pontuacaoOponente');
let botaoPlay = document.querySelector('#play');
let botaoPause = document.querySelector('#pause');
let tela = document.querySelector('#tela');


corFundo();
setInterval(game, 10);

document.addEventListener('keypress', function(event){
    if(event.key == 'w' && posYRaqueteJogador > 20){
        posYRaqueteJogador -= velocidadeRaquete;
    }
    if(event.key == 's' && posYRaqueteJogador < 300){
        posYRaqueteJogador += velocidadeRaquete;
    }
});

botaoPlay.addEventListener('click', ()=>{
    tela.focus();
    play = true;

    
});

botaoPause.addEventListener('click', ()=>{
    play = false;
});


let caminhoCorreto = true;
let aleatorio = .5;
setInterval(probabilidade, 5000);

function probabilidade(){
    aleatorio = Math.random();
    if(aleatorio > 0.83){
        caminhoCorreto = false;
    }else{
        caminhoCorreto = true;
    }
}

//Funções
function movimentaRaqueteOponente(){
    if(((posYBolinha - raioBolinha - comprimentoRaquete/2) >= 0) && ((posYBolinha) <= 395 - comprimentoRaquete/2)){
        
        if(caminhoCorreto){
            posYRaqueteOponente = (posYBolinha - comprimentoRaquete/2);
        }else{
            posYBolinha<200? posYRaqueteOponente =  posYBolinha + 10: posYRaqueteOponente = posYBolinha - comprimentoRaquete -10;
        }
        
    }
    
}

function colisaoRaqueteJogador(){
    if(posXBolinha <= (larguraRaquete + posXRaqueteJogador + raioBolinha) && (posYBolinha >= posYRaqueteJogador) && (posYBolinha <= (posYRaqueteJogador+comprimentoRaquete))){
        velocidadeBolinha *= -1;
        velocidadeXBolinha *= -1;
    }
}

function colisaoRaqueteOponente(){
    if(posXBolinha == (590 - raioBolinha) && (posYBolinha >= posYRaqueteOponente) && (posYBolinha <= (posYRaqueteOponente+comprimentoRaquete))){
        velocidadeXBolinha *= -1;
    }
}

function pontosOponente(){
    if(posXBolinha - raioBolinha ==0){
        pontuacaoOponente +=1;
        oponente.innerHTML = pontuacaoOponente;
    } else if(posXBolinha + raioBolinha == 600){
        pontuacaoJogador +=1;
        jogador.innerHTML = pontuacaoJogador;
    }
}

function desenhaRaquete(posX, posY, largura, comprimento){
    ctx.fillStyle = 'black';
    ctx.fillRect(posX, posY, largura, comprimento)
}

function corFundo(){
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, 600, 400);
}


function bolinha(raio, posX, posY){
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(posX, posY, raio, 0, 2*3.14);
    ctx.fill();
}

function limpaTela(){
    ctx.clearRect(0, 0, 600, 400);
}

function colisaoParede(){
    if(posXBolinha >= (600-raioBolinha) || posXBolinha <= raioBolinha){
        velocidadeXBolinha *= -1;
    }

    if(posYBolinha >= (400-raioBolinha) || posYBolinha <= raioBolinha){
        velocidadeYBolinha *= -1;
    }
}

function game(){
    if(play){
        limpaTela();
        corFundo();
        posXBolinha += velocidadeXBolinha;
        posYBolinha += velocidadeYBolinha;
        bolinha(raioBolinha, posXBolinha, posYBolinha);
        colisaoParede();

        desenhaRaquete(posXRaqueteJogador, posYRaqueteJogador, larguraRaquete, comprimentoRaquete);
        colisaoRaqueteJogador();
        pontosOponente();
        movimentaRaqueteOponente();
        desenhaRaquete(posXRaqueteOponente, posYRaqueteOponente, larguraRaquete, comprimentoRaquete);
        colisaoRaqueteOponente();
    }
    
}
