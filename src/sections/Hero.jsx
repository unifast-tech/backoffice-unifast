import Icon from '../components/Icon.jsx'
import '../styles/hero.css'

const FICHA = [
  ['MÓDULOS ATIVOS', '04'],
  ['EM DESENVOLVIMENTO', '01'],
  ['NÚCLEO DE IDENTIDADE', 'UNIFASTIAM'],
  ['CANAL PRINCIPAL', 'WHATSAPP'],
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__topo">
        <div className="hero__marca">
          <span className="hero__logo">
            <Icon name="logo-uf" />
          </span>
          <div>
            <p className="h3 hero__marca-nome">UNIFAST TECH</p>
            <p className="t3">INFRAESTRUTURA INTERNA DE PRODUTOS</p>
          </div>
        </div>

        <aside className="card ficha-tecnica">
          <p className="t3 ficha-tecnica__titulo">FICHA TÉCNICA</p>
          <dl className="ficha-tecnica__linhas">
            {FICHA.map(([rotulo, valor]) => (
              <div className="ficha-tecnica__linha" key={rotulo}>
                <dt className="t3">{rotulo}</dt>
                <dd className="t2">{valor}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <h1 className="h1">
        A <em>ENGENHARIA</em>
        <br />
        POR TRÁS DA UNIFAST.
      </h1>

      <p className="t1 hero__linha-fina">
        Identidade, dados, notas fiscais, clientes e jornada acadêmica.{' '}
        <br />
        Cinco sistemas que já sustentam a operação &mdash; documentados aqui{' '}
        <br />
        como o que realmente são: peças de uma única máquina.
      </p>
    </section>
  )
}
