/* Conteúdo fornecido pelo time: atualização de 12/11/2026 do pipeline
   financeiro no Databricks (PRs #1 a #18, fichas M-0001 a M-0006).
   Totais de receita e de taxas da empresa ficam fora da página, no mesmo
   critério das telas do Relatório Diário, que têm os valores borrados.
   O status e a identificação ficam no catálogo systems.js. */
export const FICHA_DATABRICKS = {
  subtitulo: 'Pipeline financeiro da UniFast no Databricks',
  tagline: 'Os números financeiros conferidos na origem.',
  resumo:
    'O pipeline que organiza os dados financeiros da UniFast em camadas: recebe ' +
    'os eventos como chegam, trata e junta Routerfy, Eduzz, Edunext e Asaas no ' +
    'contexto financeiro. É a base da receita Routerfy no BI e está em remodelação, ' +
    'com cada mudança medida contra a produção antes de entrar.',
  categoria: 'Data · Infraestrutura de dados',
  tipo: 'Pipeline de dados em arquitetura medalhão',

  visaoGeral: [
    'O pipeline financeiro roda no Databricks em três camadas: o bronze recebe os ' +
      'eventos como chegam, a silver os trata e a gold junta Routerfy, Eduzz e ' +
      'Edunext no contexto financeiro.',
    'A remodelação da infraestrutura corrige as regras de transações, faturas, ' +
      'taxas e vendas, torna os resultados determinísticos e confere a gold contra ' +
      'a API das plataformas.',
  ],
  problema:
    'Eventos duplicados ou empatados faziam o resultado mudar a cada execução, ' +
    'faturas e transações ficavam sem vínculo e cobranças que não eram receita ' +
    'entravam nas contas. Sem um ambiente de testes nem comparação com a produção, ' +
    'não havia como medir uma correção antes de publicá-la.',
  funcoes: [
    'Recebe os eventos das plataformas na camada bronze, sem alterá-los',
    'Trata os eventos na silver e junta as fontes no contexto financeiro na gold',
    'Gera as tabelas de transações, faturamento, faturas e vendas',
    'Separa casos que não são receita, como validações de troca de cartão',
    'Mantém tabelas de divergências entre faturas e transações para investigação',
    'Registra cada execução e compara a gold com a API das plataformas',
    'Testa cada mudança no staging, lendo o bronze de produção sem escrever nele',
  ],
  casos: [
    {
      titulo: 'BASE DO PIPELINE · PRs #1 A #3',
      itens: [
        {
          nome: 'PR #1 e #2 · pipeline Routerfy',
          descricao:
            'Pipeline completo em bronze, silver e gold, com Routerfy, Eduzz e Edunext ' +
            'na gold. Foi a base de toda a receita Routerfy no BI.',
        },
        {
          nome: 'PR #3 · ambiente de testes',
          descricao:
            'Testes locais e de integração espelhando o cluster. A suíte, que tinha 14 ' +
            'de 30 testes falhando, foi corrigida. Não mudou o pipeline, mas passou a ' +
            'permitir validar cada mudança antes da produção.',
        },
      ],
    },
    {
      titulo: 'REGRAS E DETERMINISMO · PRs #4 A #7',
      itens: [
        {
          nome: 'PR #4 · regras da ttransacoes',
          descricao:
            'Saíram 41.468 faturas promovidas a transação e 1.723 transações substituídas. ' +
            'A data de pagamento herdada foi removida de 4.042 transações recusadas, e ' +
            '2.004 pendentes com data de pagamento foram separadas para investigação.',
        },
        {
          nome: 'PR #5 · desempate determinístico das transações',
          descricao:
            'Cerca de 52 mil grupos de eventos empatavam e o resultado mudava a cada ' +
            'execução. O acerto contra a API foi de 59,4% para 91,9%, e produto, forma ' +
            'de pagamento e datas pararam de oscilar na gold.',
        },
        {
          nome: 'PR #6 · CI e staging',
          descricao:
            'CI no GitHub e job de staging que lê o bronze de produção sem escrever nele ' +
            'e compara o resultado com a produção. Toda mudança passou a ser medida antes ' +
            'do merge. O PR #7 consolidou o #4, o #5 e o #6.',
        },
      ],
    },
    {
      titulo: 'FATURAS, TAXAS E OBSERVABILIDADE · PRs #8 A #12',
      itens: [
        {
          nome: 'PR #8 · trocas de cartão',
          descricao:
            'As validações de R$ 1,23 de troca de cartão deixaram de contar como cobrança ' +
            'e ganharam tabela própria. Saíram 479 da ttransacoes e 475 da tfaturamento.',
        },
        {
          nome: 'PR #9 · taxas e tfaturas',
          descricao:
            'As taxas passaram a ter colunas fixas e a somar todos os itens, incluindo ' +
            'multa e juros, antes subcontados. A tfaturas, congelada desde 03/06, voltou ' +
            'a ser gerada com Routerfy, Eduzz, Edunext e Asaas.',
        },
        {
          nome: 'PR #10 · vínculo entre fatura e transação',
          descricao:
            'Corrigiu 48 faturas pagas que ficavam sem transação e criou a tabela de ' +
            'divergências entre faturas e transações, com os casos a investigar.',
        },
        {
          nome: 'PR #11 · observabilidade',
          descricao:
            'Registro de execução do pipeline e consultas que comparam a API com a gold, ' +
            'base da aba Observabilidade do BI. Nos últimos 90 dias, API e gold batiam em ' +
            '7.027 transações pagas, com 3 exclusivas de cada lado. O PR #12 consolidou ' +
            'do #8 ao #11.',
        },
      ],
    },
    {
      titulo: 'COMPLETUDE E DESEMPENHO · PRs #13 A #18',
      itens: [
        {
          nome: 'PR #13 · completude com a API',
          descricao:
            'Transações, pagamentos e clientes que só existiam na API passaram a entrar: ' +
            '147 transações a mais, 24 delas pagas (R$ 5.521,70). As faturas pagas sem ' +
            'transação caíram de 16 para 4.',
        },
        {
          nome: 'PR #14 · valor da fatura pela API',
          descricao:
            'Desempate de faturas determinístico e valor vindo da API. As faturas com ' +
            'valor diferente da API foram de 120 (R$ 15,4 mil) para 0, e as divergências ' +
            'entre faturas e transações caíram de 223 para 108.',
        },
        {
          nome: 'PR #15 e #16 · documentação e método de trabalho',
          descricao:
            'Regras do repositório e método de trabalho por fichas, com teste antes da ' +
            'correção, confronto e medição no staging. Não mudaram dados.',
        },
        {
          nome: 'PR #17 · cliente da fatura pelo contrato (M-0001)',
          descricao:
            'As faturas sem transação passaram a herdar o cliente do contrato. As faturas ' +
            'Routerfy sem cliente na tfaturas foram de 21.492 para 0.',
        },
        {
          nome: 'PR #18 · desempenho da silver (M-0002)',
          descricao:
            'A silver Routerfy deixou de recalcular a mesma cadeia várias vezes. O trecho ' +
            'medido foi de 23 para 7 minutos, sem mudar nenhuma regra; o job tinha dobrado ' +
            'de tempo desde o #13.',
        },
      ],
    },
    {
      titulo: 'PRONTO NO STAGING · PR A ABRIR',
      pendente: true,
      itens: [
        {
          nome: 'M-0003 · deduplicação determinística das vendas',
          descricao:
            'Duas execuções sobre o mesmo bronze dão exatamente o mesmo resultado. As ' +
            'vendas sem cliente foram de 4.011 para 195, e as vendas pagas contadas em ' +
            'dobro, de 45 para 25.',
        },
        {
          nome: 'M-0004 · a transação com fatura vence a sem fatura',
          descricao:
            'Zera as vendas pagas contadas em dobro restantes. Na produção eram 45, ' +
            'somando R$ 12.208,41.',
        },
        {
          nome: 'M-0005 · a API como estado final da fatura nas vendas',
          descricao:
            'Corrige as vendas canceladas cuja fatura está paga na plataforma, 11 na ' +
            'produção (R$ 4.469). A divergência de status entre faturas e vendas foi de ' +
            '13 para 0 no staging.',
        },
      ],
    },
    {
      titulo: 'EM ESTUDO · IMPACTO NA BASE',
      pendente: true,
      texto:
        'A receita Routerfy paga na tfaturas vem de 43.444 faturas pagas. Os casos ' +
        'abaixo estão sendo conferidos na plataforma, conta a conta.',
      itens: [
        {
          nome: 'M-0006 · venda ligada à transação cancelada',
          descricao:
            'Em 4 faturas pagas (0,009%), a venda está paga e com o valor certo, mas ' +
            'aponta para a transação cancelada em vez da paga. Afeta só a forma de ' +
            'pagamento e as taxas atribuídas, sem efeito na receita. A causa é um evento ' +
            'de pagamento fantasma nos snapshots das assinaturas; a correção aguarda a ' +
            'escolha do desenho.',
        },
        {
          nome: 'Transações pagas fora das vendas',
          descricao:
            'Somam R$ 18.011,55, cerca de 0,07% da receita paga. Destas, 12 são ' +
            'pagamentos em duplicidade, que por decisão ficam fora das vendas, e 6 têm ' +
            'valores que não batem com a fatura e vão para uma ficha própria.',
        },
        {
          nome: 'Faturas pagas sem transação paga',
          descricao:
            '6 faturas, R$ 18.606,90, também cerca de 0,07%: quatro sem nenhuma ' +
            'transação e duas só com chargeback.',
        },
        {
          nome: 'Transação extra paga',
          descricao: 'Uma fatura de R$ 13.800 tem uma transação extra paga de R$ 6.550.',
        },
      ],
    },
  ],
  ecossistema:
    'É a camada de dados por trás dos números financeiros. A gold é a referência ' +
    'consumida pelo BI, e a aba Observabilidade mostra a comparação entre a gold e ' +
    'a API das plataformas.',
  fluxo: {
    etapas: ['Eventos das plataformas', 'Bronze', 'Silver', 'Gold', 'BI'],
    texto:
      'O bronze guarda os eventos como chegam; a silver trata, deduplica e desempata; ' +
      'a gold junta as fontes no contexto financeiro. O staging lê o mesmo bronze de ' +
      'produção, sem escrever nele, para comparar o resultado antes de cada merge.',
  },
  monitoramento:
    'Cada execução do pipeline fica registrada, e consultas comparam a API das ' +
    'plataformas com a gold. Nos últimos 90 dias, as duas batiam em 7.027 transações ' +
    'pagas, com 3 exclusivas de cada lado.',
  integracoes: [
    { sistema: 'Routerfy', descricao: 'Principal fonte de eventos e da receita no BI.' },
    { sistema: 'Eduzz', descricao: 'Fonte juntada na gold no contexto financeiro.' },
    { sistema: 'Edunext', descricao: 'Fonte juntada na gold no contexto financeiro.' },
    { sistema: 'Asaas', descricao: 'Entra na geração da tfaturas desde o PR #9.' },
    { sistema: 'BI', descricao: 'Consome a gold; a aba Observabilidade nasce do PR #11.' },
    { sistema: 'GitHub', descricao: 'CI e job de staging que medem cada mudança antes do merge.' },
  ],
  tecnologia: [
    ['Plataforma', 'Databricks'],
    ['Arquitetura', 'Medalhão: bronze, silver e gold'],
    ['Testes', 'Locais e de integração, espelhando o cluster'],
    ['CI', 'GitHub'],
    ['Staging', 'Lê o bronze de produção sem escrever nele'],
  ],
  statusDetalhe: [
    'Checkpoint de 12/11/2026. O pipeline está em produção e é a base da receita ' +
      'Routerfy no BI. A remodelação já entregou os PRs #1 a #18.',
    'As fichas M-0003, M-0004 e M-0005 estão prontas e medidas no staging, com PR a ' +
      'abrir. A M-0006 aguarda a escolha do desenho.',
    'Os casos restantes somam cerca de 0,07% da receita paga e estão sendo conferidos ' +
      'na plataforma, conta a conta.',
  ],
  proximosPassos: [
    'Abrir os PRs das fichas M-0003, M-0004 e M-0005',
    'Escolher o desenho da M-0006 e corrigir a venda ligada à transação cancelada',
    'Abrir a ficha própria das 6 transações com valor diferente da fatura',
    'Concluir a conferência, conta a conta, das faturas pagas sem transação paga',
  ],
  fonte:
    'Atualização do time de 12/11/2026 sobre o pipeline financeiro no Databricks. ' +
    'Os totais de receita e de taxas da empresa não são exibidos nesta página.',
  papel: 'Pipeline financeiro e infraestrutura de dados da UniFast.',
}
