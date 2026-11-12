# LP UniFast — Backoffice

Landing page dos produtos UniFast, recriada a partir de mocks de interface com a
skill **`img-to-html`** (repo `rtadewald/skills`), instalada em `.claude/skills/`.

**Grafia da marca: `UniFast`** (F maiúsculo) em todo texto corrido. Títulos em
caixa alta seguem `UNIFAST`; slugs e nomes técnicos seguem `unifast`.

## Skills instaladas

| Skill | Papel |
|---|---|
| `img-to-html` | Pipeline principal: mock → UI fiel, em 5 etapas com gate de aprovação |
| `to-wireframe` | Etapa 1: gera o wireframe ASCII tipado (invocada pela `img-to-html`) |
| `openrouter-img` | Etapa 4: regenera ícones/imagens a partir dos crops |

Invocação: `$img-to-html` com a imagem de referência (anexada, path ou URL).
As três skills têm `disable-model-invocation: true` — só rodam quando o usuário pedir.

## Override de stack: React + Vite

A `SKILL.md` original entrega HTML/CSS/JS estáticos e diz: *"Se o usuário pedir
React/Vite explicitamente, aí sim mude a stack."* Este projeto pediu. Valem as
regras abaixo **no lugar** da seção "Layout da pasta / Stack" da skill. Todo o
resto da skill (pipeline de 5 etapas, gates, medição de pixels, procedimento de
assets, o "Não fazer") continua valendo sem alteração.

### Estrutura

```
design-systems/<slug>/        # artefatos de análise, fora do bundle
  reference.[ext]             # cópia da imagem de entrada
  wireframe.txt               # contrato tipado do $to-wireframe
  assets/crops/{id}.png       # recortes da reference (insumo, não vai pro build)

src/
  main.jsx
  App.jsx                     # monta as seções na ordem do wireframe
  sections/<Regiao>.jsx       # uma região do wireframe = um componente
  styles/tokens.css           # :root com as custom properties do design system
  styles/<regiao>.css         # CSS da região, importado pelo seu .jsx

public/assets/{id}.png        # mídias finais, servidas em /assets/{id}.png
```

### Regras

- **Uma região do wireframe = um componente** em `src/sections/`, em PascalCase
  (`nav` → `Nav.jsx`, `card2` → `Card2.jsx`). Mesmo id no wireframe = mesmo
  componente reutilizado com props.
- **CSS puro em arquivos separados**, um por região, importado no topo do `.jsx`
  correspondente. Sem CSS-in-JS, sem Tailwind, sem biblioteca de componentes.
- `className` usa exatamente os ids do wireframe (`.nav`, `.hero`, `.card`), e
  cada tag tipada vira classe utilitária (`.h1`, `.t2`, `.btn`, `.lnk`) definida
  em `tokens.css`.
- **Sem `style={{…}}` inline.** A exceção única são custom properties dinâmicas
  passadas por prop (`style={{ '--i': index }}`).
- **Design tokens** (cores, radius, sombras, tipografia) vivem em `:root` dentro
  de `styles/tokens.css`, importado uma vez em `main.jsx`.
- **Conteúdo repetido** (lista de cards, itens de nav) é dado: um array em
  `src/data/*.js` e `.map()` no componente. Isto substitui a regra da skill de
  escrever repetição direto no HTML — em React, `.map()` é o idioma da casa.
- **Assets** vão em `public/assets/` e são referenciados por path absoluto
  (`/assets/{id}.png`), nunca por import relativo. Os crops ficam em
  `design-systems/<slug>/assets/crops/` e não entram no bundle.
  **Exceção:** as fotos dos produtos ficam em `src/assets/produtos/<pasta>/`,
  porque o carrossel as descobre com `import.meta.glob` (em `public/` o site
  não tem como listar a pasta). A pasta é o nome do sistema em minúsculas com
  hífen e sem acento (`pailon`), ou o valor de `pastaFotos` quando definido.
  Campuzz LMS (`u4`) preserva `campuzz`; Relatório Diário (`u6`), antes Relatório
  Financeiro, preserva `relatorio-financeiro`. A ordem é a do nome do arquivo.
