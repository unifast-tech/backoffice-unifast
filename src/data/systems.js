import { FICHA_RELATORIO_DIARIO } from './relatorio-diario.js'

/* Catálogo de sistemas. Os grupos funcionais ficam em groups.js. */

/* Estados possiveis de um sistema (`state`) e o rotulo que aparece no cartao,
   na ficha e no selo; a cor vem da classe `.estado--<state>` em tokens.css. */
export const ESTADOS = {
  producao: 'EM PRODUÇÃO',
  entregue: 'ENTREGUE',
  avancado: 'AVANÇADO',
  testes: 'EM TESTES',
  desenvolvimento: 'EM DESENVOLVIMENTO',
  planejamento: 'EM PLANEJAMENTO',
}


/* Ficha no formato fixo (vale para todos os sistemas conforme forem migrando):
     subtitulo, tagline?, resumo, categoria, tipo
                                -> versao curta, sempre visivel
     visaoGeral, problema, funcoes[], casos?, evolucao?, ecossistema, fluxo?,
     monitoramento?, seguranca?, integracoes[], tecnologia?, statusDetalhe, papel
                                -> ficha completa, ao expandir, nesta ordem
   Campos com ? sao opcionais; blocos sem conteudo nao aparecem. Textos longos
   podem ser uma string ou uma lista de paragrafos.
   funcoesTitulo? / segurancaTitulo?: trocam o titulo padrao do bloco.
   casos?: um grupo ou lista de grupos { titulo, texto?, numerado?, pendente?,
     itens: [{ nome, descricao, itens?, via?, proprio? }] }; pendente sai
     tracejado (o que ainda nao existe)
     -- ex.: tipos de erro (UniNotas), areas do produto (Campuzz). via nomeia o
     sistema da UniFast que entrega aquela area; proprio marca o que o proprio
     sistema faz.
   fonte?: de onde veio o conteudo, quando nao foi do repositorio.
   evolucao?: { texto, itens[] } -- para onde o produto vai.
   fluxo?: um fluxo { etapas[], texto? } ou lista deles com { rotulo,
     planejado? }; o planejado aparece tracejado, como no esquema.
   integracoes[]: { sistema, descricao?, nota?, converge? } -- converge: true
   desenha "sistema -> este" (quem esta migrando para ele).
   proximosPassos?: string ou lista; vem logo depois do estagio atual.
   `checkpoint: 'dd/mm/aaaa'` no sistema: data da ultima atualizacao de status
   daquele sistema; o estagio da ficha diz "ATUALIZADO EM <data>". */
export const NUCLEO = {
  id: 'u0',
  code: 'U0',
  name: 'ACCOUNTZZ',
  sub: 'IDENTIDADE & SEGURANÇA',
  icon: 'cadeado',
  /* MVP rodando. A implementação da v2 depende da aprovação do escopo global. */
  status: 'MVP RODANDO · V2 EM DEFINIÇÃO DE ARQUITETURA',
  state: 'producao',
  checkpoint: '03/11/2026',
  /* Estado técnico da conexão, separado do papel transversal no ecossistema. */
  conectado: false,
  box: { x: 615, y: 794, w: 211, h: 210 },
  ficha: {
    subtitulo: 'UniFast IAM · Identity & Access Management',
    resumo:
      'Identidade única para todo o ecossistema UniFast. Centraliza autenticação, ' +
      'usuários, organizações e permissões, simplificando o controle de acesso ' +
      'entre os sistemas da empresa.',
    categoria: 'Identidade & Segurança',
    tipo: 'Serviço central',

    visaoGeral:
      'O Accountzz (Órbita UniFast) é o serviço central de identidade e acesso do ecossistema ' +
      'UniFast. Ele foi projetado para unificar autenticação, usuários, vínculos ' +
      'organizacionais e permissões entre os diferentes sistemas da empresa.',
    problema:
      'Os produtos da UniFast foram desenvolvidos em momentos diferentes e passaram ' +
      'a usar mecanismos distintos de autenticação, bancos de usuários e modelos de ' +
      'permissão. Isso gera contas duplicadas, dificulta o gerenciamento de acessos ' +
      'e complica admissão, alteração de permissões e desligamento. O Accountzz ' +
      'surge para centralizar essa gestão.',
    funcoes: [
      'Mantém uma identidade global para cada pessoa',
      'Centraliza autenticação e controle de acesso',
      'Gerencia vínculos entre usuários e organizações',
      'Controla o ciclo de vida das contas',
      'Registra as aplicações do ecossistema UniFast',
      'Centraliza capabilities e permissões publicadas pelos sistemas',
      'Registra concessões e alterações de acesso',
      'Possibilita auditoria centralizada de identidade e permissões',
    ],
    ecossistema:
      'É a camada central de identidade da UniFast. Os demais sistemas continuam ' +
      'donos das próprias regras de negócio; o Accountzz informa quem é o usuário, ' +
      'a qual organização pertence e quais capacidades tem naquele contexto.',
    integracoes: [
      { sistema: 'Metriczz', nota: 'próxima conexão', converge: true },
      { sistema: 'UniNotas', nota: 'próxima conexão', converge: true },
      { sistema: 'Gateway UniFast', converge: true },
      { sistema: 'LeadsHug', converge: true },
      {
        sistema: 'Backoffice UniFast',
        nota: 'futuro',
        converge: true,
        descricao: 'Hoje é o FastHub Front; vai se tornar o backoffice da UniFast.',
      },
    ],
    statusDetalhe: [
      'O MVP está rodando, com a API funcionando e a documentação pronta para uso. ' +
        'Nenhum sistema está conectado a ele ainda.',
      'A v2 está em fase de definição de arquitetura, com prazo para conclusão ' +
        'até sexta-feira, 06/11/2026.',
      'O escopo global será apresentado para aprovação. A implementação da v2 ' +
        'está prevista para começar na semana de 09 a 13/11/2026, condicionada ' +
        'à aprovação desse escopo na apresentação.',
    ],
    proximosPassos: [
      'Concluir a definição de arquitetura da v2 até sexta-feira, 06/11/2026',
      'Apresentar o escopo global da v2 para aprovação',
      'Iniciar a implementação da v2 na semana de 09 a 13/11/2026, se o escopo global for aprovado',
      'Conectar o UniNotas e o Metriczz (login pelo Accountzz)',
    ],
    papel: 'Serviço central de autenticação e autorização da UniFast.',
  },
}

