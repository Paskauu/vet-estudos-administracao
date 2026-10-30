# Vet Estudos — Administração e Aspectos Legais

Ambiente de estudo preparado para uma aluna de Medicina Veterinária, com leitura em partes curtas, flashcards, questões comentadas e simulados que podem reunir vários módulos. A experiência foi pensada para uso no tablet, incluindo o Galaxy Tab S6 Lite, e também se adapta a celular e computador.

O conteúdo acadêmico vem exclusivamente dos oito PDFs da pasta `1.0 - Material para consulta`: oito módulos, 52 lições, 143 blocos de resumo, 133 flashcards e 168 questões. São 680 referências estruturadas a um conjunto de 171 páginas físicas. Cada referência identifica o material, a seção e a página do arquivo; a numeração usa a primeira página do PDF como página 1. Os textos de natureza legal refletem os materiais fornecidos.

## Abrir no computador

No Windows, dê dois cliques em **`Abrir-Vet-Estudos.cmd`**. Ele prepara a versão atual e abre `http://localhost:4178/`. O servidor fica em segundo plano; abrir novamente reutiliza a mesma porta e a mesma origem do progresso. O Node.js precisa estar instalado. Na mesma rede, o tablet pode abrir `http://IP-DO-COMPUTADOR:4178/`, com o computador ligado e a conexão permitida pelo firewall da rede privada.

Para desenvolvimento ou execução manual:

Use Node.js 24 e npm. Dentro da pasta do projeto, execute:

```powershell
npm install
npm run build
npm run dev
```

Abra o endereço exibido, normalmente `http://localhost:5173`. A primeira compilação prepara os oito PDFs em `public/fontes`, além de validar o conteúdo. Nas próximas vezes basta `npm run dev`, desde que os arquivos preparados continuem presentes. Para encerrar, pressione `Ctrl+C` na janela em que o servidor está rodando.

Para abrir pelo tablet na mesma rede Wi-Fi, use `http://IP-DO-COMPUTADOR:5173`, substituindo o IP pelo endereço do computador. O computador precisa permanecer ligado, e o firewall deve permitir essa conexão na rede privada. O endereço do tablet terá seu próprio progresso. Se a rede não estiver disponível, use uma hospedagem conforme o guia de publicação.

## Como o progresso é salvo

Leituras, revisões, respostas e simulados são guardados no armazenamento persistente do navegador (`localStorage`). Não há conta, login, servidor de dados nem sincronização automática entre aparelhos. O armazenamento pertence ao perfil do navegador e à origem do endereço: `http://localhost:5173`, um endereço pelo IP do computador e o futuro domínio publicado guardam dados separados. Outro navegador, perfil ou aparelho também começa com dados próprios.

Na área **Progresso**, exporte um backup JSON regularmente e mantenha uma cópia fora do navegador. Para trocar de aparelho ou passar da prévia local para o site publicado, exporte no endereço de origem e importe no destino. A importação mescla os registros válidos com os já existentes e elimina repetições por identificador; ela não apaga o histórico atual. Para reunir estudos feitos em dois aparelhos, transfira e importe os backups manualmente e depois exporte uma nova cópia consolidada.

Limpar os dados do site, apagar o perfil do navegador ou usar navegação privada pode remover o progresso. O cache de progresso não oferece funcionamento integral sem internet: o site e os PDFs ainda precisam estar acessíveis, e não há instalação offline nem garantia de cópia local dos materiais. Se o navegador informar que não conseguiu salvar, preserve o backup disponível antes de limpar qualquer dado.

## Conferir e gerar a versão de publicação

```powershell
npm run validate:content
npm test
npm run build
npm run preview
```

`npm run build` prepara as fontes, valida os dados e gera a pasta `dist`. `npm run preview` permite conferir essa pasta localmente; ele não é um servidor de produção. Essa distinção e o diretório de saída seguem o [guia oficial de publicação do Vite](https://vite.dev/guide/static-deploy.html).

As verificações do GitHub, em `.github/workflows/checks.yml`, instalam as dependências com `npm ci`, executam testes e compilam o site. Elas não publicam o site.

## Publicar

O repositório é `vet-estudos-administracao`. A entrega inclui um [guia para publicar](docs/PUBLICAR.md) e configuração de compilação para Vercel. A existência desses arquivos não cria uma hospedagem nem uma URL final.

Um repositório privado controla o acesso ao código no GitHub. O acesso ao site e aos PDFs é uma escolha separada na hospedagem. Ao publicar `dist`, os PDFs preparados em `public/fontes` passam a ser arquivos servidos pelo site. Se o uso deve ficar restrito, configure proteção que cubra todas as URLs, inclusive os PDFs, e confira o acesso da estudante antes de compartilhar o endereço.

## Organização do projeto

- `src/content/m01.json` a `m08.json`: conteúdo acadêmico, questões e referências por módulo.
- `src/lib` e `src/hooks`: seleção de questões, cálculo de progresso e persistência local.
- `src/pages` e `src/components`: telas e elementos da interface.
- `1.0 - Material para consulta`: PDFs originais usados na preparação.
- `scripts`: preparação das fontes e validação do conteúdo.
- `docs/research`: registros de leitura e limites dos materiais.
- `docs/superpowers`: decisões de projeto e plano de implementação atualizado.

Para alterar conteúdo, edite o JSON do módulo correspondente e execute a validação e a compilação. Não altere os PDFs originais nem complete lacunas com fontes acadêmicas externas sem uma nova orientação do solicitante.
