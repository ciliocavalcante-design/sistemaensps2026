# Backup e Restauração - Sistema ENSPS 2026

## Onde fica

No sistema, acesse **Backup e Dados**.

## Opções disponíveis

### Exportar Backup Completo
Baixa um arquivo `.json` contendo todos os dados principais do sistema:

- frequência diária dos alunos;
- advertências;
- comunicados dos professores;
- entrega de materiais;
- folha dos professores;
- extras avulsas;
- horários;
- boletim informativo;
- configurações salvas no banco unificado.

### Baixar Banco Atual JSON
Baixa somente o banco unificado atual, sem o envelope de backup. É útil para conferência técnica.

### Restaurar Backup
Importa um arquivo `.json` de backup e substitui os dados atuais.

Antes de restaurar, o sistema baixa automaticamente um backup de segurança do estado atual com o prefixo:

`backup_antes_da_restauracao`

Assim, se algum arquivo errado for restaurado, ainda existe uma cópia do estado anterior.

### Sincronizar com GitHub
Força o envio do banco atual para o armazenamento remoto usado pelo Cloudflare Pages/GitHub.

## Observação importante

Após restaurar um backup, o sistema também tenta sincronizar o banco restaurado com o GitHub, mantendo o funcionamento do Cloudflare Pages.