export const SISTEMAS = [
  {
    id: 'u1',
    code: 'U1',
    name: 'METRICZZ',
    sub: 'ANALYTICS & BI',
    icon: 'grafico',
    /* Primeira versão em testes, com meta de validação em stage em 15/11.
       A publicação em produção fica para depois da validação. */
    status: `${ESTADOS.testes} · PRIMEIRA VERSÃO: 15/11`,
    state: 'testes',
    checkpoint: '03/11/2026',
    box: { x: 170, y: 584, w: 260, h: 150 },
    ficha: {
      subtitulo: 'Dashboards, métricas e inteligência de dados da UniFast',
      tagline: 'Dados que transformam operação em visão.',
      resumo:
        'A plataforma de dashboards e inteligência da UniFast. Centraliza indicadores ' +
        'financeiros e operacionais, organizando os dados de acordo com o acesso de ' +
        'cada usuário e oferecendo uma visão clara dos resultados da operação.',
      categoria: 'Analytics & BI',
      tipo: 'Plataforma de dados e dashboards',

      visaoGeral:
        'O Metriczz (antigo FastHub Resultados) é a plataforma de indicadores, ' +
        'relatórios e dashboards do ecossistema UniFast. Transforma os dados ' +
        'operacionais da empresa em informação acessível e organizada, para que ' +
        'usuários internos e parceiros acompanhem resultados de acordo com seu ' +
        'nível de acesso e contexto.',
      problema:
        'Dados importantes da operação ficam espalhados entre diferentes fontes e ' +
        'sistemas, o que dificulta enxergar os resultados e exige consultas e análises ' +
        'manuais. O Metriczz centraliza essa experiência num único ambiente, e cada ' +
        'usuário vê apenas as informações do seu escopo.',
      funcoes: [
        'Centraliza dashboards e indicadores da operação',
        'Apresenta métricas financeiras e operacionais',
        'Oferece níveis de visualização para usuários internos e parceiros',
        'Atualiza informações vindas da plataforma de dados da UniFast',
        'Organiza dados por produtor, produto e demais contextos',
        'Deixa acessíveis os critérios usados em cada indicador',
        'Atualiza partes da interface em tempo real',
        'Mantém rastreável a origem dos dados apresentados',
      ],
      casos: [
        {
          titulo: 'PRONTO EM STAGE · CHECKPOINT DE 03/11',
          itens: [
            {
              nome: 'Recorte por marca',
              descricao: 'O filtro por empresa usa o cadastro do produtor (M-0161).',
            },
            {
              nome: 'Validação de nomes e marcas',
              descricao:
                'Nomes com caracteres invisíveis são recusados. Uma marca arquivada ' +
                'durante o preenchimento do formulário gera uma mensagem clara (M-0160).',
            },
            {
              nome: 'Marketing por empresa · API',
              descricao:
                'O recorte por empresa está na API em stage (M-0162). A tela de ' +
                'Marketing continua como “Em breve”.',
            },
            {
              nome: 'Conferência realizada',
              descricao:
                'A soma do Pago por marca bateu ao centavo com a camada gold. ' +
                'Nenhum nome apresentou caracteres invisíveis.',
            },
          ],
        },
        {
          titulo: 'OUTRAS ENTREGAS CONCLUÍDAS',
          itens: [
            {
              nome: 'Backend · M-0151 a M-0159',
              descricao:
                'Fichas encerradas, incluindo webhook por conta, conta sem segredo ' +
                'e catálogo de empresas.',
            },
            {
              nome: 'Front novo · desenvolvido, ainda fora de stage',
              descricao:
                'Fundação, gráficos, Visão Geral, Financeiro, Comercial e Agregações ' +
                'estão desenvolvidos na frente do novo layout (M-0201 a M-0213). ' +
                'Essas telas ainda precisam chegar a stage.',
            },
          ],
        },
        {
          titulo: 'CONVITE E LOGIN · PRIORIDADE MÁXIMA',
          pendente: true,
          itens: [
            {
              nome: 'A1 · convite de ponta a ponta · em execução',
              descricao:
                'Login real pelo IAM para interno e parceiro, com e-mail de verdade, ' +
                'aceite e primeiro painel no escopo correto. Depende do IAM local ' +
                'em funcionamento. Estimativa: 2–3 h.',
            },
            {
              nome: 'A2 · corrigir as quebras encontradas · na fila',
              descricao:
                'Cada falha encontrada no caminho do convite vira uma ficha. ' +
                'Estimativa: 3–6 h; o volume de falhas é a maior incerteza.',
            },
            {
              nome: 'A3 · validar em stage · depende do responsável',
              descricao:
                'Conferência com pessoa de teste seguindo o roteiro da A1. ' +
                'Inclui verificar o sinal do IAM em stage; sem estimativa fechada.',
            },
          ],
        },
        {
          titulo: 'DADOS · PRIORIDADE MÁXIMA',
          pendente: true,
          itens: [
            {
              nome: 'B1 · recorte da UniFast · na fila',
              descricao:
                'Medir, documentar a decisão e abrir as fichas, incluindo o item null. ' +
                'Vem depois do convite. A regra é líquido somente no Pago, na tela e ' +
                'na API: parceiro vê sem taxa e juros; interno vê bruto, produtor e ' +
                'UniFast. Estimativa: 6–9 h.',
            },
            {
              nome: 'B2 · gabarito mensal do Pago · depende dos números',
              descricao:
                'Confrontar o Pago mensal de 2026 com cada plataforma. Diferença ' +
                'acima de 0,5% vira ficha com a causa. Depende dos valores extraídos ' +
                'dos painéis pelo responsável. Estimativa aproximada: 6 h, ainda não medida.',
            },
            {
              nome: 'B3 · Edunext · na fila',
              descricao: 'Contratos por conta (E0, rodada 5). Estimativa: 2–3 h.',
            },
            {
              nome: 'B4 · contrato cancelado · na fila',
              descricao:
                'Conferir na ficha se o tratamento da penalidade ainda falta. Estimativa: 2–3 h.',
            },
            {
              nome: 'B5 · histórico da Eduzz por API · na fila',
              descricao: 'API já documentada no mapa. Estimativa: 2–3 h.',
            },
            {
              nome: 'B6 · contas Routerfy e URLs · depende de acesso',
              descricao:
                'Conferir conta a conta e cadastrar as URLs. Depende do acesso às ' +
                'contas pelo responsável; sem estimativa fechada.',
            },
            {
              nome: 'Asaas · somente se houver capacidade',
              descricao:
                'API e webhook entram apenas se houver sobra de tempo. Estimativa: 8–12 h.',
            },
          ],
        },
        {
          titulo: 'FRONT NOVO · TRABALHO RESTANTE',
          pendente: true,
          itens: [
            {
              nome: 'MZ4 · cadastros · em execução',
              descricao:
                'Produtores, Produtos e Usuários (M-0214 a M-0216), com estimativa ' +
                'de 8–12 h e dependência do merge de stage. Produtores está em ' +
                'correção após o confronto com o desenho.',
            },
            {
              nome: 'MZ5 · Integrações · na fila',
              descricao: 'Depende da MZ4. Estimativa: 3–8 h.',
            },
            {
              nome: 'MZ7 · mobile e marca · na fila',
              descricao: 'Depende da MZ5. Estimativa: 3–8 h.',
            },
            {
              nome: 'MZ8 · revisão e ajustes',
              descricao:
                'Revisão pelo responsável após as fases anteriores. Convite e dados ' +
                'têm prioridade caso o limite de uso pressione o trabalho no front.',
            },
          ],
        },
        {
          titulo: 'CALENDÁRIO · META E JANELAS PROPOSTAS',
          pendente: true,
          texto:
            'A data combinada para a primeira versão em stage é 15/11/2026. ' +
            'As janelas intermediárias são propostas e ainda não foram medidas.',
          itens: [
            {
              nome: 'Até 10/11 · convite e dados em stage',
              descricao: 'Precisam estar disponíveis para o QA da primeira versão.',
            },
            {
              nome: '10 a 12/11 · QA no worktree',
              descricao: 'Conferência pelo responsável, com convite, dados e front disponíveis.',
            },
            {
              nome: '12/11 · merge do front em stage',
              descricao:
                'Janela proposta. Publicações grandes perto dessa data precisam ser ' +
                'avisadas à frente que trabalha no front.',
            },
            {
              nome: 'Depois do QA · revisão MZ8 e ajustes',
              descricao: 'Usar a folga final para correções antes da validação da versão.',
            },
            {
              nome: '15/11 · primeira versão em stage',
              descricao:
                'Meta combinada para validar convite, números, recorte da UniFast e ' +
                'telas novas. O envio à produção fica depois da validação.',
            },
          ],
        },
        {
          titulo: 'DEPENDÊNCIAS DO RESPONSÁVEL',
          pendente: true,
          itens: [
            {
              nome: 'Pago mensal de 2026 por plataforma',
              descricao: 'Extrair dos painéis. Sem esses números, o gabarito de convergência fica bloqueado.',
            },
            {
              nome: 'Sinal do IAM em stage',
              descricao:
                'Conferir o log do unifast-iam para distinguir falha na subida, ' +
                'na entrega ou fila vazia.',
            },
            {
              nome: 'Pessoa de teste e acesso à Routerfy',
              descricao:
                'Disponibilizar um e-mail acessível para testar o convite completo ' +
                'e o acesso às contas Routerfy para a conferência de contas e URLs.',
            },
            {
              nome: 'Decisões sem bloqueio da versão',
              descricao:
                'Definir como explicar que os “maiores” da Visão Geral usam apenas ' +
                'o mês corrente; a recomendação é explicitar isso no título e no ' +
                'estado vazio. Atualizar a regra 3b da documentação do Resultados, ' +
                'que ainda menciona “empresa do fato”, em sessão interativa.',
            },
          ],
        },
        {
          titulo: 'FORA DA VERSÃO DE 15/11',
          pendente: true,
          itens: [
            {
              nome: 'Operações',
              descricao:
                'Saiu do desenho. As referências nas ADR-0030 e ADR-0032 ainda receberão uma nota.',
            },
            {
              nome: 'Produção e migrações',
              descricao:
                'F7, envio à main, migração de contas e saída do Firebase ficam para depois da validação.',
            },
            {
              nome: 'MZ6 e outras evoluções de produto',
              descricao:
                'Sincronização, busca, notificações, exportação, telas de Marketing e ' +
                'Indicadores e ajustes visuais G1 a G12 ficam depois do dia 15. ' +
                'Produtor como cliente segue possível, sem prioridade.',
            },
          ],
        },
      ],
      evolucao: {
        texto:
          'A primeira versão tem como meta estar em stage até 15/11/2026 para ' +
          'validação. Convite e dados são as entregas de prioridade máxima; ' +
          'o front novo cede a vez se o limite de uso apertar.',
        itens: [
          'Convite completo: convidar, aceitar, primeiro login e painel no escopo correto, ' +
            'incluindo reenviar, cancelar, revogar e convidar novamente',
          'Pago mensal de 2026 conferido por plataforma, com diferença de até 0,5% ou explicada; ' +
            'parceiro vê Pago líquido sem taxa e juros, e interno vê bruto, produtor e UniFast',
          'Telas novas de cadastros e Integrações, adaptação mobile e marca, seguidas da revisão MZ8',
        ],
      },
      ecossistema: [
        'É a camada de visualização e consumo analítico dos dados da UniFast. Os ' +
          'dados vêm da infraestrutura analítica da empresa, são processados pela API ' +
          'do Metriczz e guardados numa camada própria para os dashboards.',
        'Usuários internos podem ter uma visão mais ampla da operação; parceiros ' +
          'veem somente os produtores, produtos e dados do próprio escopo.',
      ],
      fluxo: {
        etapas: ['Pipeline Routerfy', 'Dados crus', 'Dados processados', 'API Metriczz', 'Dashboards'],
        texto:
          'A estrutura segue o modelo medalhão: os dados entram crus e são processados ' +
          'depois. A pipeline do Routerfy é a primeira fonte, e outras entram ao longo ' +
          'do tempo. A API organiza as informações, aplica as regras de acesso e ' +
          'entrega o resultado para a interface.',
      },
      seguranca:
        'Feito para isolar as informações entre usuários e organizações. As ' +
        'permissões são aplicadas pela API antes de os dados chegarem à interface, ' +
        'sem depender só do frontend: cada usuário recebe somente os dados do seu escopo.',
      integracoes: [
        {
          sistema: 'Routerfy',
          descricao: 'Pipeline de dados que já alimenta a nova estrutura.',
        },
        {
          sistema: 'Databricks',
          descricao: 'Onde os dados eram tratados até agora; em migração para a nova estrutura.',
        },
        {
          sistema: 'Gateway UniFast',
          descricao: 'Núcleo transacional: cadastros, tenancy, checkout e eventos.',
        },
        {
          sistema: 'Accountzz',
          descricao:
            'IAM usado no trabalho de convite e login real para interno e parceiro. ' +
            'O teste depende do IAM local em funcionamento e da conferência do IAM em stage.',
        },
        {
          sistema: 'Relatório Diário',
          descricao: 'Consome os dados do Metriczz para o relatório diário da liderança.',
        },
      ],
      tecnologia: [
        ['Frontend', 'React + Vite'],
        ['Backend', 'NestJS'],
        ['Banco de dados', 'PostgreSQL'],
        ['ORM', 'Prisma'],
        ['Dados', 'Arquitetura medalhão (migrando do Databricks)'],
        ['Infraestrutura', 'Railway'],
      ],
      statusDetalhe: [
        'Retrato de 03/11/2026 à tarde. O Metriczz está em testes para a primeira ' +
          'versão, com meta de validação em stage até 15/11/2026. Ainda não está ' +
          'em produção; a publicação ocorre somente depois da validação.',
        'Há correções de backend e recortes por marca e empresa já em stage. ' +
          'O novo front tem telas desenvolvidas que ainda não chegaram a stage; ' +
          'Produtores está em correção. Convite e login real pelo IAM estão em execução.',
        'O prazo está apertado: aproximadamente 46 h para convite e dados, com 40% ' +
          'de folga para imprevistos, mais 14–28 h de front, totalizando 60–74 h. ' +
          'A capacidade estimada é de cerca de 43 h em 12 dias, no ritmo recente ' +
          'de 3,6 h por dia. O plano requer 5–6 h de disparo por dia, mas as duas ' +
          'frentes compartilham o mesmo limite de uso de 5 horas.',
        'As estimativas são referências ainda não aferidas contra os resultados. ' +
          'Se faltar capacidade, convite e dados têm prioridade; os primeiros ' +
          'cortes são Asaas, depois Eduzz e, por fim, parte da MZ7. ' +
          'Este checkpoint é estático e não acompanha a execução automaticamente.',
      ],
      proximosPassos: [
        'Concluir o convite pelo IAM, corrigir as falhas encontradas e validar com pessoa de teste',
        'Obter o Pago mensal de 2026 dos painéis e concluir o recorte da UniFast e o gabarito de dados',
        'Levar convite e dados a stage até 10/11 para a janela proposta de QA de 10 a 12/11',
        'Concluir MZ4, MZ5 e MZ7 conforme a capacidade; janela proposta de merge do front em stage em 12/11',
        'Fazer a revisão MZ8 e os ajustes finais para validar a primeira versão em stage até 15/11/2026',
        'Planejar o envio à produção e as migrações somente após a validação',
      ],
      fonte:
        'Relatório “Metriczz — Versão de 15/11: o que está feito e o que falta”, ' +
        'checkpoint de 03/11/2026 à tarde, fornecido pelo time tech. ' +
        'Prazos e estimativas refletem esse retrato.',
      papel: 'Central de métricas, relatórios e dashboards da UniFast.',
    },
  },
  {
    id: 'u4',
    code: 'U4',
    name: 'CAMPUZZ LMS',
    sub: 'GESTÃO DA APRENDIZAGEM',
    pastaFotos: 'campuzz',
    icon: 'capelo',
    status: ESTADOS.producao,
    state: 'producao',
    box: { x: 170, y: 824, w: 260, h: 150 },
    /* u4 identifica o produto LMS. Campuzz, a tecnologia transversal, é
       descrita separadamente em groups.js. A pasta de fotos continua a mesma. */
    ficha: {
      subtitulo: 'Produto de aprendizagem sobre a tecnologia Campuzz',
      tagline: 'A jornada de aprendizagem em um só lugar.',
      resumo:
        'O Campuzz LMS é o produto de gestão da aprendizagem: reúne cursos, alunos, ' +
        'turmas e a operação acadêmica. Utiliza a tecnologia Campuzz, a base que ' +
        'sustenta todo o ecossistema UniFast.',
      categoria: 'Acadêmico & Aprendizagem',
      tipo: 'LMS · Sistema de gestão da aprendizagem',
      fonte:
        'Separação entre Campuzz tecnologia e Campuzz LMS: time tech. ' +
        'Recursos acadêmicos: conteúdo e telas do produto já disponíveis nesta página. ' +
        'Ficha técnica ainda não documentada.',

      visaoGeral: [
        'Campuzz é o nome da tecnologia que move todo o ecossistema UniFast. ' +
          'Campuzz LMS é o produto de aprendizagem que utiliza essa base tecnológica.',
        'O LMS concentra a jornada acadêmica: cursos, alunos, turmas, calendário, ' +
          'comunidades, documentos e suporte. O módulo Vendas pertence à organização ' +
          'da tecnologia Campuzz e tem suas próprias funcionalidades.',
      ],
      funcoes: [
        'Organiza cursos e a entrega de conteúdo de aprendizagem',
        'Gerencia alunos e turmas',
        'Reúne o calendário da operação acadêmica',
        'Disponibiliza comunidades',
        'Centraliza documentos e solicitações acadêmicas',
        'Oferece suporte ao aluno',
      ],
      ecossistema:
        'É o produto de aprendizagem dentro do ecossistema sustentado pela tecnologia ' +
        'Campuzz. O Accountzz fornece a camada compartilhada de identidade e acesso. ' +
        'As funcionalidades comerciais são apresentadas no módulo Vendas da tecnologia Campuzz.',
      integracoes: [
        { sistema: 'Campuzz · tecnologia', descricao: 'Base tecnológica que sustenta o LMS e as demais plataformas.' },
        { sistema: 'Accountzz', descricao: 'Camada compartilhada de identidade e acesso.' },
      ],
      papel:
        'Produto de aprendizagem da UniFast, construído sobre a tecnologia Campuzz.',
    },
  },
  {
    id: 'u6',
    code: 'U6',
    name: 'RELATÓRIO DIÁRIO',
    sub: 'CONTRATOS & PAGAMENTOS',
    pastaFotos: 'relatorio-financeiro',
    icon: 'relatorio',
    status: ESTADOS.producao,
    state: 'producao',
    checkpoint: '03/11/2026',
    ficha: FICHA_RELATORIO_DIARIO,
  },
  {
    id: 'u3',
    code: 'U3',
    name: 'LEADSHUG',
    sub: 'CRM & ATENDIMENTO',
    icon: 'balao',
    /* em reconstrucao; os dois sistemas de origem seguem em producao ate
       serem cobertos por ele */
    status: ESTADOS.desenvolvimento,
    state: 'desenvolvimento',
    checkpoint: '25/09/2026',
    box: { x: 170, y: 1064, w: 260, h: 150 },
    ficha: {
      subtitulo: 'Central de relacionamento com o cliente da UniFast',
      tagline: 'Atendimento, leads e CRM num lugar só.',
      resumo:
        'A central de relacionamento com o cliente da UniFast: atendimento, leads e ' +
        'CRM no mesmo sistema, com o WhatsApp como principal canal de conversa.',
      categoria: 'CRM & Atendimento',
      tipo: 'Central de relacionamento',

      visaoGeral: [
        'A UniFast fala com cliente por WhatsApp o dia inteiro: alguém pergunta sobre ' +
          'um curso, alguém negocia uma cobrança, alguém volta seis meses depois.',
        'O LeadsHug junta atender, acompanhar o lead e manter o relacionamento num só ' +
          'sistema, porque na prática já são o mesmo trabalho: a conversa que começa em ' +
          'dúvida vira lead, o lead vira cliente, e o cliente volta a conversar.',
      ],
      problema:
        'Hoje cada conversa termina em lugar nenhum: o histórico fica na ferramenta de ' +
        'atendimento, a ficha do cliente em outra, a campanha que o trouxe numa ' +
        'terceira, e a relação entre as três está na cabeça de quem atendeu.',
      casos: [
        {
          titulo: 'DE ONDE ELE VEM',
          texto:
            'Não nasce do zero: é a junção de dois sistemas que já rodam em produção, ' +
            'cada um resolvendo metade do problema por um canal. Os dois seguem no ar ' +
            'enquanto o produto novo cresce e serão desligados quando ele os cobrir.',
          itens: [
            {
              nome: 'Central de Modelos',
              descricao:
                'Canal oficial da Meta: templates aprovados, disparo para listas, janela ' +
                'de 24h respeitada e auditoria de atendimento.',
            },
            {
              nome: 'WhatsApp Hub',
              descricao:
                'Canal não oficial (Evolution/Baileys): grupos, fila de atendimento com ' +
                'atribuição e controle de ritmo contra banimento.',
            },
          ],
        },
        {
          titulo: 'O QUE ELE SE PROPÕE A SUBSTITUIR',
          numerado: true,
          itens: [
            {
              nome: 'Marketing relacional',
              descricao:
                'Disparo e relacionamento ao lado do histórico: quem recebe, recebe porque ' +
                'faz sentido, e a resposta cai na mesma conversa.',
            },
            {
              nome: 'CRM',
              descricao:
                'Ficha do cliente e conversa no mesmo lugar: quem atende vê quem é a ' +
                'pessoa; quem acompanha o funil vê o que foi dito.',
            },
            {
              nome: 'WhatsApp Business',
              descricao:
                'Atendimento dividido em equipe, com vários números e os dois canais, ' +
                'sabendo quem respondeu o quê e sem alternar entre aplicativos.',
            },
          ],
        },
        {
          titulo: 'O QUE ELE PROMETE',
          itens: [
            {
              nome: 'O número é a unidade',
              descricao:
                'Permissão, histórico e atendimento penduram no número ("o número do ' +
                'Financeiro"), ligado ao canal oficial, ao não oficial ou aos dois.',
            },
            {
              nome: 'Uma conversa é uma conversa',
              descricao:
                'Mesma pessoa, mesmo número: uma conversa só. O canal é detalhe de ' +
                'transporte, marcado em cada mensagem.',
            },
            {
              nome: 'Quem vê o quê',
              descricao:
                'Cada pessoa enxerga só os números concedidos a ela, regra aplicada em toda ' +
                'leitura de dado e verificada por teste.',
            },
            {
              nome: 'Regras das plataformas',
              descricao:
                'Janela de 24h da Meta e risco de banimento no canal não oficial: o produto ' +
                'avisa antes, recusa o que a plataforma recusaria e controla o ritmo.',
            },
            {
              nome: 'Histórico legível',
              descricao:
                'Quem respondeu o quê sobrevive à saída da pessoa: consultável por número e ' +
                'por contato, exportável, e não se apaga sozinho.',
            },
            {
              nome: 'API pública',
              descricao:
                'Contrato estável para sistemas parceiros lerem conversas e responderem ' +
                'sem passar por tela.',
            },
          ],
        },
        {
          titulo: 'O QUE JÁ FUNCIONA (EM STAGE)',
          itens: [
            { nome: 'Identidade e contas', descricao: 'Login, papéis e escopo por número.' },
            {
              nome: 'Números e canais',
              descricao: 'Conectar uma WABA oficial e parear um número não oficial por QR.',
            },
            {
              nome: 'Atendimento',
              descricao:
                'Inbox pelos dois canais, fila com atribuição e resposta respeitando a janela de 24h.',
            },
            {
              nome: 'Histórico',
              descricao: 'Consulta por par de números, paginada, com exportação.',
            },
            {
              nome: 'Integrações',
              descricao: 'API pública por conta, chaves e webhook de saída.',
            },
          ],
        },
        {
          titulo: 'O QUE AINDA FALTA',
          pendente: true,
          itens: [
            { nome: 'Modelos e disparo', descricao: 'Seguem na Central de Modelos; voltam na v2.' },
            { nome: 'Grupos', descricao: 'Seguem no WhatsApp Hub.' },
            {
              nome: 'CRM',
              descricao:
                'Lead, funil e ficha do cliente: é a ambição do produto e ainda não tem ' +
                'decisão escrita.',
            },
            {
              nome: 'Campanhas de relacionamento',
              descricao: 'Dependem do disparo (v2) e do CRM.',
            },
          ],
        },
      ],
      ecossistema:
        'É onde a conversa com o cliente acontece. Outros sistemas falam com ele por uma ' +
        'API pública, com contrato estável; hoje o parceiro é a tecnologia Campuzz, cujo módulo ' +
        'Vendas usa o LeadsHug para leads e prevê concentrar nele a mensageria. O expert também pode contratar o LeadsHug para ' +
        'o próprio atendimento, se quiser.',
      integracoes: [
        {
          sistema: 'Campuzz · tecnologia',
          descricao: 'Parceiro pela API pública: lê conversas e responde sem passar por tela.',
        },
        { sistema: 'WhatsApp oficial (Meta)', descricao: 'WABA, templates e janela de 24h.' },
        {
          sistema: 'WhatsApp não oficial',
          descricao: 'Evolution/Baileys, pareado por QR, com controle de ritmo.',
        },
      ],
      statusDetalhe: [
        'As principais funcionalidades e telas já foram definidas a partir dos estudos ' +
          'de descoberta e validação feitos em "vibe code".',
        'Por exigir escala e segurança (disparo em massa em volume alto, preservação dos ' +
          'documentos enviados pelo cliente), o produto passa por uma reconstrução mais ' +
          'criteriosa. Já está pronta a documentação que guia o desenvolvimento: todas as ' +
          'funcionalidades mapeadas, as futuras alinhadas e a arquitetura a seguir.',
      ],
      proximosPassos:
        'Revisar o que já está pronto e funcionando, identificar os gaps que precisam ' +
        'ser cobertos e resolver cada um deles.',
      papel:
        'Central de relacionamento com o cliente da UniFast, com o WhatsApp como canal principal.',
    },
  },
  {
    id: 'u2',
    code: 'U2',
    name: 'UNINOTAS',
    sub: 'FINANCEIRO & FISCAL',
    icon: 'nota',
    /* finalizado e entregue a equipe; o login pelo Accountzz vem depois */
    status: ESTADOS.producao,
    state: 'producao',
    checkpoint: '02/10/2026',
    box: { x: 1010, y: 824, w: 260, h: 150 },
    ficha: {
      subtitulo: 'Gestão centralizada de notas fiscais da UniFast',
      tagline: 'Todo o fluxo fiscal em um só lugar.',
      resumo:
        'A plataforma de gestão de notas fiscais da UniFast. Centraliza o ' +
        'acompanhamento das emissões, identifica e traduz falhas para a equipe ' +
        'financeira e evolui para concentrar todo o processo fiscal, da emissão ao ' +
        'tratamento e acompanhamento das notas.',
      categoria: 'Financeiro & Fiscal',
      tipo: 'Plataforma de gestão fiscal',

      visaoGeral: [
        'O UniNotas (antigo MonitorNotes) acompanha e, aos poucos, centraliza a ' +
          'emissão e a gestão de notas fiscais da UniFast.',
        'Hoje ele monitora os eventos de emissão enviados ao SmartNotas, identifica ' +
          'falhas, traduz erros técnicos em informação compreensível e deixa a equipe ' +
          'financeira acompanhar e registrar o tratamento de cada caso.',
      ],
      problema:
        'A emissão de notas passa por integrações entre vários sistemas, e quando ' +
        'uma emissão falha o erro pode ficar só em logs técnicos. Validação, nota ' +
        'duplicada ou serviço fora do ar acabam exigindo análise manual de respostas ' +
        'e logs extensos. O UniNotas transforma esses eventos em informação clara e ' +
        'acionável.',
      funcoesTitulo: 'O QUE FAZ HOJE',
      funcoes: [
        'Monitora os eventos de emissão de notas fiscais',
        'Identifica notas emitidas com sucesso ou com erro',
        'Classifica os diferentes tipos de falha',
        'Traduz mensagens técnicas em orientações claras',
        'Aponta os campos que precisam ser corrigidos',
        'Registra o tratamento feito pela equipe financeira',
        'Guarda o histórico dos tratamentos sem alterar os logs originais',
        'Mostra indicadores de volume de emissões e erros',
        'Tem monitoramento externo para detectar aumento de falhas',
      ],
      casos: {
        titulo: 'TIPOS DE ERRO TRATADOS',
        itens: [
          { nome: 'Duplicidade', descricao: 'Identifica quando a nota já foi emitida antes.' },
          {
            nome: 'Validação',
            descricao:
              'Interpreta dados obrigatórios ausentes ou inválidos e diz quais corrigir.',
          },
          {
            nome: 'Indisponibilidade',
            descricao: 'Detecta falhas de comunicação ou serviços de emissão fora do ar.',
          },
        ],
      },
      evolucao: {
        texto:
          'O UniNotas está deixando de ser só um monitor para virar a plataforma ' +
          'central de gestão fiscal da UniFast. Com a nova API do fornecedor de ' +
          'emissão, todas as etapas do processo passam a acontecer dentro dele, e a ' +
          'operação deixa de usar sistemas externos diretamente.',
        itens: [
          'Solicitação de emissão de notas',
          'Consulta do status de emissão',
          'Identificação e tratamento de falhas',
          'Reprocessamento e reenvio de notas',
          'Consulta dos documentos emitidos',
          'Acompanhamento do ciclo completo da nota',
          'Histórico das ações da equipe',
          'Indicadores operacionais e financeiros das emissões',
        ],
      },
      ecossistema:
        'Hoje o fluxo parte dos eventos de venda enviados ao serviço de emissão; o ' +
        'UniNotas lê os registros gerados, interpreta o resultado e entrega a ' +
        'informação para a equipe financeira. Com a evolução, ele passa a falar ' +
        'direto com a API fiscal e a entregar o resultado aos demais sistemas da ' +
        'empresa.',
      fluxo: [
        {
          rotulo: 'Atual',
          etapas: ['Venda', 'Routerfy', 'SmartNotas', 'Logs', 'UniNotas'],
        },
        {
          rotulo: 'Planejado',
          planejado: true,
          etapas: ['Sistemas UniFast', 'UniNotas', 'API de emissão fiscal'],
        },
      ],
      monitoramento:
        'Acompanha automaticamente a quantidade de erros em períodos recentes e ' +
        'classifica os eventos em níveis de alerta, para que ferramentas externas ' +
        'de monitoramento percebam rápido qualquer anormalidade na emissão.',
      segurancaTitulo: 'SEGURANÇA E INTEGRIDADE',
      seguranca:
        'Os registros originais do processo de emissão são tratados como somente ' +
        'leitura. As ações da equipe financeira ficam registradas à parte, o que ' +
        'preserva o histórico original e garante rastreabilidade de cada tratamento.',
      tecnologia: [
        ['Frontend', 'React + Vite'],
        ['Backend', 'NestJS'],
        ['Banco de dados', 'PostgreSQL'],
        ['ORM', 'Prisma'],
        ['Infraestrutura', 'Railway'],
        ['Monitoramento', 'UptimeRobot'],
        ['Integração fiscal', 'SmartNotas / API fiscal'],
      ],
      integracoes: [
        {
          sistema: 'SmartNotas',
          nota: 'conectado',
          descricao: 'API de emissão fiscal do fornecedor, já ligada ao UniNotas.',
        },
        {
          sistema: 'Accountzz',
          nota: 'próximo passo',
          descricao: 'Login da equipe pelo núcleo de identidade.',
        },
      ],
      statusDetalhe:
        'Finalizado e entregue à equipe, em produção e conectado à API ' +
        'disponibilizada pelo SmartNotas.',
      proximosPassos: [
        'Monitorar o uso para avaliar melhorias',
        'Login pelo Accountzz',
      ],
      papel:
        'Plataforma central de emissão, monitoramento e gestão de notas fiscais da UniFast.',
    },
  },
  {
    id: 'u5',
    code: 'U5',
    name: 'PAILON',
    sub: 'PRODUTO & TECH',
    icon: 'harness',
    status: ESTADOS.desenvolvimento,
    state: 'desenvolvimento',
    box: { x: 1010, y: 1064, w: 260, h: 150 },
    /* Pailon (antes Delphi AI). Ocupa o lugar do antigo Design System, que passa a viver dentro do
       harness (a ficha nao cita isso). Conteudo do repositorio delphi-ai (metodo
       PACED) e do foundation_documentation de cada projeto; a visao de
       servico (HaaS) vem do time tech e de um documento de estrategia do
       proprio repositorio, ainda "a discutir". */
    ficha: {
      subtitulo: 'Visão de produto e apoio ao time tech',
      tagline: 'Antecipa a visão do produto e facilita o trabalho do time tech.',
      resumo:
        'O Pailon antecipa a visão do produto e facilita o trabalho do time tech. ' +
        'Gerencia o processo de desenvolvimento com agentes de IA: as ' +
        'mesmas regras, tarefas e verificações para todas as equipes, e visibilidade ' +
        'para a gestão decidir com dados concretos.',
      categoria: 'Engenharia & Governança',
      tipo: 'Harness as a Service',

      visaoGeral: [
        'O Pailon é o harness de desenvolvimento da UniFast. Por trás dele está o ' +
          'PACED, um método interno de ' +
          'engenharia em que cada projeto deixa mais regras automáticas do que ' +
          'consumiu, e a complexidade acumulada acelera o código certo em vez de travar.',
        'O objetivo é virar Harness as a Service: gerenciar o processo de ' +
          'desenvolvimento como um serviço e, ao fazer isso, dar visibilidade e ' +
          'governança com dados concretos.',
      ],
      problema: [
        'A IA aproximou a gestão do código e do produto. Mas, ao mesmo tempo, ' +
          'dificultou a governança e a colaboração em equipes mais complexas, cada uma ' +
          'usando uma ferramenta diferente, um agente diferente.',
        'E a gestão, próxima do produto, não tem a visibilidade adequada para a ' +
          'tomada de decisão.',
      ],
      funcoes: [
        'Dá a qualquer agente (Claude Code, Codex, Gemini, Cline) as mesmas regras',
        'Organiza o trabalho em tarefas com aprovação explícita antes de mexer no código',
        'Exige evidência de cada critério de pronto antes de uma entrega',
        'Barra automaticamente o que não passa nas verificações',
        'Junta regras gerais, regras de cada tecnologia e regras de cada projeto',
        'Mantém um CI único, assinado por todos os projetos',
        'Registra em cada sessão quais regras pegaram problemas e quais deixaram passar',
        'Separa papéis de trabalho: estratégia, código, DevOps, qualidade e segurança',
      ],
      casos: [
        {
          titulo: 'TRÊS CAMADAS DE GOVERNANÇA',
          numerado: true,
          itens: [
            {
              nome: 'Instruções',
              descricao:
                'Regras que o agente interpreta. As do projeto vencem as da tecnologia, ' +
                'que vencem as gerais.',
            },
            {
              nome: 'Determinística',
              descricao:
                'Scripts e verificações que o agente tem de obedecer: o que não passa, ' +
                'não segue.',
            },
            {
              nome: 'Padrões',
              descricao: 'Soluções reutilizáveis e erros conhecidos, versionados.',
            },
          ],
        },
        {
          titulo: 'FOUNDATION DOCUMENTATION',
          texto:
            'Cada projeto tem o seu foundation_documentation: as regras e as tarefas ' +
            'daquele projeto, lidas pelo Pailon antes de qualquer trabalho.',
          itens: [
            {
              nome: 'Constituição',
              descricao:
                'A stack e as decisões do projeto; é ela que ativa as regras certas.',
            },
            {
              nome: 'Tarefas',
              descricao: 'Ativas, em promoção e concluídas, cada uma com a sua evidência.',
            },
            {
              nome: 'Regras locais',
              descricao: 'O que vale só para aquele projeto, acima das regras gerais.',
            },
            {
              nome: 'Métricas',
              descricao: 'O registro de cada regra disparada, sessão a sessão.',
            },
          ],
        },
      ],
      evolucao: {
        texto:
          'Hoje o Pailon funciona dentro de cada repositório, com arquivos e scripts ' +
          'locais. Isso atende bem uma pessoa ou um agente, mas mostra limites quando ' +
          'várias pessoas e vários agentes trabalham em paralelo. A evolução é levar o ' +
          'estado da operação para um serviço central, mantendo código e arquitetura no Git.',
        itens: [
          'Tarefas, dependências e travas num lugar só',
          'Andamento visível em tempo real',
          'Passagem de trabalho entre pessoas e agentes sem perder contexto',
          'Métricas consolidadas para a gestão decidir',
        ],
      },
      ecossistema:
        'Fica por trás dos outros sistemas: cada repositório assina o Pailon e herda as ' +
        'mesmas regras, verificações e CI. Ao gerenciar o processo, ele também gera os ' +
        'dados que faltavam para a gestão acompanhar e decidir.',
      integracoes: [
        {
          sistema: 'Agentes de IA',
          descricao: 'Claude Code, Codex, Gemini e Cline leem as mesmas regras e tarefas.',
        },
        {
          sistema: 'GitHub Actions',
          descricao: 'CI compartilhado: os projetos assinam o mesmo fluxo de verificações.',
        },
      ],
      tecnologia: [
        ['Método', 'PACED'],
        ['Versão', '0.6'],
        ['Verificações', 'Python e shell'],
        ['Regras e tarefas', 'Markdown + JSON Schema'],
        ['CI', 'GitHub Actions'],
        ['Agentes', 'Claude Code, Codex, Gemini, Cline'],
      ],
      statusDetalhe:
        'O método e as ferramentas já existem (versão 0.6): regras, verificações ' +
        'automáticas, tarefas com evidência e CI compartilhado. O Harness as a Service ' +
        'está em desenvolvimento.',
      proximosPassos: [
        'Definir o Pailon como Harness as a Service',
        'Centralizar tarefas, travas e métricas num serviço',
        'Dar à gestão a visibilidade do processo com dados concretos',
      ],
      papel: 'Antecipa a visão do produto e facilita o trabalho do time tech em toda a UniFast.',
      fonte:
        'Repositório delphi-ai (origem do Pailon) e foundation_documentation; a visão de serviço vem do ' +
        'time tech.',
    },
  },
]
