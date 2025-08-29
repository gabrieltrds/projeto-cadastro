//Regex
const regex = {
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  login: /^[A-Za-z0-9._-]{4,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  senha: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
};

const form = document.querySelector("form");
const nome = document.getElementById("nome");
const cpf = document.getElementById("CPF");
const login = document.getElementById("login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confSenha = document.getElementById("conf_senha");
const salario = document.getElementById("salario");
const dependentes = document.getElementById("dependentes");
const ir = document.getElementById("ir");

// IR somente leitura
ir.readOnly = true;

function setValid(el) {
  el.classList.remove("is-invalid");
  el.classList.add("is-valid");
}

function setInvalid(el) {
  el.classList.remove("is-valid");
  el.classList.add("is-invalid");
}


function validarNome() {
  if (nome.value.trim().length >= 3) {
    setValid(nome);
    return true;
  }
  setInvalid(nome);
  return false;
}

function validarCPF() {
  if (regex.cpf.test(cpf.value.trim())) {
    setValid(cpf);
    return true;
  }
  setInvalid(cpf);
  return false;
}

function validarLogin() {
  if (regex.login.test(login.value.trim())) {
    setValid(login);
    return true;
  }
  setInvalid(login);
  return false;
}

function validarEmail() {
  if (regex.email.test(email.value.trim())) {
    setValid(email);
    return true;
  }
  setInvalid(email);
  return false;
}

function validarSenha() {
  if (regex.senha.test(senha.value.trim())) {
    setValid(senha);
    return true;
  }
  setInvalid(senha);
  return false;
}

function validarConfirmacaoSenha() {
  if (confSenha.value.trim() === senha.value.trim() && confSenha.value.trim() !== "") {
    setValid(confSenha);
    return true;
  }
  setInvalid(confSenha);
  return false;
}

function validarSalario() {
  const valor = parseFloat(salario.value);
  if (!isNaN(valor) && valor > 0) {
    setValid(salario);
    return true;
  }
  setInvalid(salario);
  return false;
}

function validarDependentes() {
  const valor = parseInt(dependentes.value);
  if (!isNaN(valor) && valor >= 0) {
    setValid(dependentes);
    return true;
  }
  setInvalid(dependentes);
  return false;
}

// Cálculo do IR
dependentes.addEventListener("blur", () => {
  if (!validarSalario() || !validarDependentes()) {
    ir.value = "";
    return;
  }

  const s = parseFloat(salario.value);
  const d = parseInt(dependentes.value);
  let base = s - (d * 200);
  if (base < 0) base = 0;

  let aliquota = 0;
  if (base <= 2000.00) aliquota = 0;
  else if (base >= 2000.01 && base <= 3000.00) aliquota = 0.075;
  else if (base >= 3000.01 && base <= 4500.00) aliquota = 0.15;
  else if (base >= 4500.01 && base <= 6000.00) aliquota = 0.225;
  else aliquota = 0.275;

  ir.value = (base * aliquota).toFixed(2);
});

// Validação no envio
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita envio se inválido

  const valido =
    validarNome() &&
    validarCPF() &&
    validarLogin() &&
    validarEmail() &&
    validarSenha() &&
    validarConfirmacaoSenha() &&
    validarSalario() &&
    validarDependentes();

  if (valido) {
    alert("Usuário cadastrado.");
  } else {
    alert("Corrija os campos destacados!.");
  }
});


nome.addEventListener("blur", validarNome);
cpf.addEventListener("blur", validarCPF);
login.addEventListener("blur", validarLogin);
email.addEventListener("blur", validarEmail);
senha.addEventListener("blur", validarSenha);
confSenha.addEventListener("blur", validarConfirmacaoSenha);
salario.addEventListener("blur", validarSalario);
dependentes.addEventListener("blur", validarDependentes);


document.getElementById("btnLimpar")?.addEventListener("click", () => {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
  });
  ir.value = "";
});
