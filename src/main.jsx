import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import App from './App.jsx'
import Acesso from './paginas/Acesso.jsx'
import { CADASTRO_URL, LOGIN_URL } from './data/links.js'
import './styles/mobile.css'

/* Rotas simples pelo endereco, sem biblioteca: a LP e as duas telas de
   acesso. O servidor precisa devolver o index.html para qualquer caminho
   (o Vite ja faz isso em dev e em preview). */
const caminho = window.location.pathname.replace(/\/+$/, '') || '/'
const ROTAS = {
  [LOGIN_URL]: <Acesso modo="entrar" />,
  [CADASTRO_URL]: <Acesso modo="cadastro" />,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>{ROTAS[caminho] ?? <App />}</StrictMode>,
)
