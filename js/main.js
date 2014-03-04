/**
 * Created by ramos on 01/03/14.
 */

var ponteiro = 0;
var lista_reproducao;
var lista_reproducao_blobs = new Array();

function fct_btplay() {

    if (lista_reproducao[ponteiro]) {
        document.getElementById('nome_arquivo').innerHTML = (lista_reproducao[ponteiro].name);

        cria_objeto_audio(ponteiro)

    } else {
        // alert('Fim da lista de reprodu\u00e7\u00e3o');
        ponteiro = 0;
        fct_btplay();
    }
}

function fct_btnext() {
    ++ponteiro;
    fct_btplay();
}

function cria_objeto_audio(indicador){
    if (lista_reproducao_blobs[indicador]) {             // verifica se existe um endereco para o blob
        var musica = document.createElement('audio');    // cria um elemento "audio"
        musica.src = lista_reproducao_blobs[indicador];  // informa o endereco do blob
        musica.id = "player";                           // identifica o elemento
        musica.controls = true;                         // define o parâmetro "controls" do elemento
        musica.autoplay = true;                         // define o parâmetro "autoplay" do elemento

        var div_audio = document.getElementById('box_controles');
        while (div_audio.hasChildNodes()) {                  // remove todos os elementos filhos
            div_audio.removeChild(div_audio.lastChild);
        } //while

        div_audio.appendChild(musica);
        document.getElementById('player').play();

    }
}

document.addEventListener("DOMContentLoaded", function(){  //substituto do jquery "$(document).ready"
    document.getElementById('btplay').onclick = fct_btplay;  // define funcao a ser chamada pelo botao
    document.getElementById('btnext').onclick = fct_btnext;  // define funcao a ser chamada pelo botao
    var lista_arquivos = document.getElementById('abrir_arquivo');
    lista_arquivos.addEventListener("change", function(event){
        // quando os arquivos forem selecionados (evento "change"), executa essa funcao)
        var i = 0;
        lista_reproducao = lista_arquivos.files;
        var len = lista_reproducao.length;
        var lista = '<ul>';



        for(; i<len; i++){
            lista = lista.concat('<li>',lista_reproducao[i].name,'</li>');
            var getBlobURL = window.webkitURL && webkitURL.createObjectURL.bind(webkitURL);
            lista_reproducao_blobs[i] = getBlobURL(lista_reproducao[i]);
        };

        lista = lista.concat('</ul>');
        document.getElementById('box_lista_reproducao').innerHTML = lista;

    });
});


/**
 * Check if the navigator supports Audio
 */
/*
 function testNavigator() {
    var context;
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        alert('AudioContext not supported. :(');
        //throw new Error('AudioContext not supported. :(');
    }
}  */