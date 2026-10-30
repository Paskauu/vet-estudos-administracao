# Leitura e limites — Epidemiologia, aulas 6 a 8

Data da preparação: 30/10/2026. Escopo: conteúdo acadêmico dos três PDFs abaixo, fornecidos na pasta `1.0 - Material para consulta/2.0 - Epidemiologia Veterinária e Saneamento Ambiental`. Nenhuma fonte externa, link bibliográfico, referência da subpasta de Administração ou material suplementar foi aberto para completar o conteúdo. `src/content/m01.json` foi usado exclusivamente como referência do formato de dados solicitado.

## Fontes e método

| Módulo | Arquivo exato | Páginas físicas |
| --- | --- | ---: |
| e06 | Estudos Epidemiológicos - Aula 6_261027_180626.pdf | 27 |
| e07 | Doenças Transmitidas por Alimentos - Aula 7_261027_182629.pdf | 14 |
| e08 | Investigação de Surtos - Aula 8_261027_182815.pdf | 23 |

As páginas foram contadas diretamente dos PDFs por `pypdf`, com inventário complementar por `pdfplumber`. A paginação das referências é física, de base 1; não é uma numeração de slides. Os textos extraídos foram lidos integralmente. As páginas com fórmulas, tabelas, gráficos, esquemas e anotações relevantes foram renderizadas com `pypdfium2` e inspecionadas visualmente. O arquivo de trabalho e as imagens estão em `tmp/epidemiologia`.

Revisão visual principal:

- e06: páginas 9, 11–16, 18–20 e 23; conferência adicional de imagens/anotações nas páginas 2, 3, 6, 8, 14, 21, 24 e 25. A página 27 é visualmente vazia. A página 26 é encerramento.
- e07: páginas 3–6, que são integralmente gráficos ou quadro em imagem; conferência das páginas 7, 9, 10 e 12, inclusive anotações. A página 14 é visualmente vazia. A página 13 é encerramento.
- e08: páginas 10, 11, 15–19; conferência das páginas 2, 3, 5–7, 9, 13, 14, 20 e 22. A página 23 é encerramento.

Os textos autorais usam somente o que essas fontes permitem sustentar. Questões numéricas novas, quando presentes, são exercícios de aplicação das fórmulas da aula e são explicitamente identificadas como exercícios autorais. Não há atualização clínica, normativa ou epidemiológica por fontes externas.

## Cobertura de e06

- Páginas 2–4: finalidade dos estudos epidemiológicos, variáveis e investigação de hipóteses.
- Páginas 5–8: estudos de casos e sua ausência de controles, laboratório e controles rigorosos, população, observação e intervenção, classificação temporal dos observacionais.
- Páginas 10–12: seguimento de coorte, grupos inicialmente sem doença, expostos/não expostos, tabela `a`, `b`, `c`, `d`, proporções `a/(a+b)` e `c/(c+d)`.
- Páginas 13–15: `RR = [a/(a+b)] / [c/(c+d)]`; `RA = a/(a+b) − c/(c+d)`; sentido de razão/diferença e suposição de ação equivalente dos outros fatores na interpretação do RA.
- Página 16: números do exemplo de tabagismo e câncer de pulmão, base de 10.000 e período de 10 anos, com indicação dos arredondamentos e divergência do total.
- Páginas 17–20: casos-controles, sentido retrospectivo, incidência não determinável segundo o material, `OR = (a×d)/(b×c)`, exemplo dos contraceptivos e trombose.
- Páginas 21–23: seccional/transversal/prevalência; razão e diferença de prevalências; exemplo de migração e doença mental.
- Páginas 24–25: grupo experimental/controle, intervenção e análise com as fórmulas das coortes.

### Divergências e limites de e06

