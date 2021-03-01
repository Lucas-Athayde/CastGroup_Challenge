'use strict'

var dropdownClientes = document.querySelector('.menu-dropdown-clientes')
var dropdownProdutos = document.querySelector('.menu-dropdown-produtos')
var dropdownQtdProdutos = document.querySelector('.qtdProduto')
var btnOrcamento = document.querySelector('.btnOrcamento')
var print = document.querySelector('.printar')
var btnconfirmarVenda = document.querySelector('.confirmarVenda')

const produtos = JSON.parse(localStorage.getItem('produto'))
const clientes = JSON.parse(localStorage.getItem('cliente'))

for (let i = 0; i < localStorage.getItem('produto').length; i++) {

    if (produtos[i] !== undefined) {
        if (produtos[i]['qtd'] !== 0) {
            dropdownProdutos.innerHTML += `<option value = '${produtos[i]['id']}'> ${produtos[i]['descProduto']} </option>`
        } else {
            dropdownProdutos.innerHTML += `<option value = '${produtos[i]['id']}'> ${produtos[i]['descProduto'] + ' --INDISPONIVEL--'} </option>`
        }
    }
}

for (let i = 0; i < localStorage.getItem('cliente').length; i++) {

    if (clientes[i] !== undefined) {
        dropdownClientes.innerHTML += `<option value = '${clientes[i]['id']}'> ${clientes[i]['nomeCompleto']} </option>`
    }
}


dropdownProdutos.addEventListener("change", function () {
    dropdownQtdProdutos.innerHTML = `<option>Quantidade desejada</option>`
    if (produtos[dropdownProdutos.value] !== undefined) {
        let quantidadeItems = produtos[dropdownProdutos.value]['qtd']
        for (let i = 1; i <= quantidadeItems; i++) {
            dropdownQtdProdutos.innerHTML += `<option value = '${i}'> ${i} </option>`
        }
    }
}
)

const displayDados = function () {

    if (dropdownClientes.value !== '' && dropdownQtdProdutos.value > 0) {
        let nCliente = clientes[dropdownClientes.value];
        let nProduto = produtos[dropdownProdutos.value];
        let precoUnd = produtos[dropdownProdutos.value]['preco'];
        let desconto = (produtos[dropdownProdutos.value]['descontoMax'])
        let qtdEscolhida = dropdownQtdProdutos.value
        let valorTotal = Math.trunc(qtdEscolhida * precoUnd).toFixed(2)
        let valorcomDesconto = Math.trunc(valorTotal - ((precoUnd * (desconto / 100)) * qtdEscolhida)).toFixed(2)

        print.innerHTML = `
        Nome: ${nCliente['nomeCompleto']} <br>
        CPF: ${nCliente['cpfUsuario']} <br>
        Genero: ${nCliente['generoUsuario']} <br>
        Endereço: ${nCliente['enderecoUsuario']} <br>
        Produto: ${nProduto['descProduto']} <br>
        Quantidade: ${qtdEscolhida} <br>
        Preço Unidade: R$ ${precoUnd} <br>
        Desconto por unidade: ${desconto}% <br>
        Valor Total: R$ ${valorTotal} <br>
        Valor com Desconto: ${desconto > 0 ? 'R$ ' + valorcomDesconto : 'Não há desconto para este produto'}`
    } else {
        alert("Por favor, selecione uma opção em todos os campos")
    }
}
btnOrcamento.addEventListener('click', displayDados)


function checkout() {
    if (dropdownClientes.value !== '') {
        if (dropdownQtdProdutos.value > 0 && dropdownQtdProdutos.value !== undefined) {
            produtos[dropdownProdutos.value]['qtd'] -= dropdownQtdProdutos.value
            console.log(produtos)
            localStorage.setItem('produto', JSON.stringify(produtos))
            alert('Venda efetuada! Obrigado pela preferencia')
            dropdownClientes.value = ''
            dropdownProdutos.value = ''
            dropdownQtdProdutos.value = ''
            location.reload();
        } else {
            alert("Por favor, selecione uma quantia")
        }
    } else {
        alert("Por favor, selecione um Cliente para realizar a venda")
    }
}
btnconfirmarVenda.addEventListener('click', checkout)


