# Publicar o Vet Estudos no GitHub Pages

A hospedagem escolhida é o **GitHub Pages**, usando o repositório público [Paskauu/vet-estudos-administracao](https://github.com/Paskauu/vet-estudos-administracao) e a branch `main`. O endereço configurado é [https://paskauu.github.io/vet-estudos-administracao/](https://paskauu.github.io/vet-estudos-administracao/); confira a conclusão da publicação em **Actions** antes de compartilhar a versão.

O site e os oito PDFs de consulta ficam acessíveis publicamente, conforme a escolha de hospedagem.

O projeto é servido como arquivos estáticos. Não precisa de conta da estudante, login, servidor de aplicação, banco remoto ou credenciais adicionais. O progresso continua guardado no navegador de cada visitante, com backup e transferência manual em JSON.

## Configuração do repositório

1. Abra o repositório [Paskauu/vet-estudos-administracao](https://github.com/Paskauu/vet-estudos-administracao).
2. Em **Settings → Pages → Build and deployment**, mantenha **Source: GitHub Actions**. Essa origem já está configurada no repositório.
3. Confira que a branch `main` contém o projeto, incluindo os oito PDFs em `1.0 - Material para consulta`, `package.json`, `package-lock.json` e `.github/workflows/pages.yml`. Não envie `node_modules`, `dist` ou backups pessoais. As cópias de `public/fontes` são geradas durante a compilação.
4. Em **Actions**, acompanhe a execução de `.github/workflows/pages.yml` para o envio mais recente à branch `main`. Aguarde a conclusão das etapas de compilação e publicação.
5. Abra o endereço configurado e faça as conferências descritas abaixo. Em **Settings → Pages**, o GitHub também mostra o endereço da publicação.

O fluxo `.github/workflows/pages.yml` é executado automaticamente a cada envio de alterações para `main`. Ele usa Node.js 24, instala as dependências com `npm ci`, executa `npm test`, compila com `npm run build`, envia a pasta `dist` como artefato de Pages e publica com as ações oficiais do GitHub. O fluxo `.github/workflows/checks.yml` continua sendo uma verificação separada.

Na compilação para Pages, o fluxo define `VITE_BASE_PATH=/vet-estudos-administracao/`. Esse prefixo permite que os recursos e os PDFs sejam encontrados no endereço do projeto. O `vite.config.js` já lê essa variável. Se o nome do repositório ou o endereço de hospedagem mudar, ajuste o prefixo antes de publicar novamente.

O processo segue o [guia oficial do Vite para GitHub Pages](https://vite.dev/guide/static-deploy#github-pages) e a [documentação do GitHub para publicar Pages com um fluxo personalizado](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Publicar atualizações

1. Faça as alterações no projeto e confira localmente:

   ```powershell
   npm run validate:content
   npm test
   npm run build
   npm run preview
   ```

2. Envie as alterações para `main` no GitHub. Esse envio inicia uma nova publicação automaticamente.
3. Em **Actions**, abra a execução correspondente ao envio e aguarde o sucesso da publicação. Se uma etapa falhar, abra seus detalhes, corrija a causa e envie a correção para `main`.
4. Reabra o [site configurado](https://paskauu.github.io/vet-estudos-administracao/) e confira as áreas afetadas pela atualização.

`npm run build` prepara os oito PDFs, valida o conteúdo e gera `dist`. O GitHub precisa dos PDFs originais no repositório para executar esse processo; ele não busca arquivos no computador local. `npm run preview` serve apenas para conferir a compilação localmente.

## Conferir a publicação

- Abra o endereço no tablet, em retrato e paisagem, e confira navegação, leitura, flashcards e um simulado com mais de um módulo.
- Abra uma referência de cada PDF e confira o arquivo e a página física. O salto por `#page=` depende do leitor de PDF do navegador; a referência escrita informa a página para navegação manual.
- Registre uma leitura e uma resposta, recarregue a página e confira sua permanência.
- Exporte um backup JSON na área **Progresso**, importe no navegador de destino e confira o histórico. Importe a mesma cópia novamente para confirmar que os registros não se duplicam.

## Levar o progresso local para o site

1. No navegador e no endereço em que você estudou até agora, abra **Progresso** e exporte o backup JSON. Isso pode ser `http://localhost:4178/`, `http://localhost:5173/`, uma prévia local em outra porta ou o endereço pelo IP do computador.
2. No mesmo aparelho ou no aparelho de destino, abra [https://paskauu.github.io/vet-estudos-administracao/](https://paskauu.github.io/vet-estudos-administracao/).
3. Abra **Progresso**, importe o arquivo JSON e confira as leituras, respostas, revisões e simulados. A importação mescla os registros válidos ao histórico existente e elimina repetições por identificador, sem apagar o histórico atual.
4. Exporte uma nova cópia depois de reunir os dados e guarde-a fora do navegador.

Cada combinação de protocolo, domínio e porta tem armazenamento próprio. Os endereços locais, o endereço pelo IP do computador e `https://paskauu.github.io` não compartilham progresso. O caminho `/vet-estudos-administracao/` faz parte da URL, mas não altera a origem `https://paskauu.github.io` usada pelo armazenamento do navegador. Outro navegador, perfil ou aparelho também mantém dados próprios.

Não há sincronização automática nem cópia do progresso na nuvem. Para reunir estudos feitos em dois aparelhos, exporte e importe os backups manualmente. Exporte regularmente, especialmente antes de trocar endereço, navegador ou aparelho e antes de limpar dados do site. O armazenamento de progresso no navegador não garante que a página ou os PDFs estarão disponíveis sem internet.
