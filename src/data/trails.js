/* Trilhas da operacao. As colunas sao as 4 do grid de conteudo:
   centros medidos em x = 228, 556, 884, 1212 (CSS). */

export const COLUNAS = [
  { id: 'leadshug', label: 'LEADSHUG', icon: 'balao' },
  { id: 'monitornotes', label: 'MONITORNOTES', icon: 'nota' },
  { id: 'campuzz', label: 'CAMPUZZ', icon: 'capelo' },
  { id: 'fasthub', label: 'FASTHUB', icon: 'grafico' },
]

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
