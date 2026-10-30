# Vet Estudos — Medicina Veterinária

Ambiente de estudo preparado para uma aluna de Medicina Veterinária, com leitura em partes curtas, flashcards, questões comentadas e simulados que podem reunir vários módulos. A experiência foi pensada para uso no tablet, incluindo o Galaxy Tab S6 Lite, e também se adapta a celular e computador.

O mesmo site reúne duas disciplinas com trilhas independentes. O seletor **Suas disciplinas**, disponível em todas as telas, alterna entre **Administração e Aspectos Legais** (verde) e **Epidemiologia Veterinária e Saneamento Ambiental** (azul-petróleo). Módulos, busca, flashcards, questões, simulados, retomadas e indicadores de progresso mostram somente a disciplina ativa. É possível combinar vários módulos da mesma disciplina em um simulado.

O conteúdo acadêmico usa exclusivamente os PDFs fornecidos nas duas subpastas de `1.0 - Material para consulta`:

- `1.0 - Administração e Aspectos Legais`: oito PDFs, 171 páginas físicas; conteúdo original preservado, com 8 módulos, 52 lições, 143 blocos, 133 flashcards e 168 questões.
- `2.0 - Epidemiologia Veterinária e Saneamento Ambiental`: sete PDFs, 231 páginas físicas, 7 módulos, 64 lições, 175 blocos, 176 flashcards, 176 questões e 652 referências, correspondentes às aulas **01, 02, 03, 05, 06, 07 e 08**. O material da aula 04 não foi fornecido, e sua ausência está indicada no site.

Cada conceito, cartão e questão tem referência ao material, à seção e à página física do PDF, contando a primeira página como 1. Dados históricos, referências legais e divergências internas seguem o contexto do material recebido, sem consulta acadêmica externa. A atualização de Epidemiologia não releu nem alterou o conteúdo acadêmico de Administração.

## Abrir no computador

No Windows, dê dois cliques em **`Abrir-Vet-Estudos.cmd`**. Ele prepara a versão atual e abre `http://localhost:4178/`. O servidor fica em segundo plano; abrir novamente reutiliza a mesma porta e a mesma origem do progresso. O Node.js precisa estar instalado. Na mesma rede, o tablet pode abrir `http://IP-DO-COMPUTADOR:4178/`, com o computador ligado e a conexão permitida pelo firewall da rede privada.

Para desenvolvimento ou execução manual:

Use Node.js 24 e npm. Dentro da pasta do projeto, execute:

```powershell
npm install
npm run build
npm run dev
```

Abra o endereço exibido, normalmente `http://localhost:5173`. A compilação prepara os PDFs em `public/fontes`, além de validar o conteúdo. Nas próximas vezes basta `npm run dev`, desde que os arquivos preparados continuem presentes. Para encerrar, pressione `Ctrl+C` na janela em que o servidor está rodando.

Para abrir pelo tablet na mesma rede Wi-Fi, use `http://IP-DO-COMPUTADOR:5173`, substituindo o IP pelo endereço do computador. O computador precisa permanecer ligado, e o firewall deve permitir essa conexão na rede privada. O endereço do tablet terá seu próprio progresso. Se a rede não estiver disponível, use uma hospedagem conforme o guia de publicação.

## Como o progresso é salvo

Leituras, revisões, respostas e simulados são guardados no armazenamento persistente do navegador (`localStorage`). Não há conta, login, servidor de dados nem sincronização automática entre aparelhos. O armazenamento pertence ao perfil do navegador e à origem do endereço: `http://localhost:5173`, um endereço pelo IP do computador e `https://paskauu.github.io` guardam dados separados. O caminho `/vet-estudos-administracao/` não muda essa origem. Outro navegador, perfil ou aparelho também começa com dados próprios.

Na área **Progresso**, exporte um backup JSON regularmente e mantenha uma cópia fora do navegador. Para trocar de aparelho ou passar da prévia local para o site publicado, exporte no endereço de origem e importe no destino. A importação mescla os registros válidos com os já existentes e elimina repetições por identificador; ela não apaga o histórico atual. Para reunir estudos feitos em dois aparelhos, transfira e importe os backups manualmente e depois exporte uma nova cópia consolidada.

O backup exportado inclui **as duas disciplinas**, mantendo sua separação. Backups antigos de Administração continuam aceitos. A chave de armazenamento e os identificadores anteriores foram mantidos, portanto a atualização no mesmo endereço preserva o progresso anterior. Sessões que tentem misturar disciplinas são recusadas na importação. Links novos usam `#/administracao/...` ou `#/epidemiologia/...`; links antigos continuam funcionando.

Limpar os dados do site, apagar o perfil do navegador ou usar navegação privada pode remover o progresso. O cache de progresso não oferece funcionamento integral sem internet: o site e os PDFs ainda precisam estar acessíveis, e não há instalação offline nem garantia de cópia local dos materiais. Se o navegador informar que não conseguiu salvar, preserve o backup disponível antes de limpar qualquer dado.

## Conferir e gerar a versão de publicação

```powershell
npm run validate:content
npm test
npm run build
npm run preview
```

`npm run build` prepara as fontes, valida os dados e gera a pasta `dist`. `npm run preview` permite conferir essa pasta localmente; ele não é um servidor de produção. Essa distinção e o diretório de saída seguem o [guia oficial de publicação do Vite](https://vite.dev/guide/static-deploy.html).

As verificações do GitHub, em `.github/workflows/checks.yml`, instalam as dependências com `npm ci`, executam testes e compilam o site. A publicação fica no fluxo separado `.github/workflows/pages.yml`, que também testa e compila antes de enviar a versão ao GitHub Pages.

## Publicar

O código está no repositório público [Paskauu/vet-estudos-administracao](https://github.com/Paskauu/vet-estudos-administracao), na branch `main`. A hospedagem escolhida é o **GitHub Pages**, configurado para usar **GitHub Actions**. O endereço configurado é [paskauu.github.io/vet-estudos-administracao/](https://paskauu.github.io/vet-estudos-administracao/); a disponibilidade da versão depende da conclusão do fluxo de publicação.

A cada envio para `main`, `.github/workflows/pages.yml` instala as dependências com Node.js 24, executa os testes, compila com `VITE_BASE_PATH=/vet-estudos-administracao/` e publica a pasta `dist`. O [guia de publicação](docs/PUBLICAR.md) descreve a configuração, a conferência da versão publicada e a transferência manual do progresso local.

O site e os 15 PDFs de consulta ficam acessíveis publicamente na mesma hospedagem já escolhida.

## Organização do projeto

- `src/content/m01.json` a `m08.json`: conteúdo acadêmico, questões e referências por módulo.
- `src/content/e01.json`, `e02.json`, `e03.json`, `e05.json` a `e08.json`: conteúdo da segunda disciplina.
- `src/content/courses.js` e `src/hooks/useCourse.jsx`: catálogo e contexto da disciplina ativa.
- `src/lib` e `src/hooks`: seleção de questões, cálculo de progresso e persistência local.
- `src/pages` e `src/components`: telas e elementos da interface.
- `1.0 - Material para consulta`: PDFs originais usados na preparação.
- `scripts`: preparação das fontes e validação do conteúdo.
- `docs/research`: registros de leitura e limites dos materiais.
- `docs/superpowers`: decisões de projeto e plano de implementação atualizado.

Para alterar conteúdo, edite o JSON do módulo correspondente e execute a validação e a compilação. Não altere os PDFs originais nem complete lacunas com fontes acadêmicas externas sem uma nova orientação do solicitante.
