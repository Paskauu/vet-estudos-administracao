# Navegação simples dos flashcards

Pedido: retirar a autoavaliação “Como foi lembrar?” e usar botões simples de voltar e avançar, revisando suas dependências.

- Manter o visual, os módulos, o embaralhamento e as referências existentes.
- Mostrar Voltar e Avançar nos dois lados. Desabilitar Voltar no primeiro cartão; Avançar no último abre o resumo. Permitir retornar ao último cartão pelo resumo. Ao mudar de cartão, mostrar a pergunta.
- Registrar uma revisão sem nota ao revelar a resposta, uma vez por cartão na rodada. Navegar sem revelar não registra revisão.
- Substituir o filtro de vencimento por Não revisados / Todos os cartões e o resumo de dificuldade por quantidades efetivas de respostas vistas e não vistas.
- Aceitar explicitamente o novo payload de revisão `{moduleId}`, sem campos de avaliação ou agendamento. Preservar validação e leitura dos registros antigos, o mapa de cartões únicos revisados, a chave de armazenamento e o formato de backup.
- Ajustar ajuda, documentação e estilos; remover o cálculo de agendamento sem uso.

A decisão de usar o mesmo evento `review` reduz mudanças no armazenamento, nos filtros por disciplina e na importação. Apenas ocultar os botões deixaria filtros e estatísticas dependentes de notas que já não existem; criar outro tipo de evento acrescentaria dependências desnecessárias.

Verificação: regressões de persistência, backups antigos/novos, validação de dados incompletos, isolamento entre disciplinas, navegação e contagem no navegador, testes do projeto e compilação.
