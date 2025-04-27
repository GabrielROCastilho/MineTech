// CALCULADORA
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

// LOGIN
function login() {

  var emailFuncionario = ipt_emailFuncionario.value;
  var senhaLogin = ipt_senhaLogin.value;

  if (emailFuncionario != 'clara@sptech.school' || senhaLogin != '12345') {
    alert("Login Inválido! Senha ou usuário incorretos!")
  } else {
    alert("login feito com sucesso");
    window.location.href = 'dashboard.html';
  }

}

// CADASTRO FUNCIONARIO
function cadastrarUsuario() {

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
  else if (chaveEmpresa != '11111111111111') {

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

    div_resposta3.innerHTML = `<a href="login.html" class="btn-apos-cadastro">Login</a> <a href="index.html" class="btn-apos-cadastro">Sair</a>`
  }

}

// CADASTRO EMPRESA
function cadastrarEmpresa() {

  var cnpj = ipt_cnpj.value;
  var nomeFantasia = ipt_nomeFantasia.value;
  var cidade = ipt_cidade.value;
  var sigla = ipt_sigla.value;
  var cep = ipt_cep.value;
  var senha = ipt_senha.value;
  var confirmarSenha = ipt_confirmarSenha.value;
  var logradouro = ipt_logradouro.value;
  var bairro = ipt_bairro.value;
  var numero = Number(ipt_numero.value);
  var emailEmpresa = ipt_emailEmpresa.value;
  var i = 0;
  var apenasNumeros = true;

  // Confirmando senha
  if (senha != confirmarSenha) {

    alert("Senha confirmada diferente da senha inserida, faça novamente")

  }  //Conferindo se tudo está preenchido
  else if (cnpj == '' || nomeFantasia == '' || logradouro == '' || cidade == '' || sigla == '' || cep == '' || senha == '' || confirmarSenha == '' || emailEmpresa == '' || bairro == '' || numero == '') {

    alert("Preencha todos os campos")

  } else {
    // Validando CNPJ
    if (cnpj.length !== 14) {
      alert("CNPJ deve ter exatamente 14 números.");
      return
    }

    for (i = 0; i < cnpj.length; i++) {
      if (cnpj[i] < '0' || cnpj[i] > '9') {
        apenasNumeros = false;
        break;
      }
    }

    if (!apenasNumeros) {
      alert("CNPJ inválido! Insira apenas os 14 números.");
      return;
    }// Validando nome fantasia
    else if (nomeFantasia.length < 3) {
      alert("Nome fantasia inválido! Insira pelo menos 3 digitos.")
    }// Validando Email
    else if (!emailEmpresa.includes("@")) {
      alert("Email inválido! Precisa conter @")
    }//Validando logradouro
    else if (logradouro.length < 3) {
      alert("Logradouro inválido! Muito curto.")
    }// Validando bairro
    else if (bairro.length < 3) {
      alert("Bairro inválido! Muito curto.")
    }// Validando número
    else if (numero <= 0 || numero >= 99999) {
      alert("Número inválido! Insira um número maior que zero")
    }// Validando siglas dos estados
    else if (sigla.length != 2) {
      alert("Siglas de estados possui duas letras!")
    }// Validando o CEP
    else if (cep.length != 8) {
      alert("CEP inválido! O CEP deve ter 8 números (Não precisa colocar o hífen).");
    }// Concluindo o cadastro
    else {
      alert(`Cadastro concluído com sucesso! Agora a(o) ${nomeFantasia} é um(a) Minetecher!!! `)

      window.location.href = 'cadastro_usuario.html';

    }
  }
}

// DASHBOARD
