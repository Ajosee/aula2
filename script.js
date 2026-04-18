// ========== 1. ARRAY DE PROJETOS (COM LINKS EXTRAS) ==========
const projetos = [
  {
    titulo: "Simulador de Ataque Quântico",
    descricao: "Ferramenta interativa que demonstra como um computador quântico quebra a criptografia RSA em minutos. Educativa e impactante.",
    tecnologias: ["JavaScript", "WebAssembly", "Qiskit"],
    imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=Simulador+Quântico",
    link: "https://github.com/antoniojbsilva/simulador-quantico",
    linksExtras: [
      {
        nome: "🔗 Centro Internacional de Computação Quântica (CIQuanta)",
        url: "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/04/centro-internacional-de-computacao-quantica-no-brasil-sera-um-polo-de-inovacao-e-capacitacao"
      }
    ]
  },
  {
    titulo: "Guia de Migração Pós-Quântica – ITI",
    descricao: "Documento interativo com cronograma e algoritmos recomendados pelo Instituto Nacional de Tecnologia da Informação.",
    tecnologias: ["HTML", "CSS", "Markdown", "LGPD"],
    imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=Guia+ITI",
    link: "https://github.com/antoniojbsilva/guia-iti-posquantico",
    linksExtras: [
      {
        nome: "📄 Instrução Normativa ITI nº 35/2026 (DOU)",
        url: "https://www.in.gov.br/web/dou/-/instrucao-normativa-iti-n-35-de-30-de-janeiro-de-2026-684841143"
      },
      {
        nome: "🔗 ITI publica incorporação de algoritmos pós-quânticos",
        url: "https://www.gov.br/iti/pt-br/assuntos/noticias/indice-de-noticias/iti-publica-instrucao-normativa-que-incorpora-algoritmos-pos-quanticos-a-icp-brasil"
      }
    ]
  },
  {
    titulo: "Monitor da Estratégia E-Ciber",
    descricao: "Dashboard que acompanha em tempo real os indicadores da Estratégia Nacional de Cibersegurança (Decreto 12.573/2025).",
    tecnologias: ["React", "D3.js", "API Gov"],
    imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=E-Ciber+Monitor",
    link: "https://github.com/antoniojbsilva/monitor-eciber",
    linksExtras: [
      {
        nome: "⚖️ Decreto nº 12.573/2025 (E-Ciber)",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/D12573.htm"
      },
      {
        nome: "📚 Legislação Federal em Segurança da Informação",
        url: "https://www.gov.br/governodigital/pt-br/privacidade-e-seguranca/legislacao-federal"
      }
    ]
  }
];

// Função para gerar os links extras (se houver)
function renderizarLinksExtras(links) {
  if (!links || links.length === 0) return '';
  let html = '<div class="links-extras" style="margin-top: 1rem; border-top: 1px dashed #ccc; padding-top: 0.8rem;">';
  links.forEach(link => {
    html += `<p style="margin: 0.3rem 0;"><a href="${link.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: #0a2b3e; text-decoration: none; border-bottom: 1px dotted #4caf50;">${link.nome}</a></p>`;
  });
  html += '</div>';
  return html;
}

function renderizarProjetos() {
  const container = document.getElementById("projetos-container");
  if (!container) return;
  container.innerHTML = "";

  projetos.forEach(proj => {
    const card = document.createElement("article");
    card.classList.add("card-projeto");
    card.innerHTML = `
      <img src="${proj.imagem}" alt="${proj.titulo}" loading="lazy">
      <div class="card-conteudo">
        <h3>${proj.titulo}</h3>
        <p>${proj.descricao}</p>
        <div class="tecnologias">
          ${proj.tecnologias.map(tech => `<span class="tec-badge">${tech}</span>`).join('')}
        </div>
        <a href="${proj.link}" class="btn-projeto" target="_blank" rel="noopener">🔗 Ver no GitHub</a>
        ${renderizarLinksExtras(proj.linksExtras)}
      </div>
    `;
    container.appendChild(card);
  });
}

// ========== 2. VERIFICADOR DE RESILIÊNCIA QUÂNTICA (IRQ) ==========
function calcularIRQ() {
  const q1 = parseInt(document.getElementById("q1").value);
  const q2 = parseInt(document.getElementById("q2").value);
  const q3 = parseInt(document.getElementById("q3").value);
  const q4 = parseInt(document.getElementById("q4").value);
  const q5 = parseInt(document.getElementById("q5").value);
  
  const pontuacao = q1 + q2 + q3 + q4 + q5;
  const pontuacaoMaxima = 10;
  const percentual = (pontuacao / pontuacaoMaxima) * 100;
  
  let nivel = "", cor = "", recomendacao = "";
  
  if (percentual >= 80) {
    nivel = "🟢 Alta Resiliência Quântica";
    cor = "#1b5e20";
    recomendacao = "Parabéns! Você está entre os 20% mais preparados. Continue acompanhando as atualizações do ITI sobre criptografia pós-quântica e compartilhe conhecimento.";
  } else if (percentual >= 50) {
    nivel = "🟠 Resiliência Moderada – vulnerável a médio prazo";
    cor = "#e65100";
    recomendacao = "Você tem boas práticas, mas precisa evoluir: ative 2FA em todas as contas, use um gerenciador de senhas forte e estude o guia de migração pós-quântica do ITI.";
  } else {
    nivel = "🔴 Baixa Resiliência – risco elevado no Q-Day";
    cor = "#b71c1c";
    recomendacao = "Ações urgentes: troque senhas fracas imediatamente, ative 2FA em todas as contas, mantenha tudo atualizado e inicie seu aprendizado sobre criptografia pós-quântica (veja meu Guia ITI).";
  }
  
  const resultadoDiv = document.getElementById("resultado");
  const recomendacoesDiv = document.getElementById("recomendacoes");
  
  resultadoDiv.innerHTML = `<div style="background: ${cor}20; border-radius: 1.5rem; padding: 1rem; color: ${cor}; font-weight: bold; font-size: 1.2rem;">🧠 Índice IRQ: ${Math.round(percentual)}% – ${nivel}</div>`;
  recomendacoesDiv.innerHTML = `<strong>📌 Roteiro personalizado para você:</strong><br>${recomendacao}`;
}

// ========== 3. INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
  const btn = document.getElementById("calcularBtn");
  if (btn) btn.addEventListener("click", calcularIRQ);
});