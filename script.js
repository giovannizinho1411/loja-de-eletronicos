/* KF Imports - comportamentos da página.
   Como usar: no <head> do HTML, abaixo do <link>, adicione:
   <script src="script.js" defer></script> */
   (function () {
    'use strict';
  
    /* ---------- Funções auxiliares ---------- */
    function normalizar(texto) {
      return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
  
    function precoParaNumero(texto) {
      return parseFloat(texto.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    }
  
    function formatarReais(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  
    function criar(tag, classe) {
      var elemento = document.createElement(tag);
      if (classe) {
        elemento.className = classe;
      }
      return elemento;
    }
  
    var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var comportamento = reduzirMovimento ? 'auto' : 'smooth';
  
    /* ---------- Rolagem suave nos links internos ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (evento) {
        var destino = link.getAttribute('href');
        if (destino === '#') {
          evento.preventDefault(); /* links ainda sem destino não pulam para o topo */
          return;
        }
        var alvo = document.querySelector(destino);
        if (alvo) {
          evento.preventDefault();
          alvo.scrollIntoView({ behavior: comportamento, block: 'start' });
        }
      });
    });
  
    /* ---------- Aviso rápido ---------- */
    var aviso = criar('div', 'aviso');
    var temporizador;
    aviso.setAttribute('role', 'status');
    aviso.hidden = true;
    document.body.appendChild(aviso);
  
    function mostrarAviso(mensagem) {
      aviso.textContent = mensagem;
      aviso.hidden = false;
      clearTimeout(temporizador);
      temporizador = setTimeout(function () {
        aviso.hidden = true;
      }, 2500);
    }
  
    /* ---------- Carrinho ---------- */
    var carrinho = { itens: 0, total: 0 };
  
    try {
      var salvo = JSON.parse(localStorage.getItem('kf-carrinho'));
      if (salvo) {
        carrinho.itens = Number(salvo.itens) || 0;
        carrinho.total = Number(salvo.total) || 0;
      }
    } catch (erro) {
      /* sem localStorage: o carrinho só dura enquanto a página estiver aberta */
    }
  
    var painel = criar('div', 'carrinho');
    var resumo = criar('span');
    var botaoEsvaziar = criar('button');
    botaoEsvaziar.type = 'button';
    botaoEsvaziar.textContent = 'Esvaziar';
    painel.appendChild(resumo);
    painel.appendChild(botaoEsvaziar);
    document.body.appendChild(painel);
  
    function atualizarCarrinho() {
      var palavra = carrinho.itens === 1 ? ' item' : ' itens';
      painel.hidden = carrinho.itens === 0;
      resumo.textContent = 'Carrinho: ' + carrinho.itens + palavra + ', total ' + formatarReais(carrinho.total);
      try {
        localStorage.setItem('kf-carrinho', JSON.stringify(carrinho));
      } catch (erro) {
        /* ignora: o carrinho continua funcionando sem salvar */
      }
    }
  
    botaoEsvaziar.addEventListener('click', function () {
      carrinho.itens = 0;
      carrinho.total = 0;
      atualizarCarrinho();
      mostrarAviso('Carrinho esvaziado');
    });
  
    /* ---------- Produtos: selo de desconto e botão "Adicionar ao carrinho" ---------- */
    var secaoProdutos = document.getElementById('produtos');
    var produtos = secaoProdutos ? secaoProdutos.querySelectorAll('article') : [];
  
    produtos.forEach(function (produto) {
      var precoAntigo = produto.querySelector('del');
      var precoAtual = produto.querySelector('strong');
      var botao = produto.querySelector('button');
      var nome = produto.querySelector('h3');
  
      if (precoAntigo && precoAtual) {
        var antigo = precoParaNumero(precoAntigo.textContent);
        var atual = precoParaNumero(precoAtual.textContent);
        if (atual > 0 && antigo > atual) {
          var percentual = Math.round((1 - atual / antigo) * 100);
          var selo = criar('span', 'desconto');
          selo.textContent = '-' + percentual + '%';
          selo.title = percentual + '% de desconto';
          produto.insertBefore(selo, produto.firstChild);
        }
      }
  
      if (botao && precoAtual && nome) {
        botao.addEventListener('click', function () {
          var preco = precoParaNumero(precoAtual.textContent);
          carrinho.itens += 1;
          carrinho.total = Math.round((carrinho.total + preco) * 100) / 100;
          atualizarCarrinho();
          mostrarAviso(nome.textContent.trim() + ' adicionado ao carrinho');
        });
      }
    });
  
    atualizarCarrinho();
  
    /* ---------- Pesquisa de produtos ---------- */
    var formPesquisa = document.querySelector('header form');
    var campoPesquisa = document.getElementById('pesquisa');
  
    if (formPesquisa && campoPesquisa && secaoProdutos) {
      var semResultado = criar('p', 'sem-resultado');
      semResultado.textContent = 'Nenhum produto encontrado. Tente buscar por outro nome.';
      semResultado.hidden = true;
      secaoProdutos.appendChild(semResultado);
  
      var filtrarProdutos = function () {
        var termo = normalizar(campoPesquisa.value.trim());
        var visiveis = 0;
  
        produtos.forEach(function (produto) {
          var nome = produto.querySelector('h3');
          var descricao = produto.querySelector('p');
          var texto = normalizar((nome ? nome.textContent : '') + ' ' + (descricao ? descricao.textContent : ''));
          var combina = texto.indexOf(termo) !== -1;
          produto.hidden = !combina;
          if (combina) {
            visiveis += 1;
          }
        });
  
        semResultado.hidden = visiveis > 0;
      };
  
      campoPesquisa.addEventListener('input', filtrarProdutos);
      formPesquisa.addEventListener('submit', function (evento) {
        evento.preventDefault();
        filtrarProdutos();
        secaoProdutos.scrollIntoView({ behavior: comportamento, block: 'start' });
      });
    }
  
    /* ---------- Cadastro de e-mail (newsletter) ---------- */
    var formNewsletter = document.querySelector('main form');
    var campoEmail = document.getElementById('email');
  
    if (formNewsletter && campoEmail) {
      var confirmacao = criar('p', 'mensagem-ok');
      confirmacao.setAttribute('role', 'status');
      confirmacao.hidden = true;
      formNewsletter.appendChild(confirmacao);
  
      formNewsletter.addEventListener('submit', function (evento) {
        evento.preventDefault();
        confirmacao.textContent = 'Cadastro feito! Enviaremos as ofertas para ' + campoEmail.value.trim() + '.';
        confirmacao.hidden = false;
        formNewsletter.reset();
      });
    }
  })();