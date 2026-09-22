import { useEffect, useRef, useState } from 'react'
import '../styles/revelar.css'

/* Revela o bloco quando ele entra na tela, uma vez so.
   O estado final e `transform: none`, e nao `translateY(0)`: qualquer transform
   remanescente viraria o bloco de referencia dos filhos `position: fixed` e
   quebraria o escurecimento da ficha. */
export default function Revelavel({ children }) {
  const alvo = useRef(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = alvo.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisivel(true)
      return undefined
    }

    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setVisivel(true)
        obs.disconnect()
      },
      /* sem margem negativa: ela impedia a ultima secao da pagina de disparar */
      { threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={alvo} className={`revelavel${visivel ? ' revelavel--visivel' : ''}`}>
      {children}
    </div>
  )
}
