'use strict';


let tabClientes = []
let i = 0;
const adquirirDadosCliente = function (evento) {
    evento.preventDefault();
    let dadosClientes = {
        id: i++,
        nomeCompleto: document.querySelector('.nome').value,
        cpfUsuario: Number(document.querySelector('.cpf').value),
        generoUsuario: document.querySelector('.sexo').value,
        enderecoUsuario: document.querySelector('.end').value,
    }

    if (dadosClientes.nomeCompleto && dadosClientes.cpfUsuario && dadosClientes.generoUsuario && dadosClientes.enderecoUsuario) {
        tabClientes.push(dadosClientes)
        console.log(tabClientes);
        alert("Usuario foi cadastrado");
        localStorage.setItem('cliente', JSON.stringify(tabClientes))
        document.querySelector('form').reset();
    } else {
        alert("Preencha todos campos e tente novamente")
    }

    // if (dadosClientes.nomeCompleto && dadosClientes.cpfUsuario && dadosClientes.generoUsuario && dadosClientes.enderecoUsuario) {
    //     tabClientes.push(dadosClientes)
    //     console.log(tabClientes);
    //     alert("Usuario foi cadastrado");
    //     localStorage.setItem('cliente' + dadosClientes.id, JSON.stringify(dadosClientes))
    //     document.querySelector('form').reset();
    // } else {
    //     alert("Preencha todos campos e tente novamente")
    // }

}
document.querySelector('.botaoSalvarCliente').addEventListener('click', adquirirDadosCliente)
