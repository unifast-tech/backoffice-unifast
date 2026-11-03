import Icon from '../components/Icon.jsx'
import { CAMPUZZ_TECNOLOGIA, MODULO_VENDAS, GRUPOS_APOIO } from '../data/groups.js'
import { SISTEMAS, NUCLEO } from '../data/systems.js'
import '../styles/integration.css'

const POR_ID = Object.fromEntries([...SISTEMAS, NUCLEO].map((s) => [s.id, s]))

function Plataforma({ sistemaId, aberto, onAbrir }) {
  const sistema = POR_ID[sistemaId]
  return (
    <button
      type="button"
      className={`plataforma estado--${sistema.state}${aberto?.id === sistema.id ? ' is-aberta' : ''}`}
      onClick={() => onAbrir(sistema)}
      aria-label={`Abrir ficha de ${sistema.name}`}
    >
      <span className="plataforma__icone" aria-hidden="true"><Icon name={sistema.icon} escala={0.8} /></span>
      <span className="plataforma__identidade">
        <span className="t3 plataforma__codigo">{sistema.code}</span>
        <span className="h3 plataforma__nome">{sistema.name}</span>
        <span className="t3 plataforma__estado"><span className="ponto" />{sistema.status}</span>
      </span>
      <span className="plataforma__mais" aria-hidden="true">+</span>
    </button>
  )
}

export default function Integration({ aberto, onAbrir }) {
  const propsPlataforma = { aberto, onAbrir }
  return (
    <section className="secao secao--integracao" id="esquema" aria-labelledby="integracao-titulo">
      <div className="secao__cabecalho">
        <h2 className="t3" id="integracao-titulo">01 / ECOSSISTEMA POR GRUPOS</h2>
        <span className="t3">CADA PLATAFORMA NO SEU CONTEXTO</span>
      </div>

      <div className="ecossistema">
        <header className="ecossistema__base">
          <p className="t3 ecossistema__rotulo">{CAMPUZZ_TECNOLOGIA.nome} / TECNOLOGIA</p>
          <h3 className="h2">{CAMPUZZ_TECNOLOGIA.titulo}</h3>
          <p>{CAMPUZZ_TECNOLOGIA.descricao}</p>
          <p className="ecossistema__distincao">{CAMPUZZ_TECNOLOGIA.distincao}</p>
        </header>

        <div className="ecossistema__identidade">
          <div className="ecossistema__contexto">
            <p className="t3 ecossistema__rotulo">CONEXÃO ENTRE TODAS AS PLATAFORMAS</p>
            <h4 className="h2">Uma identidade para todo o ecossistema.</h4>
            <p>O Accountzz conecta todas as plataformas pela camada compartilhada de identidade e acesso.</p>
          </div>
          <Plataforma sistemaId={NUCLEO.id} {...propsPlataforma} />
        </div>

        <section className="grupo grupo--vendas" aria-labelledby="grupo-vendas-titulo">
          <header className="grupo__cabecalho">
            <div>
              <p className="t3 ecossistema__rotulo">CAMPUZZ TECNOLOGIA / OPERAÇÃO COMERCIAL</p>
              <h4 className="h2" id="grupo-vendas-titulo">{MODULO_VENDAS.nome}</h4>
              <p>{MODULO_VENDAS.descricao}</p>
            </div>
          </header>

          <ol className="grupo__funcoes">
            {MODULO_VENDAS.funcoes.map((funcao, i) => (
              <li className={`funcao${funcao.pendente ? ' funcao--pendente' : ''}`} key={funcao.id}>
                <div className="funcao__titulo">
                  <span className="t3 funcao__numero">{String(i + 1).padStart(2, '0')}</span>
                  <h5 className="h3">{funcao.nome}</h5>
                </div>
                <p className="funcao__descricao">{funcao.descricao}</p>
                <div className="funcao__plataformas">
                  {funcao.plataformas.map((plataforma) => plataforma.sistemaId ? (
                    <Plataforma key={plataforma.sistemaId} sistemaId={plataforma.sistemaId} {...propsPlataforma} />
                  ) : (
                    <span className="funcao__ferramenta" key={plataforma.nome}>{plataforma.nome}</span>
                  ))}
                  {funcao.pendente && <span className="t3 funcao__pendente">A DEFINIR</span>}
                </div>
                {funcao.futuro && (
                  <div className="funcao__futuro">
                    <p className="t3">EVOLUÇÃO PREVISTA → {funcao.futuro.nome}</p>
                    <Plataforma sistemaId={funcao.futuro.sistemaId} {...propsPlataforma} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <div className="ecossistema__apoio">
          {GRUPOS_APOIO.map((grupo) => (
            <section className="grupo grupo--apoio" key={grupo.id} aria-labelledby={`grupo-${grupo.id}-titulo`}>
              <h4 className="t3 ecossistema__rotulo" id={`grupo-${grupo.id}-titulo`}>{grupo.nome}</h4>
              <Plataforma sistemaId={grupo.sistemaId} {...propsPlataforma} />
              <p>{grupo.descricao}</p>
            </section>
          ))}
        </div>
      </div>

      <p className="t3 secao__nota">+ CLIQUE EM UMA PLATAFORMA PARA ABRIR SUA FICHA COMPLETA</p>
      <p className="t3 secao__nota">OS GRUPOS MOSTRAM O PAPEL DE CADA PLATAFORMA; EVOLUÇÕES FUTURAS ESTÃO SINALIZADAS.</p>
    </section>
  )
}
