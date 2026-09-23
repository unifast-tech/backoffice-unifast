/* Enderecos e configuracao de acesso usados em mais de uma tela. */

/* Telas de acesso. Por enquanto so o front: nada autentica ainda. Quando o
   login pelo Accountzz existir, e aqui que os destinos mudam. */
export const LOGIN_URL = '/entrar'
export const CADASTRO_URL = '/cadastro'

/* Dominios aceitos no cadastro: o e-mail precisa ser da UniFast. Vazio
   aceitaria qualquer e-mail valido. */
export const DOMINIOS_UNIFAST = ['unifast.com.br']

/* Rodape das telas de acesso. null: o link nao aparece ate a pagina existir. */
export const TERMOS_URL = null
export const PRIVACIDADE_URL = null

/* Abre o WhatsApp do time tech com a mensagem ja preenchida. */
export const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=5515997190538' +
  '&text=Ol%C3%A1%20gostaria%20de%20saber%20mais%20sobre%20a%20estrutura%20e%20produtos%20do%20time%20tech' +
  '&type=phone_number&app_absent=0'
