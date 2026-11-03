# Banco de dados (PostgreSQL)

1. Criar o database (uma vez): `create database manutencao_db;`
2. Conectado em `manutencao_db`, executar **na ordem**:
   - `01_criacao.sql` – apaga e recria todas as tabelas
   - `02_carga.sql` – estados, categorias, usuários e 23 solicitações com histórico
3. Rodar o Spring.

Pelo SQL Shell (psql): `\c manutencao_db` e depois
`\i 'C:/caminho/ate/ProjetoWEBII/manutencao/banco/01_criacao.sql'`

Usuários da carga (senha de todos: **1234**):
- Funcionários: maria@empresa.com, mario@empresa.com
- Clientes: joao@email.com, jose@email.com, joana@email.com, joaquina@email.com

Rodar os dois scripts de novo volta o banco ao estado inicial.
Mudou uma classe `@Entity`? Atualize o `01_criacao.sql` junto.
