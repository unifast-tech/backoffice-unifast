# LP Unifast — landing page dos produtos

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

## Parâmetro de URL

`?ficha=u1` abre a ficha daquele sistema já no carregamento, centrada na tela,
para compartilhar o link de um sistema específico. Os ids são `u0` a `u5`.

## Dependência externa

As três fontes (Roboto, Manrope e Space Mono) vêm do Google Fonts. Sem rede a
página cai para as fontes do sistema e perde a fidelidade ao mock. Para uso
interno sem internet, baixe os arquivos e troque o `<link>` do
[index.html](index.html) por `@font-face` em
[tokens.css](src/styles/tokens.css).
