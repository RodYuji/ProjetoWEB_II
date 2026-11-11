--   tabelas  : tb_<nome no singular>
--   colunas  : <campo>_<sufixo da tabela>  (nome_cat, id_cat)
--   chave PK : id_<sufixo>  integer generated always as identity
--   chave FK : mesmo nome da PK de origem (id_cat em tb_solicitacao)
--
-- Usuários: tb_usuario guarda os dados de login (comuns a cliente e
-- funcionário); 

SET client_encoding = 'UTF8';

DROP TABLE IF EXISTS tb_historico   CASCADE;
DROP TABLE IF EXISTS tb_solicitacao CASCADE;
DROP TABLE IF EXISTS tb_estado      CASCADE;
DROP TABLE IF EXISTS tb_categoria   CASCADE;
DROP TABLE IF EXISTS tb_funcionario CASCADE;
DROP TABLE IF EXISTS tb_cliente     CASCADE;
DROP TABLE IF EXISTS tb_usuario     CASCADE;
DROP TABLE IF EXISTS cliente        CASCADE;  -- tabela antiga criada pelo Hibernate (ddl-auto=update)

CREATE TABLE tb_usuario (
    id_usu      integer primary key generated always as identity,
    nome_usu    varchar(100) not null,
    email_usu   varchar(100) not null unique,
    senha_usu   varchar(64)  not null,           -- hash SHA-256 (hex) de senha + salt
    salt_usu    varchar(30)  not null,           -- salt aleatório em Base64
    perfil_usu  varchar(20)  not null check (perfil_usu in ('CLIENTE', 'FUNCIONARIO')),
    ativo_usu   boolean      not null default true
);

CREATE TABLE tb_cliente (
    id_cli           integer primary key references tb_usuario (id_usu),
    cpf_cli          varchar(11)  not null unique,  -- só dígitos
    telefone_cli     varchar(15)  not null,
    cep_cli          varchar(8)   not null,
    logradouro_cli   varchar(150) not null,
    numero_cli       varchar(10)  not null,
    complemento_cli  varchar(100),
    bairro_cli       varchar(100) not null,
    cidade_cli       varchar(100) not null,
    uf_cli           varchar(2)   not null
);

CREATE TABLE tb_funcionario (
    id_fun          integer primary key references tb_usuario (id_usu),
    data_nasc_fun   date not null
);

CREATE TABLE tb_categoria (
    id_cat     integer primary key generated always as identity,
    nome_cat   varchar(50) not null,
    ativo_cat  boolean     not null default true
);

CREATE TABLE tb_estado (
    id_est    integer primary key generated always as identity,
    nome_est  varchar(20) not null unique
);

CREATE TABLE tb_solicitacao (
    id_sol               integer primary key generated always as identity,
    id_cli               integer       not null references tb_cliente (id_cli),
    id_cat               integer       not null references tb_categoria (id_cat),
    id_est               integer       not null references tb_estado (id_est),   -- estado atual
    desc_equip_sol       varchar(100)  not null,
    desc_defeito_sol     varchar(500)  not null,
    data_hora_sol        timestamp     not null,
    -- RF012 orçamento
    valor_orc_sol        numeric(10,2),
    id_fun_orc           integer references tb_funcionario (id_fun),
    data_hora_orc_sol    timestamp,
    -- RF014 manutenção
    desc_manut_sol       varchar(500),
    orient_cli_sol       varchar(500),
    id_fun_manut         integer references tb_funcionario (id_fun),
    data_hora_manut_sol  timestamp,
    -- RF015 funcionário responsável atual 
    id_fun_resp          integer references tb_funcionario (id_fun),
    -- RF010 pagamento
    data_hora_pag_sol    timestamp,
    -- RF016 finalização
    id_fun_final         integer references tb_funcionario (id_fun),
    data_hora_final_sol  timestamp
);

-- Histórico de alteração de estado (RF008, RF009, RF015)
CREATE TABLE tb_historico (
    id_his            integer primary key generated always as identity,
    id_sol            integer      not null references tb_solicitacao (id_sol),
    data_hora_his     timestamp    not null,
    id_est_anterior   integer      references tb_estado (id_est),    -- nulo na abertura
    id_est_novo       integer      not null references tb_estado (id_est),
    id_fun            integer      references tb_funcionario (id_fun), -- nulo em ações do cliente
    id_fun_destino    integer      references tb_funcionario (id_fun), -- só em redirecionamento
    obs_his           varchar(500)                                     
);

CREATE INDEX ix_solicitacao_cli ON tb_solicitacao (id_cli);
CREATE INDEX ix_solicitacao_est ON tb_solicitacao (id_est);
CREATE INDEX ix_historico_sol   ON tb_historico (id_sol);
