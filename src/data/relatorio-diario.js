/* Conteúdo fornecido pelo time: entregas de 22 e 28/10/2026, confirmação de
   produção em 29/10 e confirmação atual de que todas as entregas estão rodando.
   O status e a identificação do produto ficam no catálogo systems.js. */
export const FICHA_RELATORIO_DIARIO = {
  subtitulo: 'Consulta e acompanhamento de contratos e pagamentos da UniFast',
  tagline: 'Os valores da operação, do detalhe diário à visão da gestão.',
  resumo:
    'Centraliza os valores de contratos e pagamentos por dia, mês, empresa e ' +
    'Business Unit (BU). Reúne Dashboard, consultas detalhadas e Gestão do relatório, ' +
    'com envio diário por WhatsApp aos gestores. Concluído e em operação.',
  categoria: 'Data · Relatórios financeiros',
  tipo: 'Sistema de consulta, gestão e acompanhamento financeiro',

  visaoGeral: [
    'O Relatório Diário é um projeto do grupo Data. Utiliza os dados disponíveis ' +
      'no banco para centralizar a consulta e o acompanhamento dos contratos e ' +
      'pagamentos da UniFast.',
    'Dashboard, Contratos e Pagamentos oferecem indicadores, gráficos, valores ' +
      'diários e totais mensais. A Gestão do relatório administra vínculos entre ' +
      'contas e linhas, fontes sem vínculo e lançamentos de Co-produção.',
    'As funcionalidades, melhorias, publicação e mensagens diárias por WhatsApp ' +
      'estão concluídas e rodando, conforme confirmação atual do time.',
  ],
  problema:
    'Acompanhar contratos e pagamentos exige consultar os valores no mesmo ' +
    'contexto de período, empresa e BU, conferir os totais e manter organizados ' +
    'os vínculos e lançamentos que compõem o relatório. O sistema centraliza ' +
    'essa consulta e a gestão das informações.',
  funcoes: [
    'Dashboard com indicadores, gráficos e valores mensais de parceiros e clubs',
    'Tabelas de contratos e pagamentos com valores diários, totais por dia e acumulado mensal',
    'Filtros por mês, dia, empresa e BU, com visões mensal, anual e intervalo personalizado',
    'Busca, exportação CSV e detalhamento por dia, BU, conta e origem',
    'Gestão dos vínculos entre contas e linhas, criação e exclusão de linhas e conferência de fontes sem vínculo',
    'Lançamento e correção de valores de Co-produção',
    'Envio diário de mensagens do relatório via WhatsApp para os gestores',
  ],
  casos: [
    {
      titulo: 'CONSULTAS E NAVEGAÇÃO ENTREGUES',
      itens: [
        {
          nome: 'Intervalo de datas personalizado',
          descricao:
            'Consulta de uma data inicial até uma data final, solicitada por ' +
            'Francelino Neto. O filtro já foi adicionado e é utilizado pelos usuários do relatório.',
        },
        {
          nome: 'Navegação nas tabelas',
          descricao:
            'Datas e produtos fixos, destaque e posicionamento automático no D-1, ' +
            'barras horizontais sincronizadas no topo e no final e menu lateral recolhível.',
        },
        {
          nome: 'Desktop e celular',
          descricao:
            'Interface responsiva com identidade visual UniFast School of Business, ' +
            'preservando a rolagem para consultar datas e totais.',
        },
      ],
    },
    {
      titulo: 'MELHORIAS ENTREGUES EM 22/10/2026',
      itens: [
        {
          nome: 'BU dependente da empresa',
          descricao:
            'Selecionar uma empresa exibe somente suas BUs. Os filtros ficam ' +
            'aplicados juntos; trocar de empresa limpa uma BU incompatível.',
        },
        {
          nome: 'Indicadores e gráficos sob controle',
          descricao:
            'Indicadores, somas gerais e gráficos podem ser mostrados ou ocultados ' +
            'pelo controle “Indicadores e gráficos”.',
        },
        {
          nome: 'Categorias que expandem e recolhem',
          descricao:
            'Principal, Partners, Outros Parceiros e Clubs têm controles individuais, ' +
            'mantendo nome, valores por data, total e percentual do grupo visíveis.',
        },
        {
          nome: 'Destaque visual e preferências salvas',
          descricao:
            'Grupos em dourado em Contratos e azul em Pagamentos, com D-1 em âmbar. ' +
            'No primeiro acesso, indicadores e categorias começam recolhidos; depois, ' +
            'o navegador lembra as escolhas por tela e medida, inclusive após atualizar ou trocar de visão.',
        },
        {
          nome: 'Posicionamento do D-1 e totais fixos',
          descricao:
            'D-1 é posicionado inicialmente no centro da tabela. Total e percentual ' +
            'ficam fixos à direita quando há espaço. Colunas congeladas, navegação ' +
            'manual, rolagem e visões mensal, personalizada e anual foram preservadas.',
        },
      ],
    },
    {
      titulo: 'AGRUPAMENTOS E GESTÃO · ENTREGA DE 28/10/2026',
      itens: [
        {
          nome: 'EdTech Fast e Fast em Outros Parceiros',
          descricao:
            'Subgrupos com subtotais e controles de expansão em Dashboard, Contratos e Pagamentos.',
        },
        {
          nome: 'Classificação oficial de 37 BUs',
          descricao:
            '10 EdTech Fast, 15 Fast, 8 Prosperar e 4 UniFast. Dentro de Outros ' +
            'Parceiros, ficam as 10 BUs EdTech Fast e as 15 Fast.',
        },
        {
          nome: 'Agrupamento obrigatório nas novas linhas',
          descricao:
            'Ao criar uma linha, é necessário escolher EdTech Fast, Fast, Prosperar ' +
            'ou UniFast. O agrupamento cadastral é independente da empresa de cada lançamento financeiro.',
        },
        {
          nome: 'Seções da Gestão corrigidas',
          descricao:
            'Criar ou editar uma linha permite escolher Principal, Partners, Outros ' +
            'Parceiros, Clubs ou uma seção personalizada. A opção “Outra seção…” ' +
            'preserva o rascunho e salva o nome informado.',
        },
        {
          nome: 'Cadastro persistido e valores preservados',
          descricao:
            'A classificação foi aplicada ao cadastro persistido, mantendo IDs, nomes, ' +
            'seções, ordem, visibilidade e vínculos. A conferência de stage em 29/10 ' +
            'confirmou os cabeçalhos e a preservação dos valores antes e depois da atualização.',
        },
      ],
    },
    {
      titulo: 'ENVIO DIÁRIO POR WHATSAPP · EM OPERAÇÃO',
      itens: [
        {
          nome: 'Relatório para os gestores',
          descricao:
            'Mensagens do Relatório Diário são enviadas via WhatsApp para os gestores ' +
            'todos os dias. A entrega está concluída e rodando.',
        },
      ],
    },
    {
      titulo: 'ACEITE, VALIDAÇÃO E PUBLICAÇÃO',
      itens: [
        {
          nome: 'Critérios de aceite atendidos',
          descricao:
            'Consultas e filtros refletem a seleção; totais diários e mensais seguem ' +
            'as regras financeiras; vínculos e lançamentos salvos aparecem nas ' +
            'consultas. A interface funciona em desktop e celular e a aplicação ' +
            'publicada permite consultar os dados pela API.',
        },
        {
          nome: 'Validação registrada em 22/10',
          descricao:
            '96 testes do front, 40 da API, 23 verificações do ambiente integrado e ' +
            '12 cenários no Docker local aprovados. Conferidos desktop, celular, ' +
            'persistência das escolhas, valores e CSV. Regras financeiras e fonte de dados preservadas.',
        },
        {
          nome: 'Validação dos agrupamentos e das seções',
          descricao:
            'Builds e testes de API, navegador e runtime, com conferência de ' +
            'persistência, desktop e celular. Entregas FIN-007 e FIN-008, com PRs ' +
            'da API #7 e da Web #8.',
        },
        {
          nome: 'Publicação concluída',
          descricao:
            'Produção confirmada pelo solicitante em 29/10/2026; a verificação ' +
            'técnica direta registrada nessa entrega ocorreu em local e stage. ' +
            'A confirmação atual informa que todas as entregas estão concluídas ' +
            'e rodando, incluindo a publicação antes registrada como pendente.',
        },
      ],
    },
  ],
  ecossistema:
    'Integra o grupo Data ao lado do Metriczz, com foco na consulta e na gestão ' +
    'diária de contratos e pagamentos. Lê o banco do Metriczz, aplica as regras ' +
    'financeiras e organiza os dados por empresa, BU, conta ' +
    'e origem e leva o acompanhamento aos gestores também por mensagens diárias de WhatsApp.',
  fluxo: [
    {
      rotulo: 'Consulta e gestão',
      etapas: ['Banco do Metriczz', 'API do Relatório Diário', 'Dashboard e consultas'],
      texto: 'Vínculos e lançamentos salvos na Gestão são refletidos nas consultas.',
    },
    {
      rotulo: 'Acompanhamento diário',
      etapas: ['Relatório Diário', 'WhatsApp', 'Gestores'],
      texto: 'Envio diário de mensagens com o relatório para os gestores.',
    },
  ],
  integracoes: [
    { sistema: 'Metriczz', nota: 'conectado', descricao: 'Banco de origem dos valores de contratos e pagamentos.' },
    { sistema: 'Fast Pay, Eduzz, Edunext e Asaas', descricao: 'Origens dos valores apresentados nas linhas do relatório.' },
    { sistema: 'WhatsApp', descricao: 'Envio diário do relatório para os gestores.' },
    { sistema: 'Railway', descricao: 'Publicação de frontend, API e banco, com migrações automatizadas.' },
  ],
  tecnologia: [
    ['Camadas', 'Frontend, API e banco de dados'],
    ['Publicação', 'Railway'],
    ['Migrações', 'Automatizadas'],
    ['Validação local', 'Docker'],
    ['Identidade visual', 'UniFast School of Business'],
  ],
  statusDetalhe: [
    'Concluído e em produção. A confirmação de 03/11/2026 informa que todas as ' +
      'funcionalidades e melhorias descritas estão entregues e rodando, incluindo ' +
      'o filtro personalizado e o envio diário por WhatsApp.',
    'As melhorias de 22/10 e os agrupamentos e ajustes de Gestão de 28/10 estão ' +
      'concluídos. A publicação em produção já havia sido confirmada pelo ' +
      'solicitante em 29/10. As pendências antigas de merge e publicação foram ' +
      'superadas pela confirmação atual.',
    'Nenhuma pendência desta entrega foi informada. A próxima ação é acompanhar ' +
      'o uso e registrar eventuais novas solicitações.',
  ],
  proximosPassos: ['Acompanhar o uso e registrar eventuais novas solicitações'],
  papel: 'Consulta, gestão e acompanhamento diário dos contratos e pagamentos da UniFast.',
  fonte:
    'Descrição e confirmação atual do time em 03/11/2026; registros de 22/10 e ' +
    '28/10, com atualização de 29/10/2026. Referências: API 9919666, Web 5d2e80c, ' +
    'Docker 81583ab, API PR #7, Web PR #8, FIN-007 e FIN-008.',
}
