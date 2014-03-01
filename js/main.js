/**
 * Created by ramos on 01/03/14.
 */

var ponteiro = 0;
var lista_reproducao;

function fct_btplay() {
    if (lista_reproducao[ponteiro]) {
    alert(lista_reproducao[ponteiro].name);
    } else {
    alert('Fim da lista de reprodu\u00e7\u00e3o');
    --ponteiro;
    }
}

function fct_btnext() {
    ++ponteiro;
    fct_btplay();
}

function chama_myinput() {
    document.getElementById('nome_arquivo').innerHTML = document.getElementById('abrir_arquivo').value;
}

function prepara_som() {
    var contexto_som = new webkitAudioContext(); // tipo utilizado pelo Chrome
    return contexto_som;
}

function transforma_som(contexto_som, bytes_som) {
    // cria origem do som
    origem_som = contexto_som.createBufferSource();
    // lê o arquivo de forma crua mesmo
    buffer_som = contexto_som.createBuffer(bytes_som,true);
    // coloca os dados do buffer no objeto
    origem_som.buffer = buffer_som;
    // conecta a origem (bytes) ao destino (caixa de som)
    origem_som.connect(contexto_som.destination);
    origem_som.start(0);
}

document.addEventListener("DOMContentLoaded", function() {  //substituto do jquery "$(document).ready"
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
    };

    lista = lista.concat('</ul>');
    document.getElementById('box_lista_reproducao').innerHTML = lista;
    //transforma_som(prepara_som(), );

    });
});
