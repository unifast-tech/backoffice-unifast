import { useRef } from 'react'
import Icon from '../components/Icon.jsx'
import useEscala from '../components/useEscala.js'
import { COLUNAS, TRILHAS } from '../data/trails.js'
import { NUCLEO } from '../data/systems.js'
import '../styles/trails.css'

/* Origem do bloco na pagina: (64, 1376). Colunas centradas em x = 164, 492, 820, 1148
   (relativo), que correspondem a 228, 556, 884 e 1212 na reference. */
const COLX = [164, 492, 820, 1148]
const LINHA_Y = [115, 271, 427]
const VB = { w: 1312, h: 470 }
const R = 7.5

export default function Trails() {
  const trilhas = useRef(null)
  useEscala(trilhas, VB.w)

  return (
    <section className="secao secao--trilhas">
      <div className="secao__cabecalho">
        <span className="t3">02 / TRILHAS DA OPERA&Ccedil;&Atilde;O</span>
        <span className="t3">QUEM PASSA POR ONDE, E EM QUE ORDEM</span>
      </div>

      <div className="trilhas" ref={trilhas}>
        <svg
          className="trilhas__malha"
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {COLX.map((x) => (
            <line key={x} x1={x} y1="52" x2={x} y2={VB.h} className="guia" />
          ))}

          {TRILHAS.map((t, i) => {
            const cols = t.paradas.map((p) => p.col)
            const y = LINHA_Y[i]
            const x1 = COLX[Math.min(...cols)]
            const x2 = COLX[Math.max(...cols)]
            return (
              <g key={t.id}>
                <line x1={x1 + R} y1={y} x2={x2 - R} y2={y} className="trilha-linha" />
                {cols.map((c) => (
                  <g key={c}>
                    <circle cx={COLX[c]} cy={y} r={R} className="parada-anel" />
                    <circle cx={COLX[c]} cy={y} r="2.5" className="parada-centro" />
                  </g>
                ))}
              </g>
            )
          })}
        </svg>

        <div className="trilhas__colunas">
          {COLUNAS.map((c, i) => (
            <div className="trilhas__coluna" key={c.id} style={{ '--x': `${COLX[i]}px` }}>
              <Icon name={c.icon} escala={0.77} />
              <p className="t3">{c.label}</p>
            </div>
          ))}
        </div>

        {TRILHAS.map((t, i) => (
          <div className="trilha" key={t.id} style={{ '--y': `${LINHA_Y[i] - 38}px` }}>
            <p className="t3 trilha__rotulo">{t.label}</p>
            {t.paradas.map((p) => (
              <p className="t3 trilha__legenda" key={p.col}
                style={{ '--x': `${COLX[p.col]}px` }}
              >
                <span className="trilha__coluna-nome">{COLUNAS[p.col].label}</span>
                {p.texto}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="card selo-iam">
        <Icon name="cadeado" escala={0.762} />
        <div className="selo-iam__texto">
          <p className="h3">{NUCLEO.name}</p>
          <p className="t3">
            CAMADA ÚNICA DE IDENTIDADE E ACESSO PARA CADA PARADA ACIMA, EM TODAS AS TRILHAS
          </p>
        </div>
        <p className={`t3 selo-iam__estado estado--${NUCLEO.state}`}>
          <span className="ponto" /> {NUCLEO.status}
        </p>
      </div>
    </section>
  )
}
