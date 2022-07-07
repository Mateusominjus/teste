
function defini_data(variavel,valor){
    data[variavel] = valor
    render_stack()
}

function cria_boleano(variavel,request, checked_sim='',checked_nao=''){
    let formularios  =document.getElementById("formularios")
    formularios.innerHTML+= `<div>\
    <h3> ${request} </h3>\
    <input name="sim" type="checkbox" ${checked_sim}  \
    onclick="defini_data('${variavel}','true')">\
    <label for="sim"> Sim </label>\
    <br>\
    <input name="não" type="checkbox" ${checked_nao}\
    onclick="defini_data('${variavel}','false')"
    >\
    <label for="não"> Não </label>\
    </div>`


}

function cria_string(variavel,request,texto_default){
    let formularios  =document.getElementById("formularios")
    formularios.innerHTML+= `<div>\
    <h3> ${request} </h3>\
    <input id="${variavel}" value="${texto_default}"
    onfocusout="defini_data(
            '${variavel}',
            document.getElementById('${variavel}').value
    )">\
    </div>`


}

