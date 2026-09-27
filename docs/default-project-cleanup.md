# Limpeza de projetos Default duplicados

A maioria das instalações não precisa desta limpeza. Use-a apenas se a execução
das migrações mais recentes falhar com um erro de restrição de unicidade em
`projects_one_default_per_organization_idx`.

A limpeza mantém um único projeto `Default` criado automaticamente por
organização, remapeia para ele as linhas filhas suportadas, preserva o histórico
do monitoramento de posições e os metadados das palavras-chave sempre que
possível e, depois, remove os projetos Default duplicados.

## Banco de dados Cloudflare D1

1. Pré-visualize a limpeza:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo
   ```

2. Se a saída estiver correta, aplique:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo --apply --confirm-remote-apply
   ```

3. Valide ou rode a validação de novo:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo --validate-only
   ```

4. Rode de novo a migração/implantação normal.

Antes de aplicar em produção, garanta que você tem um backup recente do D1 ou um
ponto de restauração do time travel. Na produção hospedada, desative novos
cadastros/gravações por cerca de 60 segundos enquanto a limpeza roda.

## Docker local / banco D1 local baseado em SQLite

1. Pré-visualize a limpeza:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo --local
   ```

2. Aplique:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo --local --apply
   ```

3. Valide ou rode a validação de novo:

   ```sh
   pnpm cleanup:default-projects:d1 --database open-seo --local --validate-only
   ```

4. Rode de novo a migração local normal.

## O que aconteceu

Várias requisições simultâneas podiam inicializar a mesma organização ao mesmo
tempo, criando mais de um projeto `Default` automático.

## Mais detalhes

O executor em `scripts/d1-default-project-cleanup.ts` é o ponto de entrada
recomendado, porque inclui saída de simulação (dry-run), verificações prévias de
execuções ativas, validação após a aplicação e uma flag de confirmação explícita
para bancos remotos.

A implementação em SQL fica em `scripts/cleanup-default-projects.sql`.
