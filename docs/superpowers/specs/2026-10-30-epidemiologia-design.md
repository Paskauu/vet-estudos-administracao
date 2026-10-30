# Segunda disciplina no Vet Estudos

## Escopo solicitado

Acrescentar Epidemiologia Veterinária e Saneamento Ambiental ao site atual. Usar exclusivamente os sete PDFs da subpasta `1.0 - Material para consulta/2.0 - Epidemiologia Veterinária e Saneamento Ambiental`. Não reler os PDFs de Administração. Reaplicar as orientações da primeira etapa documentadas neste projeto: unidades curtas, referências à página física, flashcards, questões comentadas, simulados, acessibilidade para tablet, progresso local e backup manual.

## Experiência

Seletor de duas disciplinas sempre visível no conteúdo, inclusive no celular. Administração conserva a paleta verde; Epidemiologia usa azul-petróleo. Nome da disciplina aparece na navegação, no conteúdo e na biblioteca de fontes. Módulos, buscas, revisões, seleção de questões, retomadas e indicadores ficam restritos à disciplina selecionada. Trocar a disciplina volta ao início da outra sem apagar nem concluir atividades em andamento.

Os arquivos recebidos são das aulas 01, 02, 03, 05, 06, 07 e 08. Preservar essa numeração e informar que não foi fornecido PDF da aula 04. Não fabricar um módulo ausente nem completar saneamento ambiental com fontes externas.

## Implementação

Manter React/Vite, estrutura atual e hospedagem GitHub Pages existente. Catálogo identifica a disciplina de cada módulo, sem alterar os JSON acadêmicos antigos. Contexto fornece apenas o catálogo da disciplina ativa às telas. Rotas com prefixo de disciplina permitem recarga e links diretos; rotas antigas continuam válidas e inferem a disciplina por módulo/sessão quando necessário.

Manter a chave local e eventos já existentes. Calcular a visão da disciplina por IDs de conteúdo e sessão. Exportação única inclui ambas as disciplinas, aceita backups antigos e rejeita sessões que misturem disciplinas. O progresso anterior permanece legível sem migração destrutiva.

Novos JSON `e01/e02/e03/e05/e06/e07/e08`; fontes estáveis `fontes/eNN.pdf`. Preparação resolve as novas subpastas e usa os PDFs antigos já preparados sem reler a outra pasta. Validador confere identidade, cobertura, páginas e referências. Preparação em checkout limpo pode copiar fontes antigas do novo caminho, sem interpretar seu conteúdo.

## Alternativas e decisões

Um site separado contraria a solicitação. Um catálogo único sem filtro permitiria misturar disciplinas. A solução escolhida usa o mesmo site com dois contextos completos de estudo e armazenamento compatível. Esta é uma decisão de implementação dentro do pedido atual, sem alterar serviços ou audiência.

## Verificação

Testar isolamento dos eventos, seleção de questões, rotas antigas/novas, backup antigo/novo e recusa atômica de sessões entre disciplinas. Validar e compilar todo o catálogo. Conferir navegação, leitura, revisão, sessão interrompida, biblioteca e seletor em navegador e em larguras representativas de tablet/celular. Registrar limites dos PDFs e resultados observados.
