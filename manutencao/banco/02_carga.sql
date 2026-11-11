-- Senha de TODOS os usuários: 1234  (gravada como SHA-256 de senha + salt,
-- no mesmo formato do util/SenhaUtil.java)


SET client_encoding = 'UTF8';

INSERT INTO tb_estado (nome_est) VALUES
  ('ABERTA'),
  ('ORÇADA'),
  ('REJEITADA'),
  ('APROVADA'),
  ('REDIRECIONADA'),
  ('ARRUMADA'),
  ('PAGA'),
  ('FINALIZADA');

-- Categorias ------------------------------------------------------------
INSERT INTO tb_categoria (nome_cat) VALUES
  ('Notebook'),
  ('Desktop'),
  ('Impressora'),
  ('Mouse'),
  ('Teclado');

-- Usuários: ids 1-2 funcionários, ids 3-6 clientes -----------------------
INSERT INTO tb_usuario (nome_usu, email_usu, senha_usu, salt_usu, perfil_usu) VALUES
  ('Maria', 'maria@empresa.com', '354a954c923a16b4704894b303b13ae062006163f83a6fd077c3db6422969fd8', 'hnj0BsNIDbbk8ALvMJhfeA==', 'FUNCIONARIO'),
  ('Mário', 'mario@empresa.com', '261d64ca37f782136f5bfcb5bb2351132ec6bf3d493562054cc9830df9d9b456', 'lbzuH122MzKKiaoiBXImIg==', 'FUNCIONARIO'),
  ('João', 'joao@email.com', '5dbad5f648477a039dd8907efb78018961d0c98e2cf06c364e29e33a26396878', 'Lm8Gvcsk3JNwV1DK88HRFg==', 'CLIENTE'),
  ('José', 'jose@email.com', '805b321256e426717606092609cf13e0db4ec6367bb63a8a3333d37c3d23a808', 'AgO8PpAAOaO8xJkS0RPdvw==', 'CLIENTE'),
  ('Joana', 'joana@email.com', 'bc397f3a79380d088e01ac667b894f780a5cd5f8817eb3f5b8c3cfb5edc5f361', 'zitqYXTvW0rCD2yRhxoC+Q==', 'CLIENTE'),
  ('Joaquina', 'joaquina@email.com', 'fc3fc1b18f51b41e9b3272fa0b5c785b5ee40392f4fe896390f90dfb582d44b1', 'fWfJwNhb6ocgxHd7O9MeAw==', 'CLIENTE');

INSERT INTO tb_funcionario (id_fun, data_nasc_fun) VALUES
  (1, '1988-04-12'),
  (2, '1985-09-30');

INSERT INTO tb_cliente (id_cli, cpf_cli, telefone_cli, cep_cli, logradouro_cli, numero_cli, complemento_cli, bairro_cli, cidade_cli, uf_cli) VALUES
  (3, '11122233344', '41988881111', '80010000', 'Rua XV de Novembro', '100', 'Ap 12', 'Centro', 'Curitiba', 'PR'),
  (4, '22233344455', '41977772222', '80240000', 'Avenida Sete de Setembro', '2500', NULL, 'Batel', 'Curitiba', 'PR'),
  (5, '33344455566', '41966663333', '81020000', 'Rua Brigadeiro Franco', '850', 'Casa 2', 'Rebouças', 'Curitiba', 'PR'),
  (6, '44455566677', '41955554444', '83005000', 'Rua Joinville', '1234', NULL, 'Centro', 'São José dos Pinhais', 'PR');

