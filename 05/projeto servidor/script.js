const form = document.getElementById("id_form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = document.getElementById("id_email").value;    
    const senha = document.getElementById("id_senha").value;

    if (email === "admin@gmail.com" && senha === "1472"){
        alert("Login realizado com sucesso!");
        window.location.href = "reuniao.html"; 
    } else {
        alert("Login ou senha incorretos!");
    }







})
