# Publicar o Vet Estudos

Este projeto pode ser hospedado como arquivos estáticos. Não precisa de conta da estudante, servidor de aplicação, banco remoto ou variáveis com credenciais. O repositório pretendido é privado, com nome provisório `vet-estudos-administracao`. Nenhuma URL de produção é definida por este guia.

## Escolher quem poderá acessar

Antes de ativar a hospedagem, decida se o site poderá ser aberto por quem receber o endereço ou se apenas pessoas autorizadas poderão acessá-lo. O repositório privado protege os arquivos dentro do GitHub; ele não configura a privacidade da página hospedada.

A compilação copia os oito PDFs originais para `dist/fontes`. Portanto, a hospedagem serve também esses materiais. Para acesso restrito, a proteção precisa cobrir a página inicial, os recursos e os PDFs, tanto no endereço principal como nos endereços de prévia. Um bloqueio colocado apenas na interface não protege um PDF acessado pelo seu endereço direto.

O progresso continua sendo guardado no navegador de cada visitante. A proteção da hospedagem controla a entrada no site; ela não cria uma conta de estudo nem sincroniza progresso.

## Preparar os arquivos no GitHub

1. Crie ou use um repositório **privado** chamado `vet-estudos-administracao`.
2. Envie o projeto, incluindo os oito PDFs em `1.0 - Material para consulta`, `package.json` e `package-lock.json`. Não envie `node_modules`, `dist`, backups pessoais ou arquivos com credenciais. As cópias de `public/fontes` são geradas na compilação e não precisam ser versionadas.
3. Confira a execução do fluxo **Verificações** no GitHub Actions. Ele usa Node.js 24 e executa `npm ci`, `npm test` e `npm run build`; não publica o resultado.

Os PDFs originais precisam estar no repositório privado para que a hospedagem consiga executar a preparação. Se você optar por não enviá-los, terá de preparar e enviar a pasta `dist` por outro processo. Não remova as fontes e espere que o build remoto as recupere de um computador local.

## Opção principal: Vercel com repositório privado

O serviço conecta um projeto ao GitHub e pode criar publicações em cada envio de alterações. Antes de concluir a importação, defina a audiência e revise a proteção pretendida, porque essa integração automatiza publicações. O comportamento é descrito no [guia oficial Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github).

1. Na Vercel, escolha adicionar um projeto e importar do GitHub. Autorize acesso somente ao repositório privado necessário.
2. Selecione o repositório e mantenha a raiz do projeto como diretório de trabalho.
3. Selecione o preset **Vite**, Node.js **24**, instalação `npm ci`, compilação `npm run build` e diretório de saída `dist`.
4. Não adicione credenciais de banco ou de autenticação. Para hospedagem na raiz do domínio, não é necessário definir `VITE_BASE_PATH`.
5. Se o acesso será restrito, configure **Deployment Protection** com um método adequado ao acesso da estudante e escopo **All Deployments**, cobrindo também o domínio de produção. Revise as opções disponíveis no plano antes de concluir o primeiro deploy.
6. Conclua a publicação somente com a audiência escolhida. Depois, confira a URL realmente criada pelo serviço; não deduza o endereço apenas a partir do nome do repositório.

**Standard Protection** deixa os domínios de produção fora do seu escopo; não basta para manter todo o site restrito. As opções, elegibilidade e custos podem mudar. Consulte a [documentação oficial de Deployment Protection](https://vercel.com/docs/deployment-protection) e valide que a estudante consegue entrar pelo método escolhido. Essa configuração pertence à hospedagem e não está habilitada pelo `vercel.json` deste projeto.

O arquivo `vercel.json` define compilação, saída, URLs sem extensão HTML e cabeçalhos básicos. A configuração não contém regra de acesso. A referência técnica dessas propriedades está na [documentação de configuração da Vercel](https://vercel.com/docs/project-configuration).

Após conectar o repositório, novos envios e alterações em branches podem criar novas publicações. Revise esse comportamento nas configurações Git do projeto antes de usar branches ou enviar materiais que não devam entrar nas prévias. O fluxo `checks.yml` do projeto continua sendo apenas uma verificação.

## Alternativa: GitHub Pages, se o plano permitir

O GitHub Pages aceita repositórios privados em planos elegíveis. A disponibilidade depende do plano da conta ou organização, e um site gerado a partir de repositório privado não recebe automaticamente uma barreira de acesso. Confira a [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages). O [guia de origem de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) explica que o site pode ser público mesmo com o repositório privado. A publicação privada com controle de acesso exige um ambiente de organização elegível, conforme o [guia de visibilidade do GitHub Pages](https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).

Se essa hospedagem atender à audiência escolhida:

1. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
2. Prepare um fluxo de publicação separado do fluxo de verificações. Ele precisa instalar com `npm ci`, executar `npm run build`, enviar a pasta `dist` e fazer o deploy com as permissões de Pages. Este projeto não ativa esse fluxo automaticamente.
3. Para um site de projeto em `https://USUARIO.github.io/vet-estudos-administracao/`, defina `VITE_BASE_PATH=/vet-estudos-administracao/` na etapa de compilação. O `vite.config.js` já lê essa variável. Para domínio próprio na raiz, use `/`.
4. Siga o exemplo do [guia oficial do Vite para GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), adequando o nome e a branch ao repositório real.
5. Confira as referências dos oito PDFs pelo endereço publicado. Não trate a condição privada do repositório como comprovação de acesso restrito ao site.

Se o plano não permitir Pages para esse repositório privado, mantenha o repositório privado e escolha uma hospedagem compatível. Não é necessário tornar os materiais públicos para usar o projeto localmente.

## Conferir a publicação e levar o progresso

- Abra a URL no tablet, em retrato e paisagem, e confira navegação, leitura, flashcards e um simulado com mais de um módulo.
- Abra uma referência de cada PDF e confira se o arquivo e a página física correspondem. O salto por `#page=` depende do leitor de PDF do navegador; a referência escrita continua informando a página para navegação manual.
- Se o acesso é restrito, teste também uma janela sem sessão e um endereço direto de PDF. Ambos devem exigir a proteção escolhida.
- Registre uma leitura e uma resposta, recarregue a página e confira sua permanência.
- Exporte um backup JSON, importe no navegador de destino e confira o histórico. Importe uma segunda vez para conferir que os mesmos registros não se duplicam.

Cada combinação de protocolo, domínio e porta tem armazenamento próprio. A prévia em `http://localhost:5173`, a prévia de produção local em `http://localhost:4173`, o endereço pelo IP do computador, as prévias da hospedagem e o domínio final não compartilham progresso. Para passar de um para outro, use exportação e importação manual. Os backups são mesclados ao histórico existente, sem apagá-lo; não há sincronização automática entre aparelhos.

Exporte regularmente, especialmente antes de trocar domínio, navegador ou aparelho e antes de limpar dados do site. O armazenamento de progresso no navegador não garante que a página ou os PDFs estarão disponíveis sem internet.
