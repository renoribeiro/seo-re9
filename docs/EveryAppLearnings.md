# Aprendizados técnicos

Anotações para incorporar depois aos arquivos de skills do projeto.

## D1

- `db.batch()` é obrigatório para inserções de várias linhas — o D1 tem limite de 100 parâmetros vinculados por instrução, então um `INSERT VALUES (...), (...)` com várias linhas quebra. Use instruções INSERT individuais agrupadas com `db.batch()` (até 100 instruções por chamada).
