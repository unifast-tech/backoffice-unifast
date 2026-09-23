import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '../styles/tela-cheia.css'

/* Foto em tela cheia, com anterior e proxima: botoes, setas do teclado e
   deslizar o dedo. Fecha com o botao, Esc ou clique fora da foto. Monta no
   body (portal) para nao depender do empilhamento da secao, e deixa o resto
   da pagina inert enquanto esta aberta. */
export default function TelaCheia({ fotos, inicio, titulo, onFechar }) {
  const [atual, setAtual] = useState(inicio)
  const botaoFechar = useRef(null)
  const toque = useRef(null)
  const total = fotos.length
  const ir = (i) => setAtual((i + total) % total)

  /* onFechar recebe a foto em que a pessoa parou, para o carrossel seguir dali */
  const fechar = () => onFechar(atual)

  useEffect(() => {
    const aoTeclar = (e) => {
      if (e.key === 'Escape') onFechar(atual)
      else if (e.key === 'ArrowRight') setAtual((i) => (i + 1) % total)
      else if (e.key === 'ArrowLeft') setAtual((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [atual, total, onFechar])

  useEffect(() => {
    const origem = document.activeElement
    const raiz = document.documentElement
    const app = document.getElementById('root')
    const overflowAntes = raiz.style.overflow
    raiz.style.overflow = 'hidden'
    if (app) app.inert = true
    botaoFechar.current?.focus()
    return () => {
      raiz.style.overflow = overflowAntes
      if (app) app.inert = false
      if (origem instanceof HTMLElement && origem.isConnected) origem.focus({ preventScroll: true })
    }
  }, [])

  const foto = fotos[atual]

  return createPortal(
    <div
      className="tela-cheia"
      role="dialog"
      aria-modal="true"
      aria-label={`${titulo}: foto ${atual + 1} de ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar()
      }}
      onPointerDown={(e) => {
        toque.current = e.clientX
      }}
      onPointerUp={(e) => {
        if (toque.current === null) return
        const dx = e.clientX - toque.current
        toque.current = null
        if (Math.abs(dx) > 50 && total > 1) ir(atual + (dx < 0 ? 1 : -1))
      }}
    >
      <header className="tela-cheia__topo">
        <span className="t3">
          {titulo} &middot; {String(atual + 1).padStart(2, '0')} /{' '}
          {String(total).padStart(2, '0')}
          {foto.legenda && <span className="tela-cheia__legenda">{foto.legenda}</span>}
        </span>
        <button type="button" className="t3 tela-cheia__fechar" onClick={fechar} ref={botaoFechar}>
          &times; FECHAR
        </button>
      </header>

      <img className="tela-cheia__foto" src={foto.src} alt={foto.alt} key={foto.src} />

      {total > 1 && (
        <>
          <button
            type="button"
            className="tela-cheia__seta tela-cheia__seta--ant"
            onClick={() => ir(atual - 1)}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="tela-cheia__seta tela-cheia__seta--prox"
            onClick={() => ir(atual + 1)}
            aria-label="Próxima foto"
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