- **Fontes** via `<link>` do Google Fonts no `index.html` da raiz, ou
  `@font-face` em `tokens.css`.
- Verificação de cada gate: `npm run dev` e comparar no browser com a reference,
  no mesmo viewport.

### Geração de assets (etapa 4)

O script `openrouter-img/scripts/generate_image.py` precisa de `uv` e de
`OPENROUTER_API_KEY`. **Nenhum dos dois está configurado nesta máquina.** Os
ícones foram traçados à mão em SVG a partir dos crops, em
[`src/components/Icon.jsx`](src/components/Icon.jsx).

## Comportamento da pagina

O mock e um documento estatico; a pagina tem quatro comportamentos que nao
vinham dele:

- **Cabecalho de tela cheia.** `.hero` ocupa `100dvh` menos `--nav-h`. As
  posicoes internas continuam as medidas na reference; o que mudou e o espaco
  livre embaixo, onde fica a pista de rolagem.
- **Revelacao ao rolar.** [`Revelavel`](src/components/Revelavel.jsx) envolve as
  secoes abaixo do cabecalho. **Armadilha:** o estado final tem de ser
  `transform: none`, nunca `translateY(0)`; qualquer transform remanescente
  vira bloco de referencia dos filhos `position: fixed`. E enquanto a secao nao
  foi revelada ela esta em `opacity: 0`, o que esconde a subarvore inteira.
  Por isso a ficha do sistema e montada em `App.jsx`, fora das secoes: dentro
  delas o escurecimento sumia junto.
- **Ecossistema por grupos.** `src/data/groups.js` apresenta Campuzz como a
  tecnologia que sustenta todo o ecossistema. Campuzz LMS (`u4`) é o produto de
  aprendizagem, no grupo Acadêmico & Aprendizagem. São conceitos distintos:
  o módulo Vendas pertence à tecnologia Campuzz. Suas quatro funções são
  Data (Metriczz, Relatório Diário e Databricks `u7`), Leads (Metriczz, desde
  12/11/2026; o LeadsHug saiu dela), Mensageria (Wpp Hub e Wpp Ofc,
  futuramente LeadsHug) e marketing (páginas de acompanhamento em Cloudflare
  Workers). Cada função tem
  `andamento[]` com as novidades do time, datadas por `MODULO_VENDAS.checkpoint`;
  ao receber novidades por módulo, troque a lista inteira e a data. Accountzz
  é transversal; UniNotas fica em Financeiro & Fiscal e Pailon em Produto &
  Tech. Pailon é o novo nome do Delphi AI, com o mesmo id `u5`. O layout usa
  CSS Grid, sem posições absolutas ou fios. A ficha do LMS concentra os recursos
  de aprendizagem; as quatro funções de Vendas ficam em `MODULO_VENDAS`.
- **Suporte da tecnologia Campuzz.** [`Suporte`](src/sections/Suporte.jsx),
  dentro do ecossistema, entre o módulo Vendas e os grupos de apoio. Lista as
  tarefas que demandaram suporte, uma semana por vez, com filtro (setas e
  lista de semanas; abre na mais recente e marca a atual). Os dados ficam em
  [`suporte.js`](src/data/suporte.js), com o formato documentado no topo:
  **toda semana, acrescente um item novo** `{ inicio: 'aaaa-mm-dd' (segunda),
  tarefas: [] }` e não apague as antigas. O rótulo "09/11 A 13/11/2026" sai do
  `inicio`. Semana sem tarefas mostra o aviso de vazio. A lista começa
  **fechada** (decisão do usuário: não ocupar a tela de quem não quer ver);
  ficam visíveis o cabeçalho, o filtro e o resumo, e o botão "VER AS NN
  TAREFAS DA SEMANA" abre a lista. Há um segundo "OCULTAR" no fim dela, que
  devolve foco e tela ao botão do topo. Trocar de semana mantém o estado. Quando toda a semana
  tem o mesmo `responsavel`, ele aparece uma vez no resumo e sai das linhas.
  Valores de oferta (preços de checkout) e links de pagamento ficam fora da
  página; a tarefa descreve o que foi feito. Senhas e URIs com credencial
  nunca entram. Primeira semana: 09 a 13/11/2026, com tarefas de Rafael Pilon
  (todas resolvidas) e Lucas Paifer (resolvidas, exceto e-Notas e certificados, aguardando). `aguardando` é a tarefa parada à espera de
  terceiros (decisão, credencial, material).
  Na função Leads, a reestruturação do Mongo da jornada do lead tem prazo em
  20/11/2026. **Armadilha:**
  `.ecossistema p:not(.t3)` pinta todo `<p>` de cinza e dá margem de 12px;
  textos do bloco que precisam de outra cor ou margem usam seletor mais
  específico (`.ecossistema .suporte__texto .suporte__titulo`).
