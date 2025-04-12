select 	m.nome, 
		m.cnpj,
        e.cep,
        c.nome,
        uf.nome
from mineradora as m
inner join endereco as e on e.id = m.fkEndereco
inner join cidade as c on c.id = e.fkCidade
inner join estado as uf on uf.id = c.fkEstado;


select	f.nome,
		f.sobrenome,
        f.telefone_celular,
        c.nome
from funcionario as f
inner join cargo as c on c.id=f.fkcargo;


select	s.id,
		s.statussensor,
        m.nivelmetano,
        m.datahora,
        l.localsensor,
        n.statusnivel
from sensor as s
inner join localsensor as l on l.id=s.fkLocal
inner join medicao as m on m.id = s.fkMedicao
inner join nivelgas as n on n.id = s.fkNivelGas;
        