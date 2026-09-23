import { useRef, useState } from 'react'
import Carrossel from '../components/Carrossel.jsx'
import FichaCompleta from '../components/FichaCompleta.jsx'
import Icon from '../components/Icon.jsx'
import { NUCLEO, SISTEMAS } from '../data/systems.js'
import '../styles/produtos.css'

/* Fotos de cada produto: basta soltar os arquivos em
   src/assets/produtos/<pasta>/ (a pasta e o nome do sistema em minusculas,
   com hifen no lugar de espaco). O Vite encontra sozinho; a ordem segue o
   nome do arquivo (01.png, 02.png...). */
const ARQUIVOS = import.meta.glob('../assets/produtos/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

const pasta = (s) => s.name.toLowerCase().replace(/\s+/g, '-')

/* O nome do arquivo vira legenda ("Nova Turma.png" -> "Nova Turma"). Nomes
   genericos (captura de tela, screenshot, IMG_0001, 01) ficam sem legenda. */
const GENERICO = /^(captura de tela|screenshot|imagem|img[_ -]?\d|\d+$)/i

function legendaDe(caminho) {
  const nome = decodeURIComponent(caminho.split('/').pop()).replace(/\.[^.]+$/, '').trim()
  return GENERICO.test(nome) ? null : nome
}

function fotosDe(sistema) {
  const prefixo = `../assets/produtos/${pasta(sistema)}/`
  const caminhos = Object.keys(ARQUIVOS)
    .filter((c) => c.startsWith(prefixo))
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  return caminhos.map((c, i) => {
    const legenda = legendaDe(c)
    return {
      src: ARQUIVOS[c],
      legenda,
      alt: legenda
        ? `Tela do ${sistema.name}: ${legenda}`
        : `Tela do ${sistema.name}, ${i + 1} de ${caminhos.length}`,
    }
  })
}

/* na ordem dos codigos: U0, U1, U2... */
const PRODUTOS = [NUCLEO, ...SISTEMAS].sort((a, b) => a.code.localeCompare(b.code))

/* A ficha inteira fica a mostra, sem modal. O filtro (linha unica no topo) e
   o carrossel (a esquerda) ficam fixos enquanto o texto rola a direita, entao
   da para trocar de produto em qualquer ponto da leitura. */
export default function Produtos() {
  const [escolhido, setEscolhido] = useState(PRODUTOS[0].id)
  const vitrine = useRef(null)
  const sistema = PRODUTOS.find((s) => s.id === escolhido)
  const { ficha } = sistema
  const fotos = fotosDe(sistema)

  /* Trocar de produto no meio da leitura volta ao comeco do texto novo. */
  const escolher = (id) => {
    setEscolhido(id)
    const el = vitrine.current
    if (el && el.getBoundingClientRect().top < 0) {
      const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ block: 'start', behavior: suave ? 'smooth' : 'auto' })
    }
  }

  return (
    <section className="secao secao--produtos" id="produtos">
      <div className="secao__cabecalho">
        <span className="t3">03 / OS PRODUTOS POR DENTRO</span>
        <span className="t3">ESCOLHA UM SISTEMA PARA CONHECER</span>
      </div>

      {/* linha unica, fixa no topo enquanto a secao rola */}
      <div className="produtos__filtro" role="group" aria-label="Escolha o produto">
        {PRODUTOS.map((s) => (
          <button
            type="button"
            key={s.id}
            className={`produtos__opcao${s.id === escolhido ? ' is-atual' : ''}`}
            onClick={() => escolher(s.id)}
            aria-pressed={s.id === escolhido}
          >
            <span className="produtos__opcao-code">{s.code}</span>
            {s.name}
          </button>
        ))}
      </div>

      <div className="produtos__vitrine" ref={vitrine}>
        <div className="produtos__galeria">
          {/* key: trocar de produto recomeca o carrossel na primeira foto */}
          <Carrossel
            key={`fotos-${sistema.id}`}
            fotos={fotos}
            rotulo={`Telas do ${sistema.name}`}
            vazio={
              <>
                <span className="produtos__vazio-ico">
                  <Icon name={sistema.icon} />
                </span>
                <p className="t3">AS TELAS DO {sistema.name} CHEGAM EM BREVE</p>
              </>
            }
          />
        </div>

        {/* key: o texto entra de novo, com fade, a cada troca */}
        <article className="produtos__texto" key={`texto-${sistema.id}`}>
          <p className="t3 produtos__code">
            {sistema.code} &middot; {ficha.categoria}
          </p>
          <h3 className="h2 produtos__nome">{sistema.name}</h3>
          <p className="t3 produtos__subtitulo">{ficha.subtitulo}</p>
          {ficha.tagline && <p className="produtos__chamada">{ficha.tagline}</p>}
          <p className="produtos__resumo">{ficha.resumo}</p>

          <dl className="produtos__specs">
            <div className={`estado--${sistema.state}`}>
              <dt className="t3">STATUS</dt>
              <dd className="produtos__estado">
                <span className="ponto" />
                {sistema.status}
              </dd>
            </div>
            <div>
              <dt className="t3">TIPO</dt>
              <dd>{ficha.tipo}</dd>
            </div>
          </dl>

          <FichaCompleta id={`produto-${sistema.id}`} name={sistema.name} ficha={ficha} />
        </article>
      </div>
    </section>
  )
}
