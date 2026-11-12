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
  checkpoint: '12/11/2026',
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
        { sistema: 'Metriczz', texto: 'Testes finais para a entrega da primeira versão.' },
        {
          sistema: 'Databricks',
          texto:
            'Remodelação da infraestrutura da UniFast: PRs #1 a #18 entregues no ' +
            'pipeline financeiro, M-0003 a M-0005 prontas no staging.',
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
            'Telas de gestão de leads inspiradas no dashboard do Mixpanel. ' +
            'Prazo a definir após a primeira versão de 15/11.',
        },
        {
          texto:
            'Reestruturação do banco Mongo com toda a jornada do lead da UniFast, ' +
            'para facilitar o desenvolvimento futuro da história do lead. Prazo: 20/11.',
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
            'Construção das primeiras telas: Atendimento, CRM e Contatos. ' +
            'Primeira versão para iniciar os testes em 20/11.',
        },
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
