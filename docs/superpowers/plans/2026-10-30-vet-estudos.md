# Plano de implementação — Vet Estudos

**Objetivo:** entregar site de estudo para oito módulos, com referências aos PDFs, revisão, questões e simulados, usando apenas progresso persistente no navegador e backup manual.

**Arquitetura:** frontend React/Vite, conteúdo estruturado por módulo e progresso baseado em eventos. `localStorage` guarda os eventos na origem e no perfil do navegador atuais. Exportação/importação JSON faz a transferência manual e mescla por ID. Não há login, backend ou sincronização automática.

**Tecnologias:** React 19, Vite 8, JavaScript, CSS próprio, lucide-react, `node:test` e verificação em navegador.

**Especificação:** `docs/superpowers/specs/2026-10-30-vet-estudos-design.md`.

**Correção de escopo em 30/10/2026:** o usuário cancelou expressamente o uso de Supabase e escolheu salvar os dados em cache. Este plano substitui as etapas anteriores de autenticação, banco remoto, fila e sincronização. Os itens abaixo são a lista de aceitação da entrega; evidência de execução deve ser registrada em `docs/VALIDACAO.md`.

## Restrições globais

- Conteúdo acadêmico exclusivamente dos oito PDFs, com página física e seção.
- Tela principal pensada para tablet 800 × 1280 e 1280 × 800, toque mínimo de 44 px; conferir também celular e desktop.
- Armazenamento local explicado em linguagem clara, com limites de origem e perfil do navegador.
- Nenhuma dependência de credenciais, conta da estudante ou serviço de dados.
- Não afirmar publicação, acesso restrito, sincronização ou funcionamento integral offline sem evidência correspondente.
- Repositório privado e acesso restrito à hospedagem são decisões separadas.

## Pontos de revisão

- Seleção vazia ou quantidade maior que o banco deve produzir erro claro ou limitar ao banco, sem duplicação silenciosa.
- Reimportar um backup deve preservar todos os eventos válidos sem duplicar IDs nem apagar o histórico existente.
- Backup inválido deve ser recusado antes de gravar, preservando os dados atuais.
- Falha de gravação deve ser visível; não apresentar como salva uma ação que falhou.
- Simulado interrompido deve ser retomável após recarga na mesma origem.
- Referência deve abrir o arquivo correto e uma página válida; figuras ausentes não devem ser reconstruídas sem evidência.
- O site deve explicar que exportação/importação entre aparelhos é manual e que limpar os dados do navegador pode remover o progresso.

### Tarefa 1: conteúdo auditável e estrutura

**Arquivos:** `package.json`, `vite.config.js`, `index.html`, `src/content/*.json`, `scripts/prepare-sources.mjs`, `scripts/validate-content.mjs`, `docs/research/*.md`.

**Interface de conteúdo:** módulo com `id`, `order`, `title`, `shortTitle`, `description`, `source:{filename,pages,topic}`, lições, blocos, flashcards e questões. Referências usam `{page,section}`; cada questão possui quatro alternativas, índice da resposta e explicação.

- [x] Conferir os oito módulos com IDs únicos, referências de 1 até a página final de cada PDF e quatro alternativas distintas por questão.
- [x] Conferir cobertura contra a leitura integral e os registros de pesquisa, sem fontes acadêmicas externas.
- [x] Conferir o inventário esperado de 52 lições, 143 blocos, 133 flashcards, 168 questões e 680 referências.
- [x] Preparar cópia determinística dos PDFs com nomes seguros para navegador.
- [x] Executar `npm run validate:content` e conferir zero erros.

### Tarefa 2: motor de estudo e persistência local

**Arquivos:** `src/lib/study.js`, `src/lib/events.js`, `src/lib/storage.js`, `src/hooks/useStudy.js`, `tests/*.test.js`.

**Interfaces:** `selectQuestions(questions,moduleIds,count,rng)`, `mergeEvents(...eventLists)`, `reduceProgress(events)`, `nextReview(rating,previous,now)`, exportação e importação do backup. Eventos `{id,type,itemId,payload,at}`; backup com formato, versão e disciplina explícitos.

- [x] Verificar seleção de um ou vários módulos, seleção vazia, nota e limite da quantidade disponível.
- [x] Verificar mescla idempotente de eventos, leituras, revisão e reconstrução de simulado retomável.
- [x] Verificar persistência em `localStorage` e tratamento de falhas de leitura/gravação.
- [x] Verificar exportação/importação compatível, mescla sem perda, reimportação e rejeição de backup inválido sem alteração dos dados.
- [x] Remover dependências, configurações e arquivos de integração remota da entrega final.

### Tarefa 3: experiência completa de estudo

**Arquivos:** `src/App.jsx`, `src/components/*.jsx`, `src/pages/*.jsx`, `src/styles.css`, `public/icon.svg`.

**Interfaces:** aplicação consome módulos e estado local; referências abrem PDF com `#page=` e mostram a página escrita; atividades registram eventos com UUID por operação.

- [x] Implementar navegação, resumo progressivo, busca, leitura concluída e biblioteca de PDFs.
- [x] Implementar flashcards com filtros, virar, avaliação e próxima revisão.
- [x] Implementar prática/simulado, seleção múltipla de módulos, retomada, correção e revisão de erros.
- [x] Implementar progresso real e comandos de exportação/importação manual com instruções sobre persistência neste navegador.
- [x] Executar `npm test`, `npm run build` e fluxos em navegador nos tamanhos definidos; corrigir problemas materiais e repetir os testes afetados.

### Tarefa 4: documentação, configuração e revisão de entrega

**Arquivos:** `README.md`, `docs/PUBLICAR.md`, `vercel.json`, `.github/workflows/checks.yml`, `docs/VALIDACAO.md`.

- [x] Documentar execução local com `npm install`, preparação com `npm run build`, uso com `npm run dev` e prévia da compilação.
- [x] Documentar limites por origem/perfil, limpeza de dados, backups regulares e transferência manual entre aparelhos ou domínios.
- [x] Documentar hospedagem partindo de repositório privado, audiência escolhida e proteção de todos os PDFs quando o site precisar ser restrito.
- [x] Preparar configuração Vercel e verificações Node.js 24 com `npm ci`, `npm test` e `npm run build`, sem fluxo de publicação automático.
- [x] Fazer revisão independente de conteúdo e código, corrigindo problemas materiais com verificação adequada.
- [x] Rodar validação, testes, compilação e QA final; registrar evidência e limites, distinguindo a simulação de tamanho de tela do teste no tablet físico.
- [x] Entregar o projeto e a prévia local. Só registrar repositório remoto ou URL final depois de sua criação e conferência reais.

### Tarefa 5: publicação quando a audiência e hospedagem estiverem definidas

- [ ] Criar ou usar o repositório privado com o nome final escolhido e enviar o projeto sem backups pessoais ou credenciais.
- [ ] Escolher a hospedagem e definir acesso aberto por endereço ou restrito na própria hospedagem antes de ativar deploys.
- [ ] Conferir no endereço real o site, a persistência, os oito PDFs e, se exigida, a proteção de página, prévias e URLs diretas dos materiais.
- [ ] Orientar exportação na origem antiga e importação no endereço final para transportar o progresso manualmente.
