import { useCallback, useEffect, useState } from 'react'
import { SISTEMAS, NUCLEO } from './data/systems.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Integration from './sections/Integration.jsx'
import Trails from './sections/Trails.jsx'
import Cta from './sections/Cta.jsx'
import Ficha from './sections/Ficha.jsx'
import Revelavel from './components/Revelavel.jsx'
import FichaTecnica from './sections/FichaTecnica.jsx'
import './styles/page.css'

/* ?ficha=u1 abre a ficha daquele sistema direto no carregamento, para
   compartilhar link de um sistema especifico. */
function fichaDaUrl() {
  const id = new URLSearchParams(window.location.search).get('ficha')
  return [...SISTEMAS, NUCLEO].find((s) => s.id === id) || null
}

export default function App() {
  const [aberto, setAberto] = useState(fichaDaUrl)
  const fechar = useCallback(() => setAberto(null), [])

  /* A URL acompanha a ficha aberta, entao o endereco da barra ja e o link
     para compartilhar. replaceState: abrir e fechar fichas nao enche o
     historico do voltar. */
  useEffect(() => {
    const url = new URL(window.location.href)
    if (aberto) url.searchParams.set('ficha', aberto.id)
    else url.searchParams.delete('ficha')
    if (url.href !== window.location.href) window.history.replaceState(null, '', url)
  }, [aberto])

  /* Com a ficha aberta o resto da pagina fica `inert`: fora do Tab, do leitor
     de tela e do clique, sem precisar de armadilha de foco manual. */
  const fundoInerte = aberto !== null

  return (
    <div className="page">
      <div className="frame" aria-hidden="true">
        <span className="frame__corner frame__corner--tl" />
        <span className="frame__corner frame__corner--tr" />
        <span className="frame__corner frame__corner--bl" />
        <span className="frame__corner frame__corner--br" />
      </div>

      <div className="shell" inert={fundoInerte}>
        <Nav />
        <Hero />
        <Revelavel>
          <Integration aberto={aberto} onAbrir={setAberto} />
        </Revelavel>
        <Revelavel>
          <Trails />
        </Revelavel>
        <Revelavel>
          <Cta />
        </Revelavel>
      </div>

      <Ficha key={aberto?.id ?? 'fechada'} sistema={aberto} onFechar={fechar} />
      <FichaTecnica inerte={fundoInerte} />
    </div>
  )
}
