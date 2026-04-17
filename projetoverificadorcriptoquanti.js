// ========== 1. ARRAY DE PROJETOS (RENDERIZAÇÃO DINÂMICA) ==========
const projetos = [
    {
        titulo: "Simulador de Ataque Quântico",
        descricao: "Ferramenta interativa que demonstra como um computador quântico quebra a criptografia RSA em minutos. Educativa e impactante.",
        tecnologias: ["JavaScript", "WebAssembly", "Qiskit"],
        imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=Simulador+Quântico",
        link: "https://github.com/antoniojbsilva/simulador-quantico"
    },
    {
        titulo: "Guia de Migração Pós-Quântica – ITI",
        descricao: "Documento interativo com cronograma e algoritmos recomendados pelo Instituto Nacional de Tecnologia da Informação.",
        tecnologias: ["HTML", "CSS", "Markdown", "LGPD"],
        imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=Guia+ITI",
        link: "https://github.com/antoniojbsilva/guia-iti-posquantico"
    },
    {
        titulo: "Monitor da Estratégia E-Ciber",
        descricao: "Dashboard que acompanha em tempo real os indicadores da Estratégia Nacional de Cibersegurança (Decreto 12.573/2025).",
        tecnologias: ["React", "D3.js", "API Gov"],
        imagem: "https://placehold.co/600x400/0a1c2a/4caf50?text=E-Ciber+Monitor",
        link: "https://github.com/antoniojbsilva/monitor-eciber"
    }
];

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