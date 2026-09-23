import { useEffect, useId, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import '../styles/ficha.css'

/* Borda, topo e identidade seguem a ficha medida em reference-ficha.png.
   O conteudo e o formato definido em systems.js: versao curta sempre visivel
   e ficha completa ao expandir. App.jsx remonta este componente a cada
   sistema (key), entao a ficha sempre abre recolhida. */
export default function Ficha({ sistema, onFechar }) {
  const botaoFechar = useRef(null)
  const aberta = sistema !== null
  const [completa, setCompleta] = useState(false)
  const idCompleta = useId()

  useEffect(() => {
    if (!aberta) return undefined
    const aoTeclar = (e) => {
      if (e.key === 'Escape') onFechar()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberta, onFechar])

  /* Foco entra na ficha ao abrir e volta para quem a abriu ao fechar. A pagina
     por tras para de rolar enquanto ela esta aberta. */
  useEffect(() => {
    if (!aberta) return undefined
    const origem = document.activeElement
    const raiz = document.documentElement
    const overflowAntes = raiz.style.overflow
    raiz.style.overflow = 'hidden'
    botaoFechar.current?.focus()
    return () => {
      raiz.style.overflow = overflowAntes
      if (origem instanceof HTMLElement && origem.isConnected) origem.focus({ preventScroll: true })
    }
  }, [aberta])

  if (!sistema) return null
  const { code, name, icon, status, state, ficha } = sistema

  return (
    <div className="ficha-camada" role="dialog" aria-modal="true" aria-label={`Ficha de ${name}`}>
      {/* fechar pelo clique fora; no teclado ja existem o "FECHAR" e o Esc */}
      <button
        type="button"
        className="ficha-fundo"
        onClick={onFechar}
        tabIndex={-1}
        aria-hidden="true"
      />

      <article className={`card ficha ficha--nova${completa ? ' ficha--completa' : ''}`}>
        <header className="ficha__topo">
          <span className="t3">FICHA &middot; {code}</span>
          <button type="button" className="t3 ficha__fechar" onClick={onFechar} ref={botaoFechar}>
            &times; FECHAR
          </button>
        </header>

        <div className="ficha__identidade">
          <span className="ficha__ico">
            <Icon name={icon} escala={0.72} />
          </span>
          <div>
            <p className="h2 ficha__nome">{name}</p>
            <p className="t3 ficha__subtitulo">{ficha.subtitulo}</p>
          </div>
        </div>

        {ficha.tagline && <p className="ficha__chamada">{ficha.tagline}</p>}
        <p className="ficha__resumo">{ficha.resumo}</p>

        <dl className="ficha__specs">
          <div className={`estado--${state}`}>
            <dt className="t3">STATUS</dt>
            <dd className="ficha__estado">
              <span className="ponto" />
              {status}
            </dd>
          </div>
          <div>
            <dt className="t3">CATEGORIA</dt>
            <dd>{ficha.categoria}</dd>
          </div>
          <div>
            <dt className="t3">TIPO</dt>
            <dd>{ficha.tipo}</dd>
          </div>
        </dl>

        {completa && <FichaCompleta id={idCompleta} name={name} ficha={ficha} />}

        <footer className="ficha__rodape ficha__rodape--acao">
          <button
            type="button"
            className="t3 ficha__expandir"
            onClick={() => setCompleta((v) => !v)}
            aria-expanded={completa}
            aria-controls={idCompleta}
          >
            {completa ? '− RECOLHER FICHA' : '+ VER FICHA COMPLETA'}
          </button>
        </footer>
      </article>
    </div>
  )
}

/* Ficha completa, na ordem fixa: visao geral, problema, funcoes, casos,
   evolucao, ecossistema, fluxo, monitoramento, seguranca, integracoes,
   tecnologia, estagio, papel. Blocos sem conteudo sao omitidos. */
function FichaCompleta({ id, name, ficha }) {
  /* um fluxo so ou uma lista deles (atual / planejado) */
  const fluxos = emLista(ficha.fluxo)
  /* um grupo de casos ou varios (ex.: de onde vem, o que falta) */
  const grupos = emLista(ficha.casos).filter((g) => g.itens?.length > 0)

  return (
    <div className="ficha__completa" id={id}>
      <Bloco rotulo="VISÃO GERAL" texto={ficha.visaoGeral} />
      <Bloco rotulo="O PROBLEMA QUE RESOLVE" texto={ficha.problema} />

      {ficha.funcoes?.length > 0 && (
        <section className="ficha__bloco">
          <h3 className="t3 ficha__rotulo">{ficha.funcoesTitulo || 'O QUE FAZ'}</h3>
          <Lista itens={ficha.funcoes} />
        </section>
      )}

      {grupos.map((grupo) => (
        <section className="ficha__bloco" key={grupo.titulo}>
          <h3 className="t3 ficha__rotulo">{grupo.titulo}</h3>
          {grupo.texto && <p className="ficha__texto ficha__texto--abre">{grupo.texto}</p>}
          <dl className={`ficha__casos${grupo.pendente ? ' ficha__casos--pendente' : ''}`}>
            {grupo.itens.map((c, i) => (
              <div key={c.nome}>
                <dt>
                  {grupo.numerado && (
                    <span className="ficha__caso-num">{String(i + 1).padStart(2, '0')}</span>
                  )}
                  {c.nome}
                  {c.via && <span className="t3 ficha__via">via {c.via}</span>}
                  {c.proprio && (
                    <span className="t3 ficha__via ficha__via--proprio">próprio do {name}</span>
                  )}
                </dt>
                <dd>
                  {c.descricao}
                  {c.itens?.length > 0 && (
                    <ul className="ficha__tags">
                      {c.itens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {ficha.evolucao && (
        <section className="ficha__bloco">
          <h3 className="t3 ficha__rotulo">EVOLUÇÃO DO PRODUTO</h3>
          {ficha.evolucao.texto && <p className="ficha__texto">{ficha.evolucao.texto}</p>}
          {ficha.evolucao.itens?.length > 0 && <Lista itens={ficha.evolucao.itens} />}
        </section>
      )}

      <Bloco rotulo="COMO SE CONECTA AO ECOSSISTEMA" texto={ficha.ecossistema} />

      {fluxos.length > 0 && (
        <section className="ficha__bloco">
          <h3 className="t3 ficha__rotulo">{fluxos.length > 1 ? 'FLUXOS' : 'FLUXO DE DADOS'}</h3>
          {fluxos.map((fl) => (
            <div className="ficha__fluxo-grupo" key={fl.rotulo || fl.etapas.join()}>
              {fl.rotulo && (
                <p className={`t3 ficha__fluxo-rotulo${fl.planejado ? ' is-planejado' : ''}`}>
                  {fl.rotulo}
                </p>
              )}
              <ol className={`ficha__fluxo${fl.planejado ? ' ficha__fluxo--planejado' : ''}`}>
                {fl.etapas.map((etapa) => (
                  <li key={etapa}>{etapa}</li>
                ))}
              </ol>
              {fl.texto && <p className="ficha__texto">{fl.texto}</p>}
            </div>
          ))}
        </section>
      )}

      <Bloco rotulo="MONITORAMENTO" texto={ficha.monitoramento} />
      <Bloco rotulo={ficha.segurancaTitulo || 'SEGURANÇA E ACESSO'} texto={ficha.seguranca} />

      {ficha.integracoes?.length > 0 && (
        <section className="ficha__bloco">
          <h3 className="t3 ficha__rotulo">INTEGRAÇÕES</h3>
          <ul className="ficha__integracoes">
            {ficha.integracoes.map((i) => (
              <li key={i.sistema}>
                <span className="ficha__integracao">
                  {i.sistema}
                  {i.converge && (
                    <>
                      {' '}
                      <span className="ficha__seta">&rarr;</span> {name}
                    </>
                  )}
                </span>
                {i.nota && <span className="t3 ficha__nota">{i.nota}</span>}
                {i.descricao && <span className="ficha__integracao-desc">{i.descricao}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {ficha.tecnologia?.length > 0 && (
        <section className="ficha__bloco">
          <h3 className="t3 ficha__rotulo">TECNOLOGIA</h3>
          <dl className="ficha__tecnologia">
            {ficha.tecnologia.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="t3">{rotulo}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <Bloco rotulo="ESTÁGIO ATUAL" texto={ficha.statusDetalhe} />
      <Bloco rotulo="PAPEL NO ECOSSISTEMA" texto={ficha.papel} />

      {ficha.fonte && <p className="t3 ficha__fonte">FONTE: {ficha.fonte}</p>}
    </div>
  )
}

const emLista = (v) => (!v ? [] : Array.isArray(v) ? v : [v])

function Lista({ itens }) {
  return (
    <ul className="ficha__funcoes">
      {itens.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

/* texto pode ser uma string ou uma lista de paragrafos */
function Bloco({ rotulo, texto }) {
  if (!texto) return null
  const paragrafos = Array.isArray(texto) ? texto : [texto]
  return (
    <section className="ficha__bloco">
      <h3 className="t3 ficha__rotulo">{rotulo}</h3>
      {paragrafos.map((p) => (
        <p className="ficha__texto" key={p}>
          {p}
        </p>
      ))}
    </section>
  )
}
