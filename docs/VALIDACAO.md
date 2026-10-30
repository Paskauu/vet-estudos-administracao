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
