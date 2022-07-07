let registradores = {
    tipo:null,
    texto:'',
    nome:null,
    pergunta:null,
    acao:null,
    default:null,
    comparacao:null,
    comparado:null,
    skip_flag:null 
}
let data  = {

}

function registra_valor(linha){
    let valor = linha.slice(2).join(' ').trim()
    registradores[linha[1].trim()] = valor

    
}
function comparar_valor(linha){
    let comparacao = linha[1].trim()
    if(comparacao[0] == '$'){
        comparacao = data[comparacao.substr(1)]
    }
    registradores.comparacao = comparacao
    registradores.comparado = linha.slice(2).join(' ').trim()
}



function definir_pulo(linha){
    const instrucao =  linha[0]
    const comparacao = registradores.comparacao
    const comparado = registradores.comparado
    
    registradores.skip_flag = false
  
    if(instrucao == 'jne'){
        if(comparacao !=  comparado){
          registradores.skip_flag =  linha[1]
        }
    }
    if(instrucao == 'je'){
        if(comparacao ==  comparado){
          registradores.skip_flag =  linha[1]   
        }
    }

    if(instrucao == 'jng'){
        if( parseInt(comparacao) <  parseInt(comparado)){
          registradores.skip_flag = linha[1]   
        }
    }

    if(instrucao == 'jg'){
        if( parseInt(comparacao) >   parseInt(comparado)){
          registradores.skip_flag =  linha[1]   
        }
    } 

}

function syscall(){
    acao = registradores.acao

    if(acao == "mostrar"){
        const nome = registradores.nome
        const pergunta = registradores.pergunta
        
        if( registradores.tipo == "bool"){
            checked_sim = ''
            checked_nao = ''
            
            if(data[nome] === 'true'){
                checked_sim = 'checked'
            }
            else if(data[nome] === 'false'){
                checked_nao = 'checked'
            }
            else if(registradores.default  === "true"){
                data[nome] ='true'
                checked_sim = 'checked' 
            }
            else if(registradores.default === "false"){
                data[nome] = 'false'
                checked_nao = 'checked' 
            }


            cria_boleano(nome,pergunta,checked_sim,checked_nao)
        }

        else{
            if(data[nome] != null){
                var  valor = data[nome] 
            }
            else{
                valor = registradores.default
            }
            cria_string(nome,pergunta,valor)
        }

            
        
    }
    if(acao == "print"){
        texto_a_adicionar =  registradores.texto
        if(texto_a_adicionar[0] == "$"){
            texto_a_adicionar =  data[texto_a_adicionar.substr(1)]
        }
        document.getElementById("textos").innerHTML+=texto_a_adicionar
    }
    


}

function render_stack(){
    stack = document.getElementById("nasm").value
    stack = stack.replaceAll('"','')
    stack = stack.replaceAll('  ',' ')

    document.getElementById("formularios").innerHTML = ""

    document.getElementById("textos").innerHTML = ""
    instrucoes = stack.split('\n')


    instrucoes.forEach(element => {
        if(element[0] == ';'){
            return 
        }        
        linha = element.split(' ')
        linha = linha.filter(l=>l!='')
        instrucao = linha[0]
        
        
        if(!instrucao){
            return 
        }
        
        if(registradores.skip_flag){
            if (instrucao == registradores.skip_flag ){
                registradores.skip_flag = false 
            }
            return 
        }

        if(instrucao == 'mov'){
            registra_valor(linha)
        }

        if(instrucao == 'cmp'){
            comparar_valor(linha)
        }

        if(instrucao[0] == 'j'){
            definir_pulo(linha)
        }

        if(instrucao == "syscall"){
            syscall()
        }
    });

}