- **Cartão inteiro clicável.** `.plataforma` é um `<button>`; o `+` é
  decorativo. O foco e o hover destacam a borda e mostram um halo.
- **Ficha tecnica em painel.** Saiu do canto do hero e virou
  [`FichaTecnica`](src/sections/FichaTecnica.jsx), acionada pelo botao fixo no
  canto inferior direito. As contagens vem de `systems.js`, nao sao fixas.
- **Ficha do sistema como modal.** A URL acompanha a ficha aberta
  (`?ficha=u1`, via `replaceState`). Enquanto ela esta aberta, `.shell` e o
  botao da ficha tecnica ficam `inert`, a rolagem trava e o foco vai para o
  "FECHAR"; ao fechar, volta ao cartao. **Armadilha:** `.ficha-camada` precisa
  de `z-index` proprio. `position: fixed` cria contexto de empilhamento, e sem
  ele o nav e o botao flutuante aparecem acesos por cima do escurecimento.
- **Ficha curta + ficha completa.** O formato esta documentado no topo de
  [`systems.js`](src/data/systems.js): versao curta sempre visivel e ficha
  completa ao expandir, na ordem fixa: visao geral, problema, funcoes, casos,
  evolucao, ecossistema, fluxo(s), monitoramento, seguranca, integracoes,
  tecnologia, estagio, papel. Os opcionais so aparecem se preenchidos. O que
  ainda nao existe (fluxo planejado, casos pendentes, ligacao ao nucleo) sai
  tracejado. `fonte` marca conteudo que nao veio do repositorio (Campuzz,
  Pailon). A ficha do mock (ORIGEM / ARMAZENA / ENTREGA) foi aposentada
  quando o ultimo sistema migrou.
  Status sai sempre de `ESTADOS` + `state`, com cor via `.estado--<state>`:
  nunca escreva o status do nucleo a mao (ja esteve "SEMPRE ATIVO" sem estar).
  `NUCLEO.conectado` registra o estado técnico informado, mas não controla o
  layout por grupos. A posição do Accountzz mostra seu papel transversal;
  mudar a apresentação não altera o status técnico dos produtos.
