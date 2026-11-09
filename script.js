let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('total-carrinho');
    
    lista.innerHTML = ''; // Limpa a lista antes de renderizar
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.nome}</span> <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>`;
        lista.appendChild(li);
    });
    
    totalElemento.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione alguma bebida antes de finalizar.");
        return;
    }
    
    alert(`Pedido finalizado com sucesso!\nTotal a pagar: R$ ${total.toFixed(2).replace('.', ',')}\nObrigado por comprar na Adega Embu!`);
    
    // Zera o carrinho após o pedido
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}