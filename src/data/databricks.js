/* Conteúdo fornecido pelo time: atualização de 12/11/2026 do pipeline
   financeiro no Databricks (PRs #1 a #18, fichas M-0001 a M-0006) e tarefas
   da Sprint 1 no Bitrix (epic Databricks, lidas em 27/11/2026).
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
      titulo: 'SPRINT 1 · EM PRODUÇÃO',
      itens: [
        {
          nome: 'Vendas e receita da Routerfy confiáveis',
          descricao:
            'Medido na produção em 25/11. As vendas pagas contadas em dobro foram de 45 ' +
            '(R$ 12.208,41) para 0, e as vendas sem cliente, de 4.011 para 16. 845 faturas ' +
            'ganharam a transação correspondente, e 6 faturas sem dinheiro por trás ' +
            '(R$ 18.606,90) saíram da receita.',
        },
        {
          nome: 'PR #23 · as seis contas da Routerfy que faltavam',
          descricao:
            'Seis contas entraram na carga da API com histórico desde 17/06: 270 faturas ' +
            'pagas passaram a ter o estado confirmado pela API (17/11).',
        },
        {
          nome: 'Análise dos valores divergentes',
          descricao:
            'Análise consolidada das divergências, concluída no prazo de 15/11. O relatório ' +
            '“Faturas fantasmas” foi enviado à Routerfy em 13/11.',
        },
      ],
    },
    {
      titulo: 'PUBLICADO · AGUARDANDO CONFIRMAÇÃO',
      pendente: true,
      itens: [
        {
          nome: 'PR #28 · nenhum evento de venda do Mongo some sem erro',
          descricao:
            'Mesclado em 24/11 e publicado na produção em 25/11. Falta confirmar a ' +
            'execução da madrugada de 26/11.',
        },
        {
          nome: 'PRs #25 e #29 · segurança',
          descricao:
            'Testes isolados da produção e senha da Edunext fora do código, trocada e ' +
            'guardada no cofre em 25/11. Falta uma ingestão de 26/11 sem erro.',
        },
        {
          nome: 'Fechamento da receita Routerfy',
          descricao:
            'Explicar duas faturas de R$ 1,23, conferir as 4 faturas fantasmas, validar ' +
            'com as áreas e aplicar o filtro no painel “BI Unifast v1”.',
        },
      ],
    },
    {
      titulo: 'BLOQUEADO · COPRODUÇÃO EDUZZ',
      pendente: true,
      itens: [
        {
          nome: 'A parte dos coprodutores no faturamento',
          descricao:
            'A fórmula foi provada no sandbox em 24/11. O bloqueio: a Eduzz guarda só o ' +
            'percentual de hoje, sem histórico; em 247 faturas a soma passa de 100% e em ' +
            '1.494 fica abaixo. Depende de reunião com os responsáveis pelos dados da ' +
            'Eduzz. Já decidido: afiliado fica fora por ora e reembolso zera o valor.',
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
    'Sprint 1 (Bitrix, 27/11/2026). O pipeline está em produção e é a base da receita ' +
      'Routerfy no BI. As correções de confiabilidade das vendas e da receita Routerfy ' +
      'chegaram à produção e foram medidas em 25/11.',
    'A ingestão do Mongo e as correções de segurança foram publicadas em 25/11 e ' +
      'aguardam a confirmação da execução de 26/11.',
    'A coprodução Eduzz está parada à espera de uma reunião com a Eduzz, porque a ' +
      'plataforma não guarda o histórico dos percentuais.',
  ],
  proximosPassos: [
    'Confirmar a execução de 26/11 da ingestão do Mongo e da Edunext',
    'Fechar a receita Routerfy: faturas de R$ 1,23, faturas fantasmas, validação com as áreas e filtro no BI',
    'Reunir com a Eduzz para destravar a coprodução',
    'Escolher o desenho da M-0006 (venda ligada à transação cancelada)',
  ],
  fonte:
    'Atualização do time de 12/11/2026 (PRs #1 a #18) e tarefas da Sprint 1 no ' +
    'Bitrix (projeto Projetos Tech, epic Databricks), lidas em 27/11/2026. ' +
    'Os totais de receita e de taxas da empresa não são exibidos nesta página.',
  papel: 'Pipeline financeiro e infraestrutura de dados da UniFast.',
}