1. Na página 16, 72/20.037 e 9/26.324 são convertidos no slide em 36 e 3 por 10.000. O `RR = 12` é a divisão dessas duas taxas já arredondadas. O quociente das proporções brutas antes de arredondamento não é exatamente 12. O conteúdo apresenta o resultado impresso como tal, sem reivindicar exatidão do recálculo bruto.
2. A mesma tabela imprime total geral de 46.371, mas 20.037 + 26.324 = 46.361. Não foi alterada a fonte; a diferença está sinalizada na lição.
3. Nas páginas 19–20, o PDF usa `OR ≈ RR`; a conta do exemplo é OR, enquanto a interpretação da página 20 muda o rótulo para RR. O conteúdo conserva a medida efetivamente calculada e identifica a mudança, sem ensinar uma equivalência universal nem acrescentar condições de aproximação que a aula não explica.
4. Nas páginas 22–23, o texto e o exemplo usam a terminologia de RR/RA para equivalentes em estudos seccionais. As lições distinguem razão e diferença de **prevalências**, que é a medida de ocorrência indicada no próprio PDF. `6% − 3%` foi explicado como 3 pontos percentuais.
5. O desenho experimental não detalha sorteio, cegamento ou procedimentos de execução. Esses assuntos não foram completados.

## Cobertura de e07

- Página 2: ingestão de alimento/água contaminados, diversidade de manifestações, toxinas, substâncias tóxicas e agentes infecciosos.
- Página 3: leitura da série histórica brasileira 2000–2017 e dos totais impressos de surtos, expostos, doentes, óbitos e letalidade.
- Página 4: distribuição por locais, incluindo proporções e o rótulo repetido de instituições.
- Página 5: categorias dos alimentos incriminados, proporções e limite da elevada categoria “ignorado”. Os rótulos menores também foram registrados no bloco de resumo, sem retirar categorias como “pessoa a pessoa”, que estão no próprio gráfico.
- Página 6: os dez rótulos de agentes e suas proporções, incluindo “coliformes”, reproduzido como rótulo do gráfico.
- Páginas 7–8: fatores demográficos, urbanização, escala, controle da qualidade, consumo em vias públicas, deslocamento, grupos de maior risco, incubação e predominância bacteriana.
- Página 9: listas de exemplos de infecção, intoxicação e toxinfecção. A questão avalia as listas impressas, sem impor uma reconstrução externa dos mecanismos.
- Página 10: proliferação/sobrevivência, higiene, frio/calor inadequados e grandes quantidades.
- Páginas 11–12: organização municipal e divisão das atribuições entre Vigilância Epidemiológica, Sanitária, Ambiental, Assistência à Saúde e Laboratório de Saúde Pública; menção condicional a IDAF/MAPA.

### Divergências e limites de e07

1. Os dados dos gráficos são de **2000–2017**, conforme os títulos impressos. Não são números atuais. A observação “dados sujeitos a atualização” aparece no gráfico da página 6. O total impresso da página 3 é 12.619 surtos, 2.371.438 expostos, 238.909 doentes, 183 óbitos e letalidade 0,08%.
2. O gráfico da página 4 repete “Outras instituições (alojamento; trabalho)” nas categorias de 10,8% e 0,4%. Elas foram distinguidas como rótulo repetido, sem fusão ou suposição sobre a categoria pretendida.
3. O gráfico da página 5 inclui rótulos de qualidade do registro (“ignorado”, “inconclusivo”, “inconsistente”) e “pessoa a pessoa” ao lado dos alimentos. Esses rótulos foram apresentados como categorias históricas da figura, sem reclassificação externa.
4. A página 8 registra variação de incubação de “hora (botulismo)” a meses (listeriose). A página 15 da aula 8 posiciona `Clostridium botulinum` em 12–72 h para sinais neurológicos. Essa diferença entre a frase genérica e o quadro foi mantida como limite dos materiais. Não foi substituída por informação clínica externa.
5. Na página 9, as anotações manuscritas misturam referências a invasão tecidual, ingestão de toxina e proliferação no alimento. A redação manuscrita não sustenta definições inequívocas para os três mecanismos. A versão registra esse limite, preserva as listas impressas e não transforma as anotações em definição geral.
6. A página 10 não fornece valores de temperatura ou tempo de conservação. Nenhum limite numérico foi acrescentado.

## Cobertura de e08

