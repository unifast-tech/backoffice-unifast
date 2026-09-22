import Icon from '../components/Icon.jsx'
import '../styles/hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__fundo" aria-hidden="true" />

      <div className="hero__marca">
        <span className="hero__logo">
          <Icon name="logo-uf" />
        </span>
        <div>
          <p className="h3 hero__marca-nome">UNIFAST TECH</p>
          <p className="t3">INFRAESTRUTURA INTERNA DE PRODUTOS</p>
        </div>
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

      <p className="t3 hero__rolagem" aria-hidden="true">
        <span className="hero__rolagem-linha" />
        ROLE PARA O ESQUEMA
      </p>
    </section>
  )
}
