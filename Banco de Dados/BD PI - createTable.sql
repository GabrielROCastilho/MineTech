create database minetech;
use minetech;

create table estado(
		id int primary key auto_increment,
        nome varchar(45) not null,
        sigla char(2)
);

create table cidade(
		id int primary key auto_increment,
        nome varchar(45) not null,
        fkEstado int,
        foreign key (fkEstado) references estado(id)
);

create table endereco(
		id int primary key auto_increment,
        logradouro varchar(45),
        bairro varchar(45),
        numero varchar(10),
        cep varchar(8),
        fkCidade int,
        foreign key (fkCidade) references cidade(id)
);

create table mineradora(
		id int primary key auto_increment,
        nome varchar(50),
        cnpj char(14) unique,
        fkEndereco int,
        foreign key (fkEndereco) references endereco(id)
);

create table cargo(
		id int primary key auto_increment,
        nome varchar(45)
);

create table funcionario(
		id int primary key auto_increment,
        nome varchar(45),
        sobrenome varchar(45),
        email varchar(45),
        senha varchar(255),
        telefone_celular char(11),
        fkMineradora int,
        fkCargo int,
        foreign key (fkMineradora) references mineradora(id),
        foreign key (fkCargo) references cargo(id)
);

create table medicao(
		id int primary key auto_increment,
        nivelMetano decimal(5,2),
        dataHora timestamp default CURRENT_TIMESTAMP
);

create table nivelGas(
		id int primary key auto_increment,
        statusNivel varchar(45)
);

create table localSensor(
		id int primary key auto_increment,
        localSensor varchar(45)
);

create table sensor(
		id int primary key auto_increment,
        statusSensor varchar(45),
        fkMineradora int,
        fkLocal int,
        fkMedicao int,
        fkNivelGas int,
        foreign key (fkMineradora) references mineradora(id),
        foreign key (fkLocal) references localSensor(id),
        foreign key (fkMedicao) references medicao(id),
        foreign key (fkNivelGas) references nivelGas(id)
        
);

