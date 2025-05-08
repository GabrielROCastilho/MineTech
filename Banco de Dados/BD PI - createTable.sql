create database minetech;
use minetech;

create table estado(
		id int not null auto_increment,
        nome varchar(45) not null,
        sigla char(2),
        primary key (id)
);

create table cidade(
		id int not null auto_increment,
        nome varchar(45) not null,
        fkEstado int,
        primary key (id)
);

create table endereco(
        fkMineradora int not null,
        logradouro varchar(45),
        bairro varchar(45),
        numero varchar(10),
        cep varchar(8),
        fkCidade int,
        primary key(fkMineradora)
);

create table mineradora(
		id int not null auto_increment,
        nome varchar(50),
        cnpj char(14) unique,
        primary key (id)
);

create table cargo(
		id int not null auto_increment,
        nome varchar(45),
        primary key(id)
);

create table funcionario(
		id int not null auto_increment,
        nome varchar(45),
        sobrenome varchar(45),
        email varchar(45),
        senha varchar(255),
        telefone_celular char(11),
        fkMineradora int,
        fkCargo int,
        primary key (id)
);

create table setor(
	id int not null,
    fkMineradora int not null,
    sigla char(1),
    primary key(id, fkMineradora)
);

create table localSensor(
		id int not null auto_increment,
        localSensor varchar(45),
        fkSetor int not null,
        fkMineradora int not null,
        primary key(id)
);

create table sensor(
		id int not null auto_increment,
        statusSensor varchar(45),
		fkLocal int not null,
		primary key(id)
);

create table medicao(
		id int not null auto_increment,
        nivelMetano decimal(5,2),
        statusNivel varchar(45),
        dataHora timestamp default CURRENT_TIMESTAMP,
        fkSensor int not null,
        primary key(id)
);

alter table cidade add constraint fk_cidade_estado foreign key (fkEstado) references estado(id);

alter table endereco add constraint fk_endereco_mineradora foreign key (fkMineradora) references mineradora(id);
alter table endereco add constraint fk_endereco_cidade foreign key (fkCidade) references cidade(id);

alter table funcionario add constraint fk_funcionario_mineradora foreign key (fkMineradora) references mineradora(id);
alter table funcionario add constraint fk_funcionario_cargo foreign key (fkCargo) references cargo(id);

alter table setor add constraint fk_setor_mineradora foreign key (fkMineradora) references mineradora(id);

alter table localSensor add constraint fk_local_setor foreign key(fkSetor) references setor(id);
alter table localSensor add constraint fk_local_mineradora foreign key (fkMineradora) references setor(fkMineradora);

alter table sensor add constraint fk_sensor_local foreign key (fkLocal) references localSensor(id);

alter table medicao add constraint fk_medicao_sensor foreign key (fkSensor) references sensor(id);
