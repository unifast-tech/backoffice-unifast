/* Suporte da tecnologia Campuzz: as tarefas que demandaram suporte, semana a
   semana. Toda semana entra um item novo em SEMANAS_SUPORTE; as antigas ficam
   para consulta pelo filtro. A ordem do array não importa: a página ordena por
   `inicio`, da mais recente para a mais antiga, e abre na mais recente.

   Semana: { inicio: 'aaaa-mm-dd' (a segunda-feira), tarefas: [] }
     o rótulo "09/11 A 13/11/2026" sai do `inicio` (segunda a sexta).
   Tarefa: { titulo, status, descricao?, sistema?, dia?, responsavel? }
     status: uma chave de STATUS_SUPORTE (a cor vem de .suporte__status--<chave>);
       aguardando = parada à espera de terceiros (decisão, credencial, material)
     sistema: plataforma envolvida, como aparece nos cartões ("Metriczz")
     dia: 'dd/mm' em que o suporte foi pedido ou feito
     responsavel: quem realizou a tarefa
   Valores de oferta e links de pagamento ficam fora da página. */
export const STATUS_SUPORTE = {
  resolvida: 'RESOLVIDA',
  andamento: 'EM ANDAMENTO',
  aguardando: 'AGUARDANDO',
  aberta: 'EM ABERTO',
}

export const SEMANAS_SUPORTE = [
  {
    inicio: '2026-11-09',
    tarefas: [
      {
        titulo: 'Checkouts · Introdução à Pós · Tadashi Kadomoto',
        descricao:
          'Checkouts da pré-venda, dos lotes 1 a 4 e da gravação, todos com a versão ' +
          'de 50% OFF, deixados prontos mesmo que nem todos sejam usados.',
        sistema: 'Checkout',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Checkout · MBA Carolina Caribé (T5)',
        descricao:
          'Links de checkout da T5, com os mesmos valores da T4, e conexão das listas ' +
          'ao checkout.',
        sistema: 'Checkout',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Checkout · MBA Fabiana Bertotti',
        descricao:
          'Checkout com as condições do MBA: à vista, cartão em 12 vezes e recorrência ' +
          'em cartão, PIX ou boleto (1 + 18 e 1 + 12 parcelas).',
        sistema: 'Checkout',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Correção da integração Routerfy ↔ N8N',
        descricao:
          'A falha atingiu a integração com o ActiveCampaign e as listas pararam de ' +
          'atualizar.',
        sistema: 'Routerfy · N8N',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Criação urgente da BU Edtech IPT',
        descricao:
          'Criação da BU e integração com todo o ecossistema em caráter de urgência, ' +
          'porque as vendas começavam no mesmo dia.',
        sistema: 'Ecossistema',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        dia: '10/11',
        titulo: 'Configuração de notebook UniFast para novo usuário',
        descricao: 'Atendimento presencial na terça-feira.',
        sistema: 'Equipamentos',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'E-mails da Edtech e acesso ao Campuzz módulo Dados',
        descricao:
          'Criação dos e-mails e liberação de acesso ao módulo Dados para Tadashi e Tagawa.',
        sistema: 'Campuzz · Dados',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Webhook do Campuzz módulo Dados nas BUs da Eduzz',
        descricao: 'Cadastro do webhook do módulo Dados em cada BU da Eduzz.',
        sistema: 'Campuzz · Eduzz',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Campus 1 · notas de alunos ausentes',
        descricao:
          'Alguns alunos tinham as provas marcadas como concluídas, mas sem nota registrada.',
        sistema: 'Campus 1',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Campus 1 · envio de documentação (RG)',
        descricao:
          'Alguns documentos enviados pelos alunos não apareciam para a secretaria avaliar.',
        sistema: 'Campus 1',
        responsavel: 'Rafael Pilon',
        status: 'resolvida',
      },
      {
        titulo: 'Acessos do n8n ao MongoDB · usuário exclusivo svc_n8n',
        descricao:
          'O Cluster0 do MongoDB Atlas chegou a 100% do limite de conexões. A tarefa ' +
          'mapeia os workflows do n8n que leem ou gravam no MongoDB, migra os acessos ' +
          'para o usuário exclusivo svc_n8n (appName unifast-n8n, privilégios mínimos), ' +
          'audita o ciclo de vida dos MongoClient nos Code nodes e compara as conexões ' +
          'antes e depois, considerando que Railway, Databricks e outros serviços também ' +
          'usam o cluster.',
        sistema: 'n8n · MongoDB',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
      {
        titulo: 'Disparo WhatsApp · últimas vagas do MBA em Incorporação',
        descricao:
          'Campanha para os leads interessados no Pré-MBA, divulgando as últimas vagas ' +
          'do MBA em Incorporação e Desenvolvimento Imobiliário, com resposta automática ' +
          'e encaminhamento dos interessados ao consultor Luccas.',
        sistema: 'WhatsApp',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
      {
        dia: '08/11',
        titulo: 'Disparo WhatsApp · compradores do Pré-MBA com Carolina Caribé',
        descricao:
          'Divulgação da abertura das matrículas da 5ª turma do MBA em Incorporação e ' +
          'Desenvolvimento Imobiliário, com condições especiais para ex-alunos e ' +
          'direcionamento aos consultores comerciais.',
        sistema: 'WhatsApp',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
      {
        titulo: 'Aprovação de convite e liberação de acesso na Meta',
        descricao:
          'Acompanhamento da aprovação do convite da Meta, para que as permissões ' +
          'necessárias aos recursos e às integrações fiquem disponíveis.',
        sistema: 'Meta',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
      {
        titulo: 'Vendas da Fabi Bertotti e correção do webhook no n8n',
        descricao:
          'Envio de todas as vendas por CSV para a página de lançamento feita pelo André ' +
          'e correção da integração por webhook no n8n, para que as novas vendas sejam ' +
          'recebidas e processadas automaticamente.',
        sistema: 'n8n · Webhook',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
      {
        titulo: 'Testes da API e-Notas para emissão de notas pelo FastPay',
        descricao:
          'Testes para estruturar a emissão de notas fiscais da equipe externa pelo ' +
          'FastPay, a pedido da Rebeca. Foi identificado um problema com a API Key; ' +
          'aguarda novas decisões e credenciais válidas.',
        sistema: 'e-Notas · FastPay',
        responsavel: 'Lucas Paifer',
        status: 'aguardando',
      },
      {
        titulo: 'Novo sistema de geração de certificados da Secretaria',
        descricao:
          'Conversas com a Secretaria para estruturar o sistema. Aguarda o modelo de ' +
          'certificado para definir requisitos, campos e funcionamento.',
        sistema: 'Secretaria',
        responsavel: 'Lucas Paifer',
        status: 'aguardando',
      },
      {
        titulo: 'Produtos da BU Tadashi e integração de compras com a DotLemon',
        descricao:
          'Criação dos códigos dos produtos das páginas de vendas e checkouts, cadastro ' +
          'no banco de dados e webhook de compra aprovada enviando as vendas à DotLemon.',
        sistema: 'Checkout · DotLemon',
        responsavel: 'Lucas Paifer',
        status: 'resolvida',
      },
    ],
  },
]
