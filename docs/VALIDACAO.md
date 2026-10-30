# Verificação da entrega — 30/10/2026

## Escopo vigente

Site para estudo da namorada do solicitante, com conteúdo acadêmico limitado aos oito PDFs fornecidos. O usuário cancelou o Supabase durante o desenvolvimento; a versão entregue usa armazenamento persistente no navegador, sem login e sem sincronização automática. Exportação e importação JSON fazem a transferência manual entre origens e dispositivos.

## Conteúdo e fontes

- Os oito PDFs, com 171 páginas físicas no total, foram lidos integralmente na preparação dos conteúdos.
- Validador final: **8 módulos, 52 lições, 143 blocos, 133 flashcards, 168 questões e 680 referências**. IDs únicos, quatro alternativas distintas por questão, índice de resposta válido e páginas dentro dos limites dos arquivos.
- Revisão independente leu todos os conteúdos JSON e conferiu diretamente 100 páginas distintas dos PDFs. Não encontrou erro material de fidelidade ou gabarito. Dois ajustes menores foram aplicados: inclusão da p. 13 em um bloco de Fayol e remoção de menções à pesquisa interna em duas explicações jurídicas.
- Figuras ausentes nos PDFs não foram reconstruídas com outras fontes. Passagens jurídicas e classificações peculiares foram atribuídas à apostila.
- Comparação SHA-256 dos oito originais com os PDFs servidos na compilação: **todos idênticos**.
- Conteúdo acadêmico sem consulta externa. Documentação técnica oficial foi consultada somente para construção/publicação do software.

## Testes automatizados

`npm test`: **18 testes aprovados, zero falhas**. Verificam seleção de vários módulos, representação dos módulos quando a quantidade permite, limite de quantidade, seleção vazia, pontuação, repetição espaçada, mescla idempotente, retomada de sessão, persistência, backup, dados corrompidos e falhas do armazenamento.

Correções de revisão foram reproduzidas com testes que falharam antes da correção e passaram depois:

- Payloads e identificadores perigosos de backups são recusados antes da gravação; dicionários do reducer não têm protótipo.
- Respostas órfãs, perguntas duplicadas em sessão e revisões com datas/intervalos inválidos são recusadas.
- O acesso ao armazenamento bloqueado é protegido; o conteúdo pode abrir com aviso de que o progresso não será salvo.
- Cada evento tem uma chave própria, preservando escritas intercaladas de duas abas.
- UUIDs de estudo também funcionam em HTTP por IP, onde `crypto.randomUUID` pode estar indisponível.

`npm run build`: **compilação concluída sem avisos**. Código dividido em dois arquivos de aproximadamente 223 kB e 287 kB antes de gzip; CSS aproximadamente 57 kB. Os oito PDFs são copiados durante a preparação.

## Navegador — desenvolvimento e versão compilada

Executado em navegador Chromium integrado, com dados de teste em origens separadas da prévia de uso:

1. Abrir módulo 01, concluir etapa e recarregar: leitura preservada e próxima etapa selecionada.
2. Abrir flashcard, revelar resposta e registrar avaliação: revisão avança e registro fica disponível no progresso.
3. Limpar seleção na prática: início desabilitado com orientação para escolher módulo.
4. Selecionar módulos 01 e 07, quantidade 5 e modo simulado: sessão contém questões dos dois módulos.
5. Confirmar resposta em simulado: correção não aparece antecipadamente. Recarregar: resposta preservada e retomada na próxima questão.
6. Concluir as cinco questões: resultado, acertos e divisão por módulo apresentados. Revisão de erros inicia prática guiada com feedback e fonte.
7. Exportar backup com 11 registros na origem de desenvolvimento e importar na versão compilada em outra porta: leitura, cartão revisado, seis respostas, simulado concluído e sessão de revisão preservados.
8. Endereço `#/modulo/constructor`: estado de endereço desconhecido, sem falha de renderização.
9. Logs de execução da versão compilada: nenhum erro ou aviso observado.
10. Menu no tablet: fechado fica fora da navegação por teclado; abertura posiciona o foco no menu; Escape fecha e devolve o foco ao botão de abertura. O menu possui comando explícito para fechar e rolagem própria quando necessário.

## Layout

