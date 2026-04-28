# Estrutura reorganizada do Sistema ENSPS

O projeto foi reorganizado para reduzir o tamanho dos arquivos HTML e deixar a manutenção mais simples.

## Estrutura principal

```text
sistemaensps2026-main/
├── index.html                         # Página principal do sistema
├── boletim.html                       # Página de boletins
├── horario.html                       # Página de horários
├── conversor-faltosos-rac01.html      # Conversor RAC01 separado
├── assets/
│   ├── css/
│   │   ├── index.css
│   │   ├── boletim.css
│   │   ├── horario.css
│   │   └── conversor_faltosos_rac01.css
│   └── js/
│       ├── index.js
│       ├── boletim.js
│       ├── horario.js
│       └── conversor_faltosos_rac01.js
├── functions/
│   └── api/db.js                      # API usada no Cloudflare Pages Functions
└── storage/
    ├── ensps_db.json
    ├── ensps_db_core.json
    ├── ensps_db_boletim.json
    └── ensps_db_horarios.json
```

## O que mudou

- O CSS que ficava dentro dos arquivos HTML foi separado em `assets/css/`.
- O JavaScript que ficava dentro dos arquivos HTML foi separado em `assets/js/`.
- Os arquivos HTML ficaram menores e mais fáceis de localizar visualmente.
- A estrutura continua compatível com deploy via Cloudflare Pages/Wrangler.
- Nenhuma biblioteca externa foi removida.

## Como fazer deploy

Dentro da pasta do projeto:

```bash
npx wrangler pages deploy . --project-name sistemaensps2026 --branch main
```

## Observação

Esta reorganização não altera a lógica do sistema. Ela apenas separa os arquivos para facilitar futuras manutenções e novas melhorias.

## Atualização: JavaScript modularizado

O JavaScript principal da página `index.html` foi dividido em módulos menores dentro de `assets/js/index/`:

- `01-core-navegacao-login-banco-backup.js`: navegação, login, banco remoto, backup e restauração.
- `02-frequencia-importacao-faltosos.js`: frequência diária, PDF/CSV de faltosos, 2ª chamada e desfazer importação.
- `03-gestor-advertencias-relatorio-pedagogico.js`: dados do gestor, advertências, relatório pedagógico, histórico e estatísticas.
- `04-professores-agenda-materiais-folha.js`: agenda escolar, materiais e frequência/folha dos professores.
- `05-planilha-notas.js`: planilha de notas.
- `06-inicializacao-detencao-ia.js`: inicialização geral, detenção e recursos de IA.
- `07-relatorios-gerais.js`: nova aba de relatórios consolidados.

O arquivo antigo `assets/js/index.js` foi mantido apenas como referência/legado. A página agora carrega os módulos acima em ordem, com versionamento `?v=20260428` para reduzir problemas de cache no navegador.

## Nova aba: Relatórios Gerais

A aba `Relatórios Gerais` reúne dados consolidados da frequência diária e permite:

- filtrar por período, série, ensino, status e aluno;
- visualizar totais de faltas, 2ª chamada, justificadas, sem fardamento e presenças lançadas;
- consultar resumo por série, por dia e por aluno;
- exportar CSV;
- exportar TXT;
- imprimir/salvar em PDF pelo navegador.
