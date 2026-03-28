# Cloudflare + GitHub para o Banco ENSPS

Este projeto foi preparado para usar o GitHub como armazenamento principal do `ensps_db`, com o Cloudflare Pages Functions no meio para proteger o token.

## Como funciona

- O navegador carrega e salva o banco em `/api/db`
- A rota `/api/db` roda no Cloudflare
- O Cloudflare lê e grava o arquivo JSON dentro do repositório GitHub
- O `localStorage` fica apenas como cache/fallback local

## Arquivo salvo no GitHub

Por padrão, o banco será salvo em:

`storage/ensps_db.json`

Você pode mudar isso com a variável `GITHUB_DB_PATH`.

## Variáveis/Secrets no Cloudflare

No projeto do Cloudflare Pages, configure:

- `GITHUB_OWNER=ciliocavalcante-design`
- `GITHUB_REPO=sistemaensps2026`
- `GITHUB_BRANCH=main`
- `GITHUB_DB_PATH=storage/ensps_db.json`

E crie o secret:

- `GITHUB_TOKEN`

## Token do GitHub

Crie um Fine-grained Personal Access Token com permissão:

- `Contents: Read and write`

O token deve ter acesso ao repositório:

- `ciliocavalcante-design/sistemaensps2026`

## Deploy no Cloudflare Pages

1. Conecte o repositório no Cloudflare Pages
2. Use o diretório raiz do projeto
3. Não é necessário build complexo para este HTML simples
4. Garanta que a pasta `functions/` seja publicada junto
5. Configure as variáveis e o secret acima

## Observações

- Quando o arquivo remoto ainda não existir, o sistema criará automaticamente no primeiro salvamento
- Se o GitHub ficar indisponível, o sistema continua operando localmente até a sincronização voltar
- A aba `Backup e Dados` mostra o status da conexão e permite sincronização manual
