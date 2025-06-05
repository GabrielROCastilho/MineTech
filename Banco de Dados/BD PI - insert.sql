-- Inserts na tabela estado
INSERT INTO estado (nome, sigla) VALUES 
('São Paulo', 'SP'),
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Rio de Janeiro', 'RJ'),
('Bahia', 'BA');

-- Inserts na tabela cidade
INSERT INTO cidade (nome, fkEstado) VALUES 
('São Paulo', 1),
('Campinas', 1),
('Belo Horizonte', 2),
('Uberlândia', 2),
('Parauapebas', 3),
('Belém', 3),
('Rio de Janeiro', 4),
('Niterói', 4),
('Salvador', 5),
('Feira de Santana', 5);

-- Inserts na tabela mineradora
INSERT INTO mineradora (nome, cnpj) VALUES 
('Vale S.A.', '12345678000199'),
('CSN Mineração', '98765432000188');

-- Inserts na tabela endereco
INSERT INTO endereco (fkMineradora, logradouro, bairro, numero, cep, fkCidade) VALUES 
(1, 'Rua A', 'Centro', '100', '01000000', 1),
(2, 'Rua B', 'Savassi', '200', '30130000', 2);

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

select * from mineradora;
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
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.75, 'alerta', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.50, 'evacuar área', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.20, 'evacuação total', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.10, 'risco de explosão', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.40, 'alerta', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.90, 'evacuar área', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (3.10, 'evacuação total', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.80, 'alerta', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.50, 'evacuação total', 1);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.20, 'risco de explosão', 1);

-- Sensor 2
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.85, 'alerta', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.30, 'evacuar área', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.00, 'evacuação total', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.00, 'risco de explosão', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.50, 'alerta', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.80, 'evacuar área', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (3.50, 'evacuação total', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.60, 'alerta', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.70, 'evacuação total', 2);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.30, 'risco de explosão', 2);

-- Sensor 3
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.95, 'alerta', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.40, 'evacuar área', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.10, 'evacuação total', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (4.90, 'risco de explosão', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.65, 'alerta', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.20, 'evacuação total', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (3.80, 'evacuação total', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.45, 'alerta', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.80, 'evacuação total', 3);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.10, 'risco de explosão', 3);

select * from medicao order by id desc;

select m.statusnivel as status_nivel,
       se.sigla as sigla
from medicao m
inner join sensor s on m.fkSensor = s.id
inner join localSensor ls on s.fkLocal = ls.id
inner join setor se on se.id = ls.fkSetor
order by m.id desc
limit 5;

select m.statusnivel as status_nivel,
       se.sigla as sigla
from medicao m
inner join sensor s on m.fkSensor = s.id
inner join localSensor ls on s.fkLocal = ls.id
inner join setor se on se.id = ls.fkSetor
order by m.id desc
limit 5;

select m.nivelmetano as nivel_metano,
	   m.statusnivel as status_nivel,
	   s.id as setor
from medicao m
inner join sensor s on m.fkSensor = s.id
inner join localSensor ls on s.fkLocal = ls.id
inner join setor se on se.id = ls.fkSetor
where m.nivelmetano = 'Evacuar área';

select nivelmetano, statusnivel from medicao where statusnivel = 'risco de explosão';
select * from setor;
select * from medicao where statusnivel = 'risco de explosão';
select * from sensor where id = 4;
select * from localSensor where id = 4;
select * from setor where id = 4;


-- Sensor 4
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.90, 'alerta', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.60, 'evacuar área', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.30, 'evacuação total', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (4.80, 'risco de explosão', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.55, 'alerta', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.80, 'evacuar área', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (3.20, 'evacuação total', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.70, 'alerta', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.50, 'evacuação total', 4);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.00, 'risco de explosão', 4);

-- Sensor 5
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.85, 'alerta', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.20, 'evacuar área', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.10, 'evacuação total', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (4.60, 'risco de explosão', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.55, 'alerta', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (1.90, 'evacuar área', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (3.40, 'evacuação total', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (0.60, 'alerta', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (2.90, 'evacuação total', 5);
insert into medicao (nivelmetano, statusnivel, fksensor) values (5.10, 'risco de explosão', 5);
