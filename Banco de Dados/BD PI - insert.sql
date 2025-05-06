-- Inserts na tabela estado
INSERT INTO estado (nome, sigla) VALUES 
('São Paulo', 'SP'),
('Minas Gerais', 'MG'),
('Pará', 'PA');

-- Inserts na tabela cidade
INSERT INTO cidade (nome, fkEstado) VALUES 
('São Paulo', 1),
('Belo Horizonte', 2),
('Parauapebas', 3);

-- Inserts na tabela endereco
INSERT INTO endereco (logradouro, bairro, numero, cep, fkCidade) VALUES 
('Rua A', 'Centro', '100', '01000000', 1),
('Rua B', 'Savassi', '200', '30130000', 2),
('Av. Ferrovia', 'Industrial', '300', '68515000', 3);

-- Inserts na tabela mineradora
INSERT INTO mineradora (nome, cnpj, fkEndereco) VALUES 
('Vale S.A.', '12345678000199', 1),
('CSN Mineração', '98765432000188', 2);

-- Inserts na tabela cargo
INSERT INTO cargo (nome) VALUES 
('Engenheiro'),
('Técnico de Segurança'),
('Gerente');

-- Inserts na tabela funcionario
INSERT INTO funcionario (nome, sobrenome, email, senha, telefone_celular, fkMineradora, fkCargo) VALUES 
('João', 'Silva', 'joao@vale.com', 'senha123', '11999999999', 1, 1),
('Maria', 'Souza', 'maria@csn.com', 'senha456', '31988888888', 2, 2),
('Carlos', 'Oliveira', 'carlos@vale.com', 'senha789', '11988887777', 1, 3),
('Ana', 'Ferreira', 'ana@csn.com', 'senha321', '31977776666', 2, 1);

-- Inserts na tabela setor
INSERT INTO setor (id, fkMineradora, sigla) VALUES 
(1, 1, 'A'),
(2, 2, 'B'),
(3, 1, 'C'),
(4, 2, 'D');

-- Inserts na tabela localSensor
INSERT INTO localSensor (localSensor, fkSetor, fkMineradora) VALUES 
('Galeria Norte', 1, 1),
('Poço Central', 2, 2),
('Túnel 3', 3, 1),
('Área de Ventilação', 4, 2),
('Subsolo Leste', 1, 1);

-- Inserts na tabela sensor
INSERT INTO sensor (statusSensor, fkLocal) VALUES 
('Ativo', 1),
('Ativo', 2),
('Ativo', 3),
('Ativo', 4),
('Ativo', 5);

-- Inserts na tabela medicao com base nas regras fornecidas
INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES 
(0.75, 'Alerta', 1),
(1.50, 'Evacuar área', 2),
(2.30, 'Evacuação total', 3),
(5.10, 'Risco de explosão', 4),
(0.40, 'Alerta', 5);


-- mais inserts para os sensores
-- Inserts de medições para os sensores

-- Sensor 1
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.75, 'alerta', '2025-05-04 08:20:45', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.50, 'evacuar área', '2025-05-04 09:30:33', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.20, 'evacuação total', '2025-05-04 10:45:27', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.10, 'risco de explosão', '2025-05-04 12:10:18', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.40, 'alerta', '2025-05-04 14:15:00', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.90, 'evacuar área', '2025-05-04 15:05:45', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (3.10, 'evacuação total', '2025-05-04 16:20:37', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.80, 'alerta', '2025-05-04 18:10:45', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.50, 'evacuação total', '2025-05-04 19:40:00', 1);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.20, 'risco de explosão', '2025-05-04 21:00:55', 1);

-- Sensor 2
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.85, 'alerta', '2025-05-03 08:20:45', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.30, 'evacuar área', '2025-05-03 09:15:10', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.00, 'evacuação total', '2025-05-03 10:40:05', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.00, 'risco de explosão', '2025-05-03 12:30:18', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.50, 'alerta', '2025-05-03 13:25:00', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.80, 'evacuar área', '2025-05-03 14:10:20', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (3.50, 'evacuação total', '2025-05-03 15:45:33', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.60, 'alerta', '2025-05-03 16:50:45', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.70, 'evacuação total', '2025-05-03 18:25:00', 2);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.30, 'risco de explosão', '2025-05-03 19:30:15', 2);

-- Sensor 3
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.95, 'alerta', '2025-05-02 08:00:25', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.40, 'evacuar área', '2025-05-02 09:10:33', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.10, 'evacuação total', '2025-05-02 10:25:45', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (4.90, 'risco de explosão', '2025-05-02 11:35:05', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.65, 'alerta', '2025-05-02 12:50:00', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.20, 'evacuação total', '2025-05-02 14:00:45', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (3.80, 'evacuação total', '2025-05-02 15:15:33', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.45, 'alerta', '2025-05-02 16:25:00', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.80, 'evacuação total', '2025-05-02 17:40:15', 3);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.10, 'risco de explosão', '2025-05-02 18:55:55', 3);

-- Sensor 4
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.90, 'alerta', '2025-05-01 08:10:25', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.60, 'evacuar área', '2025-05-01 09:30:35', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.30, 'evacuação total', '2025-05-01 10:45:55', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (4.80, 'risco de explosão', '2025-05-01 12:15:05', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.55, 'alerta', '2025-05-01 13:25:30', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.80, 'evacuar área', '2025-05-01 14:15:45', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (3.20, 'evacuação total', '2025-05-01 15:50:00', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.70, 'alerta', '2025-05-01 17:00:20', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.50, 'evacuação total', '2025-05-01 18:35:40', 4);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.00, 'risco de explosão', '2025-05-01 19:50:55', 4);

-- Sensor 5
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.85, 'alerta', '2025-05-01 08:35:10', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.20, 'evacuar área', '2025-05-01 09:55:50', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.10, 'evacuação total', '2025-05-01 11:10:05', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (4.60, 'risco de explosão', '2025-05-01 12:40:00', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.55, 'alerta', '2025-05-01 13:50:20', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (1.90, 'evacuar área', '2025-05-01 14:40:45', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (3.40, 'evacuação total', '2025-05-01 16:10:15', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (0.60, 'alerta', '2025-05-01 17:20:55', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (2.90, 'evacuação total', '2025-05-01 18:30:10', 5);
insert into medicao (nivelmetano, statusnivel, datahora, fksensor) values (5.10, 'risco de explosão', '2025-05-01 19:40:35', 5);