Conferência em **800 × 1280**, **1280 × 800** e **360 × 800 CSS px**, representando tablet em retrato/paisagem e celular. A largura de conteúdo correspondeu à largura disponível, sem rolagem horizontal da página. A lista horizontal de etapas tem sua própria rolagem intencional. Botões principais e links de referência têm área de toque de pelo menos 44 px; o conteúdo de leitura recebeu tamanho e contraste ampliados.

Prévia visual: `docs/preview/tablet-inicio.jpg`. Essa imagem não contém respostas ou progresso de teste.

## Servidor local

- `GET/HEAD /`: HTTP 200.
- PDF original: HTTP 200 e `application/pdf`.
- Requisição parcial de PDF, bytes 0–31: HTTP 206 com 32 bytes.
- Inicializador Windows prepara o site e abre a origem estável `http://localhost:4178/`.

## Limites de verificação

- Não houve teste em um Galaxy Tab S6 Lite físico, S Pen, Safari/iOS ou rede celular. As dimensões foram simuladas no navegador.
- A transferência entre origens foi exercitada como representação de troca de dispositivo; não houve sincronização automática, conforme o escopo corrigido.
- `#page=` depende do leitor de PDF. A página permanece escrita na referência para navegação manual.
- O cache guarda progresso, sem instalação offline integral do site/PDFs.
- A publicação do código em GitHub privado não ativa uma hospedagem nem restringe automaticamente um site. URL pública/restrita deve ser verificada após configurar hospedagem e audiência.

## Repositório remoto na entrega inicial

Criado e enviado: **https://github.com/Paskauu/vet-estudos-administracao**. A API do GitHub confirmou `isPrivate: true` e branch padrão `main`. Os PDFs originais e fontes do site estão no repositório; dados de teste, backups, dependências instaladas e pasta de compilação não foram enviados. Nenhuma hospedagem de site foi ativada.

## Publicação no GitHub Pages — 30/10/2026

Após a entrega inicial, o usuário tornou o repositório público e escolheu o próprio GitHub Pages para hospedagem. A API confirmou `isPrivate: false`, `build_type: workflow` e HTTPS habilitado.

- Endereço publicado e conferido: **https://paskauu.github.io/vet-estudos-administracao/**.
- Fluxo `.github/workflows/pages.yml`, execução **41054411635**, concluído com sucesso: https://github.com/Paskauu/vet-estudos-administracao/actions/runs/41054411635.
- Node.js 24, instalação, 18 testes, validação de conteúdo, compilação com base `/vet-estudos-administracao/`, envio dos arquivos e deploy aprovados.
- Página inicial, JavaScript, CSS e ícone: HTTP 200, com tipos de conteúdo corretos.
- Os oito PDFs retornaram HTTP 200 e `application/pdf`; seus SHA-256 são idênticos aos oito originais do projeto.
- Navegador no endereço público: página inicial carregada, módulo aberto, referência apontando para `/vet-estudos-administracao/fontes/m01.pdf#page=1`, flashcard revelado e seleção conjunta dos módulos 01 e 07 oferecendo 44 questões.
- Nenhum erro ou aviso observado nos logs do navegador. Navegação de conferência sem registrar leituras, respostas ou avaliações de teste no progresso da versão publicada.
- Imagem da página publicada: `docs/preview/pages-publicado.jpg`.

Atualizações enviadas à branch `main` acionam publicação automática. O progresso continua local a cada navegador; para transportar dados da origem local ao site, use exportação/importação manual. Os testes completos de persistência e backup permanecem descritos acima e foram realizados em origens isoladas.

## Ampliação: Epidemiologia Veterinária e Saneamento Ambiental — 30/10/2026

O pedido seguinte acrescenta uma segunda disciplina ao mesmo site e reorganiza os originais em duas subpastas. Os PDFs de Administração não foram reabertos para análise e seus JSONs acadêmicos não foram alterados. As cópias antigas já preparadas foram reutilizadas localmente; checkout limpo usa o novo caminho da subpasta durante a cópia.

### Conteúdo e revisão

