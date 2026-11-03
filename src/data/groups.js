/* sistemaId liga cada plataforma à sua ficha em systems.js.
   Ferramentas ainda não definidas não ganham uma ficha de produto. */
export const CAMPUZZ_TECNOLOGIA = {
  nome: 'Campuzz',
  titulo: 'A tecnologia que move todo o ecossistema.',
  descricao:
    'Campuzz é a base tecnológica que sustenta as plataformas e os módulos da UniFast.',
  distincao:
    'Campuzz LMS é o produto de aprendizagem que utiliza essa tecnologia. ' +
    'A base tecnológica e o LMS compartilham o nome e têm papéis distintos.',
}

export const MODULO_VENDAS = {
  id: 'vendas',
  nome: 'Módulo Vendas',
  descricao: 'Quatro funcionalidades do módulo comercial da tecnologia Campuzz.',
  funcoes: [
    {
      id: 'data',
      nome: 'Data',
      descricao: 'Dados e indicadores para acompanhar os resultados.',
      plataformas: [
        { nome: 'Metriczz', sistemaId: 'u1' },
        { nome: 'Relatório Diário', sistemaId: 'u6' },
      ],
    },
    {
      id: 'leads',
      nome: 'Leads',
      descricao: 'Gestão dos leads da operação comercial.',
      plataformas: [{ nome: 'LeadsHug', sistemaId: 'u3' }],
    },
    {
      id: 'mensageria',
      nome: 'Mensageria',
      descricao: 'Comunicação pelos canais de WhatsApp.',
      plataformas: [{ nome: 'Wpp Hub' }, { nome: 'Wpp Ofc' }],
      futuro: { nome: 'LeadsHug', sistemaId: 'u3' },
    },
    {
      id: 'marketing',
      nome: 'Ferramentas de marketing',
      descricao: 'As ferramentas deste grupo ainda serão informadas.',
      plataformas: [],
      pendente: true,
    },
  ],
}

export const GRUPOS_APOIO = [
  {
    id: 'aprendizagem',
    nome: 'Acadêmico & Aprendizagem',
    sistemaId: 'u4',
    descricao: 'Campuzz LMS: o produto de aprendizagem que utiliza a tecnologia Campuzz.',
  },
  {
    id: 'fiscal',
    nome: 'Financeiro & Fiscal',
    sistemaId: 'u2',
    descricao: 'Emissão, monitoramento e gestão de notas fiscais.',
  },
  {
    id: 'produto-tech',
    nome: 'Produto & Tech',
    sistemaId: 'u5',
    descricao: 'O Pailon antecipa a visão do produto e facilita o trabalho do time tech.',
  },
]
