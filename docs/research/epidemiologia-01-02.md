# Epidemiologia: leitura e limites dos módulos 01 e 02

Leitura realizada em 30/10/2026 exclusivamente nos dois PDFs locais da pasta `1.0 - Material para consulta/2.0 - Epidemiologia Veterinária e Saneamento Ambiental`. Não foram abertas referências, notícias, organizações ou endereços externos citados nos slides. Nenhum PDF da subpasta de Administração foi aberto para esta tarefa; `src/content/m01.json` foi consultado somente como modelo do formato de conteúdo, conforme a delegação.

## Fontes e método

| Módulo | Arquivo exato | Páginas físicas |
| --- | --- | ---: |
| e01 | Saúde Única - Aula 1pdf_261025_175411.pdf | 32 |
| e02 | Dinâmica do Processo Saúde Doença - Aula 2_261026_175304.pdf | 76 |

Os totais foram conferidos com `pypdf.PdfReader`. O texto de todas as páginas foi extraído por página, e as 108 páginas foram renderizadas localmente com `pypdfium2`, em apoio à leitura dos diagramas, notícias inseridas como imagem, logotipos, fotografias e anotações. Todas as páginas foram inspecionadas em pranchas de quatro páginas. Os intermediários ficam em `tmp/epidemiologia`, com textos, PNGs por página, pranchas JPG, scripts de preparação e o resultado da validação estrutural. Esses intermediários não são fontes adicionais de conteúdo.

As referências dos JSONs usam página física de base 1, com o título da seção ou uma descrição localizadora da figura/recorte quando o slide não tem um título textual próprio. O título localizador não pretende ser uma legenda original ausente. Todas as unidades de resumo, flashcards e questões têm referência. Enunciados e alternativas foram escritos para o site, sem copiar um banco externo de questões.

## Cobertura do módulo e01

| Páginas | Conteúdo coberto |
| --- | --- |
| 1-3 | Integração da saúde humana, animal e ambiental; diagrama One Health; surtos citados na introdução. |
| 4-8 | Etimologia, atribuição histórica do termo, definição de zoonose, transmissão natural direta/indireta e lista de doenças ou agentes. |
| 9 e 11-13 | Exemplos históricos do Deuteronômio e Código de Eshnunna; peste, Yersinia pestis, raiva, tuberculose e urbanização. |
| 14-18 | Sistemas de produção, EEB/príons e sequência histórica de H1N1, Ebola e coronavírus; peso da peste no recorte reproduzido. |
| 19-21 | Contato entre pessoas e animais; figura de fatores de zoonoses novas/novamente emergentes; desmatamento, lixo e circulação de animais. |
| 22-24 | Magnitude citada, saúde pública/animal/ocupacional, vulnerabilidade social e ilustrações de alagamento. |
| 25-27 | Recortes históricos de raiva, leishmaniose canina e mormo; nome explícito de Burkholderia mallei. |
| 28-31 | OIE conforme a identificação da fonte, OMS, OPAS, Codex/FAO, SVS e IDAF. |

Limites editoriais:

- A página 7 tem imagens marcadas com letras, sem uma legenda nominal inequívoca que identifique cada letra. O conteúdo não atribui nomes aos agentes por semelhança visual.
- A página 10 contém imagens de encéfalo e notas manuscritas. Não há título/legenda impressa suficiente para transformar a imagem em questão de diagnóstico ou completar o quadro clínico por inferência. Ela foi inspecionada e não recebeu uma questão independente nem referência de resumo.
- Anotações manuscritas parcialmente legíveis não foram usadas para construir associações novas que o texto impresso ou os diagramas não sustentem. Não foram introduzidos detalhes de tratamento, prognóstico, ciclo ou diagnóstico a partir de notas incompletas.
- A página 3 usa 2013-2016 para o surto de Ebola; a página 16 destaca 2014. O resumo conserva o intervalo e o recorte anual com suas referências, sem fabricar uma única data substituta.
- O material inclui recortes com afirmações geográficas e históricas generalizantes. O resumo retém os mecanismos discutidos de proximidade, criação, comércio e movimentação, sem apresentar uma característica cultural ou nacional como explicação universal de epidemias.
- Os números históricos da peste (p. 18), os 61% e dois terços (p. 22) e a estimativa de mais de 65 milhões (p. 23) são explicitamente apresentados como dados reproduzidos pelo PDF. Não foram atualizados nem tratados como risco individual, mortalidade atual ou contagem de 2026.
- Os recortes de notícias não foram abertos. Os eventos de 2017 são tratados como exemplos históricos, não como situação atual de casos nem norma sanitária vigente.
- Os logotipos institucionais foram lidos nas páginas 28-31. O conteúdo reconhece as identificações que aparecem na fonte; não adiciona nomes atuais, competências legais, organogramas ou atribuições que o PDF não explica.
- A página 32 é um encerramento, sem conteúdo novo de estudo.

