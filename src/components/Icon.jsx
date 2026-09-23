import '../styles/icon.css'

/* Icones tracados dos recortes em design-systems/unifast-produtos/assets/crops/.
   Cada um guarda a proporcao medida na reference; `escala` reduz o conjunto
   para os cabecalhos de coluna das trilhas (0,77 do tamanho de cartao). */

const T = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinejoin: 'round' }

const ICONES = {
  grafico: {
    w: 31,
    h: 35.5,
    art: (
      <>
        <rect x="1" y="20" width="8" height="14.5" {...T} />
        <rect x="11.5" y="10.5" width="8" height="24" {...T} />
        <rect x="22" y="1" width="8" height="33.5" {...T} />
      </>
    ),
  },

  capelo: {
    w: 36.5,
    h: 25,
    art: (
      <>
        <path d="M18.25 1 L35.5 9.5 L18.25 18 L1 9.5 Z" {...T} />
        <path d="M9 13.5 v5.5 c0 2.6 4.1 4.6 9.25 4.6 s9.25 -2 9.25 -4.6 v-5.5" {...T} />
        <path d="M34.75 11 v7" {...T} />
        <circle cx="34.75" cy="20.5" r="2.2" fill="currentColor" stroke="none" />
      </>
    ),
  },

  balao: {
    w: 34,
    h: 29.5,
    art: (
      <>
        <path
          d="M5 1 h24 a4 4 0 0 1 4 4 v11.5 a4 4 0 0 1 -4 4 h-15 l-5.5 8 v-8 h-3.5
             a4 4 0 0 1 -4 -4 v-11.5 a4 4 0 0 1 4 -4 z"
          {...T}
        />
        <circle cx="10.5" cy="10.5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="17" cy="10.5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="23.5" cy="10.5" r="1.6" fill="currentColor" stroke="none" />
      </>
    ),
  },

  nota: {
    w: 34,
    h: 39,
    art: (
      <>
        <path d="M1 1 H33 V38 L26.5 32 L20 38 L13.5 32 L7 38 L1 32 Z" {...T} />
        <path d="M9 10.75 h16 M9 18.75 h16 M9 26.75 h16" {...T} strokeLinecap="round" />
      </>
    ),
  },

  grade: {
    w: 31,
    h: 31,
    art: (
      <>
        {[0, 17.5].map((x) =>
          [0, 17.5].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x + 1}
              y={y + 1}
              width="11.5"
              height="11.5"
              {...T}
              strokeDasharray="3.5 2.5"
            />
          )),
        )}
      </>
    ),
  },

  'logo-uf': {
    w: 36.5,
    h: 34,
    /* Contorno extraido do bitmap da reference (marcha de contorno + Douglas-Peucker).
       E uma aproximacao: peca o SVG oficial ao time de marca. */
    art: (
      <>
        <path d="M35.99 0.00 L36.37 0.13 L36.37 0.63 L34.47 6.07 L34.21 6.32 L30.27 6.45 L29.12 7.20 L28.49 8.09 L21.75 26.92 L19.71 30.33 L17.80 32.10 L16.28 32.99 L12.46 33.87 L6.23 33.62 L3.05 32.36 L0.51 29.83 L0.00 28.31 L0.13 24.39 L4.20 12.77 L5.21 10.87 L6.99 9.99 L12.46 10.11 L7.38 25.53 L7.50 26.80 L8.90 28.06 L10.68 28.44 L12.46 28.19 L14.24 26.80 L15.26 24.90 L20.86 8.59 L22.51 4.93 L23.91 2.78 L25.31 1.52 L27.47 0.51 L30.27 0.13 L35.86 0.13 Z" fill="var(--ink)" />
        <path d="M31.67 7.58 L33.45 7.58 L33.83 8.22 L30.01 18.71 L29.00 19.34 L26.45 19.34 L26.07 18.71 L29.00 10.24 L29.89 8.47 L30.78 7.84 L31.54 7.71 Z" fill="var(--gold)" />
      </>
    ),
  },

  ficha: {
    w: 28,
    h: 34,
    art: (
      <>
        <rect x="1" y="1" width="26" height="32" rx="2.5" {...T} />
        <path d="M7 10 h14 M7 17 h14 M7 24 h9" {...T} strokeLinecap="round" />
      </>
    ),
  },

  envelope: {
    w: 20,
    h: 16,
    art: (
      <>
        <rect x="1" y="1" width="18" height="14" rx="2" {...T} strokeWidth="1.5" />
        <path d="M1.5 2.5 L10 9 L18.5 2.5" {...T} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },

  cadeado: {
    w: 42,
    h: 60,
    art: (
      <>
        <path
          d="M9.25 27 V13 a11.75 11.75 0 0 1 23.5 0 v14"
          {...T}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect x="1.25" y="26.25" width="39.5" height="32.5" rx="5" {...T} strokeWidth="2.5" />
        <circle cx="21" cy="41.5" r="2.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
}

export default function Icon({ name, escala = 1, className = '' }) {
  const ico = ICONES[name]
  if (!ico) return <span className={`ico ico--vazio ${className}`} aria-hidden="true" />

  return (
    <svg
      className={`ico ${className}`}
      width={ico.w * escala}
      height={ico.h * escala}
      viewBox={`0 0 ${ico.w} ${ico.h}`}
      aria-hidden="true"
      focusable="false"
    >
      {ico.art}
    </svg>
  )
}
