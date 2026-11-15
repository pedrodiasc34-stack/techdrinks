// Verifica se o cliente está logado
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado || usuarioLogado.tipo !== "cliente") {
  window.location.href = "index.html";
} else {
  document.getElementById("boasVindasCliente").textContent = `Cliente: ${usuarioLogado.email}`;
}

let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("valorTotal");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerDoCarrinho(${index})">X</button>`;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um item ao carrinho antes de finalizar.");
    return;
  }

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  const novoPedido = {
    id: Math.floor(1000 + Math.random() * 9000),
    cliente: usuarioLogado.email,
    itens: carrinho.map((item) => item.nome),
    total: total,
    status: "Pendente",
    horario: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  };

  pedidos.push(novoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  carrinho = [];
  atualizarCarrinho();
  alert(`Pedido #${novoPedido.id} enviado com sucesso!`);
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}