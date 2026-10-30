# Navegação simples dos flashcards — plano

**Objetivo:** substituir a avaliação por navegação bidirecional, preservando o histórico e os demais recursos.

**Arquitetura:** manter eventos `review`, aceitando explicitamente revisões sem nota e continuando a validar o formato antigo. A resposta revelada alimenta o progresso; a posição no baralho controla somente a navegação.

**Tecnologias:** React, Vite, testes nativos do Node.js.

**Especificação:** `docs/superpowers/specs/2026-10-30-flashcards-navegacao-design.md`.

## Restrições e revisão

Preservar conteúdo, identidade dos cartões, dados existentes, backups e separação entre disciplinas. Conferir limites do baralho, retorno sem duplicar revisões, cartões pulados, seleção vazia e falha ao salvar.

- [x] Criar e executar testes de regressão para novas revisões, compatibilidade e isolamento.
- [x] Alterar validação, tela, ajuda, estilos e documentação; remover agendamento sem uso.
- [x] Executar testes e compilação; conferir o fluxo no navegador e solicitar revisão independente.

## Verificação

Os quatro testes novos falharam antes da alteração da validação e passaram depois. Suíte final: 29/29 testes; compilação e validação do catálogo concluídas. O teste de backup misto inclui avaliação antiga sem `moduleId`, armazenamento no documento legado e nova revisão em chave por evento.

No navegador, uma rodada de 16 cartões resultou em uma revisão após repetir a revelação do primeiro e pular os demais. Retornar do resumo, revelar o último e avançar atualizou o resumo para duas revisões. Os 14 restantes foram revisados em outra rodada; a seleção passou a zero pendências e o painel manteve 16/133 após recarregar. Epidemiologia permaneceu em 0/176 e registrou sua primeira revisão separadamente. Exportação e reimportação conservaram os 17 registros do teste.

Seleção vazia, ajuda atualizada e navegação nos dois lados conferidas. Em larguras de 390 e 800 pixels, não houve excesso de largura e os dois botões mediram 48 pixels de altura. Nenhum erro de console observado. Revisão independente sem achados acionáveis; `git diff --check` sem problemas.

Alterações locais verificadas e `dist` regenerado. A publicação foi solicitada em seguida pelo usuário e seguirá o fluxo existente do GitHub Pages, por envio para `main`, sem alterar a hospedagem ou seu público.
