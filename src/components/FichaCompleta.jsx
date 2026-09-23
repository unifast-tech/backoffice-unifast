import '../styles/ficha.css'

/* Ficha completa, na ordem fixa: visao geral, problema, funcoes, casos,
   evolucao, ecossistema, fluxo, monitoramento, seguranca, integracoes,
   tecnologia, estagio, papel. Blocos sem conteudo sao omitidos.
   Usada no modal da ficha (ao expandir) e na secao Os produtos por dentro,
   onde aparece sempre aberta. As classes vivem em ficha.css. */
export default function FichaCompleta({ id, name, ficha }) {
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
