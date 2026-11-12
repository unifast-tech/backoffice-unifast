import { useId, useRef, useState } from 'react'
import { SEMANAS_SUPORTE, STATUS_SUPORTE } from '../data/suporte.js'
import '../styles/suporte.css'

const DIA = 24 * 60 * 60 * 1000
const dataUTC = (iso) => new Date(`${iso}T00:00:00Z`)
const ddmm = (d) =>
  `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`

/* rótulo da semana útil: segunda a sexta, "09/11 A 13/11/2026" */
function rotuloSemana(inicio) {
  const seg = dataUTC(inicio)
  const sex = new Date(seg.getTime() + 4 * DIA)
  return `${ddmm(seg)} A ${ddmm(sex)}/${sex.getUTCFullYear()}`
}

function ehSemanaAtual(inicio) {
  const hoje = new Date()
  const hojeUTC = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const seg = dataUTC(inicio).getTime()
  return hojeUTC >= seg && hojeUTC < seg + 7 * DIA
}

const SEMANAS = [...SEMANAS_SUPORTE]
  .sort((a, b) => b.inicio.localeCompare(a.inicio))
  .map((s) => ({ ...s, rotulo: rotuloSemana(s.inicio), atual: ehSemanaAtual(s.inicio) }))

const dois = (n) => String(n).padStart(2, '0')

export default function Suporte() {
  /* índice 0 = semana mais recente; "anterior" anda para o fim do array */
  const [indice, setIndice] = useState(0)
  /* a lista começa fechada: o bloco mostra só o resumo até a pessoa pedir */
  const [aberto, setAberto] = useState(false)
  const alternar = useRef(null)
  const idLista = useId()
  const semana = SEMANAS[indice]
  if (!semana) return null

  /* mesmo responsável na semana inteira: aparece uma vez no resumo, não em cada linha */
  const responsaveis = [...new Set(semana.tarefas.map((t) => t.responsavel))]
  const responsavelUnico =
    semana.tarefas.length > 0 && responsaveis.length === 1 ? responsaveis[0] : null

  const resumo = [
    [`${dois(semana.tarefas.length)} ${semana.tarefas.length === 1 ? 'TAREFA' : 'TAREFAS'}`, null],
    ...Object.entries(STATUS_SUPORTE).map(([chave, rotulo]) => {
      const n = semana.tarefas.filter((t) => t.status === chave).length
      /* só "RESOLVIDA" flexiona; "EM ANDAMENTO" e "EM ABERTO" não mudam */
      const texto = n > 1 && rotulo.endsWith('A') ? `${rotulo}S` : rotulo
      return n ? [`${dois(n)} ${texto}`, chave] : null
    }),
    responsavelUnico ? [`RESPONSÁVEL · ${responsavelUnico}`, null] : null,
  ].filter(Boolean)

  const total = semana.tarefas.length

  /* fechar pelo fim da lista: devolve o foco e a tela ao botão do topo */
  const fecharPeloFim = () => {
    setAberto(false)
    requestAnimationFrame(() => {
      alternar.current?.focus({ preventScroll: true })
      alternar.current?.scrollIntoView({ block: 'center' })
    })
  }

  return (
    <section className="grupo grupo--suporte" aria-labelledby="grupo-suporte-titulo">
      <header className="grupo__cabecalho suporte__cabecalho">
        <div>
          <p className="t3 ecossistema__rotulo">CAMPUZZ TECNOLOGIA / SUPORTE</p>
          <h4 className="h2" id="grupo-suporte-titulo">Suporte</h4>
          <p>As tarefas que demandaram suporte, semana a semana.</p>
        </div>

        <div className="suporte__filtro" role="group" aria-label="Escolher a semana">
          <button
            type="button"
            className="t3 suporte__passo"
            onClick={() => setIndice(indice + 1)}
            disabled={indice >= SEMANAS.length - 1}
            aria-label="Semana anterior"
          >
            ‹
          </button>
          <label className="suporte__semana">
            <span className="t3">SEMANA</span>
            <select value={indice} onChange={(e) => setIndice(Number(e.target.value))}>
              {SEMANAS.map((s, i) => (
                <option value={i} key={s.inicio}>
                  {s.rotulo}{s.atual ? ' · ATUAL' : ''}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="t3 suporte__passo"
            onClick={() => setIndice(indice - 1)}
            disabled={indice === 0}
            aria-label="Próxima semana"
          >
            ›
          </button>
        </div>
      </header>

      <p className="t3 suporte__resumo" aria-live="polite">
        {resumo.map(([texto, chave]) => (
          <span key={texto} className={chave ? `suporte__status--${chave}` : undefined}>
            {chave && <span className="ponto" />}
            {texto}
          </span>
        ))}
      </p>

      {total === 0 ? (
        <p className="suporte__vazio">Nenhuma tarefa de suporte registrada nesta semana.</p>
      ) : (
        <button
          type="button"
          className="t3 suporte__alternar"
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          aria-controls={idLista}
          ref={alternar}
        >
          <span aria-hidden="true">{aberto ? '−' : '+'}</span>
          {aberto
            ? 'OCULTAR AS TAREFAS'
            : `VER ${total === 1 ? 'A TAREFA' : `AS ${dois(total)} TAREFAS`} DA SEMANA`}
        </button>
      )}

      {total > 0 && aberto && (
        <div id={idLista}>
          <ol className="suporte__lista">
            {semana.tarefas.map((tarefa, i) => (
              <li className="suporte__tarefa" key={`${semana.inicio}-${i}`}>
                <span className="t3 suporte__dia">{tarefa.dia}</span>
                <div className="suporte__texto">
                  <p className="h3 suporte__titulo">{tarefa.titulo}</p>
                  {tarefa.descricao && <p className="suporte__descricao">{tarefa.descricao}</p>}
                  {tarefa.responsavel && !responsavelUnico && (
                    <p className="t3 suporte__responsavel">RESPONSÁVEL · {tarefa.responsavel}</p>
                  )}
                </div>
                <span className="t3 suporte__sistema">{tarefa.sistema ?? '—'}</span>
                <span className={`t3 suporte__status suporte__status--${tarefa.status}`}>
                  <span className="ponto" />
                  {STATUS_SUPORTE[tarefa.status] ?? tarefa.status}
                </span>
              </li>
            ))}
          </ol>
          <button type="button" className="t3 suporte__alternar suporte__alternar--fim" onClick={fecharPeloFim}>
            <span aria-hidden="true">−</span>
            OCULTAR AS TAREFAS
          </button>
        </div>
      )}
    </section>
  )
}
