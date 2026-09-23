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
- **Cartao inteiro clicavel.** `.sistema` e um `<button>`; o `+` do canto e
  decorativo. Com hover o cartao cresce e ganha halo difuso.
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
  Design System). A ficha do mock (ORIGEM / ARMAZENA / ENTREGA) foi aposentada
  quando o ultimo sistema migrou.
  Status sai sempre de `ESTADOS` + `state`, com cor via `.estado--<state>`:
  nunca escreva o status do nucleo a mao (ja esteve "SEMPRE ATIVO" sem estar).
  `NUCLEO.conectado` controla os fios do esquema: `false` deixa todos
  tracejados e mostra a legenda "ligacao prevista". Vire para `true` quando o
  primeiro sistema (Metriczz, antigo FastHub Resultados) estiver de fato ligado.
- **Diagrama e trilhas escalam por igual.** Os dois blocos sao desenhados em
  1312px (SVG + cartoes em px) e [`useEscala`](src/components/useEscala.js)
  grava `--k` = largura disponivel / 1312; o CSS aplica `scale(var(--k))`.
  **Nao** volte a esticar so o SVG com `preserveAspectRatio="none"`: os fios
  deixam de encostar nos cartoes em qualquer largura diferente de 1312px de
  conteudo, inclusive 1440 com barra de rolagem.

## Camada responsiva

O mock só existe em desktop (1440px). Tudo em [`src/styles/`](src/styles/) exceto
`mobile.css` reproduz o mock medida a medida e **não deve ser alterado para
acomodar telas estreitas**. A adaptação vive só em
[`src/styles/mobile.css`](src/styles/mobile.css), carregado por último em
`main.jsx`, com dois cortes: 1099px (empilha diagrama e trilhas) e 599px
(escala de tipo para celular).

Duas armadilhas já resolvidas, que vão voltar se alguém mexer:

- **Posições absolutas via variável.** Cartões do diagrama e paradas das trilhas
  recebem `--x`/`--y`/`--w`/`--h` por `style` inline. O CSS desktop lê essas
  variáveis; o mobile devolve `auto`. Se as posições voltarem a ser `style`
  inline diretas, o mobile só as vence com `!important`.
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
