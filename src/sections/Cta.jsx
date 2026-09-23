import { WHATSAPP_URL } from '../data/links.js'
import '../styles/cta.css'

/* Abre o WhatsApp do time tech com a mensagem ja preenchida. */
export default function Cta() {
  return (
    <section className="cta">
      <a className="btn2" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        FALE COM
        <br />O TIME TECH
      </a>
    </section>
  )
}
