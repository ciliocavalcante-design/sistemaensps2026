# Visual Geral v5 — Sistema ENSPS 2026

Esta versão aplica uma melhoria visual geral sem alterar a lógica de salvamento, importação, backup, login ou relatórios.

## O que foi melhorado

- Acabamento visual mais profissional na tela principal.
- Sidebar com melhor contraste, estados ativos mais claros e transições suaves.
- Cards com bordas arredondadas, sombra suave e maior separação visual.
- Botões padronizados com estados de hover, clique e cores mais consistentes.
- Inputs, selects e buscas com foco visual mais evidente.
- Tabelas com cabeçalho fixo, melhor leitura e destaque ao passar o mouse.
- Painéis de métricas e relatórios com visual unificado.
- Login administrativo com visual mais moderno.
- Melhor responsividade para uso em telas menores.
- Criação do arquivo `assets/css/visual-polido.css` para concentrar o acabamento visual.

## Observação importante

A pasta `functions/` foi preservada. Portanto, o funcionamento com Cloudflare Pages e salvamento remoto continua dependendo dos mesmos arquivos de API que já estavam no projeto.

## Deploy

```bash
cd /Users/ciliocavalcante/Documents/Antigravity/sistemaensps2026-main
npx wrangler pages deploy . --project-name sistemaensps2026 --branch main
```
