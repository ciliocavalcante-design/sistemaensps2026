# Relatórios Gerais e JavaScript modularizado

Esta versão implementa os itens 5 e 6 da sequência de melhorias.

## 5. Separação do JavaScript em módulos menores

O arquivo principal `assets/js/index.js` foi preservado como legado/referência, mas o `index.html` agora carrega os scripts em arquivos menores dentro de `assets/js/index/`.

Ordem de carregamento:

1. `01-core-navegacao-login-banco-backup.js`
2. `02-frequencia-importacao-faltosos.js`
3. `03-gestor-advertencias-relatorio-pedagogico.js`
4. `04-professores-agenda-materiais-folha.js`
5. `05-planilha-notas.js`
6. `06-inicializacao-detencao-ia.js`
7. `07-relatorios-gerais.js`

Essa divisão facilita localizar problemas e continuar evoluindo o sistema por área.

## 6. Nova aba Relatórios Gerais

A nova aba fica no menu lateral e no menu inferior.

Ela permite gerar relatórios com filtros por:

- data inicial e final;
- série;
- ensino;
- status;
- busca por aluno.

A aba mostra:

- cards de totais;
- resumo por série;
- ranking de alunos com mais ocorrências;
- resumo por dia;
- registros detalhados.

Também possui botões para baixar CSV, baixar TXT e imprimir/salvar PDF.
