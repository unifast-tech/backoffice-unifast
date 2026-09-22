import { useState } from 'react'
import { SISTEMAS, NUCLEO } from './data/systems.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Integration from './sections/Integration.jsx'
import Trails from './sections/Trails.jsx'
import Cta from './sections/Cta.jsx'
import './styles/page.css'

/* ?ficha=u1 abre a ficha daquele sistema direto no carregamento, para
   compartilhar link de um sistema especifico. */
function fichaDaUrl() {
  const id = new URLSearchParams(window.location.search).get('ficha')
  return [...SISTEMAS, NUCLEO].find((s) => s.id === id) || null
}

export default function App() {
  const [aberto, setAberto] = useState(fichaDaUrl)

  return (
    <div className="page">
      <div className="frame" aria-hidden="true">
        <span className="frame__corner frame__corner--tl" />
        <span className="frame__corner frame__corner--tr" />
        <span className="frame__corner frame__corner--bl" />
        <span className="frame__corner frame__corner--br" />
      </div>

      <div className="shell">
        <Nav />
        <Hero />
        <Integration aberto={aberto} onAbrir={setAberto} onFechar={() => setAberto(null)} />
        <Trails />
        <Cta />
      </div>
    </div>
  )
}
