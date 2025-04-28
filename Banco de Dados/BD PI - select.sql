select 	m.nome nome_empresa, 
		m.cnpj,
        e.cep,
        c.nome cidade,
        uf.nome estado
from mineradora as m
inner join endereco as e on e.id = m.fkEndereco
inner join cidade as c on c.id = e.fkCidade
inner join estado as uf on uf.id = c.fkEstado;


select	f.nome nome,
		f.sobrenome,
        f.telefone_celular,
        c.nome cargo
from funcionario as f
inner join cargo as c on c.id=f.fkcargo;


select	s.id id_setor,
		s.statussensor status_sensor,
        m.nivelmetano nivel_metano,
        m.datahora hora_medicao,
        n.statusnivel status_nivel,
        l.localsensor local_sensor,
        se.sigla sigla_setor
from sensor as s
inner join localSensor as l on l.id=s.fkLocal
inner join medicao as m on m.id = s.fkMedicao
inner join nivelGas as n on n.id = s.fkNivelGas
inner join setor as se on se.idsetor = l.fksetor;
        