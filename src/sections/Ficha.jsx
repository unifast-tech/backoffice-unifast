import { useEffect } from 'react'
import Icon from '../components/Icon.jsx'
import '../styles/ficha.css'

/* Caixa medida em reference-ficha.png: 432x332 na pagina em (519, 629),
   borda dourada de 2px. */
export default function Ficha({ sistema, onFechar }) {
  useEffect(() => {
    if (!sistema) return undefined
    const aoTeclar = (e) => {
      if (e.key === 'Escape') onFechar()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [sistema, onFechar])

  if (!sistema) return null
  const { code, name, icon, status, ficha } = sistema

  return (
    <div className="ficha-camada" role="dialog" aria-modal="true" aria-label={`Ficha de ${name}`}>
      <button type="button" className="ficha-fundo" onClick={onFechar} aria-label="Fechar ficha" />

      <article className="card ficha">
        <header className="ficha__topo">
          <span className="t3">FICHA &middot; {code}</span>
          <button type="button" className="t3 ficha__fechar" onClick={onFechar}>
            &times; FECHAR
          </button>
        </header>

        <div className="ficha__identidade">
          <span className="ficha__ico">
            <Icon name={icon} escala={0.72} />
          </span>
          <div>
            <p className="h2 ficha__nome">{name}</p>
            <p className="t2 ficha__tagline">{ficha.tagline}</p>
          </div>
        </div>

        <dl className="ficha__specs">
          <div>
            <dt className="t3">ORIGEM</dt>
            <dd>{ficha.origem}</dd>
          </div>
          <div>
            <dt className="t3">ARMAZENA</dt>
            <dd>{ficha.armazena}</dd>
          </div>
          <div>
            <dt className="t3">ENTREGA</dt>
            <dd>{ficha.entrega}</dd>
          </div>
        </dl>

        <footer className="ficha__rodape">
          <p className="t3">
            <span className="ponto" /> {status || 'SEMPRE ATIVO'}
          </p>
        </footer>
      </article>
    </div>
  )
}
