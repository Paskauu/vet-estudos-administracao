# Epidemiologia no Vet Estudos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax for tracking.

**Goal:** Acrescentar a segunda disciplina ao site existente, preservando progresso e separação de todo o estudo.

**Architecture:** Catálogo por disciplina e contexto React, rotas explícitas, eventos locais compartilhados com projeções independentes e backup compatível. Novos módulos seguem o schema existente.

**Tech Stack:** React, Vite, JavaScript, CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-30-epidemiologia-design.md`.

## Global Constraints

- Usar somente os sete PDFs novos para autoria acadêmica; não abrir os PDFs de Administração.
- Não criar outro site nem mudar hospedagem/audiência.
- Preservar IDs, eventos, chave de armazenamento e rotas anteriores.
- Mínimo por módulo: 5 lições, 15 flashcards e 20 questões; referências físicas base 1.

## Review Focus

- Trocar disciplina durante sessão e recarregar deve permitir retomar apenas na área correta.
- Links antigos e links diretos novos devem identificar a disciplina correta.
- Importar backup antigo deve preservar progresso atual de ambas as disciplinas.
- Sessões entre disciplinas ou questões de módulos não selecionados devem ser recusadas antes de gravar.
- Nome longo e seletor no celular/tablet devem permanecer legíveis e acessíveis.

## Tarefas

- [x] 1. Testes RED para seleção de catálogo, projeção de eventos, rotas e backups; implementar helpers e contexto. Arquivos: `src/lib/courses.js`, `src/content/courses.js`, `src/content/index.js`, `src/hooks/useCourse.jsx`, `src/lib/storage.js`, `tests/courses.test.js`.
- [x] 2. Integrar contexto nas telas e no App; seletor e temas; manter fonte e sessão dentro da disciplina. Arquivos: `src/App.jsx`, `src/pages/*.jsx`, `src/styles.css`, `src/components/Backup.jsx`.
- [x] 3. Autoria paralela dos módulos e registros de leitura, separada por PDFs: aulas 01–02, 03/05, 06–08. Arquivos: `src/content/eNN.json`, `docs/research/epidemiologia-*.md`.
- [x] 4. Atualizar preparação/validação para subpastas, contagem por disciplina e compatibilidade dos PDFs antigos preparados. Executar testes, validador e build.
- [x] 5. Verificar fluxos em navegador, revisão independente e corrigir falhas relevantes. Atualizar documentação.
- [ ] 6. Publicar a atualização no mesmo GitHub Pages e verificar o resultado da execução e o site.

## Execução

Baseline: 18/18 testes passam antes das alterações. O checkout contém a reorganização de fontes feita pelo usuário; trabalhar nele preserva essa organização e os arquivos locais preparados. Não criar checkout que perca as fontes ainda não rastreadas. Implementação técnica pelo agente principal; autoria acadêmica por três agentes com arquivos independentes. O pedido atual autoriza acrescentar a matéria; não há decisão de produto pendente que justifique nova aprovação.

Verificação local final: 26/26 testes; 15 módulos/116 lições/318 blocos/309 cartões/344 questões/1332 referências/402 páginas. Epidemiologia: 7/64/175/176/176/652/231, respectivamente. Revisão técnica corrigiu colisão de identificadores de sessão com dois testes RED→GREEN; revisão acadêmica separou dois eventos animais cujo qualificativo espacial estava ambíguo. Nenhum outro achado material pendente. Build sem avisos; catálogos em arquivos separados por disciplina. Fluxos de leitura, revisão, simulado interrompido, resultado, troca e backup de 9 eventos conferidos em navegador; reimportação sem duplicação e Administração sem registros da outra matéria.
