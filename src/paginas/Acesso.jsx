import { useEffect, useId, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { LogoApple, LogoGoogle, LogoMicrosoft } from '../components/Marcas.jsx'
import {
  CADASTRO_URL,
  DOMINIOS_UNIFAST,
  LOGIN_URL,
  PRIVACIDADE_URL,
  TERMOS_URL,
  WHATSAPP_URL,
} from '../data/links.js'
import '../styles/page.css'
import '../styles/acesso.css'

/* Entrar e criar conta tem a mesma estrutura; o que muda esta aqui. */
const MODOS = {
  entrar: {
    titulo: 'Entrar',
    acao: 'ENTRAR COM',
    rotulo: 'E-MAIL',
    placeholder: 'Coloque seu e-mail aqui',
    troca: { pergunta: 'ainda não tem uma conta?', texto: 'CRIAR UMA CONTA', href: CADASTRO_URL },
  },
  cadastro: {
    titulo: 'Criar conta',
    acao: 'CADASTRAR COM',
    rotulo: 'E-MAIL UNIFAST',
    placeholder: `seunome@${DOMINIOS_UNIFAST[0] ?? 'unifast.com.br'}`,
    troca: { pergunta: 'já tem uma conta?', texto: 'ENTRAR', href: LOGIN_URL },
  },
}

const PROVEDORES = [
  { id: 'google', nome: 'Google', Logo: LogoGoogle },
  { id: 'microsoft', nome: 'Microsoft', Logo: LogoMicrosoft },
  { id: 'apple', nome: 'Apple', Logo: LogoApple },
]

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar(email, modo) {
  const valor = email.trim()
  if (!valor) return 'Informe o seu e-mail.'
  if (!EMAIL.test(valor)) return 'Confira o e-mail: falta algo como nome@empresa.com.br.'
  if (modo === 'cadastro' && DOMINIOS_UNIFAST.length > 0) {
    const dominio = valor.split('@')[1].toLowerCase()
    if (!DOMINIOS_UNIFAST.includes(dominio)) {
      return `Use o seu e-mail UniFast (@${DOMINIOS_UNIFAST[0]}).`
    }
  }
  return null
}

/* Tela de acesso (so o front). Validar o e-mail funciona; enviar ainda nao
   autentica: mostra que o acesso pelo Accountzz nao esta disponivel. */
export default function Acesso({ modo = 'entrar' }) {
  const cfg = MODOS[modo]
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState(null)
  const [estado, setEstado] = useState('livre') // livre | enviando | aviso
  const campo = useRef(null)
  const timer = useRef(null)
  const idCampo = useId()
  const idErro = useId()

  useEffect(() => {
    document.title = `${cfg.titulo} · UniFast`
  }, [cfg.titulo])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const avisar = () => {
    setEstado('enviando')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setEstado('aviso'), 700)
  }

  const enviar = (e) => {
    e.preventDefault()
    const problema = validar(email, modo)
    setErro(problema)
    if (problema) {
      campo.current?.focus()
      return
    }
    avisar()
  }

  return (
    <div className="page acesso">
      <div className="frame" aria-hidden="true">
        <span className="frame__corner frame__corner--tl" />
        <span className="frame__corner frame__corner--tr" />
        <span className="frame__corner frame__corner--bl" />
        <span className="frame__corner frame__corner--br" />
      </div>

      <header className="acesso__topo">
        <span className="t3">UNIFAST-TECH / ACESSO</span>
        <a className="t3 acesso__voltar" href="/">
          &larr; VOLTAR AO SITE
        </a>
      </header>

      <main className="acesso__centro">
        <section className="card acesso__cartao" aria-labelledby="acesso-titulo">
          <div className="acesso__marca">
            <span className="acesso__logo">
              <Icon name="logo-uf" />
            </span>
            <span className="acesso__nome">UniFast</span>
          </div>
          <h1 className="t3 acesso__titulo" id="acesso-titulo">
            {cfg.titulo}
          </h1>

          <div className="acesso__provedores">
            {PROVEDORES.map(({ id, nome, Logo }) => (
              <button
                type="button"
                key={id}
                className="btn btn--cinza acesso__provedor"
                onClick={avisar}
                disabled={estado === 'enviando'}
              >
                <Logo />
                {cfg.acao} {nome.toUpperCase()}
              </button>
            ))}
          </div>

          <p className="acesso__divisor">
            <span>ou</span>
          </p>

          <form className="acesso__form" onSubmit={enviar} noValidate>
            <label className="t3 acesso__rotulo" htmlFor={idCampo}>
              {cfg.rotulo}
            </label>
            <div className={`acesso__campo${erro ? ' is-erro' : ''}`}>
              <input
                ref={campo}
                id={idCampo}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder={cfg.placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (erro) setErro(null)
                  if (estado === 'aviso') setEstado('livre')
                }}
                aria-invalid={Boolean(erro)}
                aria-describedby={erro ? idErro : undefined}
              />
              <Icon name="envelope" className="acesso__campo-ico" />
            </div>
            {erro && (
              <p className="acesso__erro" id={idErro} role="alert">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="btn btn--ouro acesso__avancar"
              disabled={estado === 'enviando'}
            >
              {estado === 'enviando' ? 'AGUARDE…' : 'AVANÇAR'}
            </button>
          </form>

          {estado === 'aviso' && (
            <p className="acesso__aviso" role="status">
              O acesso pelo Accountzz ainda não está disponível. Em breve você entra por aqui.
            </p>
          )}

          <p className="acesso__divisor">
            <span>{cfg.troca.pergunta}</span>
          </p>

          <a className="btn btn--cinza acesso__troca" href={cfg.troca.href}>
            {cfg.troca.texto}
          </a>

          <footer className="acesso__rodape">
            <p>Copyright &copy; UniFast {new Date().getFullYear()}</p>
            <p className="acesso__links">
              {TERMOS_URL && <a href={TERMOS_URL}>Termos de uso</a>}
              {PRIVACIDADE_URL && <a href={PRIVACIDADE_URL}>Política de privacidade</a>}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Contato
              </a>
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
