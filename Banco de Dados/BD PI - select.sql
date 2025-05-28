select * from cidade
inner join estado on estado.id=cidade.fkestado;

select	m.nome as nome_empresa, m.cnpj,
		e.logradouro, e.cep,
		c.nome as cidade,
		uf.nome as estado
from mineradora as m
inner join endereco as e on e.fkMineradora = m.id
inner join cidade as c on c.id = e.fkcidade
inner join estado as uf on uf.id = c.fkestado;

select	f.nome, f.sobrenome, f.telefone_celular, f.email,
		c.nome as cargo
from funcionario as f
inner join cargo as c on c.id = f.fkcargo;


select	s.id as id_sensor, s.statussensor as status_sensor,
		m.nivelmetano as nivel_metano, m.statusnivel as status_nivel, m.datahora as hora_medicao,
		l.localsensor as local_sensor,
		se.sigla as sigla_setor
from sensor as s
inner join medicao as m on m.fksensor = s.id
inner join localSensor as l on l.id = s.fklocal
inner join setor as se	on se.id = l.fksetor
						and se.fkmineradora = l.fkmineradora;


-- especificando o sensor
select	s.id id_sensor, s.statusSensor,
		m.nivelMetano, m.statusNivel, m.dataHora
from sensor as s
inner join medicao as m on m.fkSensor = s.id
where s.id = 3;

-- especificando os alertas
select	s.id id_sensor, s.statusSensor,
		m.nivelMetano, m.statusNivel, m.dataHora
from sensor as s
inner join medicao as m on m.fkSensor = s.id
where m.statusNivel like 'Evacua%';