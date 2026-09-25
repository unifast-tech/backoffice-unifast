import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { SISTEMAS, NUCLEO } from '../data/systems.js'
import '../styles/ficha-tecnica.css'

/* Contagens derivadas de systems.js: mudar o estado de um sistema la atualiza
   a ficha sozinha. */
const contar = (estado) =>
  String(SISTEMAS.filter((s) => s.state === estado).length).padStart(2, '0')

const LINHAS = [
  ['MÓDULOS ATIVOS', contar('producao')],
  ['AVANÇADOS', contar('avancado')],
  ['EM DESENVOLVIMENTO', contar('desenvolvimento')],
  ['NÚCLEO DE IDENTIDADE', NUCLEO.name],
  ['CANAL PRINCIPAL', 'WHATSAPP'],
]

export default function FichaTecnica({ inerte = false }) {
  const [aberta, setAberta] = useState(false)
  const caixa = useRef(null)

  useEffect(() => {
    if (!aberta) return undefined
    const aoTeclar = (e) => {
      if (e.key === 'Escape') setAberta(false)
    }
    const aoClicar = (e) => {
      if (caixa.current && !caixa.current.contains(e.target)) setAberta(false)
    }
    window.addEventListener('keydown', aoTeclar)
    window.addEventListener('pointerdown', aoClicar)
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      window.removeEventListener('pointerdown', aoClicar)
    }
  }, [aberta])

  return (
    <div className="ficha-tecnica-ancora" ref={caixa} inert={inerte}>
      {aberta && (
        <aside className="card ficha-tecnica" role="dialog" aria-label="Ficha técnica">
          <p className="t3 ficha-tecnica__titulo">FICHA TÉCNICA</p>
          <dl className="ficha-tecnica__linhas">
            {LINHAS.map(([rotulo, valor]) => (
              <div className="ficha-tecnica__linha" key={rotulo}>
                <dt className="t3">{rotulo}</dt>
                <dd className="t2">{valor}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )}

      <button
        type="button"
        className="ficha-tecnica__gatilho"
        onClick={() => setAberta((v) => !v)}
        aria-expanded={aberta}
        aria-label={aberta ? 'Fechar ficha técnica' : 'Abrir ficha técnica'}
      >
        <Icon name="ficha" escala={0.62} />
      </button>
    </div>
  )
}
