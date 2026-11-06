Projeto de Front-End Para Web
Integrantes do Grupo
Arthur Henrique Alves - RGM: 47332361

Giovanni Henrique Tartaro - RGM: 047048026

Guilherme Lima Araujo - RGM: 47058773

Julio César Rocha - RGM: 47422432

Curso: Ciência da Computação Instituição: Universidade Cidade de São Paulo (UNICID) - Campus Tatuapé Disciplina: Desenvolvimento Front-End Para Web Professor: Cid Rodrigues De Andrade Site publicado: https://giovannizinho1411.github.io/loja-de-eletronicos/

Introdução
Site institucional da KF Imports, loja de eletrônicos, acessórios e assistência técnica . Na Entrega 1 foi feita a estrutura em HTML; na Entrega 2 foram adicionados CSS, JavaScript, mais páginas e recursos multimídia.

Objetivo: apresentar a loja, seus produtos, a assistência técnica e os meios de contato, facilitando o acesso dos clientes às informações.

Desenvolvimento
Entrevista com a organização
O grupo fez uma reunião remota via Google Meet com o proprietário, Kaique Vieira. Ele contou que a loja nasceu da demanda por produtos importados de qualidade e que o diferencial é o atendimento personalizado e a garantia de autenticidade. Ficou combinado que o site teria página inicial, catálogo por categorias e contato com endereço, horário e redes sociais.

Comprovação de Contato: 
<img width="208" height="449" alt="image" src="https://github.com/user-attachments/assets/6139051d-1adb-4552-be06-cd92359f5cf0" />




Estrutura do site
São 10 páginas com o mesmo menu: index.html e, em paginas/, celulares, notebooks, games, acessorios, assistencia, sobre, multimidia, orcamento e contato. As pastas são css/, js/ e assets/ (img/, audio/, video/).

Requisitos técnicos atendidos: HTML semântico, formulários com validação nativa do HTML5, vídeo e áudio em multimidia.html, SVG em assistencia.html, um CSS único e JavaScript (carrinho, pesquisa, selo de desconto e newsletter).

Processo de desenvolvimento

Estrutura: mesmo cabeçalho, menu e rodapé em todas as páginas; uma página por categoria; orçamento separado do contato; um único CSS e um único JS.

Conteúdo: veio da entrevista com o Kaique. 

Desafios: manter 10 páginas consistentes, acertar os caminhos (../) das páginas dentro de paginas/, fazer o carrinho valer em todas as páginas (usando localStorage) e passar no validador do W3C.

Pesquisa de leiaute
Sites de referência analisados: Kabum e Fast Shop. 

Lojas desse tipo costumam ter menu no topo, busca em destaque, cards de produto com preço antigo riscado e botão de compra, faixa de ofertas e rodapé com contato. O site segue esse padrão, mas com visual mais limpo por ser uma loja pequena.

Paleta de cores e tipografia
A paleta azul e branca combina com a logo da loja. Foi testado o contraste (WCAG, mínimo 4,5:1):

Combinação

Contraste

Branco no azul #1558c0 (botões)

6,59:1

Branco no azul escuro #0b2a5b (cabeçalho)

14,03:1

Texto #10203a no branco

16,28:1

Texto secundário #52627d no branco

6,17:1

A fonte é Arial, por estar em praticamente todos os dispositivos e ter boa leitura. 

Uso de IA neste projeto
Modelo: Claude (Anthropic), Claude Sonnet 5.5.

Validação: 
<img width="1357" height="528" alt="image" src="https://github.com/user-attachments/assets/5df2331a-4343-4c94-8930-f71f89a7079c" />

Conclusão: Fazer o site de uma loja real nos mostrou que o conteúdo precisa vir do cliente, e não do que imaginamos: conversar com o Kaique mudou o que colocamos no site. 
Na Entrega 1 praticamos a estrutura do HTML e, na Entrega 2, vimos na prática como o CSS e o JavaScript transformam uma página simples em um site com identidade visual e interatividade.

Ao mesmo tempo, percebemos que ainda temos o que estudar em CSS, principalmente em layout, e que usamos a IA como apoio para partes do código. Por isso foi importante ler, testar e entender o que foi gerado, e não apenas copiar. A maior dificuldade foi manter 10 páginas consistentes e passar nos validadores do W3C. 
