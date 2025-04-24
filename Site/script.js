function calcular() {
  var funcionarios = Number(ipt_funcionarios.value);
  var custoAcidente = Number(ipt_custoAcidente.value);
  var vazamentosAno = Number(ipt_vazamentosAno.value);

  var custoAcidentesTotal = custoAcidente * vazamentosAno;
  var economiaEstimada = custoAcidentesTotal * 0.8;
  var novoPrejuizo = custoAcidentesTotal - economiaEstimada;
  var novoVazamento = vazamentosAno * 0.2;

  if (funcionarios == '' || custoAcidente == '' || vazamentosAno == '') {
    alert("Os campos não podem estar vazios")
  } else {

    resultado.innerHTML = `<h2> Sem o Sistema </h2>
      <p>💥 Acidentes/ano: <strong>${vazamentosAno}</strong></p>
      <p class="destaque">💰 Custo anual com acidentes: <strong>R$ ${custoAcidentesTotal.toLocaleString()}</strong></p>
      <p class="destaque">💵 Economia Estimada: <strong>R$ - </strong></p> 
      <p>👷 Funcionários protegidos: <strong> - </strong></p>
      
    `;

    resultado2.innerHTML = `<h2> Com o Sistema </h2>
      <p>💥 Acidentes/ano: <strong>${novoVazamento.toFixed()}</strong></p>
      <p class="destaque">💰 Custo anual com acidentes: <strong>R$ ${novoPrejuizo.toLocaleString()}</strong></p>
      <p class="destaque">💵 Economia Estimada: <strong>R$ ${economiaEstimada.toLocaleString()}</strong></p>
      <p>👷 Funcionários protegidos: <strong>${funcionarios}</strong></p>
      
     
    `;
  }
}

function cadastro() {

  var chaveEmpresa = ipt_inserirCnpjEmpresa.value;
  var nomeFuncionario = ipt_nomeFuncionario.value;
  var email = ipt_email.value;
  var telefone = ipt_telefone.value;
  var senhaFunc = ipt_senhaFunc.value;
  var confirmarSenhaFunc = ipt_confirmarSenhaFunc.value;
  var sobrenomeFuncionario = ipt_sobrenomeFuncionario.value;
  var cargo = ipt_cargo.value;

  // Validando senha 
  if (senhaFunc != confirmarSenhaFunc) {

    alert("Senha confirmada diferente da senha inserida, faça novamente")

  } // Validando se todos os campos foram preenchidos 
  else if (chaveEmpresa == '' || nomeFuncionario == '' || email == '' || telefone == '' || senhaFunc == '' || confirmarSenhaFunc == '' || sobrenomeFuncionario == '' || cargo == '#') {

    alert("Preencha todos os campos")

  } // Validando se a chave empresa existe
  else if (chaveEmpresa != '1000') {

    alert("Esta empresa não está cadastrada")

  }// Validando Email
  else if (!email.includes("@")) {
    alert("Email inválido! Precisa conter @")
  }
  // Validando telefone
  else if (telefone.length != 11) {
    alert("Número de telefone inválido! Insira o DDD também (sem parênteses)")
  } // Validando funcionário
  else {
    alert(`Cadastro concluído com sucesso! Agora a(o) ${nomeFuncionario} ${sobrenomeFuncionario} é um(a) Minetecher!!! `)

    div_resposta3.innerHTML = `<a href="login.html">Login</a> <a href="index.html">Sair</a>`
  }

}

function login() {

  var emailFuncionario = ipt_emailFuncionario.value;
  var senhaLogin = ipt_senhaLogin.value;

  if (emailFuncionario != 'clara@sptech.school' || senhaLogin != '12345') {
    alert("Login Inválido! Senha ou chave própria incorretas")
  } else {

    var numero = prompt("Digite a chave da Empresa: ")

    while (numero != '0302') {
      numero = prompt("Você não digitou a chave correta")
    }

    if (numero == '0302') {
      alert("login feito com sucesso");
      window.location.href = 'dashboard_v1.html';

    }
  }
}