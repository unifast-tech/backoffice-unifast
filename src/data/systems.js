/* Sistemas do esquema de integracao. A posicao vem da medicao da reference
   (canvas 1440x2190): design-systems/unifast-produtos/reference.png */

/* Estados possiveis de um sistema (`state`) e o rotulo que aparece no cartao,
   na ficha e no selo; a cor vem da classe `.estado--<state>` em tokens.css. */
export const ESTADOS = {
  producao: 'EM PRODUÇÃO',
  entregue: 'ENTREGUE',
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
   desenha "sistema -> este" (quem esta migrando para ele). */
export const NUCLEO = {
  id: 'u0',
  code: 'U0',
  name: 'ACCOUNTZZ',
  sub: 'IDENTIDADE & SEGURANÇA',
  icon: 'cadeado',
  status: ESTADOS.entregue,
  state: 'entregue',
  /* Pronto desde 23/09/2026, mas nenhum sistema foi ligado a ele ainda: os
     fios do esquema ficam tracejados enquanto for false. */
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
      'O Accountzz é o serviço central de identidade e acesso do ecossistema ' +
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
      { sistema: 'Metriczz', nota: 'primeiro a convergir', converge: true },
      { sistema: 'Gateway UniFast', converge: true },
      { sistema: 'LeadsHug', converge: true },
      {
        sistema: 'Backoffice UniFast',
        nota: 'futuro',
        converge: true,
        descricao: 'Hoje é o FastHub Front; vai se tornar o backoffice da UniFast.',
      },
    ],
    statusDetalhe:
      'Entregue em 23/09/2026 e pronto para uso. Ainda não está conectado aos ' +
      'demais sistemas: a convergência começa pelo Metriczz.',
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
    status: ESTADOS.desenvolvimento,
    state: 'desenvolvimento',
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
      ecossistema: [
        'É a camada de visualização e consumo analítico dos dados da UniFast. Os ' +
          'dados vêm da infraestrutura analítica da empresa, são processados pela API ' +
          'do Metriczz e guardados numa camada própria para os dashboards.',
        'Usuários internos podem ter uma visão mais ampla da operação; parceiros ' +
          'veem somente os produtores, produtos e dados do próprio escopo.',
      ],
      fluxo: {
        etapas: ['Databricks', 'API Metriczz', 'Banco de dados', 'Dashboards'],
        texto:
          'O Databricks é a fonte de leitura dos dados analíticos. A API processa e ' +
          'organiza essas informações, aplica as regras de acesso e entrega o ' +
          'resultado para a interface.',
      },
      seguranca:
        'Feito para isolar as informações entre usuários e organizações. As ' +
        'permissões são aplicadas pela API antes de os dados chegarem à interface, ' +
        'sem depender só do frontend: cada usuário recebe somente os dados do seu escopo.',
      integracoes: [
        { sistema: 'Databricks', descricao: 'Fonte analítica dos dados e indicadores.' },
        {
          sistema: 'Gateway UniFast',
          descricao: 'Núcleo transacional: cadastros, tenancy, checkout e eventos.',
        },
        {
          sistema: 'Accountzz',
          descricao: 'Identidade e acesso; vai centralizar a autenticação dos produtos.',
        },
      ],
      tecnologia: [
        ['Frontend', 'React + Vite'],
        ['Backend', 'NestJS'],
        ['Banco de dados', 'PostgreSQL'],
        ['ORM', 'Prisma'],
        ['Fonte analítica', 'Databricks'],
        ['Infraestrutura', 'Railway'],
      ],
      statusDetalhe:
        'Frontend, API e banco de dados funcionando, com ambiente publicado em stage. ' +
        'A integração definitiva com a fonte real depende da liberação das views e ' +
        'credenciais no Databricks.',
      papel: 'Central de métricas, relatórios e dashboards da UniFast.',
    },
  },
  {
    id: 'u4',
    code: 'U4',
    name: 'CAMPUZZ',
    sub: 'PLATAFORMA EDUCACIONAL',
    icon: 'capelo',
    status: ESTADOS.producao,
    state: 'producao',
    box: { x: 170, y: 824, w: 260, h: 150 },
    /* Sem acesso ao repositorio: a ficha vem do site de vendas do Campuzz.
       As areas sao entregues pelos sistemas da UniFast (via); nada de
       tecnologia ou fluxo ate haver fonte tecnica. */
    ficha: {
      subtitulo: 'Sistema operacional do ecossistema educacional',
      tagline: 'Seis áreas do negócio educacional num fluxo único.',
      resumo:
        'A infraestrutura que integra as seis áreas críticas de uma operação ' +
        'educacional (receita, financeiro, jurídico, suporte, acadêmico e dados) ' +
        'num fluxo único, automatizado e guiado por IA.',
      categoria: 'Educação & Operação',
      tipo: 'Plataforma comercial',
      fonte:
        'Áreas e recursos: site de vendas do Campuzz. Relação com os sistemas: ' +
        'time tech. Ficha técnica ainda não documentada.',

      visaoGeral:
        'O Campuzz é o sistema operacional completo para o ecossistema educacional. ' +
        'Reúne numa só infraestrutura a tração comercial, o financeiro e o fiscal, a ' +
        'proteção jurídica, o suporte ao aluno, a entrega acadêmica e uma camada de ' +
        'inteligência de dados que observa todas as outras.',
      ecossistema:
        'O Campuzz é a face comercial do ecossistema. Jurídico, suporte e a entrega ' +
        'acadêmica são dele mesmo; receita, fiscal e dados vêm dos sistemas que a ' +
        'UniFast está construindo: o CRM é o LeadsHug, a emissão de notas é o ' +
        'UniNotas e os dashboards e indicadores são o Metriczz. Conforme esses ' +
        'sistemas evoluem, o Campuzz evolui junto.',
      integracoes: [
        { sistema: 'LeadsHug', descricao: 'CRM e atendimento da área de Receita.' },
        { sistema: 'UniNotas', descricao: 'Emissão e gestão de NF-e da área Financeiro & Fiscal.' },
        { sistema: 'Metriczz', descricao: 'Dashboards e indicadores da área de Data Intelligence.' },
      ],
      casos: {
        titulo: 'AS SEIS ÁREAS',
        numerado: true,
        itens: [
          {
            nome: 'Receita · Marketing & Vendas',
            via: 'LeadsHug',
            descricao:
              'Centraliza a tração do negócio, da captura de leads até a conversão no CRM.',
            itens: [
              'Funil comercial inteligente',
              'Gestão de campanhas',
              'Automação de vendas',
              'Métricas de ROI em tempo real',
            ],
          },
          {
            nome: 'Financeiro & Fiscal',
            via: 'UniNotas',
            descricao:
              'Opera o fluxo de caixa, os pagamentos e a complexidade tributária da educação.',
            itens: [
              'Checkout de alta conversão',
              'BPO financeiro',
              'Emissão automatizada de NF-e',
              'Estrutura de SCP para redução de impostos',
            ],
          },
          {
            nome: 'Jurídico & Compliance',
            proprio: true,
            descricao:
              'Protege os ativos intelectuais e mantém a operação dentro das normas legais.',
            itens: [
              'Contratos de matrícula automáticos',
              'Assinatura digital',
              'Conformidade com a LGPD',
              'Proteção anti-pirataria',
            ],
          },
          {
            nome: 'Suporte & CX',
            proprio: true,
            descricao:
              'Acompanha a satisfação e o sucesso do aluno durante todo o ciclo de vida.',
            itens: [
              'Central de suporte preditivo',
              'Gestão de tickets',
              'Monitoramento de NPS',
              'Agentes de IA para atendimento',
            ],
          },
          {
            nome: 'Acadêmico & Entrega',
            proprio: true,
            descricao:
              'Gerencia a jornada pedagógica do aluno, com uma experiência fluida e reconhecida.',
            itens: [
              'LMS moderno',
              'Secretaria virtual',
              'Gestão de turmas',
              'Comunidade',
              'Diplomas com registro no MEC',
            ],
          },
          {
            nome: 'Data Intelligence',
            via: 'Metriczz',
            descricao:
              'A camada de IA que observa as outras cinco áreas e gera predições ' +
              'estratégicas, alimentada pelos dados de mais de 280 operações simultâneas.',
            itens: [
              'Dashboards preditivos',
              'Score de risco de churn',
              'Indicadores de performance',
              'Predição de inadimplência',
              'Projeção de LTV',
            ],
          },
        ],
      },
      papel:
        'Produto comercial da UniFast: faz o jurídico, o suporte e o acadêmico, e ' +
        'entrega ao cliente, num só lugar, o que os demais sistemas constroem por baixo.',
    },
  },
  {
    id: 'u3',
    code: 'U3',
    name: 'LEADSHUG',
    sub: 'CRM & ATENDIMENTO',
    icon: 'balao',
    /* o produto novo roda em stage; os dois sistemas de origem seguem em
       producao ate serem cobertos por ele */
    status: ESTADOS.desenvolvimento,
    state: 'desenvolvimento',
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
        'API pública, com contrato estável; hoje o parceiro é o Campuzz, cuja área de ' +
        'Receita se apoia no LeadsHug.',
      integracoes: [
        {
          sistema: 'Campuzz',
          descricao: 'Parceiro pela API pública: lê conversas e responde sem passar por tela.',
        },
        { sistema: 'WhatsApp oficial (Meta)', descricao: 'WABA, templates e janela de 24h.' },
        {
          sistema: 'WhatsApp não oficial',
          descricao: 'Evolution/Baileys, pareado por QR, com controle de ritmo.',
        },
      ],
      statusDetalhe:
        'O núcleo novo roda em stage. Hoje substitui uma das três ferramentas pela metade; ' +
        'modelos, disparo e grupos seguem nos sistemas de origem, e o CRM ainda não tem ' +
        'decisão escrita.',
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
    /* em producao, e crescendo de monitor para hub fiscal */
    status: `${ESTADOS.producao} · EM EVOLUÇÃO`,
    state: 'producao',
    box: { x: 1010, y: 684, w: 260, h: 150 },
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
      statusDetalhe:
        'O módulo de monitoramento de notas já está em produção. A próxima etapa é ' +
        'integrar a nova API fiscal, trazendo aos poucos todo o processo de emissão ' +
        'e gestão de notas para dentro do UniNotas.',
      papel:
        'Plataforma central de emissão, monitoramento e gestão de notas fiscais da UniFast.',
    },
  },
  {
    id: 'u5',
    code: 'U5',
    name: 'DESIGN SYSTEM',
    sub: 'PADRONIZAÇÃO VISUAL',
    icon: 'grade',
    status: ESTADOS.desenvolvimento,
    state: 'desenvolvimento',
    box: { x: 1010, y: 964, w: 260, h: 150 },
    /* O modelo e o design system do Belluga 2.4: dele vem o conceito
       (fundacao compartilhada, superficies com linguagem propria, decisoes e
       estados documentados), nao a stack nem as telas, que sao do Belluga. */
    ficha: {
      subtitulo: 'Fundação visual e de experiência dos sistemas UniFast',
      tagline: 'Uma fundação, vários sistemas.',
      resumo:
        'Um só jeito de desenhar tela na UniFast: cores, tipografia, forma, estados e ' +
        'regras de qualidade compartilhados por todos os sistemas, sem obrigar cada um ' +
        'a falar a mesma linguagem.',
      categoria: 'Design & Experiência',
      tipo: 'Fundação compartilhada',

      visaoGeral: [
        'O Design System é a direção de produto e de experiência dos sistemas da ' +
          'UniFast. Eles compartilham marca, tokens e regras de qualidade, mas não ' +
          'linguagem: cada um tem seus componentes, sua densidade e seu comportamento.',
        'Não é uma biblioteca de telas: é uma fundação comum mais as decisões que ' +
          'explicam por que cada tela é do jeito que é.',
      ],
      problema:
        'Cada sistema nasceu num momento diferente, com a sua própria forma de ' +
        'desenhar. A mesma ação muda de lugar, de nome e de aparência de um produto ' +
        'para outro, e quem usa mais de um sistema reaprende a cada troca.',
      casos: [
        {
          titulo: 'O QUE A FUNDAÇÃO COMPARTILHA',
          itens: [
            {
              nome: 'Cor',
              descricao:
                'Paleta e papéis de cor gerados a partir das cores da marca, com o ' +
                'contraste calculado em vez de conferido a olho.',
            },
            {
              nome: 'Tipografia e forma',
              descricao: 'Escala de texto, espaço em grade de 4 e formas definidas pela função.',
            },
            {
              nome: 'Acessibilidade',
              descricao:
                'Contraste de 4,5:1 no texto, foco visível, leitor de tela e alvos de toque de 48.',
            },
            {
              nome: 'Estados',
              descricao: 'Carregando, vazio, erro e sucesso sempre do mesmo jeito.',
            },
            {
              nome: 'Movimento',
              descricao: 'Contido, e trocado por um fade quando a pessoa pede menos movimento.',
            },
          ],
        },
        {
          titulo: 'PRINCÍPIOS DE TELA',
          itens: [
            {
              nome: 'Detalhe é leitura',
              descricao: 'Só o formulário altera dados; o detalhe mostra e tem um botão Editar.',
            },
            {
              nome: 'Toda tela tem endereço',
              descricao:
                'Abre por link direto, voltar leva à origem e nada redireciona em silêncio.',
            },
            {
              nome: 'Erro não apaga nada',
              descricao:
                'O que foi digitado fica, e a mensagem diz o próximo passo em vez de um código.',
            },
            {
              nome: 'Nada só pela cor',
              descricao: 'Seleção, erro e sucesso mudam também forma, ícone e texto.',
            },
            {
              nome: 'Uma ação principal',
              descricao: 'Um único botão de destaque por tela; o resto fica em segundo plano.',
            },
            {
              nome: 'Criar e editar juntos',
              descricao:
                'O mesmo formulário para os dois, e a pessoa aprende uma vez só.',
            },
          ],
        },
        {
          titulo: 'COMO ELE É DOCUMENTADO',
          itens: [
            {
              nome: 'Revisão crítica',
              descricao: 'Cada decisão diz o que estava errado antes e o que muda.',
            },
            {
              nome: 'Anatomia e estados',
              descricao:
                'O esqueleto de cada tipo de tela e os estados obrigatórios, como salvo, ' +
                'salvando, falha e alteração preservada.',
            },
            {
              nome: 'Protótipos',
              descricao: 'Fluxos interativos para percorrer lista, detalhe e formulário.',
            },
            {
              nome: 'Tamanhos',
              descricao: 'Como cada tela se organiza no celular, no tablet e no desktop.',
            },
            {
              nome: 'Aceite',
              descricao: 'Critérios para dizer que uma tela de um sistema segue a fundação.',
            },
          ],
        },
      ],
      ecossistema:
        'Cada sistema da UniFast é uma superfície que herda a fundação (cores, ícones, ' +
        'foco, contraste, estados e vocabulário) e decide o que é só dele: densidade, ' +
        'navegação e tom. O que herda é igual em todos; o que decide fica documentado.',
      statusDetalhe:
        'Em desenvolvimento. O formato de referência é o design system do Belluga ' +
        '(versão 2.4): fundação compartilhada, superfícies com linguagem própria, ' +
        'decisões documentadas e protótipos interativos.',
      papel:
        'Fundação visual e de experiência compartilhada por todos os sistemas da UniFast.',
      fonte:
        'Direção baseada no design system do Belluga 2.4, usado como modelo; o design ' +
        'system da UniFast ainda está em construção.',
    },
  },
]
