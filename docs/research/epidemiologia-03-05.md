# Registro de leitura: Epidemiologia, aulas 03 e 05

Data: 30/10/2026. Conteúdo acadêmico produzido exclusivamente a partir dos dois PDFs abaixo, na subpasta `1.0 - Material para consulta/2.0 - Epidemiologia Veterinária e Saneamento Ambiental`. Não foram consultadas fontes externas nem os PDFs de Administração.

| Módulo | Arquivo fornecido | Páginas físicas | Páginas acadêmicas referenciadas |
| --- | --- | ---: | --- |
| e03 | Ciclo de Vigilância em Saúde - Aula 3_261027_080344.pdf | 30 | 2–28 |
| e05 | Epidemiologia Descritiva - Aula 5_261027_095836.pdf | 29 | 2–27 |

A contagem inclui capa, agradecimento e página final vazia. As referências usam página física de base 1. `section` preserva o título visível ou identifica descritivamente o conteúdo da figura e a continuação de um tema nas páginas sem título próprio. Os nomes de arquivo em `source.filename` foram preservados exatamente.

## Método de leitura

O texto de todas as páginas foi extraído com `pypdf` do ambiente Python fornecido. Páginas com gráficos, diagramas, tabelas e pouco texto extraível foram renderizadas com `pdfplumber` a 120 dpi e inspecionadas visualmente. Foram revisadas as páginas 2, 3, 8, 10, 13–19 e 30 de e03 e as páginas 8, 11, 15, 16, 20, 24 e 29 de e05. Os detalhes do fluxograma e das listas animais foram conferidos também em imagens individuais.

Intermediários de extração, renderização, geração e validação ficaram em `tmp/epidemiologia`. Nenhum PDF foi alterado. O schema foi consultado em `src/content/m01.json`; o arquivo é apenas referência estrutural, sem reutilização de seu conteúdo acadêmico.

## Cobertura de e03

As oito lições abrangem: definição e áreas da vigilância em saúde; epidemiologia e definição de vigilância epidemiológica; antecedentes históricos; sequência do ciclo e fluxograma de serviços; dado, informação e conhecimento; vigilância ativa e passiva; fontes de dados; comunicação de suspeitas e confirmação; periodicidade e destinatários nos quadros de 2017; lista de doenças e eventos de vigilância animal; passos da investigação; endemia, epidemia/epizootia, surto e pandemia/panzootia; análise e comunicação; decisão, monitoramento e avaliação.

As páginas 14–17 apresentam uma tabela extensa como imagem. A síntese explica sua organização e inclui o contraste entre casos e óbitos por dengue e exemplos de eventos. Não reproduz integralmente cada linha da tabela. O quadro animal da página 18 foi contemplado em suas duas partes, incluindo doenças, arboviroses e condições dos eventos em animais. A página 19 é um exemplo de ficha de notificação de violência; foi descrita como instrumento de registro, sem criar instruções de preenchimento.

## Cobertura de e05

As oito lições abrangem: frequência e distribuição; perguntas indivíduo/tempo/lugar; dados primários e secundários; utilidades; características humanas e animais; condições geográficas; mapa de Snow; caso autóctone e importado; série histórica; formas de ocorrência; sazonalidade, fatores e limiar epidêmico; ciclos e reposição de suscetíveis; exemplos de febre aftosa, raiva em raposas e varíola; tendência secular; epidemia e endemia; abrangência de pandemia e surto; fonte comum e propagada.

Os gráficos e esquemas de dengue, Ebola e mortalidade por câncer foram identificados e utilizados como exemplos do tema em que aparecem, sem retirar valores numéricos aproximados de curvas ou criar novas estatísticas.

## Limites e divergências preservados

- As leis e portarias de e03 são apresentadas como definições e quadros reproduzidos no material. Não houve checagem da legislação vigente, por determinação de usar apenas os PDFs. Os exemplos de prazo e listas não foram convertidos em orientação normativa atual.
- A aula e03 cita incidência, prevalência, letalidade e mortalidade na página 25, mas não fornece fórmulas. O módulo apenas identifica essas medidas; não acrescenta cálculos ou definições externas. Nenhum dos dois PDFs desenvolve fórmulas explícitas para o conteúdo tratado.
- Em e05, a página 11 inclui a forma epidêmica entre doenças com “distribuição regular”, enquanto a página 25 intitula a discussão “Variações irregulares (epidêmicas)”. O módulo retém os nomes esporádica, endêmica/enzoótica e epidêmica/epizoótica, mas não cobra a etiqueta regular/irregular conflitante. A definição de epidemia segue o desenvolvimento explícito da página 25.
- A forma esporádica é apenas enumerada em e05, sem definição desenvolvida. Não foi acrescentada definição por conhecimento externo.
- O limiar epidêmico é mencionado na página 17 de e05, sem método de cálculo. O módulo cobra sua utilização na comparação, sem criar uma fórmula.
- O exemplo de raiva em raposas na “Grã-Bretanha”, com ciclo de quatro anos, foi mantido como exemplo apresentado pela aula, sem confirmação ou correção geográfica externa.
- A página 24 de e05 tem o título sobre aumento de tumores, mas o gráfico mostra número de mortes por câncer e doença cardíaca. A síntese identifica o eixo como mortes, sem transformar a figura em taxa de incidência de tumores.
- A curva com picos progressivamente maiores separados por um período de incubação é expressamente atribuída à descrição da aula, sem apresentá-la como regra universal de todos os surtos propagados.
- Anotações manuscritas pequenas ou parcialmente legíveis não foram usadas como base de questões. As figuras impressas legíveis foram consideradas. As referências bibliográficas citadas nas imagens não foram abertas.

## Verificação dos arquivos produzidos

| Arquivo | Lições | Blocos | Flashcards | Questões | Referências |
| --- | ---: | ---: | ---: | ---: | ---: |
| `src/content/e03.json` | 8 | 23 | 24 | 24 | 81 |
| `src/content/e05.json` | 8 | 21 | 24 | 24 | 84 |
| Total | 16 | 44 | 48 | 48 | 165 |

Cada questão tem quatro alternativas distintas, uma resposta válida e uma explicação. Em cada módulo, os índices corretos 0, 1, 2 e 3 aparecem seis vezes cada. Todos os blocos, flashcards e questões têm referências não vazias. Todas as páginas acadêmicas dos dois PDFs aparecem em ao menos uma referência; capas, agradecimentos e páginas vazias não foram transformados em conteúdo.

A validação local `tmp/epidemiologia/validate_e03_e05.py` foi executada com êxito. Ela reabre os JSONs, confere os metadados de disciplina, tópicos e ordem, a contagem real de páginas dos PDFs, os mínimos de cobertura, IDs únicos, integridade dos itens, referências dentro dos limites, quatro alternativas distintas, índice correto e equilíbrio das respostas. A verdade dos conteúdos e dos rótulos de seção foi revisada contra a extração e as páginas renderizadas; a validação estrutural isolada não comprova fidelidade acadêmica.

Não foram alterados implementação, scripts de produção, dados de progresso ou outros módulos por esta tarefa de conteúdo. Não foram feitos commits.
