document.addEventListener("DOMContentLoaded", function () {
    let gruposAbas = document.querySelectorAll('[js-bloco-ativo]');
    gruposAbas.forEach(grupo => {
        // Define acessibilidade para a navegação
        setarRecursosAcessibilidade(grupo);

        // Ativa a aba inicial
        let elementoAtivo = grupo.getAttribute('js-bloco-ativo');
        if (elementoAtivo) {
            ativarBloco(grupo, elementoAtivo);
        } else {
            ativarBloco(grupo, '1');
        }
    });

    // Adiciona evento para todos os botões dentro do grupo, independentemente de onde estão
    document.querySelectorAll('[js-btn-bloco]').forEach(elemento => {
        elemento.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let idBlocoAtivar = elemento.getAttribute('js-btn-bloco');
            let contexto = elemento.closest('[js-bloco-ativo]');

            if (contexto) {
                desativarBlocos(contexto);
                ativarBloco(contexto, idBlocoAtivar);
            }
        });
    });
});

function setarRecursosAcessibilidade(grupo) {
    let botoesGrupo = grupo.querySelectorAll('[js-btn-bloco]');
    let blocosGrupo = grupo.querySelectorAll('[js-bloco]');

    botoesGrupo.forEach(botaoGrupo => {
        botaoGrupo.setAttribute('role', 'tab');
        botaoGrupo.setAttribute('aria-selected', 'false');
        botaoGrupo.setAttribute('tabindex', '-1');
    });

    blocosGrupo.forEach(bloco => {
        bloco.setAttribute('role', 'tabpanel');
        bloco.setAttribute('tabindex', '0');
    });
}

function desativarBlocos(grupo) {
    let botoes = grupo.querySelectorAll('[js-btn-bloco]');
    let blocos = grupo.querySelectorAll('[js-bloco]');

    botoes.forEach(botao => {
        botao.setAttribute('aria-selected', 'false');
        botao.removeAttribute('tabindex');
        botao.classList.remove('ativo');
    });

    blocos.forEach(bloco => {
        bloco.classList.remove('ativo'); // Removemos a classe que identifica o bloco ativo
    });
}

function ativarBloco(grupo, idBlocoAtivar) {
    let blocosAtivar = grupo.querySelectorAll(`[js-bloco="${idBlocoAtivar}"]`);
    let botoesAtivar = grupo.querySelectorAll(`[js-btn-bloco="${idBlocoAtivar}"]`);

    if (blocosAtivar.length > 0) {
        grupo.setAttribute('js-bloco-ativo', idBlocoAtivar);

        // Adiciona a classe "ativo" nos blocos correspondentes
        blocosAtivar.forEach(bloco => {
            bloco.classList.add('ativo');
        });

        // Ativa todos os botões correspondentes
        botoesAtivar.forEach(botao => {
            botao.classList.add('ativo');
            botao.setAttribute('aria-selected', 'true');
            botao.setAttribute('tabindex', '0');
        });
    }
}

function AbaRandomId() {
    return 'aba-' + Math.random().toString(36).substr(2, 9);
}