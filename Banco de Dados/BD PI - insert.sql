-- Estado
INSERT INTO estado (nome, sigla) VALUES 
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Mato Grosso', 'MT');

-- Cidade
INSERT INTO cidade (nome, fkEstado) VALUES 
('Belo Horizonte', 1),
('Parauapebas', 2),
('Cuiabá', 3);

-- Endereço
INSERT INTO endereco (logradouro, bairro, numero, cep, fkCidade) VALUES 
('Rua das Minas', 'Centro', '123', '30140071', 1),
('Av. Ferrovia', 'Industrial', '456', '68515000', 2),
('Travessa do Ouro', 'Mineração', '789', '78000000', 3);

-- Mineradora
INSERT INTO mineradora (nome, cnpj, fkEndereco) VALUES 
('Vale S.A.', '12345678000199', 1),
('CSN Mineração', '98765432000188', 2),
('Anglo American', '11223344000177', 3);

-- Cargo
INSERT INTO cargo (nome) VALUES 
('Engenheiro de Segurança'),
('Técnico em Mineração'),
('Gerente Operacional');

-- Funcionário
INSERT INTO funcionario (nome, sobrenome, email, senha, telefone_celular, fkMineradora, fkCargo) VALUES 
('Carlos', 'Silva', 'carlos.silva@vale.com', 'senha123', '31999998888', 1, 1),
('Ana', 'Santos', 'ana.santos@csn.com', 'senha456', '91988887777', 2, 2),
('João', 'Lima', 'joao.lima@anglo.com', 'senha789', '65977776666', 3, 3);

-- Medição
INSERT INTO medicao (nivelMetano, dataHora) VALUES 
(0.35, '2025-04-11 08:00:00'),
(1.60, '2025-04-11 08:10:00'),
(2.80, '2025-04-11 08:20:00');

-- Nível de Gás
INSERT INTO nivelGas (statusNivel) VALUES 
('Normal'),
('Evacuação parcial'),
('Evacuação total');

-- Local do Sensor
INSERT INTO localSensor (localSensor) VALUES 
('Túnel 1'),
('Galeria Norte'),
('Poço Central');

-- Sensor
INSERT INTO sensor (statusSensor, fkMineradora, fkLocal, fkMedicao, fkNivelGas) VALUES 
('Ativo', 1, 1, 1, 1),
('Inativo', 2, 2, 2, 2),
('Manutenção', 3, 3, 3, 3);