- Páginas 2–4: definição de surto de DTA e exceções graves de caso único, motivos da investigação e articulação entre áreas.
- Páginas 5–7: roteiro de dez passos, confirmação da ocorrência e do diagnóstico, conferência da notificação e orientação para não esperar o laboratório para iniciar.
- Páginas 8–11: definição e contagem dos casos, categorias suspeito/provável/confirmado e quatro componentes; descrição por tempo, lugar e pessoa; curvas e mapa ilustrativos.
- Páginas 12–14: delimitação da população em risco, construção de hipóteses, distinção de tarefas Epidemiológica/Sanitária, mediana da incubação e percentuais dos sintomas.
- Página 15: quadro em imagem de agentes, manifestações e faixas de incubação, abrangendo vias digestivas superiores e inferiores, sinais neurológicos, sistêmicos, respiratórios e faríngeos.
- Páginas 16–18: consumo/não consumo e doentes/sadios, denominadores, leitura de TA1/TA2, razão das taxas e todos os oito alimentos do quadro preenchido.
- Páginas 19–22: cadeia produtiva e perigos químicos/físicos/biológicos, refinamento de hipóteses, interdição/recolhimento e alteração de procedimentos, comunicação a autoridades e envolvidos.

### Divergências e limites de e08

1. As páginas 6–7 sobrepõem atividades de confirmação do diagnóstico no primeiro e no segundo passos. A lição identifica a retomada, sem tratar a duplicação como passos distintos adicionais.
2. A definição da página 2 usa a expressão “síndrome hemolítica renal por E. coli O157”. A versão segue a terminologia fornecida; não foi feita normalização clínica por fonte externa.
3. As figuras da página 10 são apresentadas sob “Fonte comum x fonte propagada”. O conteúdo reconhece seu papel na descrição temporal, mas não inventa regras diagnósticas de formato nem reconstrói casos individuais a partir das barras. A página 11 é um mapa ilustrativo, sem base suficiente para deduzir endereços ou agentes.
4. O quadro de agentes da página 15 é uma imagem. Foi ampliado para leitura; sua segunda linha de fungos na faixa neurológica de menos de uma hora aparece como “musanol”. A versão preserva essa grafia com identificação explícita de que pertence ao quadro. Não a substitui por uma substância inferida.
5. Os intervalos da página 15 não cobrem de modo contínuo todos os tempos para cada grupo de sintomas. As lacunas não foram preenchidas. O quadro foi tratado como apoio comparativo, sem converter combinações de sintomas/tempo em diagnóstico confirmado.
6. O alimento “strogonoff” é grafado “Strogonoff” no quadro. A versão usa esse nome do exemplo e mantém 66,6%, 50,0% e RR 1,33 como valores impressos. São resultados arredondados, não valores exatos das frações.
7. No refrigerante, as páginas 16 e 18 registram 7 doentes e 4 sadios entre consumidores, total 11. Isso produz cerca de 63,6%, enquanto a TA1 impressa é 63,3%. A tabela também usa 55,5% para 5/9 entre não consumidores; há apresentação de casas decimais sem regra uniforme. A versão mostra os valores impressos e sinaliza a diferença de 7/11, sem modificar o PDF.
8. TA1, TA2 e RR foram expressos em texto a partir dos cabeçalhos, contagens e resultados do próprio quadro: doentes/total do grupo × 100 e RR = TA1/TA2. O PDF não oferece uma equação isolada adicional nessas páginas; a lição identifica isso como leitura aritmética do quadro.

## Entrega e verificação

| Arquivo | Lições | Blocos | Flashcards | Questões | Referências estruturadas |
| --- | ---: | ---: | ---: | ---: | ---: |
| `src/content/e06.json` | 8 | 22 | 20 | 20 | 77 |
| `src/content/e07.json` | 8 | 18 | 18 | 20 | 58 |
| `src/content/e08.json` | 10 | 24 | 22 | 20 | 81 |
| Total | 26 | 64 | 60 | 60 | 216 |

Verificação executada após a geração: JSON legível; nomes de fonte existentes e exatos; contagem física dos PDFs; curso `epidemiologia`; mínimos de lições, cartões e questões; referências presentes em todos os blocos, cartões e questões, com páginas válidas de base 1 e seção preenchida; IDs únicos; quatro alternativas distintas por questão; resposta inteira 0–3; explicação preenchida; enunciados distintos por módulo. Cada módulo tem cinco respostas corretas em cada posição, totalizando 20 questões com distribuição 5/5/5/5.

A verificação estrutural foi concluída sem falhas. Houve revisão manual do conteúdo contra os textos e imagens indicados. Isso não equivale a validação acadêmica por docente ou a atualização dos materiais. Não foram alterados PDFs, implementação ou estado de publicação; não houve commit nesta tarefa delegada.
