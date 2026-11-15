document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/ocultar senha
  document.querySelectorAll(".mostrar-senha").forEach((botao) => {
    botao.addEventListener("click", () => {
      const campo = document.getElementById(botao.dataset.input);
      if (!campo) return;
      const senhaVisivel = campo.type === "text";
      campo.type = senhaVisivel ? "password" : "text";
      botao.textContent = senhaVisivel ? "👁" : "🙈";
    });
  });

  function mostrarMensagem(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.textContent = texto;
    elemento.className = `mensagem ${tipo}`;
  }

  // Login do Cliente
  const formCliente = document.getElementById("formCliente");
  if (formCliente) {
    formCliente.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const email = document.getElementById("emailCliente").value.trim();
      const senha = document.getElementById("senhaCliente").value;
      const mensagem = document.getElementById("mensagemCliente");

      if (!email || senha.length < 6) {
        mostrarMensagem(
          mensagem,
          "Informe um e-mail válido e uma senha com pelo menos 6 caracteres.",
          "erro"
        );
        return;
      }

      mostrarMensagem(mensagem, "Login do cliente validado! Redirecionando...", "sucesso");
      localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: "cliente", email }));
      
      // Redirecionamento direto
      window.location.assign("catalogo.html");
    });
  }

  // Login do Admin
  const formAdmin = document.getElementById("formAdmin");
  if (formAdmin) {
    formAdmin.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const usuario = document.getElementById("usuarioAdmin").value.trim();
      const senha = document.getElementById("senhaAdmin").value;
      const codigo = document.getElementById("codigoAdmin").value;
      const mensagem = document.getElementById("mensagemAdmin");

      if (!usuario || senha.length < 6 || codigo.length < 4) {
        mostrarMensagem(
          mensagem,
          "Preencha corretamente todas as credenciais.",
          "erro"
        );
        return;
      }

      mostrarMensagem(mensagem, "Acesso administrativo validado! Redirecionando...", "sucesso");
      localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: "admin", usuario }));
      
      // Redirecionamento direto
      window.location.assign("painel.html");
    });
  }
});