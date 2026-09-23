import { useEffect, useState } from 'react'
import TelaCheia from './TelaCheia.jsx'
import '../styles/carrossel.css'

const INTERVALO = 5000

/* Carrossel de fotos que passa sozinho a cada 5s, sempre: nao para com mouse,
   foco nem com "reduzir movimento" (nesse caso so perde o fade). O unico
   jeito de parar e o botao de pausar, que a WCAG 2.2.2 exige para conteudo
   que se move sozinho. Clicar na foto abre a tela cheia; ao fechar, o
   carrossel segue da foto em que a pessoa parou. `vazio` e o que aparece
   enquanto nao houver foto. */
export default function Carrossel({ fotos, rotulo, vazio }) {
  const [atual, setAtual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [telaCheia, setTelaCheia] = useState(false)
  const total = fotos.length
  const rodando = total > 1 && !pausado && !telaCheia

  useEffect(() => {
    if (!rodando) return undefined
    const id = window.setInterval(() => setAtual((i) => (i + 1) % total), INTERVALO)
    return () => window.clearInterval(id)
  }, [rodando, total])

  if (total === 0) return <div className="carrossel carrossel--vazio">{vazio}</div>

  const ir = (i) => setAtual((i + total) % total)

  return (
    <div className="carrossel" role="region" aria-roledescription="carrossel" aria-label={rotulo}>
      <div className="carrossel__palco" aria-live={rodando ? 'off' : 'polite'}>
        {fotos.map((foto, i) => (
          <figure
            key={foto.src}
            className={`carrossel__foto${i === atual ? ' is-atual' : ''}`}
            aria-hidden={i !== atual}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
          >
            <button
              type="button"
              className="carrossel__ampliar"
              onClick={() => setTelaCheia(true)}
              tabIndex={i === atual ? 0 : -1}
              aria-label={`Ver em tela cheia: ${foto.alt}`}
            >
              <img src={foto.src} alt={foto.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              <span className="t3 carrossel__dica" aria-hidden="true">
                ⤢ TELA CHEIA
              </span>
            </button>
          </figure>
        ))}
      </div>

      {total > 1 && (
        <div className="carrossel__controles">
          <button
            type="button"
            className="carrossel__botao"
            onClick={() => setPausado((p) => !p)}
            aria-label={pausado ? 'Passar as fotos sozinho' : 'Pausar as fotos'}
          >
            {pausado ? '▶' : '❚❚'}
          </button>
          <button
            type="button"
            className="carrossel__botao"
            onClick={() => ir(atual - 1)}
            aria-label="Foto anterior"
          >
            ‹
          </button>

          <div className="carrossel__pontos">
            {fotos.map((foto, i) => (
              <button
                type="button"
                key={foto.src}
                className={`carrossel__ponto${i === atual ? ' is-atual' : ''}`}
                onClick={() => ir(i)}
                aria-label={`Foto ${i + 1} de ${total}`}
                aria-current={i === atual}
              />
            ))}
          </div>

          <button
            type="button"
            className="carrossel__botao"
            onClick={() => ir(atual + 1)}
            aria-label="Próxima foto"
          >
            ›
          </button>
          <span className="t3 carrossel__contador" aria-hidden="true">
            {fotos[atual].legenda && (
              <span className="carrossel__legenda">{fotos[atual].legenda}</span>
            )}
            {String(atual + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* progresso ate a proxima foto; reinicia a cada troca */}
      {rodando && <span className="carrossel__progresso" key={atual} aria-hidden="true" />}

      {telaCheia && (
        <TelaCheia
          fotos={fotos}
          inicio={atual}
          titulo={rotulo}
          onFechar={(parou) => {
            setAtual(parou)
            setTelaCheia(false)
          }}
        />
      )}
    </div>
  )
}
