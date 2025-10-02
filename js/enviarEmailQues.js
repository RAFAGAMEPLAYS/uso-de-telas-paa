(function(){
  // Inicializa o EmailJS com sua PUBLIC KEY
  emailjs.init("w6pNQGSkI0EqmF__J");
})();

document.getElementById("formulario").addEventListener("submit", function(e){
  e.preventDefault();

  // Coleta dos valores
  const userEmail = document.getElementById("email").value;
  const controle = document.querySelector("input[name='controle']:checked")?.value || "Não respondeu";
  const telas = [...document.querySelectorAll("input[name='tela']:checked")].map(el => el.value).join(", ") || "Nenhuma";
  const tempo = document.querySelector("select[name='tempo']").value || "Não respondeu";
  const impacto = document.querySelector("input[name='impacto']:checked")?.value || "Não respondeu";

  // Gera dica personalizada
  let dica = "";
  if(tempo === "Mais de 6h") {
    dica = "🚨 Você passa muito tempo em telas. Tente reduzir para cuidar melhor da sua saúde!";
  } else if(impacto === "Sim") {
    dica = "⚡ Desconectar antes de dormir pode melhorar seu sono e concentração.";
  } else {
    dica = "👍 Continue com seus bons hábitos digitais!";
  }

  // Envia para o EmailJS
  emailjs.send("service_usi3m6k", "template_vnhxc4c", {
    to_email: userEmail,
    controle: controle,
    telas: telas,
    tempo: tempo,
    impacto: impacto,
    dica: dica
  }).then(() => {
    alert("✅ Respostas enviadas! Verifique seu e-mail 📩");
  }).catch((err) => {
    console.error("Erro:", err);
    alert("❌ Erro ao enviar. Veja o console para detalhes.");
  });
});