-- Solicitações e histórico ---------------------------------------------
-- 1: Notebook Dell Inspiron 15 (ABERTA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol) VALUES (3, 1, 1, 'Notebook Dell Inspiron 15', 'Não liga, nem acende o LED de energia', ((current_date - 0) + time '08:10'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (1, ((current_date - 0) + time '08:10'), NULL, 1, NULL, NULL, NULL);

-- 2: Impressora HP LaserJet P1102w (ABERTA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol) VALUES (4, 3, 1, 'Impressora HP LaserJet P1102w', 'Papel enrosca na saída', ((current_date - 0) + time '09:05'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (2, ((current_date - 0) + time '09:05'), NULL, 1, NULL, NULL, NULL);

-- 3: Mouse Logitech MX Master 3 (ABERTA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol) VALUES (5, 4, 1, 'Mouse Logitech MX Master 3', 'Scroll pulando e clique duplo sozinho', ((current_date - 1) + time '14:20'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (3, ((current_date - 1) + time '14:20'), NULL, 1, NULL, NULL, NULL);

-- 4: Desktop Positivo Master D610 (ABERTA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol) VALUES (6, 2, 1, 'Desktop Positivo Master D610', 'Reinicia sozinho após alguns minutos', ((current_date - 2) + time '10:00'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (4, ((current_date - 2) + time '10:00'), NULL, 1, NULL, NULL, NULL);

-- 5: Teclado mecânico Redragon Kumara (ORÇADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (3, 5, 2, 'Teclado mecânico Redragon Kumara', 'Teclas W e S não respondem', ((current_date - 3) + time '16:45'), 120.00, 1, (((current_date - 3) + time '16:45') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (5, ((current_date - 3) + time '16:45'), NULL, 1, NULL, NULL, NULL),
  (5, (((current_date - 3) + time '16:45') + interval '3 hours'), 1, 2, 1, NULL, NULL);

-- 6: Notebook Lenovo IdeaPad 3 (ORÇADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (4, 1, 2, 'Notebook Lenovo IdeaPad 3', 'Tela com listras coloridas', ((current_date - 4) + time '11:30'), 450.00, 2, (((current_date - 4) + time '11:30') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (6, ((current_date - 4) + time '11:30'), NULL, 1, NULL, NULL, NULL),
  (6, (((current_date - 4) + time '11:30') + interval '3 hours'), 1, 2, 2, NULL, NULL);

-- 7: Impressora Epson L3150 (REJEITADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (5, 3, 3, 'Impressora Epson L3150', 'Não puxa o papel da bandeja', ((current_date - 6) + time '09:40'), 280.00, 1, (((current_date - 6) + time '09:40') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (7, ((current_date - 6) + time '09:40'), NULL, 1, NULL, NULL, NULL),
  (7, (((current_date - 6) + time '09:40') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (7, (((current_date - 6) + time '09:40') + interval '24 hours'), 2, 3, NULL, NULL, 'Valor acima do que pretendo gastar');

-- 8: Desktop Dell OptiPlex 3080 (REJEITADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (6, 2, 3, 'Desktop Dell OptiPlex 3080', 'Muito lento e esquentando', ((current_date - 7) + time '13:15'), 350.00, 2, (((current_date - 7) + time '13:15') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (8, ((current_date - 7) + time '13:15'), NULL, 1, NULL, NULL, NULL),
  (8, (((current_date - 7) + time '13:15') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (8, (((current_date - 7) + time '13:15') + interval '24 hours'), 2, 3, NULL, NULL, 'Vou comprar um equipamento novo');

-- 9: Mouse Microsoft Basic Optical (APROVADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (3, 4, 4, 'Mouse Microsoft Basic Optical', 'Cabo com mau contato', ((current_date - 8) + time '15:00'), 45.00, 1, (((current_date - 8) + time '15:00') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (9, ((current_date - 8) + time '15:00'), NULL, 1, NULL, NULL, NULL),
  (9, (((current_date - 8) + time '15:00') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (9, (((current_date - 8) + time '15:00') + interval '24 hours'), 2, 4, NULL, NULL, NULL);

-- 10: Teclado Logitech K120 (APROVADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (4, 5, 4, 'Teclado Logitech K120', 'Líquido derramado, várias teclas travadas', ((current_date - 9) + time '10:20'), 90.00, 2, (((current_date - 9) + time '10:20') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (10, ((current_date - 9) + time '10:20'), NULL, 1, NULL, NULL, NULL),
  (10, (((current_date - 9) + time '10:20') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (10, (((current_date - 9) + time '10:20') + interval '24 hours'), 2, 4, NULL, NULL, NULL);

-- 11: Notebook Acer Aspire 5 (APROVADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol) VALUES (5, 1, 4, 'Notebook Acer Aspire 5', 'Bateria não carrega', ((current_date - 10) + time '08:50'), 380.00, 1, (((current_date - 10) + time '08:50') + interval '3 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (11, ((current_date - 10) + time '08:50'), NULL, 1, NULL, NULL, NULL),
  (11, (((current_date - 10) + time '08:50') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (11, (((current_date - 10) + time '08:50') + interval '24 hours'), 2, 3, NULL, NULL, 'Achei caro, vou pensar'),
  (11, (((current_date - 10) + time '08:50') + interval '48 hours'), 3, 4, NULL, NULL, 'Serviço resgatado pelo cliente');

-- 12: Impressora Brother DCP-1617NW (REDIRECIONADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, id_fun_resp) VALUES (6, 3, 5, 'Impressora Brother DCP-1617NW', 'Impressão saindo manchada', ((current_date - 11) + time '14:00'), 210.00, 1, (((current_date - 11) + time '14:00') + interval '3 hours'), 2);
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (12, ((current_date - 11) + time '14:00'), NULL, 1, NULL, NULL, NULL),
  (12, (((current_date - 11) + time '14:00') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (12, (((current_date - 11) + time '14:00') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (12, (((current_date - 11) + time '14:00') + interval '48 hours'), 4, 5, 1, 2, NULL);

-- 13: Desktop HP ProDesk 400 G6 (REDIRECIONADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, id_fun_resp) VALUES (3, 2, 5, 'Desktop HP ProDesk 400 G6', 'Fonte queimada após queda de energia', ((current_date - 12) + time '09:30'), 320.00, 2, (((current_date - 12) + time '09:30') + interval '3 hours'), 1);
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (13, ((current_date - 12) + time '09:30'), NULL, 1, NULL, NULL, NULL),
  (13, (((current_date - 12) + time '09:30') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (13, (((current_date - 12) + time '09:30') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (13, (((current_date - 12) + time '09:30') + interval '48 hours'), 4, 5, 2, 1, NULL);

-- 14: Mouse Razer DeathAdder (ARRUMADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol) VALUES (4, 4, 6, 'Mouse Razer DeathAdder', 'Sensor perdendo rastreamento', ((current_date - 13) + time '17:10'), 75.00, 1, (((current_date - 13) + time '17:10') + interval '3 hours'), 'Substituição do microswitch e do sensor', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 13) + time '17:10') + interval '48 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (14, ((current_date - 13) + time '17:10'), NULL, 1, NULL, NULL, NULL),
  (14, (((current_date - 13) + time '17:10') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (14, (((current_date - 13) + time '17:10') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (14, (((current_date - 13) + time '17:10') + interval '48 hours'), 4, 6, 1, NULL, NULL);

-- 15: Teclado Dell KB216 (ARRUMADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, id_fun_resp) VALUES (5, 5, 6, 'Teclado Dell KB216', 'Teclado não reconhecido pelo computador', ((current_date - 14) + time '11:00'), 60.00, 2, (((current_date - 14) + time '11:00') + interval '3 hours'), 'Limpeza da placa e troca das membranas', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 14) + time '11:00') + interval '72 hours'), 1);
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (15, ((current_date - 14) + time '11:00'), NULL, 1, NULL, NULL, NULL),
  (15, (((current_date - 14) + time '11:00') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (15, (((current_date - 14) + time '11:00') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (15, (((current_date - 14) + time '11:00') + interval '48 hours'), 4, 5, 2, 1, NULL),
  (15, (((current_date - 14) + time '11:00') + interval '72 hours'), 5, 6, 1, NULL, NULL);

-- 16: Notebook Samsung Book (ARRUMADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol) VALUES (6, 1, 6, 'Notebook Samsung Book', 'Dobradiça da tela quebrada', ((current_date - 15) + time '10:45'), 260.00, 1, (((current_date - 15) + time '10:45') + interval '3 hours'), 'Substituído o componente defeituoso e testado por 2 horas', 'Manter o equipamento em local arejado e evitar quedas', 2, (((current_date - 15) + time '10:45') + interval '48 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (16, ((current_date - 15) + time '10:45'), NULL, 1, NULL, NULL, NULL),
  (16, (((current_date - 15) + time '10:45') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (16, (((current_date - 15) + time '10:45') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (16, (((current_date - 15) + time '10:45') + interval '48 hours'), 4, 6, 2, NULL, NULL);

-- 17: Impressora Canon G3110 (PAGA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol) VALUES (3, 3, 7, 'Impressora Canon G3110', 'Erro 5B00 na tela', ((current_date - 17) + time '13:40'), 150.00, 2, (((current_date - 17) + time '13:40') + interval '3 hours'), 'Limpeza do sistema de tração e troca do rolete', 'Manter o equipamento em local arejado e evitar quedas', 2, (((current_date - 17) + time '13:40') + interval '48 hours'), (((current_date - 17) + time '13:40') + interval '72 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (17, ((current_date - 17) + time '13:40'), NULL, 1, NULL, NULL, NULL),
  (17, (((current_date - 17) + time '13:40') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (17, (((current_date - 17) + time '13:40') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (17, (((current_date - 17) + time '13:40') + interval '48 hours'), 4, 6, 2, NULL, NULL),
  (17, (((current_date - 17) + time '13:40') + interval '72 hours'), 6, 7, NULL, NULL, NULL);

-- 18: Desktop Lenovo ThinkCentre M70s (PAGA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol) VALUES (4, 2, 7, 'Desktop Lenovo ThinkCentre M70s', 'Não dá vídeo', ((current_date - 18) + time '09:15'), 420.00, 1, (((current_date - 18) + time '09:15') + interval '3 hours'), 'Troca de peça, limpeza interna e testes de estabilidade', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 18) + time '09:15') + interval '48 hours'), (((current_date - 18) + time '09:15') + interval '72 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (18, ((current_date - 18) + time '09:15'), NULL, 1, NULL, NULL, NULL),
  (18, (((current_date - 18) + time '09:15') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (18, (((current_date - 18) + time '09:15') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (18, (((current_date - 18) + time '09:15') + interval '48 hours'), 4, 6, 1, NULL, NULL),
  (18, (((current_date - 18) + time '09:15') + interval '72 hours'), 6, 7, NULL, NULL, NULL);

-- 19: Mouse Multilaser MO300 (PAGA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol) VALUES (5, 4, 7, 'Mouse Multilaser MO300', 'Botão direito quebrado', ((current_date - 19) + time '16:00'), 35.00, 1, (((current_date - 19) + time '16:00') + interval '3 hours'), 'Substituição do microswitch e do sensor', 'Manter o equipamento em local arejado e evitar quedas', 2, (((current_date - 19) + time '16:00') + interval '72 hours'), (((current_date - 19) + time '16:00') + interval '96 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (19, ((current_date - 19) + time '16:00'), NULL, 1, NULL, NULL, NULL),
  (19, (((current_date - 19) + time '16:00') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (19, (((current_date - 19) + time '16:00') + interval '24 hours'), 2, 3, NULL, NULL, 'Pensei melhor e decidi não arrumar'),
  (19, (((current_date - 19) + time '16:00') + interval '48 hours'), 3, 4, NULL, NULL, 'Serviço resgatado pelo cliente'),
  (19, (((current_date - 19) + time '16:00') + interval '72 hours'), 4, 6, 2, NULL, NULL),
  (19, (((current_date - 19) + time '16:00') + interval '96 hours'), 6, 7, NULL, NULL, NULL);

-- 20: Notebook Asus VivoBook 15 (FINALIZADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol, id_fun_final, data_hora_final_sol) VALUES (6, 1, 8, 'Notebook Asus VivoBook 15', 'Teclado do notebook com teclas soltas', ((current_date - 21) + time '08:30'), 310.00, 2, (((current_date - 21) + time '08:30') + interval '3 hours'), 'Substituído o componente defeituoso e testado por 2 horas', 'Manter o equipamento em local arejado e evitar quedas', 2, (((current_date - 21) + time '08:30') + interval '48 hours'), (((current_date - 21) + time '08:30') + interval '72 hours'), 2, (((current_date - 21) + time '08:30') + interval '96 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (20, ((current_date - 21) + time '08:30'), NULL, 1, NULL, NULL, NULL),
  (20, (((current_date - 21) + time '08:30') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (20, (((current_date - 21) + time '08:30') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (20, (((current_date - 21) + time '08:30') + interval '48 hours'), 4, 6, 2, NULL, NULL),
  (20, (((current_date - 21) + time '08:30') + interval '72 hours'), 6, 7, NULL, NULL, NULL),
  (20, (((current_date - 21) + time '08:30') + interval '96 hours'), 7, 8, 2, NULL, NULL);

-- 21: Teclado Microsoft Wired 600 (FINALIZADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol, id_fun_final, data_hora_final_sol) VALUES (3, 5, 8, 'Teclado Microsoft Wired 600', 'Tecla Enter emperrada', ((current_date - 23) + time '15:20'), 55.00, 1, (((current_date - 23) + time '15:20') + interval '3 hours'), 'Limpeza da placa e troca das membranas', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 23) + time '15:20') + interval '48 hours'), (((current_date - 23) + time '15:20') + interval '72 hours'), 1, (((current_date - 23) + time '15:20') + interval '96 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (21, ((current_date - 23) + time '15:20'), NULL, 1, NULL, NULL, NULL),
  (21, (((current_date - 23) + time '15:20') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (21, (((current_date - 23) + time '15:20') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (21, (((current_date - 23) + time '15:20') + interval '48 hours'), 4, 6, 1, NULL, NULL),
  (21, (((current_date - 23) + time '15:20') + interval '72 hours'), 6, 7, NULL, NULL, NULL),
  (21, (((current_date - 23) + time '15:20') + interval '96 hours'), 7, 8, 1, NULL, NULL);

-- 22: Impressora HP DeskJet 2774 (FINALIZADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, id_fun_resp, data_hora_pag_sol, id_fun_final, data_hora_final_sol) VALUES (4, 3, 8, 'Impressora HP DeskJet 2774', 'Wi-Fi não conecta', ((current_date - 25) + time '10:10'), 130.00, 2, (((current_date - 25) + time '10:10') + interval '3 hours'), 'Limpeza do sistema de tração e troca do rolete', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 25) + time '10:10') + interval '72 hours'), 1, (((current_date - 25) + time '10:10') + interval '96 hours'), 2, (((current_date - 25) + time '10:10') + interval '120 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (22, ((current_date - 25) + time '10:10'), NULL, 1, NULL, NULL, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '3 hours'), 1, 2, 2, NULL, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '48 hours'), 4, 5, 2, 1, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '72 hours'), 5, 6, 1, NULL, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '96 hours'), 6, 7, NULL, NULL, NULL),
  (22, (((current_date - 25) + time '10:10') + interval '120 hours'), 7, 8, 2, NULL, NULL);

-- 23: Desktop Positivo Union (FINALIZADA)
INSERT INTO tb_solicitacao (id_cli, id_cat, id_est, desc_equip_sol, desc_defeito_sol, data_hora_sol, valor_orc_sol, id_fun_orc, data_hora_orc_sol, desc_manut_sol, orient_cli_sol, id_fun_manut, data_hora_manut_sol, data_hora_pag_sol, id_fun_final, data_hora_final_sol) VALUES (5, 2, 8, 'Desktop Positivo Union', 'HD fazendo barulho e travando', ((current_date - 27) + time '14:50'), 490.00, 1, (((current_date - 27) + time '14:50') + interval '3 hours'), 'Troca de peça, limpeza interna e testes de estabilidade', 'Manter o equipamento em local arejado e evitar quedas', 1, (((current_date - 27) + time '14:50') + interval '48 hours'), (((current_date - 27) + time '14:50') + interval '72 hours'), 1, (((current_date - 27) + time '14:50') + interval '96 hours'));
INSERT INTO tb_historico (id_sol, data_hora_his, id_est_anterior, id_est_novo, id_fun, id_fun_destino, obs_his) VALUES
  (23, ((current_date - 27) + time '14:50'), NULL, 1, NULL, NULL, NULL),
  (23, (((current_date - 27) + time '14:50') + interval '3 hours'), 1, 2, 1, NULL, NULL),
  (23, (((current_date - 27) + time '14:50') + interval '24 hours'), 2, 4, NULL, NULL, NULL),
  (23, (((current_date - 27) + time '14:50') + interval '48 hours'), 4, 6, 1, NULL, NULL),
  (23, (((current_date - 27) + time '14:50') + interval '72 hours'), 6, 7, NULL, NULL, NULL),
  (23, (((current_date - 27) + time '14:50') + interval '96 hours'), 7, 8, 1, NULL, NULL);
