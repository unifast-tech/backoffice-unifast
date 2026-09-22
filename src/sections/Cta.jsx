import '../styles/cta.css'

/* Abre o WhatsApp do time tech com a mensagem ja preenchida. */
const WHATSAPP =
  'https://api.whatsapp.com/send/?phone=5515997190538' +
  '&text=Ol%C3%A1%20gostaria%20de%20saber%20mais%20sobre%20a%20estrutura%20e%20produtos%20do%20time%20tech' +
  '&type=phone_number&app_absent=0'

export default function Cta() {
  return (
    <section className="cta">
      <a className="btn2" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
        FALE COM
        <br />O TIME TECH
      </a>
    </section>
  )
}