- Apenas os sete PDFs da subpasta `2.0 - Epidemiologia Veterinária e Saneamento Ambiental` foram usados para autoria: aulas 01, 02, 03, 05, 06, 07 e 08, com **231 páginas físicas**. A ausência da aula 04 está indicada na biblioteca e no início da disciplina.
- Resultado: **7 módulos, 64 lições, 175 blocos, 176 flashcards, 176 questões e 652 referências**. A aula 02 tem 14 lições; quadros densos de alimentos e surtos também foram repartidos em unidades menores.
- O catálogo completo contém **15 módulos, 116 lições, 318 blocos, 309 flashcards, 344 questões, 1332 referências e 402 páginas**. As contagens de Administração permanecem iguais às da entrega anterior.
- Os registros `docs/research/epidemiologia-01-02.md`, `epidemiologia-03-05.md` e `epidemiologia-06-08.md` documentam leitura, inspeção de imagens, cobertura e divergências. Não houve pesquisa acadêmica externa.
- Revisão independente leu os resumos e gabaritos dos sete módulos, comparou texto extraído e inspecionou páginas selecionadas com fórmulas, tabelas e gráficos. Um qualificativo ambíguo da lista de eventos animais de e03 p.18 foi corrigido separando canídeos silvestres de quirópteros em áreas urbanas. Não ficaram outros achados materiais na amostra conferida.
- Conferência independente com `pypdf` confirmou o número real de páginas dos sete novos arquivos. Os sete PDFs preparados têm SHA-256 idêntico aos respectivos originais novos. Essa conferência não releu os PDFs de Administração.

### Separação e compatibilidade

- Seletor de disciplina em todas as telas, verde em Administração e azul-petróleo em Epidemiologia. Bibliotecas, categorias, buscas, cartões, questões, simulados, retomadas e progresso são recortados pela disciplina ativa.
- Rotas novas têm prefixo da disciplina; links anteriores continuam aceitos. Link antigo direto `#/modulo/e03` identificou corretamente Epidemiologia na conferência.
- Chave local e IDs anteriores preservados. Backup único inclui ambas as disciplinas; aceita o identificador antigo de Administração. Importações inválidas são recusadas antes da gravação, inclusive sessões com disciplinas misturadas e redefinições conflitantes de um mesmo identificador de sessão.
- Revisão técnica encontrou uma colisão possível de identificador de sessão em backups. Dois testes reproduziram a falha antes da correção e passaram depois: filtragem de cada início de sessão pelo próprio payload e recusa da redefinição na importação.

### Verificação executada

- **26 testes aprovados, zero falhas**, incluindo os 18 anteriores. Cobrem isolamento do catálogo e do progresso, compatibilidade de rotas e backups, rejeição atômica de sessões entre disciplinas/fora de módulos e preparação das fontes nos novos caminhos.
- `npm run validate:content` e `npm run build` concluídos. Compilação sem avisos, com catálogos em arquivos separados de aproximadamente 223 kB e 222 kB; interface aproximadamente 69 kB e runtime 223 kB antes de gzip.
- Navegador em origem de teste `localhost:5174`: leitura de e03 salva após recarga; Administração continua com zero leituras/cartões/respostas de teste da outra área; revisão de cartão com referência em e08 salva somente em Epidemiologia.
- Simulado com e03/e05 e cinco questões: seleção vazia desabilita início; todos os módulos oferecidos pertencem à disciplina; resposta confirmada persistiu após recarga; Administração não mostrou retomada da sessão; voltar a Epidemiologia permitiu retomá-la na próxima questão. Correção somente ao final e resultado por módulo conferidos.
- Biblioteca de Epidemiologia mostrou somente os sete PDFs novos, com suas páginas e nomes.
- Versão compilada em `localhost:4181`: abriu os arquivos de conteúdo separados. Backup de nove eventos exportado pela interface, importado e reimportado nessa origem. Permaneceram nove eventos: uma leitura, uma revisão, cinco respostas, início e conclusão de simulado. Indicadores corretos e Administração sem contaminação. Nenhum erro/aviso nos logs dessa versão.
- Layout conferido em **800 × 1280**, **1280 × 800** e **360 × 800 CSS px**; largura da página dentro do espaço disponível, sem rolagem horizontal. Seletor legível, incluindo o nome completo da nova disciplina, e leitura do módulo 02 conferida no celular. Não houve teste físico em tablet.

A publicação desta ampliação usa o mesmo fluxo GitHub Pages e o mesmo endereço existente; sua conclusão deve ser confirmada na execução do envio correspondente.
