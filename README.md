# Sistema Integrado ENSPS 2026

Projeto pronto para publicação no GitHub e deploy no Cloudflare Pages.

## Estrutura principal

- `index.html`: sistema principal
- `horario.html`: módulo integrado de horários escolares
- `boletim.html`: módulo integrado do boletim informativo
- `functions/api/db.js`: API do Cloudflare Pages para salvar o banco no GitHub
- `storage/ensps_db.json`: banco inicial/sanitizado
- `CLOUDFLARE_GITHUB_SETUP.md`: guia de configuração da nuvem

## Como publicar

1. Suba esta pasta inteira para o repositório GitHub.
2. Conecte o repositório ao Cloudflare Pages.
3. Publique a raiz do projeto, incluindo a pasta `functions/`.
4. Configure no Cloudflare:
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`
   - `GITHUB_DB_PATH`
   - secret `GITHUB_TOKEN`

## Banco unificado

O arquivo `storage/ensps_db.json` agora comporta:

- frequência de alunos
- advertências
- comunicados
- entrega de materiais
- folha/frequência de professores
- horários escolares
- boletim informativo

## Observação importante

Esta cópia foi preparada para publicação com banco sanitizado. Se você já tiver dados reais em produção, mantenha o arquivo remoto do GitHub como fonte principal e evite versionar bancos com dados sensíveis.
