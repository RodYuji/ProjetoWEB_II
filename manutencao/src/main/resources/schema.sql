-- 1. TIPOS ENUMERADOS
CREATE TYPE perfil_usuario AS ENUM ('CLIENTE', 'FUNCIONARIO');

CREATE TYPE estado_solicitacao AS ENUM (
    'ABERTA', 'ORÇADA', 'APROVADA', 'REJEITADA', 
    'REDIRECIONADA', 'ARRUMADA', 'PAGA', 'FINALIZADA'
);

-- 2. TABELAS
CREATE TABLE tb_usuario (
    id_usuario BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil perfil_usuario NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_cliente (
    id_cliente BIGINT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (id_cliente) 
        REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE tb_funcionario (
    id_funcionario BIGINT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    CONSTRAINT fk_funcionario_usuario FOREIGN KEY (id_funcionario) 
        REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE tb_categoria (
    id_categoria BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tb_solicitacao (
    id_solicitacao BIGSERIAL PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    id_categoria BIGINT NOT NULL,
    descricao_equipamento VARCHAR(30) NOT NULL,
    descricao_defeito TEXT NOT NULL,
    data_hora_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado estado_solicitacao NOT NULL DEFAULT 'ABERTA',
    valor_orcamento DECIMAL(10, 2),
    motivo_rejeicao TEXT,
    descricao_manutencao TEXT,
    orientacoes_cliente TEXT,
    data_hora_pagamento TIMESTAMP,
    id_funcionario_orcamento BIGINT,
    id_funcionario_manutencao BIGINT,
    id_funcionario_destinatario BIGINT,
    CONSTRAINT fk_solicitacao_cliente FOREIGN KEY (id_cliente) 
        REFERENCES tb_cliente(id_cliente),
    CONSTRAINT fk_solicitacao_categoria FOREIGN KEY (id_categoria) 
        REFERENCES tb_categoria(id_categoria),
    CONSTRAINT fk_solicitacao_func_orcamento FOREIGN KEY (id_funcionario_orcamento) 
        REFERENCES tb_funcionario(id_funcionario),
    CONSTRAINT fk_solicitacao_func_manutencao FOREIGN KEY (id_funcionario_manutencao) 
        REFERENCES tb_funcionario(id_funcionario),
    CONSTRAINT fk_solicitacao_func_destinatario FOREIGN KEY (id_funcionario_destinatario) 
        REFERENCES tb_funcionario(id_funcionario)
);

CREATE TABLE tb_historico_solicitacao (
    id_historico BIGSERIAL PRIMARY KEY,
    id_solicitacao BIGINT NOT NULL,
    id_funcionario BIGINT,
    estado_anterior estado_solicitacao,
    estado_novo estado_solicitacao NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    CONSTRAINT fk_historico_solicitacao FOREIGN KEY (id_solicitacao) 
        REFERENCES tb_solicitacao(id_solicitacao) ON DELETE CASCADE,
    CONSTRAINT fk_historico_funcionario FOREIGN KEY (id_funcionario) 
        REFERENCES tb_funcionario(id_funcionario)
);