/* Trilhas da operacao. As colunas sao as 4 do grid de conteudo:
   centros medidos em x = 228, 556, 884, 1212 (CSS). */

import { SISTEMAS } from './systems.js'

/* Nome e icone de cada coluna vem do sistema correspondente em systems.js,
   para nao divergirem do esquema de integracao. */
export const COLUNAS = ['u3', 'u2', 'u4', 'u1'].map((id) => {
  const s = SISTEMAS.find((sis) => sis.id === id)
  return { id, label: s.name, icon: s.icon }
})

/* paradas: na ordem em que a pessoa passa. `opcional` e um desvio que a
   pessoa pode escolher: sai tracejado, sem numero, ligado a parada mais
   proxima da trilha. */
export const TRILHAS = [
  {
    id: 'lead',
    label: '01 · TRILHA DO LEAD',
    descricao: 'Quem chega pelo WhatsApp e vira aluno.',
    paradas: [
      { col: 0, texto: 'Lead entra pelo WhatsApp' },
      { col: 2, texto: 'Vira aluno na jornada acadêmica' },
    ],
  },
  {
    id: 'expert',
    label: '02 · TRILHA DO EXPERT',
    descricao: 'Quem dá o curso e acompanha os resultados.',
    paradas: [
      { col: 2, texto: 'Turma avança e gera dado' },
      { col: 3, texto: 'Expert acompanha o resultado' },
      { col: 0, texto: 'Pode contratar o LeadsHug para o próprio atendimento', opcional: true },
    ],
  },
  {
    id: 'equipes',
    label: '03 · TRILHA DAS EQUIPES UNIFAST',
    descricao: 'Quem opera a UniFast por dentro.',
    paradas: [
      { col: 0, texto: 'Atendimento & CRM' },
      { col: 1, texto: 'Acompanha notas fiscais' },
      { col: 2, texto: 'Suporte acadêmico' },
    ],
  },
]
