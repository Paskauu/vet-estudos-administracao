# Vet Estudos — Administração e Aspectos Legais

## Objetivo e público

Ambiente de estudo para a namorada do solicitante, aluna de Medicina Veterinária. A disciplina é Administração e Aspectos Legais. Este projeto e seu conteúdo não representam conhecimentos ou preferências acadêmicas do solicitante.

## Decisão vigente de armazenamento

Em 30/10/2026, o solicitante corrigiu a direção inicial: “Esqueça o desenvolvimento utilizando o Supabase, toda a base de dados pode ser salva em cache”. A proposta anterior de autenticação e sincronização remota foi substituída por armazenamento persistente no navegador. Essa correção rege a implementação e a entrega.

O produto não exige cadastro, conta, backend ou banco remoto. Usa `localStorage` para progresso e oferece exportação/importação manual de backup JSON. Não há sincronização automática entre dispositivos. A persistência pertence ao perfil do navegador e à origem do endereço; limpar dados do site pode apagá-la. Guardar o progresso localmente não implica funcionamento integral offline.

## Requisitos

- Usar exclusivamente os oito PDFs em `1.0 - Material para consulta` para conteúdo acadêmico; não abrir as referências externas indicadas nos PDFs.
- Oito módulos na ordem dos tópicos 01–08, total de 171 páginas físicas. Os materiais são apostilas, sem numeração de slides consistente. Referências devem informar arquivo, seção e página física de base 1.
- Resumos em unidades curtas, com conceitos, comparações e sequência de etapas, referências em cada unidade e acesso ao PDF na página citada.
- Flashcards com frente, verso, referência e autoavaliação para repetição espaçada simples.
- Questões de quatro alternativas, feedback explicativo, referência e revisão dos erros. Simulado com seleção de um ou vários módulos, quantidade e resultado por módulo.
- Persistir leituras, respostas, revisões e simulados no navegador. Permitir retomar um simulado após recarga na mesma origem.
- Exportar progresso em JSON e importar por mescla de registros, sem apagar o histórico existente nem duplicar o mesmo identificador. Validar formato, versão, disciplina e itens do backup.
- Informar no produto que o progresso fica neste navegador. Oferecer orientação para backup e transferência manual, sem prometer sincronização.
- Primeiro tablet: Galaxy Tab S6 Lite, usando 800 × 1280 e 1280 × 800 CSS px representativos para a verificação, além de 360 px e desktop. Elementos de toque de pelo menos 44 px, sem dependência de hover.
- Interface calma, progressiva: uma atividade por vez, navegação clara, contraste legível, suporte a teclado e redução de animação.

## Estrutura e decisões de implementação

React + Vite, JavaScript, CSS próprio e ícones lucide. Paleta verde floresta, sálvia, creme e acentos em terracota. Nome provisório Vet Estudos, símbolo vetorial simples de folha/livro/pata. Sem imagens decorativas pesadas ou fontes externas obrigatórias.

Quatro áreas principais: Início/Módulos, Flashcards, Praticar e Progresso. Biblioteca de fontes acessível pela navegação. A tela de resumo mostra tópicos dobráveis e próximo passo de revisão. Questões são construídas a partir de banco autoral revisado, não geradas com IA em tempo de uso.

Fonte de verdade do conteúdo: JSON por módulo, com resumos, flashcards e questões, cada qual com referências estruturadas. Validação automática de IDs, limites de páginas, alternativas e cobertura. Lacunas gráficas e divergências internas dos PDFs são registradas, sem preenchimento por conhecimento externo. Direito é apresentado como conteúdo do material fornecido.

Inventário de conteúdo preparado: oito módulos, 52 lições, 143 blocos de resumo, 133 flashcards, 168 questões e 680 referências estruturadas sobre 171 páginas físicas. A contagem precisa continuar sendo conferida pelo validador ao alterar os arquivos.

Dados de progresso são eventos com UUID, tipo, item, payload e horário. A mescla por ID elimina reimportações duplicadas, e o reducer reconstrói a visão local. Sessões de simulado e respostas têm identificadores próprios. A exportação inclui formato, versão, disciplina, data e eventos. O backup transporta progresso; conteúdo e PDFs acompanham o site.

## Alternativas e escolha final

1. **React estático com progresso no navegador: escolhida após a correção do solicitante.** Operação sem serviço de dados, com backup e transferência manual.
2. Banco remoto e autenticação: descartados para esta entrega. Não há configuração, credenciais ou serviço a ativar.
3. Servidor próprio: descartado por adicionar operação de serviço e armazenamento que não fazem parte da decisão vigente.

## Publicação e limites verificáveis

O repositório é `Paskauu/vet-estudos-administracao`. Em 30/10/2026, após a entrega inicial em repositório privado, o usuário tornou o repositório público e escolheu expressamente a hospedagem pelo GitHub Pages. Essa é a decisão vigente de publicação.

O código, o site e os oito PDFs serão acessíveis publicamente conforme a escolha atual. O projeto não oferece barreira de acesso dentro da aplicação.

A publicação usa `.github/workflows/pages.yml`: testa e compila com Node.js 24 e `VITE_BASE_PATH=/vet-estudos-administracao/`, envia `dist` e publica pelo fluxo oficial do Pages. O endereço configurado é `https://paskauu.github.io/vet-estudos-administracao/`. Novos envios em `main` publicam automaticamente, e há execução manual. O fluxo `checks.yml` continua disponível para verificação sem publicação. A URL só deve ser apresentada como funcionando depois da confirmação do deploy e da conferência do site.

Os endereços local, por IP, de prévia e de produção têm armazenamentos separados. A migração de progresso entre eles usa exportação/importação manual. Não há promessa de funcionamento integral offline; a página e os PDFs precisam continuar acessíveis.

## Verificação

Testes de seleção/avaliação de questões, mescla/redução de eventos, progresso, agendamento e backup. Validação de conteúdo e fontes. Compilação de produção. Fluxos de estudo, flashcards, simulado interrompido e recarga local em navegador, retrato/paisagem e celular. Verificar que importação inválida é recusada sem alterar os dados e que reimportação não duplica registros.

Distinguir testes locais de uso real no Galaxy Tab S6 Lite e de acesso em hospedagem. Registrar execução e limites em `docs/VALIDACAO.md`; a configuração de entrega não comprova publicação nem proteção ativa.