## Cobertura do módulo e02

| Páginas | Conteúdo coberto |
| --- | --- |
| 2-4 | Tríade, exemplo da dengue e diagrama da história natural, incluindo períodos e horizonte clínico. |
| 5-9 | Apresentações da doença, definitivo/intermediário/paratênico/reservatório e tipos de transmissão. |
| 10-19 | Natureza dos agentes e as oito propriedades listadas: morfologia, infectividade, patogenicidade, virulência, imunogenicidade, variabilidade, resistência e persistência. |
| 20-23 | Hospedeiro, susceptibilidade e características próprias e variáveis. |
| 24-36 | Ambiente físico, biológico e socioeconômico; clima, água, relevo, solo, flora, fauna e influências humanas. |
| 37-45 | Cadeia, fonte de infecção, doentes, portadores e reservatórios. |
| 46-55 | Via de eliminação e todos os grupos de materiais/vias enumerados, com exemplos da fonte. |
| 56-64 | Meio de transmissão, contato direto/indireto, ar, alimentos, água e solo. |
| 65-70 | Vetores mecânicos/biológicos, figura de anemia infecciosa equina, hospedeiro intercalado e fômites. |
| 71-74 | Porta de entrada, mucosas, pele e associação ao meio de transmissão. |

Limites editoriais:

- A fonte é expositiva; não contém um protocolo completo de prevenção nem medidas de controle para cada doença. Não foram criadas recomendações, medidas sanitárias específicas ou complementações externas.
- Na p. 5, subclínica é definida como sem manifestação e sem evolução à fase clínica. Na p. 41, o texto sobre doente atípico aproxima a palavra “Subclínicas” dessa classificação. A diferença foi registrada também no resumo, sem criar uma questão que dependa de reconciliar as duas passagens.
- A p. 7 associa o hospedeiro intermediário à forma imatura e à reprodução assexuada. A p. 69 usa “intercalado ou intermediário” para um invertebrado que não participa ativamente da transmissão. Cada definição foi mantida em seu contexto da aula; não foi generalizada para todos os ciclos parasitários.
- As pp. 8 e 42 têm uma definição geral de reservatório; a p. 45 acrescenta que é vertebrado de espécie diferente da considerada. O resumo distingue a definição geral da especificação posterior e usa os exemplos escritos no material.
- A frase da p. 17 sobre resistência a “agentes microbianos” é pouco precisa e não apresenta mecanismos. O resumo usa a definição clara de adaptação do agente, sem substituir silenciosamente a frase por uma explicação externa de resistência antimicrobiana.
- A figura das pp. 30 e 69 foi inspecionada: o resumo retém ambiente aquático, caramujo, plantas e ingestão, sustentados visualmente. Não foram acrescentados períodos, hospedeiros alternativos ou tratamentos. O exemplo de Lymnaea/fasciolose aparece explicitamente no texto da p. 69.
- Os mapas, fotografias e ilustrações não foram transformados em números de ocorrência, identificação de espécies ou diagnóstico visual. Os exemplos de doenças e vias são listas da aula, sem sugerir que esgotam toda a cadeia ou todas as vias de cada enfermidade.
- Notas manuscritas marginais incluem associações e abreviações pouco claras. O conteúdo novo se apoia nas definições impressas e nos elementos gráficos legíveis; nenhuma nota incerta foi usada como fundamento de resposta correta.
- A p. 1 é a capa, a p. 75 é o encerramento com uma lista manuscrita de revisão e a p. 76 está em branco. Não há conceito novo nesses encerramentos que exija uma unidade adicional.

## Entrega e validação

| Módulo | Lições | Blocos | Flashcards | Questões | Referências | Distribuição de respostas 0/1/2/3 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| e01 | 8 | 24 | 24 | 24 | 93 | 6 / 6 / 6 / 6 |
| e02 | 14 | 43 | 44 | 44 | 178 | 11 / 11 / 11 / 11 |
| Total | 22 | 67 | 68 | 68 | 271 | 17 / 17 / 17 / 17 |

Arquivos de conteúdo: `src/content/e01.json` e `src/content/e02.json`. Metadados conferidos nos dois: `courseId: "epidemiologia"` e `category: "Saúde e ambiente"`, com ordem 1/2 e tópico 01/02.

Uma validação local específica desses dois JSONs confirmou: leitura JSON em UTF-8 sem caracteres de substituição; identidade e metadados; existência e nome exato do PDF; total físico de páginas; IDs únicos entre os dois módulos; mínimos de cobertura; presença de título, introdução, texto e referências; páginas dentro dos limites de base 1; quatro alternativas distintas por questão; gabaritos inteiros entre 0 e 3; explicação de cada resposta; distribuição perfeitamente balanceada dos gabaritos. Não foram alterados arquivos de implementação nem realizados commits. O validador integral do projeto e a integração visual são responsabilidade da etapa de integração coordenada pelo agente principal.
