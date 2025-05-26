import Aluno from "./Aluno.js";

let form = document.querySelector("#formulario");
form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    let aluno = new Aluno();

    aluno.setNome(document.getElementById("id_nome").value);
    aluno.setMatricula(document.getElementById("id_matricula").value);

    //Cadastrar chave e valor localmente no navegador
    localStorage.setItem("nome", aluno.getNome());
    localStorage.setItem("matricula", aluno.getMatricula());

    //Consultar valor por índice
    let chave = localStorage.key(0);
    console.log("Chave: " + chave)

    //Consultar valor por chave
    let valor = localStorage.getItem(chave);
    console.log("Valor: " + valor);

    
});