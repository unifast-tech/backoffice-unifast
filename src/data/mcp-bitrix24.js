/* Conteúdo das tarefas da Sprint 1 no Bitrix (projeto Projetos Tech, epic
   mcp_bitrix), lidas em 27/11/2026. O status e a identificação ficam no
   catálogo systems.js. */
export const FICHA_MCP_BITRIX24 = {
  subtitulo: 'Servidor MCP que liga assistentes de IA ao Bitrix24 da UniFast',
  tagline: 'As tarefas do time ao alcance dos assistentes de IA.',
  resumo:
    'Servidor MCP remoto que conecta Claude, ChatGPT e Codex às tarefas, projetos e ' +
    'sprints do Bitrix24 da UniFast, com login OAuth e permissão por ferramenta. ' +
    'Em produção no Railway desde 19/11/2026.',
  categoria: 'Produto & Tech',
  tipo: 'Integração de IA · servidor MCP',

  visaoGeral: [
    'O MCP Bitrix24 expõe o Bitrix24 da UniFast como um conjunto de ferramentas que ' +
      'os assistentes de IA podem usar: consultar tarefas, sprints, etapas, grupos e ' +
      'usuários, e escrever de forma controlada.',
    'É a ponte que permite atualizar páginas e relatórios do time direto a partir das ' +
      'tarefas, sem copiar status à mão.',
  ],
  problema:
    'O andamento dos projetos vive nas tarefas do Bitrix24, mas levar esse andamento ' +
    'para relatórios e páginas era trabalho manual. Sem uma integração com controle ' +
    'de acesso, um assistente de IA não tinha como ler nem atualizar as tarefas com ' +
    'segurança.',
  funcoes: [
    'Lista e consulta tarefas, sprints, etapas, grupos e usuários',
    'Cria, atualiza, comenta, inicia e conclui tarefas com escrita controlada',
    'Lê o chat de cada tarefa',
    'Publica no feed dos projetos e convida usuários',
    'Login OAuth, com renovação de sessão e lista de contas permitidas',
    'Permissão definida ferramenta a ferramenta',
  ],
  casos: [
    {
      titulo: 'SPRINT 1 · ENTREGUE',
      itens: [
        {
          nome: 'Publicação final na main · 19/11',
          descricao: 'CI com 5 jobs e 231 testes; servidor em produção no Railway.',
        },
        {
          nome: 'OAuth e acesso dos colegas',
          descricao:
            'Login, renovação de sessão e recusa por escopo e por conta não permitida ' +
            'validados no ambiente local e na produção (17 e 18/11).',
        },
        {
          nome: 'Dependências e Docker',
          descricao: 'Testes validados em Docker com Node 24 e auditoria de dependências zerada (18/11).',
        },
        {
          nome: 'Chat e comentários',
          descricao: 'Leitura do chat da tarefa e compatibilidade de comentários (17/11).',
        },
        {
          nome: 'Validado com Claude, ChatGPT e Codex',
          descricao:
            'Integração real testada nos três; no ChatGPT, também a recusa de uma conta ' +
            'não autorizada (19/11).',
        },
        {
          nome: 'Feed de projetos e convites · 24/11',
          descricao: 'Publicação no feed e convite de usuários, com piloto no projeto Projetos Tech.',
        },
      ],
    },
    {
      titulo: 'EVOLUÇÃO FUTURA',
      pendente: true,
      itens: [
        { nome: 'Idempotência persistente', descricao: 'Evitar escrita repetida mesmo após reinício do servidor.' },
        { nome: 'Busca de épicos por nome', descricao: 'Hoje o epic não aparece nas consultas de tarefa.' },
        { nome: 'Desativação de usuários', descricao: 'Completar o ciclo iniciado pelos convites.' },
        { nome: 'Claude Desktop e Claude Code', descricao: 'Ainda não validados; o Claude web já foi.' },
      ],
    },
  ],
  ecossistema:
    'Fica ao lado do Pailon, no grupo Produto & Tech: o Pailon governa o processo de ' +
    'desenvolvimento, e o MCP leva o andamento das tarefas do Bitrix24 para os ' +
    'assistentes de IA do time.',
  fluxo: {
    etapas: ['Assistente de IA', 'OAuth', 'MCP Bitrix24', 'Bitrix24'],
    texto:
      'O assistente entra pelo OAuth, recebe só as ferramentas permitidas e o servidor ' +
      'fala com o Bitrix24 em nome da UniFast.',
  },
  seguranca:
    'Acesso por OAuth com lista de contas permitidas e escopos por ferramenta. As ' +
    'escritas são controladas e o conteúdo das tarefas é tratado como dado, não como ' +
    'instrução.',
  integracoes: [
    { sistema: 'Bitrix24', nota: 'conectado', descricao: 'Tarefas, sprints, grupos, usuários e feed.' },
    { sistema: 'Claude', nota: 'validado', descricao: 'Claude web; Desktop e Code a validar.' },
    { sistema: 'ChatGPT', nota: 'validado' },
    { sistema: 'Codex', nota: 'validado' },
  ],
  tecnologia: [
    ['Runtime', 'Node.js 24'],
    ['Empacotamento', 'Docker'],
    ['Autenticação', 'OAuth (Auth0)'],
    ['Infraestrutura', 'Railway'],
    ['Testes', '231 testes, CI com 5 jobs'],
  ],
  statusDetalhe: [
    'Em produção no Railway desde 19/11/2026, validado com Claude, ChatGPT e Codex.',
    'A extensão de feed de projetos e convites foi aceita em produção em 24/11/2026.',
  ],
  proximosPassos: [
    'Validar Claude Desktop e Claude Code',
    'Busca de épicos por nome',
    'Idempotência persistente e desativação de usuários',
  ],
  fonte:
    'Tarefas da Sprint 1 no Bitrix (epic mcp_bitrix), lidas em 27/11/2026. ' +
    'Responsável: Lucas Paifer.',
  papel: 'Ponte entre os assistentes de IA do time e o Bitrix24 da UniFast.',
}
