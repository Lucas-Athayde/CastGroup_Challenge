'use strict'

let tabProdutos = []
let x = 0;

const adquirirDadosProduto = function (evento) {

    evento.preventDefault();
    let infProduto = {
        id: x++,
        descProduto: document.querySelector('.produto').value,
        qtd: Number(document.querySelector('.qtdproduto').value),
        preco: Number(document.querySelector('.preco').value),
        descontoMax: Number(document.querySelector('.desconto').value),
    }
    if (infProduto.descProduto && infProduto.qtd && infProduto.preco) {
        tabProdutos.push(infProduto);
        console.log(tabProdutos)
        alert("Produto registrado com sucesso")
        localStorage.setItem('produto', JSON.stringify(tabProdutos))
        document.querySelector('form').reset();
    } else {
        alert("Preencha todos os campos e tente novamente")
    }
}

document.querySelector('.botaoSalvarProduto').addEventListener('click', adquirirDadosProduto)

