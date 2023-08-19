document.addEventListener("DOMContentLoaded", function () {
    let gruposAbas = document.querySelectorAll('[js-bloco-ativo]');
    gruposAbas.forEach(grupo => {
        //seta os recursos iniciais de acessibilidade
        setarRecursosAcessibilidade(grupo);

        //ativa o button caso o bloco ativo esteja setado, do contrário ativa o bloco 1
        let elementoAtivo = grupo.getAttribute('js-bloco-ativo');
        if (elementoAtivo) {
            ativarBloco(grupo, elementoAtivo);
        } else {
            ativarBloco(grupo, '1');
        }
    });

    let btnNavegacao = document.querySelectorAll('[js-btn-bloco]');
    btnNavegacao.forEach(elemento => {
        elemento.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let idBlocoAtivar = elemento.getAttribute('js-btn-bloco');
            let contexto = elemento.closest('[js-bloco-ativo]');

            desativarBlocos(contexto);
            ativarBloco(contexto, idBlocoAtivar);
        });
    });
});

function setarRecursosAcessibilidade(grupo) {
    grupo.querySelector('[js-bloco-navegacao]').setAttribute('role', 'tablist');
    let botoesGrupo = grupo.querySelectorAll('[js-btn-bloco]');
    botoesGrupo.forEach(botaoGrupo => {
        let idBotao = AbaRandomId();
        let idBloco = AbaRandomId();
        let codBotaoGrupo = botaoGrupo.getAttribute('js-btn-bloco');
        let blocoBotao = grupo.querySelector(`[js-bloco="${codBotaoGrupo}"]`);

        botaoGrupo.setAttribute('role', 'tab');
        botaoGrupo.setAttribute('id', idBotao);
        botaoGrupo.setAttribute('aria-selected', 'false');
        botaoGrupo.setAttribute('aria-controls', idBloco);

        blocoBotao.setAttribute('role', 'tabpanel');
        blocoBotao.setAttribute('id', idBloco);
        blocoBotao.setAttribute('aria-labelledby', idBotao);
    });
}

function desativarBlocos(grupo) {
    let botoes = grupo.querySelectorAll('[js-btn-bloco]');
    botoes.forEach(botao => {
        let codBotao = botao.getAttribute('js-btn-bloco');
        let blocoBotao = grupo.querySelector(`[js-bloco="${codBotao}"]`);

        botao.setAttribute('aria-selected', 'false');
        botao.removeAttribute('tabindex');
        botao.classList.remove('ativo');

        blocoBotao.removeAttribute('tabindex');
    });
}

function ativarBloco(grupo, idBlocoAtivar) {
    let botaoAtivo = grupo.querySelector(`[js-btn-bloco="${idBlocoAtivar}"]`);
    let blocoAtivo = grupo.querySelector(`[js-bloco="${idBlocoAtivar}"]`);

    //ativaElementos
    grupo.querySelectorAll('[js-btn-bloco]').forEach(e => {
        e.classList.remove('ativo');
    });

    botaoAtivo.classList.add('ativo');
    grupo.setAttribute('js-bloco-ativo', idBlocoAtivar);

    //recursos de acessibilidade
    botaoAtivo.setAttribute('aria-selected', 'true');
    botaoAtivo.setAttribute('tabindex', '-1');
    blocoAtivo.setAttribute('tabindex', '0');
}

function AbaRandomId() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return 'aba-' + s4() + s4() + '-' + s4() + '-' + s4();
}