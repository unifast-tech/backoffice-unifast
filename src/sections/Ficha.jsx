import { useEffect, useId, useRef, useState } from 'react'
import FichaCompleta from '../components/FichaCompleta.jsx'
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

        {completa && (
          <FichaCompleta
            id={idCompleta}
            name={name}
            ficha={ficha}
            checkpoint={sistema.checkpoint}
          />
        )}

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
