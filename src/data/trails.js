/* Trilhas da operacao. As colunas sao as 4 do grid de conteudo:
   centros medidos em x = 228, 556, 884, 1212 (CSS). */

import { SISTEMAS } from './systems.js'

/* Nome e icone de cada coluna vem do sistema correspondente em systems.js,
   para nao divergirem do esquema de integracao. */
export const COLUNAS = ['u3', 'u2', 'u4', 'u1'].map((id) => {
  const s = SISTEMAS.find((sis) => sis.id === id)
  return { id, label: s.name, icon: s.icon }
})

export const TRILHAS = [
  {
    id: 'lead',
    label: '01 · TRILHA DO LEAD',
    paradas: [
      { col: 0, texto: 'Lead entra pelo WhatsApp' },
      { col: 2, texto: 'Vira aluno na jornada acadêmica' },
    ],
  },
  {
    id: 'expert',
    label: '02 · TRILHA DO EXPERT',
    paradas: [
      { col: 2, texto: 'Turma avança e gera dado' },
      { col: 3, texto: 'Expert acompanha o resultado' },
    ],
  },
  {
    id: 'equipes',
    label: '03 · TRILHA DAS EQUIPES UNIFAST',
    paradas: [
      { col: 0, texto: 'Atendimento & CRM' },
      { col: 1, texto: 'Acompanha notas fiscais' },
      { col: 2, texto: 'Suporte acadêmico' },
    ],
  },
]
