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

/* andamento[]: novidades informadas pelo time, por função ({ sistema?, texto }).
   `checkpoint` é a data dessas novidades e aparece no cabeçalho de cada lista. */
export const MODULO_VENDAS = {
  id: 'vendas',
  nome: 'Módulo Vendas',
  descricao: 'Quatro funcionalidades do módulo comercial da tecnologia Campuzz.',
  checkpoint: '27/11/2026',
  funcoes: [
    {
      id: 'data',
      nome: 'Data',
      descricao: 'Dados e indicadores para acompanhar os resultados.',
      plataformas: [
        { nome: 'Metriczz', sistemaId: 'u1' },
        { nome: 'Relatório Diário', sistemaId: 'u6' },
        { nome: 'Databricks', sistemaId: 'u7' },
      ],
      andamento: [
        {
          sistema: 'Metriczz',
          texto:
            'Primeira versão pronta em stage, em QA. A publicação em produção espera o QA ' +
            'e o IAM em produção; o histórico da Eduzz pela API está em importação.',
        },
        {
          sistema: 'Databricks',
          texto:
            'Vendas e receita da Routerfy corrigidas na produção (25/11). Coprodução Eduzz ' +
            'parada até a reunião com a Eduzz.',
        },
      ],
    },
    {
      id: 'leads',
      nome: 'Leads',
      descricao: 'Gestão dos leads da operação comercial.',
      plataformas: [{ nome: 'Metriczz', sistemaId: 'u1' }],
      andamento: [
        {
          sistema: 'Metriczz',
          texto:
            'Marketing e telas de gestão de leads inspiradas no Mixpanel seguem no backlog, ' +
            'sem prazo.',
        },
        {
          texto:
            'Reestruturação do banco Mongo com a jornada do lead pausada: o time está ' +
            'observando o uso para definir se é preciso reestruturar ou apenas adequar o banco.',
        },
      ],
    },
    {
      id: 'mensageria',
      nome: 'Mensageria',
      descricao: 'Comunicação pelos canais de WhatsApp.',
      plataformas: [{ nome: 'Wpp Hub' }, { nome: 'Wpp Ofc' }],
      futuro: { nome: 'LeadsHug', sistemaId: 'u3' },
      andamento: [
        {
          sistema: 'LeadsHug',
          texto:
            'Contatos e CRM implementados no ambiente local; a experiência integrada no ' +
            'desenho Campuzz Connect está em revisão.',
        },
        {
          sistema: 'Wpp Hub',
          texto: 'Treinamento do comercial para os disparos e bases preparadas por consultor.',
        },
        { texto: 'Unificação de canais no backlog, sem descrição.' },
      ],
    },
    {
      id: 'marketing',
      nome: 'Ferramentas de marketing',
      descricao: 'Acompanhamento de campanhas e vendas para o expert.',
      plataformas: [{ nome: 'Cloudflare Workers' }],
      andamento: [
        {
          sistema: 'Cloudflare Workers',
          texto:
            'Páginas de acompanhamento do Meta Ads e das vendas para o expert, ' +
            'publicadas em Workers da Cloudflare.',
        },
      ],
    },
  ],
}

/* sistemaIds: as plataformas do grupo, na ordem em que aparecem. */
export const GRUPOS_APOIO = [
  {
    id: 'aprendizagem',
    nome: 'Acadêmico & Aprendizagem',
    sistemaIds: ['u4', 'u8'],
    descricao:
      'Campuzz LMS, o produto de aprendizagem que utiliza a tecnologia Campuzz, e o ' +
      'Certificador da Secretaria.',
  },
  {
    id: 'fiscal',
    nome: 'Financeiro & Fiscal',
    sistemaIds: ['u2'],
    descricao: 'Emissão, monitoramento e gestão de notas fiscais.',
  },
  {
    id: 'produto-tech',
    nome: 'Produto & Tech',
    sistemaIds: ['u5', 'u9'],
    descricao:
      'O Pailon antecipa a visão do produto e facilita o trabalho do time tech; o MCP ' +
      'Bitrix24 leva as tarefas aos assistentes de IA.',
  },
]
