# Desfazer importação e Login Administrativo

## 3. Desfazer última importação de faltosos

Na aba **Frequência Diária**, o sistema agora mantém um histórico local da última importação de relatório/PDF de faltosos.

Ao importar um relatório, o sistema salva automaticamente:

- a data importada;
- o nome do arquivo;
- os registros que existiam naquela data antes da importação;
- os registros criados pela importação;
- o relatório detalhado da importação.

Com isso, o botão **↩️ Desfazer Última Importação** restaura a frequência daquela data exatamente como estava antes da importação.

Antes de desfazer, o sistema baixa automaticamente um backup completo de segurança.

> Observação: esse histórico fica no navegador usado na importação. Se a importação foi feita em outro computador/navegador, o botão de desfazer não terá esse histórico local.

## 4. Login administrativo

Foi adicionada uma tela de bloqueio administrativo ao abrir o sistema.

Senha inicial:

```text
ensps2026
```

Depois de entrar, acesse a aba **Administração** para alterar a senha.

A aba permite:

- ver o status da sessão;
- ver o último acesso registrado neste navegador;
- bloquear/sair do sistema;
- alterar a senha administrativa;
- restaurar a senha padrão.

## Importante sobre segurança

Esse login protege a interface no navegador. Para uma proteção completa em ambiente público, mantenha também protegidos:

- o acesso ao link do Cloudflare Pages;
- o token do GitHub;
- o painel do Cloudflare;
- o computador/navegador onde o sistema fica aberto.
