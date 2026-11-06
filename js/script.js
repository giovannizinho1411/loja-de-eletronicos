const $ = (seletor, base = document) => base.querySelector(seletor);

const limpar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const paraNumero = (t) => parseFloat(t.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
const reais = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function criar(tag, classe, texto = '') {
  const el = document.createElement(tag);
  el.className = classe;
  el.textContent = texto;
  return el;
}

// aviso rápido
const aviso = criar('div', 'aviso');
aviso.hidden = true;
document.body.append(aviso);
let timer;

function mostrarAviso(msg) {
  aviso.textContent = msg;
  aviso.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => (aviso.hidden = true), 2500);
}

// carrinho (salvo no navegador, vale para todas as páginas)
let carrinho = { itens: 0, total: 0 };
try {
  carrinho = { ...carrinho, ...JSON.parse(localStorage.getItem('kf-carrinho')) };
} catch {}

const painel = criar('div', 'carrinho');
const resumo = document.createElement('span');
const esvaziar = criar('button', '', 'Esvaziar');
esvaziar.type = 'button';
painel.append(resumo, esvaziar);
document.body.append(painel);

function atualizar() {
  painel.hidden = carrinho.itens === 0;
  resumo.textContent = `Carrinho: ${carrinho.itens} ${carrinho.itens === 1 ? 'item' : 'itens'}, total ${reais(carrinho.total)}`;
  try {
    localStorage.setItem('kf-carrinho', JSON.stringify(carrinho));
  } catch {}
}

esvaziar.addEventListener('click', () => {
  carrinho = { itens: 0, total: 0 };
  atualizar();
  mostrarAviso('Carrinho esvaziado');
});

// produtos: selo de desconto e botão de compra
const produtos = document.querySelectorAll('.produto');

produtos.forEach((produto) => {
  const antigo = paraNumero($('del', produto).textContent);
  const atual = paraNumero($('strong', produto).textContent);
  const nome = $('h3', produto).textContent.trim();

  if (antigo > atual) {
    const desconto = Math.round((1 - atual / antigo) * 100);
    produto.prepend(criar('span', 'desconto', `-${desconto}%`));
  }

  $('button', produto).addEventListener('click', () => {
    carrinho.itens++;
    carrinho.total = Math.round((carrinho.total + atual) * 100) / 100;
    atualizar();
    mostrarAviso(`${nome} adicionado ao carrinho`);
  });
});

atualizar();

// pesquisa (só existe na página inicial)
const campo = $('#pesquisa');
if (campo) {
  const vazio = criar('p', 'sem-resultado', 'Nenhum produto encontrado. Tente buscar por outro nome.');
  vazio.hidden = true;
  $('#lista-produtos').after(vazio);

  const filtrar = () => {
    const termo = limpar(campo.value.trim());
    let achou = false;
    produtos.forEach((produto) => {
      const texto = limpar($('h3', produto).textContent + ' ' + $('p', produto).textContent);
      produto.hidden = !texto.includes(termo);
      achou ||= !produto.hidden;
    });
    vazio.hidden = achou;
  };

  campo.addEventListener('input', filtrar);
  campo.form.addEventListener('submit', (e) => {
    e.preventDefault();
    filtrar();
  });
}

// newsletter (só existe na página inicial)
const newsletter = $('#newsletter');
if (newsletter) {
  const ok = criar('p', 'mensagem-ok');
  ok.hidden = true;
  newsletter.append(ok);

  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    ok.textContent = `Cadastro feito! Enviaremos as ofertas para ${$('#email').value.trim()}.`;
    ok.hidden = false;
    newsletter.reset();
  });
}
