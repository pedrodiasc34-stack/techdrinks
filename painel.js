// Verifica se o usuário é realmente admin
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
  window.location.href = "index.html";
} else {
  document.getElementById("boasVindasAdmin").textContent = `Operador: ${usuarioLogado.usuario}`;
}

function carregarPedidosAdmin() {
  const container = document.getElementById("listaPedidos");
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    container.innerHTML = "<p>Nenhum pedido registrado até o momento.</p>";
    return;
  }

  // Mostra os pedidos mais recentes primeiro
  container.innerHTML = pedidos
    .slice()
    .reverse()
    .map((pedido) => {
      const classeStatus = pedido.status === "Concluído" ? "status-concluido" : "status-pendente";
      const botaoConcluir =
        pedido.status !== "Concluído"
          ? `<button class="btn-concluir" onclick="concluirPedido(${pedido.id})">Marcar como Concluído</button>`
          : "";

      return `
        <div class="card-pedido">
          <strong>Pedido #${pedido.id}</strong> — Horário: ${pedido.horario}<br>
          <strong>Cliente:</strong> ${pedido.cliente}<br>
          <strong>Itens:</strong> ${pedido.itens.join(", ")}<br>
          <strong>Total:</strong> R$ ${pedido.total.toFixed(2)}<br>
          <strong>Status:</strong> <span class="${classeStatus}">${pedido.status}</span><br>
          ${botaoConcluir}
        </div>
      `;
    })
    .join("");
}

function concluirPedido(id) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const atualizados = pedidos.map((p) => {
    if (p.id === id) p.status = "Concluído";
    return p;
  });

  localStorage.setItem("pedidos", JSON.stringify(atualizados));
  carregarPedidosAdmin();
}

function limparPedidos() {
  if (confirm("Deseja apagar todos os pedidos registrados?")) {
    localStorage.removeItem("pedidos");
    carregarPedidosAdmin();
  }
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

// Carrega os pedidos assim que a página abre
carregarPedidosAdmin();