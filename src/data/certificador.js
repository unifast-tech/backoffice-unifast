/* Conteúdo das tarefas da Sprint 1 e do backlog no Bitrix (projeto Projetos
   Tech, epic certificador-unifast), lidas em 27/11/2026. O status e a
   identificação ficam no catálogo systems.js. */
export const FICHA_CERTIFICADOR = {
  subtitulo: 'Emissão de certificados e históricos da Secretaria',
  tagline: 'Da planilha ao certificado, com revisão antes de emitir.',
  resumo:
    'Gera o certificado e o histórico de cada aluno em DOCX a partir de uma planilha ' +
    'CSV ou XLSX, com revisão antes de emitir e login individual da equipe. Está em ' +
    'homologação no Railway, com dados fictícios.',
  categoria: 'Acadêmico & Aprendizagem',
  tipo: 'Ferramenta interna da Secretaria',

  visaoGeral: [
    'O Certificador nasceu do pedido da Secretaria por um sistema próprio de geração ' +
      'de certificados. Ele recebe a planilha dos alunos, mostra o que vai ser gerado ' +
      'e emite dois documentos por aluno: o certificado e o histórico.',
    'Cada pessoa da equipe entra com o próprio login. Os dados reais só entram depois ' +
      'que a proteção e a recuperação do banco estiverem provadas no destino.',
  ],
  problema:
    'A Secretaria precisa emitir certificado e histórico de cada aluno. A API do campus ' +
    'testada não traz os dados pessoais necessários, então a emissão parte de ' +
    'planilhas, e o sistema precisa garantir conferência antes de gerar e controle ' +
    'de quem emitiu.',
  funcoes: [
    'Lê planilhas de alunos em CSV ou XLSX',
    'Mostra a revisão do lote antes de gerar',
    'Gera dois DOCX por aluno: certificado e histórico',
    'Login individual para cada pessoa da equipe, com sessões e proteção contra CSRF',
    'Roda de forma portável, com runbooks de operação',
  ],
  casos: [
    {
      titulo: 'SPRINT 1 · CONCLUÍDO',
      itens: [
        {
          nome: 'ST-01 · certificado e histórico por planilha',
          descricao: 'Emissão de 2 DOCX por aluno a partir de CSV ou XLSX, com revisão antes de gerar (24/11).',
        },
        {
          nome: 'ST-03-A · aplicação portável com login individual',
          descricao: 'Login por pessoa, sessões, proteção contra CSRF e runbooks (24/11).',
        },
      ],
    },
    {
      titulo: 'SPRINT 1 · EM HOMOLOGAÇÃO',
      pendente: true,
      itens: [
        {
          nome: 'ST-03-B · implantação no Railway',
          descricao:
            'A tela de login está no ar no ambiente de homologação. Em 26/11 foram feitos ' +
            'um snapshot manual e o backup diário com retenção de 6 dias. Faltam ativar a ' +
            'recuperação pontual do banco (PITR), restaurar num serviço isolado e dar ao ' +
            'gateway um serviço e um healthcheck próprios.',
        },
        {
          nome: 'Roteiro de homologação',
          descricao: '18 casos com dados fictícios, conduzidos por Rafael Pilon e Lucas Paifer.',
        },
        {
          nome: 'Revisão de runtime e segurança do destino',
          descricao:
            'Levantamento feito em 26/11. Falta o parecer com a evidência do TLS do banco ' +
            'e do isolamento da chave no build.',
        },
      ],
    },
    {
      titulo: 'BLOQUEADO',
      pendente: true,
      itens: [
        {
          nome: 'ST-02 · modelos, alunos e arquivos no PostgreSQL',
          descricao:
            'Só avança depois de provar criptografia e controle de acesso aos dados, WAL e ' +
            'backups no destino protegido. Até lá, dados reais não entram.',
        },
      ],
    },
    {
      titulo: 'STANDBY E BACKLOG',
      pendente: true,
      itens: [
        {
          nome: 'Integração com a API do campus',
          descricao:
            'Em standby: a API testada não traz os dados pessoais necessários. Aguarda ' +
            'o fornecedor; enquanto isso, segue o caminho por planilha.',
        },
        {
          nome: 'API de certificados dos alunos do Campuzz 1',
          descricao: 'Preencher dados e notas dos alunos para a IES parceira. Ligada à integração com o campus.',
        },
        {
          nome: 'Medir buscas por prefixo de curso e instituição',
          descricao: 'Melhoria de baixa prioridade, ainda não aprovada.',
        },
      ],
    },
  ],
  ecossistema:
    'Atende a Secretaria, no grupo Acadêmico & Aprendizagem, ao lado do Campuzz LMS. ' +
    'Hoje recebe os dados por planilha; a ligação direta com a API do campus depende ' +
    'do fornecedor.',
  fluxo: [
    {
      rotulo: 'Atual',
      etapas: ['Planilha CSV/XLSX', 'Revisão', 'Certificador', 'Certificado + histórico DOCX'],
    },
    {
      rotulo: 'Planejado',
      planejado: true,
      etapas: ['API do campus', 'Certificador', 'PostgreSQL', 'Documentos emitidos'],
    },
  ],
  seguranca:
    'Login individual, sessões e proteção contra CSRF. Dados reais ficam vetados até ' +
    'que a criptografia, o controle de acesso e a recuperação do banco estejam provados ' +
    'no destino.',
  integracoes: [
    { sistema: 'Railway', descricao: 'Ambiente de homologação, com backup diário e snapshot.' },
    { sistema: 'API do campus', nota: 'standby', descricao: 'Aguarda o fornecedor trazer os dados pessoais necessários.' },
  ],
  tecnologia: [
    ['Runtime', 'Node.js 22'],
    ['Banco de dados', 'PostgreSQL 18'],
    ['Servidor web', 'Caddy'],
    ['Infraestrutura', 'Railway'],
    ['Documentos', 'DOCX a partir de CSV/XLSX'],
  ],
  statusDetalhe: [
    'Sprint 1 (Bitrix, 27/11/2026). A emissão por planilha e o login individual estão ' +
      'prontos. O sistema está em homologação no Railway, com dados fictícios.',
    'A persistência no PostgreSQL está bloqueada até as provas de proteção e ' +
      'recuperação do banco; só depois disso entram dados reais.',
  ],
  proximosPassos: [
    'Concluir o roteiro de homologação de 18 casos',
    'Ativar a recuperação pontual do banco e testar uma restauração isolada',
    'Fechar o parecer de runtime e segurança do destino',
    'Liberar a persistência no PostgreSQL e os dados reais',
  ],
  fonte:
    'Tarefas da Sprint 1 e do backlog no Bitrix (epic certificador-unifast), lidas em ' +
    '27/11/2026. Responsável: Lucas Paifer; homologação com Rafael Pilon.',
  papel: 'Emissão de certificados e históricos escolares da Secretaria da UniFast.',
}
