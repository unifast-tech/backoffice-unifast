# LP UniFast — landing page dos produtos

React + Vite. A interface é recriada a partir de mocks com a skill
[`img-to-html`](.claude/skills/img-to-html/SKILL.md).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Como recriar uma tela a partir do mock

1. Coloque a imagem do mock em qualquer lugar acessível.
2. No Claude Code, chame `$img-to-html` passando a imagem.
3. Aprove cada uma das 5 etapas: wireframe → fundo → componentes → assets → revisão.

As convenções de stack (onde cada arquivo vai, como o wireframe vira componente,
como conferir contra o mock) estão em [CLAUDE.md](CLAUDE.md).

## Como a página se comporta

O título ocupa a tela inteira ao abrir. O resto aparece conforme você rola,
cada seção entrando com um fade. Quem desliga animações no sistema operacional
recebe tudo estático.

No esquema de integração, o cartão inteiro abre a ficha do sistema. Passando o
mouse ele cresce e ganha um halo.

A ficha técnica com os números dos módulos fica no botão redondo do canto
inferior direito, presente em toda a página.

## Fotos dos produtos

A seção "Os produtos por dentro" mostra as telas de cada sistema num
carrossel. Para adicionar fotos, solte os arquivos (`.png`, `.jpg`, `.webp`
ou `.avif`) na pasta do produto, sem mexer em código:

```
src/assets/produtos/accountzz/
src/assets/produtos/metriczz/
src/assets/produtos/uninotas/
src/assets/produtos/leadshug/
src/assets/produtos/campuzz/
src/assets/produtos/design-system/
```

A ordem do carrossel segue o nome do arquivo: use `01.png`, `02.png`… Sem
fotos, o produto mostra "as telas chegam em breve". As fotos aparecem
inteiras, sem corte, numa moldura 16:10.

## Deploy (Railway)

O [`railway.json`](railway.json) já diz ao Railway o que fazer: `npm run build`
e depois `npm start`, que sobe o `serve` servindo a pasta `dist` na porta que
o Railway define em `PORT`. O `-s` do `serve` devolve o `index.html` para
qualquer caminho, e é isso que faz `/entrar` e `/cadastro` funcionarem. Node
22.12 ou mais novo (o Vite 8 exige).

Para testar igual à produção na sua máquina: `npm run build` e `npm start`
(abre em http://localhost:3000).

## Parâmetro de URL

`?ficha=u1` abre a ficha daquele sistema já no carregamento, centrada na tela,
para compartilhar o link de um sistema específico. Os ids são `u0` a `u5`.

## Dependência externa

As três fontes (Roboto, Manrope e Space Mono) vêm do Google Fonts. Sem rede a
página cai para as fontes do sistema e perde a fidelidade ao mock. Para uso
interno sem internet, baixe os arquivos e troque o `<link>` do
[index.html](index.html) por `@font-face` em
[tokens.css](src/styles/tokens.css).