- **Atualizacoes de status.** Os status seguem o que o time informa
  (checkpoints em PDF ou mensagens). A cada atualizacao, em
  [`systems.js`](src/data/systems.js), mude so os sistemas citados: `state`
  /`status`, `statusDetalhe`, `proximosPassos` e `checkpoint: 'dd/mm/aaaa'`
  (a data e por sistema; o estagio da ficha diz "ATUALIZADO EM <data>").
  Últimas: 12/11/2026 (Accountzz, Metriczz, LeadsHug e Databricks), 03/11/2026 (Relatório
  Diário), 02/10/2026 (UniNotas); Campuzz e Pailon sem data. `status` pode ser um rotulo
  proprio ("MVP RODANDO", "EM PRODUCAO · EM TESTES") com o `state` dando a
  cor. `AVANCADO` (dourado) e "falta um passo para a entrega"; so `producao`
  conta como modulo ativo, e contagens zeradas somem da ficha tecnica.
  Accountzz mantém o MVP rodando (`state: 'producao'`); a arquitetura da v2
  termina em 13/11/2026 e a prototipação é na quarta, 18/11/2026.
  Metriczz está em testes finais (`state: 'testes'`, dourado); a primeira versão tem meta em
  stage em 15/11/2026, e só segue para produção após validação. Depois dela
  vêm as telas de gestão de leads inspiradas no Mixpanel (prazo a definir).
  LeadsHug segue em desenvolvimento: primeiras telas (Atendimento, CRM e
  Contatos) em construção, primeira versão para testes em 20/11/2026. O checkpoint
  do Metriczz de 03/11 à tarde (ainda mostrado na ficha) separa backend já em stage, front desenvolvido fora de
  stage, pendências, dependências e trabalho fora da versão. Convite e dados
  têm prioridade. As janelas intermediárias de 10 a 12/11 são propostas;
  estimativas ainda não foram aferidas. Metriczz ainda não está em produção e
  não entra na contagem de módulos ativos; aparece na contagem “EM TESTES”.
  Relatório Diário (`u6`) pertence a Data, ao lado do Metriczz. Sua ficha está
  em `src/data/relatorio-diario.js`; fotos em `relatorio-financeiro/`. Está em
  produção, com checkpoint de 03/11/2026: todas as entregas, melhorias de
  22 e 28/10, publicação e envio diário por WhatsApp foram confirmados como
  concluídos e rodando. A confirmação atual supera as antigas pendências de
  merge/deploy e o pedido histórico de coluna Backlog. Não reabrir essas
  pendências nem atribuir um provedor ou horário ao WhatsApp sem informação.
  Databricks (`u7`, ícone `grade`) é o pipeline financeiro em bronze, silver e
  gold, também em Data. Ficha em `src/data/databricks.js`, fotos em
  `databricks/`. Em produção e em remodelação (checkpoint de 12/11/2026): PRs
  #1 a #18 entregues, M-0003 a M-0005 prontas no staging com PR a abrir,
  M-0006 aguardando desenho. É a camada medalhão que o Metriczz usa; a
  informação antiga de que o Metriczz "saiu do Databricks" não vale mais.
  Os totais de receita e de taxas da empresa ficam fora da página (mesmo
  critério das telas borradas); os valores dos casos corrigidos aparecem.
- **Fotos com dados sensíveis.** As telas do Relatório Diário preservam os
  valores financeiros, dados de conta e URL do Railway borrados. Manter o mesmo
  tratamento em novas telas com dados reais. Prefixos numéricos nos arquivos
  definem a ordem e não aparecem na legenda.
- **Ordem das seções.** Cabeçalho, ecossistema por grupos (01), produtos por
  dentro (02) e contato. A seção de trilhas da operação foi retirada; os
  cartões por módulo apresentam a organização dos sistemas.
- **Os produtos por dentro (seção 02).** [`Produtos`](src/sections/Produtos.jsx):
  filtro de um sistema por vez numa linha única em toda a largura (rola para o
  lado se não couber) e [`Carrossel`](src/components/Carrossel.jsx) de fotos à
  esquerda, os dois fixos (`sticky`; a galeria gruda em `--filtro-h` abaixo do
  filtro) enquanto a ficha **inteira** rola à direita: ficha curta mais [`FichaCompleta`](src/components/FichaCompleta.jsx),
  o mesmo componente que o modal usa ao expandir. Trocar de produto no meio da
  leitura volta ao começo do texto. **Armadilha:** o `.page` usa
  `overflow: clip`; com `hidden` ele vira contêiner de rolagem e o sticky para
  de funcionar. No celular a galeria deixa de ser fixa. O carrossel passa
  sozinho a cada 5s **sempre** (decisão do usuário: não para com mouse, foco
  nem "reduzir movimento", que só tira o fade); o único jeito de parar é o
  botão de pausar, que a WCAG 2.2.2 exige. Clicar na foto abre a
  [`TelaCheia`](src/components/TelaCheia.jsx) (portal no body, `#root` inert,
  setas, teclado, deslizar o dedo, Esc ou clique fora fecha) e, ao fechar, o
  carrossel segue da foto vista. O nome do arquivo vira legenda, exceto nomes
  genéricos ("Captura de tela…"). Sem fotos, mostra o ícone e "as telas
  chegam em breve". **Armadilha:** carrossel
  e texto são irmãos e cada um tem `key` por sistema; as duas keys precisam
  ser diferentes (`fotos-u1`, `texto-u1`), senão o carrossel não reinicia.
