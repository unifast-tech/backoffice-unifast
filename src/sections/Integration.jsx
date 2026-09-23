import { useRef } from 'react'
import Icon from '../components/Icon.jsx'
import useEscala from '../components/useEscala.js'
import { SISTEMAS, NUCLEO } from '../data/systems.js'
import '../styles/integration.css'

/* Espaco do diagrama: origem na pagina em (64, 562), 1312 x 680.
   Todas as medidas vem de reference.png. */
const OX = 64
const OY = 562
const VB = { w: 1312, h: 680 }

const rel = (b) => ({ x: b.x - OX, y: b.y - OY, w: b.w, h: b.h })

/* Pernas de chip: 4 a cada 60px nos cartoes padrao, 5 a cada 40px no nucleo. */
function pernas(b) {
  const offs = b.w > 240 ? [38, 98, 158, 217.5] : [24, 64, 104, 144, 183.5]
  return offs.flatMap((o) => [
    { x: b.x + o, y: b.y - 14.5, h: 14.5 },
    { x: b.x + o, y: b.y + b.h, h: 14.5 },
  ])
}

const TODOS = [...SISTEMAS, NUCLEO]

/* Enquanto nenhum sistema estiver ligado ao nucleo, todos os fios sao
   tracejados: o esquema mostra a ligacao prevista, nao uma que ja existe. */
const FIO = NUCLEO.conectado ? 'fio' : 'fio fio--tracejado'
const PERNAS = TODOS.map((s) => pernas(rel(s.box))).flat()

/* Nos quadrados de 9px, centrados. */
const NOS = [
  [440, 659], [518.5, 659],
  [440, 899], [518.5, 899],
  [440, 1139], [518.5, 1139],
  [612.5, 899], [826.5, 899],
  [920, 759], [1000, 759],
  [920, 1039], [1000, 1039],
].map(([x, y]) => ({ x: x - OX, y: y - OY }))

export default function Integration({ aberto, onAbrir }) {
  const diagrama = useRef(null)
  useEscala(diagrama, VB.w)

  return (
    <section className="secao secao--integracao" id="esquema">
      <div className="secao__cabecalho">
        <span className="t3">01 / ESQUEMA DE INTEGRA&Ccedil;&Atilde;O</span>
        <span className="t3">TODO ACESSO PASSA PELO N&Uacute;CLEO</span>
      </div>

      <div className="diagrama" ref={diagrama}>
        <svg
          className="diagrama__malha"
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* barramento esquerdo e ramais dos tres cartoes da coluna */}
          <path
            d="M453.5 103.5 V576 M379.5 99 H451 M379.5 339 H547 M379.5 579 H451"
            className={FIO}
          />
          {/* nucleo para o barramento direito, e dele ate o MONITORNOTES */}
          <path d="M764.5 339 H858 M856 203.5 V339.5 M860.5 199 H932" className={FIO} />
          {/* ligacao tracejada do nucleo ate o DESIGN SYSTEM */}
          <path d="M856 364 V476 M860.5 479 H926" className="fio fio--tracejado" />

          {PERNAS.map((p, i) => (
            <rect key={`p${i}`} x={p.x} y={p.y} width="1.5" height={p.h} className="perna" />
          ))}
          {NOS.map((n, i) => (
            <rect
              key={`n${i}`}
              x={n.x - 4.5}
              y={n.y - 4.5}
              width="9"
              height="9"
              className="no"
            />
          ))}
        </svg>

        {TODOS.map((s) => {
          const b = rel(s.box)
          return (
            <button
              type="button"
              key={s.id}
              onClick={() => onAbrir(s)}
              aria-label={`Abrir ficha de ${s.name}`}
              className={`card sistema sistema--${s.state}${
                s === NUCLEO ? ' sistema--nucleo' : ''
              }${aberto?.id === s.id ? ' sistema--ativo' : ''}`}
              style={{
                '--x': `${b.x}px`,
                '--y': `${b.y}px`,
                '--w': `${b.w}px`,
                '--h': `${b.h}px`,
              }}
            >
              <span className="sistema__mais" aria-hidden="true">
                +
              </span>

              <div className="sistema__corpo">
                <span className="sistema__ico">
                  <Icon name={s.icon} />
                </span>
                <div className="sistema__texto">
                  <p className="t3 sistema__code">{s.code}</p>
                  <p className="h3 sistema__nome">{s.name}</p>
                  <p className="t3 sistema__sub">{s.sub}</p>
                </div>
              </div>

              {s.status && <p className="t3 sistema__status">{s.status}</p>}
            </button>
          )
        })}
      </div>

      <p className="t3 secao__nota">
        + CADA CART&Atilde;O &Eacute; CLIC&Aacute;VEL &mdash; ABRE A FICHA T&Eacute;CNICA COMPLETA DO SISTEMA
      </p>
      {!NUCLEO.conectado && (
        <p className="t3 secao__nota secao__nota--legenda">
          <span className="legenda__tracejado" aria-hidden="true" />
          LIGA&Ccedil;&Atilde;O PREVISTA &mdash; O N&Uacute;CLEO J&Aacute; FOI ENTREGUE, OS SISTEMAS
          AINDA V&Atilde;O SE CONECTAR A ELE
        </p>
      )}
    </section>
  )
}
