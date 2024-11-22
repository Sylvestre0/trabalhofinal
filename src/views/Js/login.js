var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");
var createAccont = document.querySelector("#createAccont");
var openAccont = document.querySelector("#openAccont");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// Enviar formulário de registro
document.getElementById("create").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const googleId = null;

    const userData = {
        name: name,
        email: email,
        password: senha,
        googleId: googleId
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        console.log("Resposta HTTP (registro):", response);
        return response.json();
    })
    .then(data => {
        console.log("Dados retornados pelo servidor (registro):", data);
    })
    .catch(error => {
        console.error("Erro ao enviar (registro):", error);
    });
});

// Enviar formulário de login
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const senha = document.querySelector("#loginPassword").value;

    const loginData = {
        email: email,
        password: senha
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        console.log("Resposta HTTP (login):", response);
        return response.json();
    })
    .then(data => {
        console.log("Dados retornados pelo servidor (login):", data);
    })
    .catch(error => {
        console.error("Erro ao enviar (login):", error);
    });
});
