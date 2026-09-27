# Mantenedores

Este documento reúne notas de fluxo de trabalho exclusivas de quem mantém o projeto e que não cabem no README público.

Repositório: [github.com/renoribeiro/seo-re9](https://github.com/renoribeiro/seo-re9) · Contato: [trafego@re9.online](mailto:trafego@re9.online)

## Comunicação de atualizações

As GitHub Releases são o principal canal de atualizações do RE9 SEO para quem usa o produto.

- Peça a quem tiver interesse que acompanhe o repositório ("Watch") e ative as notificações de releases.
- Não trate estrelas como lista de contatos; o GitHub não oferece uma forma de enviar mensagens diretamente para quem deu estrela.

## Fluxo de notas de release

Gere as notas a partir dos commits desde a última tag semver:

```sh
pnpm release:notes
```

Variações úteis:

```sh
pnpm release:notes -- --from v0.0.1 --to HEAD
pnpm release:notes -- --draft v0.0.2
```

Parâmetros aceitos:

- `--from <tag>`: começa a geração do changelog a partir de uma tag específica
- `--to <ref>`: termina em uma ref específica; o padrão é `HEAD`
- `--draft <tag>`: cria um rascunho de release no GitHub para essa tag com as notas geradas
- `--repo <owner/repo>`: sobrescreve o repositório do GitHub (ex.: `renoribeiro/seo-re9`)
- `--help`: mostra a ajuda

O gerador:

- usa, por padrão, os commits desde a última tag semver
- filtra commits apenas de manutenção, como `chore:`, `ci:`, `test:`, `build:` e `release:`
- agrupa as mudanças restantes em seções curtas voltadas a quem usa o produto
- pode criar um rascunho de release no GitHub quando `--draft` é informado

Guarde as notas finais em `release-notes/` como arquivos Markdown versionados, por exemplo `release-notes/v0.0.2.md`.

Fluxo de release recomendado:

```sh
pnpm -s release:notes
# edite e salve a versão final em release-notes/v0.0.2.md
gh release create v0.0.2 --target main --title v0.0.2 --notes-file release-notes/v0.0.2.md
```

Por enquanto, prefira releases de patch enquanto o projeto ainda está em desenvolvimento rápido, a menos que haja um motivo claro para uma release minor ou major.

## Slash command do OpenCode

Para facilitar dentro do OpenCode, use:

```text
/release-notes
```

A definição do comando fica em `.opencode/command/release-notes.md` e repassa quaisquer argumentos extras para o mesmo script gerador.
