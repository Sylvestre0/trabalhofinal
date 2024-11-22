(function() {
    const bottons = document.querySelectorAll(".botton");
    const caixaLeft = document.querySelector(".sideleft-bar");
    const caixaRight = document.querySelector(".sideright-bar");
    const caixaFooter = document.querySelector("footer");
    const content = document.querySelector(".content");
    const header = document.querySelector("header")

    let isLeftOpen = true;
    let isRightOpen = true;

    function adjustContent() {
        let newWidth = 100;
        if (isLeftOpen) newWidth -= 18;
        if (isRightOpen) newWidth -= 18;
        
        header.style.width = `${newWidth}vw`
        header.style.left = isLeftOpen ? "18vw" : "0";
        content.style.width = `${newWidth}vw`;
        content.style.left = isLeftOpen ? "18vw" : "0";
    }

    function toggleBar(direcao) {
        if (direcao === "left") {
            caixaLeft.classList.toggle("openleft");
            isLeftOpen = !isLeftOpen; 
        } else if (direcao === "right") {
            caixaRight.classList.toggle("openright");
            isRightOpen = !isRightOpen;
        } else if (direcao === "botton") {
            caixaFooter.classList.toggle("openbotton");
            content.classList.toggle("footerclose")
        }
        adjustContent();    
    }

    function options(botton) {
        botton.addEventListener("click", (event) => {
            const direcao = event.target.getAttribute("data-move");
            toggleBar(direcao);
        });
    }

    bottons.forEach(botton => {
        options(botton);
    });

    adjustContent();
})();

document.querySelectorAll('.botoes').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-value');
        const content = document.querySelector(".options");

        document.querySelectorAll('.botoes').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        if (tab === "6") {
            content.classList.toggle("closearea");
        } else {
            updateContent(tab, content);
        }
    });
});

function updateContent(tab, content) {
    const contentAreas = document.querySelectorAll(".optionvalue");

    contentAreas.forEach(section => {
        section.style.display = "none";
    });

    const targetSection = contentAreas[parseInt(tab) - 1];
    if (targetSection) {
        if (content.classList.contains("closearea")) content.classList.toggle("closearea");
        targetSection.style.display = "block";
    }
}


function processarElemento(elemento, nivel = 0, resultado = [], left = 7) {
    // Adiciona a tag de abertura
    resultado.push(`
        <div class="layer">
            <div class="cube" style="left: ${left}%; background-color: #e3f2fd;">
                <span>&lt;${elemento.tagName.toLowerCase()}&gt;</span>
                <span>${nivel}</span>
            </div>
        </div>
    `);

    // Itera sobre os filhos do elemento
    for (const filho of elemento.children) {
        processarElemento(filho, nivel + 1, resultado, left + 8);
    }

    // Adiciona a tag de fechamento após processar os filhos
    resultado.push(`
        <div class="layer">
            <div class="cube" style="left: ${left}%; background-color: #ffcdd2;">
                <span>&lt;/${elemento.tagName.toLowerCase()}&gt;</span>
                <span>${nivel}</span>
            </div>
        </div>
    `);

    return resultado;
}

// Seleciona o elemento principal
const main = document.querySelector(".content");

// Seleciona o contêiner onde você quer adicionar os elementos
const sideLeftBar = document.querySelector(".container");

// Função para atualizar o conteúdo
function atualizarConteudo() {
    if (main && sideLeftBar) {
        // Processa o conteúdo e acumula o resultado
        const resultado = processarElemento(main);

        // Adiciona todo o conteúdo ao .sideleft-bar de uma vez
        sideLeftBar.innerHTML = resultado.join('');
    } else {
        console.error('Elemento ".content" ou ".teste" não encontrado!');
    }
}

// Executa a função pela primeira vez imediatamente
atualizarConteudo();

// Define o intervalo para executar a função a cada 3 segundos (3000ms)
setInterval(atualizarConteudo, 3000);
