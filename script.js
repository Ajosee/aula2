// ========== CONTADORES LOCAIS ==========
let visitas = localStorage.getItem('visitas_irq');
if (visitas === null) visitas = 0;
visitas = Number(visitas) + 1;
localStorage.setItem('visitas_irq', visitas);
document.getElementById('contadorVisitantes').innerText = `Visitantes: ${visitas}`;

let testesIniciados = localStorage.getItem('testes_iniciados_irq');
if (testesIniciados === null) testesIniciados = 0;
document.getElementById('contadorTestes').innerText = `Testes iniciados: ${testesIniciados}`;

function incrementarTestes() {
    let atual = localStorage.getItem('testes_iniciados_irq');
    atual = atual ? Number(atual) + 1 : 1;
    localStorage.setItem('testes_iniciados_irq', atual);
    document.getElementById('contadorTestes').innerText = `Testes iniciados: ${atual}`;
}

// ========== PERGUNTAS ==========
const perguntas = [
    { texto: "Você usa autenticação em dois fatores (2FA) nas principais contas?", opcaoNao: "❌ Não uso" },
    { texto: "Suas senhas têm 12+ caracteres com letras, números e símbolos?", opcaoNao: "❌ Senhas curtas ou repetidas" },
    { texto: "Você mantém seus sistemas e aplicativos sempre atualizados?", opcaoNao: "❌ Raramente ou nunca" },
    { texto: "Você utiliza um gerenciador de senhas criptografado?", opcaoNao: "❌ Não utilizo" },
    { texto: "Você conhece a ameaça da computação quântica e já tomou medidas de proteção?", opcaoNao: "❌ Não conheço o risco" },
    { texto: "Você utiliza criptografia de ponta a ponta em aplicações sensíveis (e-mail, mensagens)?", opcaoNao: "❌ Não uso" },
    { texto: "Você já ouviu falar sobre algoritmos pós-quânticos (CRYSTALS-Kyber) e acompanha as recomendações do NIST/ITI?", opcaoNao: "❌ Não conheço" }
];
let respostas = new Array(7).fill(null);
let emailUsuario = "";

function renderizarPerguntas() {
    const container = document.getElementById("perguntasContainer");
    container.innerHTML = "";
    perguntas.forEach((p, idx) => {
        const div = document.createElement("div");
        div.classList.add("pergunta");
        div.innerHTML = `
            <p>${idx+1}️⃣ ${p.texto}</p>
            <div class="opcoes">
                <label><input type="radio" name="q${idx}" value="nao"> ${p.opcaoNao}</label>
                <label><input type="radio" name="q${idx}" value="sim"> ○ Sim</label>
            </div>
        `;
        if (respostas[idx] !== null) {
            const val = respostas[idx] ? "sim" : "nao";
            const radio = div.querySelector(`input[value="${val}"]`);
            if (radio) radio.checked = true;
        }
        const radios = div.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener("change", () => {
                respostas[idx] = (radio.value === "sim");
                atualizarProgresso();
            });
        });
        container.appendChild(div);
    });
    atualizarProgresso();
}

function atualizarProgresso() {
    const respondidas = respostas.filter(r => r !== null).length;
    document.getElementById("respondidas").innerText = respondidas;
    const percent = (respondidas / 7) * 100;
    document.getElementById("barra").style.width = percent + "%";
}

function calcularResultado() {
    if (respostas.some(r => r === null)) {
        alert("Responda todas as 7 perguntas antes de calcular.");
        return null;
    }
    const score = respostas.filter(r => r === true).length;
    const percentual = Math.round((score / 7) * 100);
    let frase = "";
    if (score <= 2) frase = "📘 Educativa: Você ainda está no início da jornada quântica. Comece ativando o 2FA e conhecendo os riscos.";
    else if (score <= 4) frase = "🚀 Motivadora: Bom caminho! Com pequenos ajustes, sua resiliência quântica vai disparar.";
    else if (score <= 6) frase = "🧠 Inteligente: Você está acima da média. Continue acompanhando as normas do ITI.";
    else frase = "🏆 Técnica: Excelente! Você domina as práticas atuais e já pensa no futuro pós-quântico. Quem age agora protege o amanhã.";
    return { score, percentual, frase };
}

function enviarEmailSimulado(score, frase) {
    if (!emailUsuario) {
        alert("E-mail não informado.");
        return;
    }
    localStorage.setItem('ultimo_email_irq', emailUsuario);
    alert(`✅ (Simulação) Resultado enviado para ${emailUsuario}\n\nSeu IRQ: ${score}/7\n${frase}\n\n(O envio real será ativado quando você configurar o EmailJS.)`);
}

// Eventos
document.getElementById("btnIniciar").addEventListener("click", () => {
    const email = document.getElementById("userEmail").value.trim();
    const consent = document.getElementById("lgpdConsent").checked;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email) || !consent) {
        document.getElementById("erroEmail").style.display = "block";
        return;
    }
    document.getElementById("erroEmail").style.display = "none";
    emailUsuario = email;
    localStorage.setItem('email_usuario_irq', emailUsuario);
    incrementarTestes();

    document.getElementById("emailSection").style.display = "none";
    document.getElementById("perguntasArea").style.display = "block";
    renderizarPerguntas();
});

document.getElementById("btnCalcular").addEventListener("click", () => {
    const res = calcularResultado();
    if (res) {
        document.getElementById("resultadoArea").style.display = "block";
        document.getElementById("irqScore").innerHTML = `Seu IRQ: ${res.score}/7 (${res.percentual}%)`;
        document.getElementById("fraseResultado").innerHTML = res.frase;
        window.ultimoScore = res.score;
        window.ultimaFrase = res.frase;
    }
});

document.getElementById("btnEnviarEmail").addEventListener("click", () => {
    if (window.ultimoScore !== undefined) {
        enviarEmailSimulado(window.ultimoScore, window.ultimaFrase);
    } else {
        alert("Calcule o IRQ primeiro.");
    }
});

document.getElementById("btnCopiar").addEventListener("click", () => {
    if (window.ultimoScore !== undefined) {
        const texto = `Meu IRQ: ${window.ultimoScore}/7\n${window.ultimaFrase}`;
        navigator.clipboard.writeText(texto);
        alert("Resultado copiado!");
    } else alert("Nenhum resultado para copiar.");
});

document.getElementById("btnWhatsapp").addEventListener("click", () => {
    if (window.ultimoScore !== undefined) {
        const texto = `Meu IRQ: ${window.ultimoScore}/7 - ${window.ultimaFrase}`;
        const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    } else alert("Calcule o IRQ primeiro.");
});

document.getElementById("voltarTopo").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

let dark = false;
document.getElementById("darkModeBtn").addEventListener("click", () => {
    dark = !dark;
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
});

let high = false;
document.getElementById("highContrastBtn").addEventListener("click", () => {
    high = !high;
    if (high) document.body.classList.add("high-contrast");
    else document.body.classList.remove("high-contrast");
});

let fontSize = 100;
document.getElementById("increaseFont").addEventListener("click", () => {
    if (fontSize < 150) fontSize += 10;
    document.body.style.fontSize = fontSize + "%";
});
document.getElementById("decreaseFont").addEventListener("click", () => {
    if (fontSize > 70) fontSize -= 10;
    document.body.style.fontSize = fontSize + "%";
});