- **Botões de acesso no cabeçalho: retirados por enquanto** (decisão do
  usuário em 25/09/2026). As telas `/entrar` e `/cadastro` continuam
  funcionando pelo endereço, sem link na LP. Para voltar: dois `<a>` com
  `.btn--ouro` e `.btn--cinza` (definidos em `tokens.css`) apontando para
  `LOGIN_URL` e `CADASTRO_URL`, logo abaixo de `.hero__linha-fina` (ver o
  commit `bde9554`).

## Telas de acesso (`/entrar` e `/cadastro`)

[`Acesso`](src/paginas/Acesso.jsx), um componente para as duas telas
(`modo="entrar" | "cadastro"`), com a estrutura de uma tela de login comum
(provedores, "ou", e-mail, avançar, troca de tela, rodapé) na linguagem da
LP. **Só o front:** o e-mail é validado, mas avançar ou usar um provedor só
mostra que o acesso pelo Accountzz ainda não está disponível.

- **Rotas sem biblioteca.** [`main.jsx`](src/main.jsx) escolhe a tela pelo
  `location.pathname`; qualquer outro caminho mostra a LP. Em produção o
  servidor precisa devolver o `index.html` para qualquer caminho (o Vite já
  faz isso em dev e em preview). Quando o backoffice crescer, é a hora de
  trocar por um roteador.
- **Configuração em [`links.js`](src/data/links.js):** rotas de acesso,
  `DOMINIOS_UNIFAST` (hoje `unifast.com.br`: o cadastro só aceita e-mail
  desse domínio; o login aceita qualquer e-mail válido), links do rodapé (`null` esconde o link até a
  página existir) e o WhatsApp do time tech, que a chamada da LP também usa.
- Logos de Google, Microsoft e Apple ficam em
  [`Marcas.jsx`](src/components/Marcas.jsx), nas cores das marcas, fora do
  `Icon.jsx`.
- **Armadilha:** o `.acesso__centro` é flex. Com grid e `place-items`, a
  largura do cartão dimensiona a coluna e ele vaza da tela no celular (o
  `overflow: clip` do `.page` esconde a rolagem, então o teste de rolagem
  horizontal não pega).

## Camada responsiva

O mock só existe em desktop (1440px). As regiões originais em [`src/styles/`](src/styles/)
reproduzem o mock; o ecossistema por grupos substitui o antigo diagrama conforme
a nova organização do produto. A adaptação para telas estreitas vive só em
[`src/styles/mobile.css`](src/styles/mobile.css), carregado por último em
`main.jsx`, com dois cortes: 1099px (reorganiza grupos) e 599px
(escala de tipo para celular).

- **Ordem dos media queries.** O minificador reordena blocos `@media` de mesma
  especificidade. Por isso as regras de 599px levam o prefixo `.page`, para
  ganharem do bloco de 1099px independentemente da ordem final.

## Como conferir contra a reference

O Chrome headless serve para captura:

```bash
chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars   --user-data-dir=<perfil novo> --force-device-scale-factor=2   --window-size=1440,2190 --screenshot=saida.png http://localhost:5173/
```

O perfil precisa ser um diretório novo a cada execução, senão o Chrome sai sem
gravar o arquivo. **A janela não desce de 500px de largura**: para testar
390px, sirva a página dentro de um iframe com `width="390"` e capture a página
que contém o iframe. Medir a captura direto em 390 dá um recorte de uma
viewport de 500, o que parece transbordamento e não é.
