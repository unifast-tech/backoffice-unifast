import { useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import useEscala from '../components/useEscala.js'
import { COLUNAS, TRILHAS } from '../data/trails.js'
import { NUCLEO, SISTEMAS } from '../data/systems.js'
import '../styles/trails.css'

/* Origem do bloco na pagina: (64, 1376). Colunas centradas em x = 164, 492, 820, 1148
   (relativo), que correspondem a 228, 556, 884 e 1212 na reference. */
const COLX = [164, 492, 820, 1148]
const LINHA_Y = [115, 271, 427]
const VB = { w: 1312, h: 470 }
/* raio da parada: maior que o do mock (7,5) para caber o numero da ordem */
const R = 11

/* Trechos da trilha: entre paradas seguidas, na ordem, e de cada parada
   opcional ate a parada regular mais proxima. */
function trechos(paradas) {
  const regulares = paradas.filter((p) => !p.opcional)
  const seguidos = regulares.slice(1).map((p, i) => ({ de: regulares[i].col, para: p.col }))
  const desvios = paradas
    .filter((p) => p.opcional)
    .map((p) => {
      const perto = regulares.reduce((a, b) =>
        Math.abs(b.col - p.col) < Math.abs(a.col - p.col) ? b : a,
      )
      return { de: perto.col, para: p.col, opcional: true }
    })
  return [...seguidos, ...desvios]
}

/* numero da ordem de cada parada; a opcional fica sem numero */
function numerar(paradas) {
  let n = 0
  return paradas.map((p) => ({ ...p, n: p.opcional ? null : (n += 1) }))
}

export default function Trails({ onAbrir }) {
  const trilhas = useRef(null)
  useEscala(trilhas, VB.w)
  /* trilha sob o mouse: ganha destaque e as outras apagam */
  const [foco, setFoco] = useState(null)

  return (
    <section className="secao secao--trilhas">
      <div className="secao__cabecalho">
        <span className="t3">02 / TRILHAS DA OPERA&Ccedil;&Atilde;O</span>
        <span className="t3">QUEM PASSA POR ONDE, E EM QUE ORDEM</span>
      </div>

      <div className={`trilhas${foco ? ' trilhas--foco' : ''}`} ref={trilhas}>
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
            const y = LINHA_Y[i]
            return (
              <g key={t.id} className={`trilha-desenho${foco === t.id ? ' is-foco' : ''}`}>
                {trechos(t.paradas).map(({ de, para, opcional }) => {
                  const sentido = Math.sign(COLX[para] - COLX[de])
                  const x1 = COLX[de] + sentido * R
                  const x2 = COLX[para] - sentido * R
                  const meio = (x1 + x2) / 2
                  return (
                    <g key={`${de}-${para}`}>
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        className={`trilha-linha${opcional ? ' trilha-linha--opcional' : ''}`}
                      />
                      {/* seta no meio do trecho: o sentido em que a pessoa anda */}
                      <path
                        d={`M${meio - 4 * sentido} ${y - 5} L${meio + 2 * sentido} ${y} L${meio - 4 * sentido} ${y + 5}`}
                        className={`trilha-seta${opcional ? ' trilha-seta--opcional' : ''}`}
                      />
                    </g>
                  )
                })}

                {numerar(t.paradas).map((p) => {
                  const cx = COLX[p.col]
                  if (p.opcional) {
                    return (
                      <g key={p.col}>
                        <circle
                          cx={cx}
                          cy={y}
                          r={R}
                          className="parada-anel parada-anel--opcional"
                        />
                        <text x={cx} y={y} className="parada-num parada-num--opcional">
                          +
                        </text>
                      </g>
                    )
                  }
                  return (
                    <g key={p.col}>
                      <circle cx={cx} cy={y} r={R} className="parada-anel" />
                      <text x={cx} y={y} className="parada-num">
                        {p.n}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>

        {/* cada coluna abre a ficha do sistema, como os cartoes do esquema */}
        <div className="trilhas__colunas">
          {COLUNAS.map((c, i) => (
            <button
              type="button"
              className="trilhas__coluna"
              key={c.id}
              style={{ '--x': `${COLX[i]}px` }}
              onClick={() => onAbrir(SISTEMAS.find((s) => s.id === c.id))}
              aria-label={`Abrir ficha de ${c.label}`}
            >
              <Icon name={c.icon} escala={0.77} />
              <span className="t3">{c.label}</span>
            </button>
          ))}
        </div>

        {TRILHAS.map((t, i) => (
          <div
            className={`trilha${foco === t.id ? ' is-foco' : ''}`}
            key={t.id}
            style={{ '--y': `${LINHA_Y[i] - 38}px` }}
            onMouseEnter={() => setFoco(t.id)}
            onMouseLeave={() => setFoco(null)}
          >
            <p className="trilha__rotulo">
              <span className="t3">{t.label}</span>
              <span className="trilha__descricao">{t.descricao}</span>
            </p>
            {numerar(t.paradas).map((p) => (
              <p
                className={`trilha__legenda${p.opcional ? ' trilha__legenda--opcional' : ''}`}
                key={p.col}
                data-n={p.n ?? '+'}
                style={{ '--x': `${COLX[p.col]}px` }}
              >
                <span className="trilha__coluna-nome">
                  {COLUNAS[p.col].label}
                  {p.opcional && <span className="trilha__opcional">OPCIONAL</span>}
                </span>
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
