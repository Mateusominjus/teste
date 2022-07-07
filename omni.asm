
;; anos morais
mov tipo bool
mov nome danos_morais
mov pergunta "ha pedido de danos morais?"
mov acao mostrar 
mov default 
syscall



;;valor dos danos morais 
cmp $danos_morais true 
jne _end

    mov tipo bool
    mov nome pedido_em_salarios_minimos
    mov pergunta "O pedido foi quantificado em salários mínimos?"
    mov acao mostrar 
    mov default 
    syscall

    cmp $pedido_em_salarios_minimos true 
    jne _end0  
        mov tipo texto
        mov nome quantidade_salarios_minimos
        mov pergunta "Informe a quantidade de salarios mínimos"
        mov acao mostrar 
        mov default
        syscall
    _end0

    cmp $pedido_em_salarios_minimos false
    jne _end 
        mov tipo texto
        mov nome valor_danos_morais
        mov pergunta "Informe o valor dos danos morais"
        mov acao mostrar 
        mov default
        syscall
_end

;; danos materiais
mov tipo bool
mov nome danos_materiais
mov pergunta "ha pedido de danos materiais"
mov acao mostrar 
mov default 
syscall

cmp $danos_materiais true 
jne _end 
    mov tipo "dinheiro"
    mov nome valor_danos_materiais
    mov pergunta "Informe o valor dos danos materiais"
    mov acao mostrar 
    syscall
_end

mov acao print 

cmp $danos_morais true 
jne _end1
    mov texto "Ha pedido de danos morais no processo"   
    syscall

    cmp $pedido_em_salarios_minimos true 
    jne _end0  
        mov texto " quantificado em ("   
        syscall
        mov texto $quantidade_salarios_minimos
        syscall
        mov texto ")salarios mínimos "
        syscall
    _end0
    cmp $pedido_em_salarios_minimos false 
    jne _end1 
        mov texto " no valor de RS ("   
        syscall
        mov texto $valor_danos_morais
        syscall
        mov texto ") reais"
        syscall
_end1

cmp $danos_materiais true 
jne _end 
    mov texto "<br> ha pedido de danos materias no processo no valor de "   
    syscall
    mov texto $valor_danos_materiais
    syscall
    mov texto "reais"
    syscall
_end