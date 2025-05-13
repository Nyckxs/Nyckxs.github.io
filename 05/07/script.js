document.getElementById("form_pizza").addEventListener("submit", (e) => {
    e.preventDefault();
  
    let nome = document.getElementById("id_nome").value;
  
    let lista = document.getElementsByName("ingredientes");
    const ingredientes = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].checked) {
            ingredientes.push(lista[i].value);
        }
    }
  
    let tamanhos = document.getElementsByName("tamanho");
    let escolhido = "";
    for (let i = 0; i < tamanhos.length; i++) {
        if (tamanhos[i].checked) {
            escolhido = tamanhos[i].value;
            break;
        }
    }
  
    const tipo = document.getElementById("id_massa");
    const tipoEscolhido = tipo.value;
  
    let ender = document.getElementById("id_endereco").value;
  
    let mensagem = "";
    let men = "REVISE SEU PEDIDO";
  
    mensagem += `${men} \n`;
    mensagem += `𝐒𝐞𝐮 𝐧𝐨𝐦𝐞 𝐞́: ${nome} \n`;
    mensagem += `𝐎𝐬 𝐢𝐧𝐠𝐫𝐞𝐝𝐢𝐞𝐧𝐭𝐞𝐬 𝐞𝐬𝐜𝐨𝐥𝐡𝐢𝐝𝐨𝐬 𝐟𝐨𝐫𝐚𝐦: ${ingredientes.join(", ")} \n`;
    mensagem += `𝐎 𝐭𝐚𝐦𝐚𝐧𝐡𝐨 𝐝𝐚 𝐬𝐮𝐚 𝐩𝐢𝐳𝐳𝐚 𝐞́: ${escolhido} \n`;
    mensagem += `𝐎 𝐭𝐢𝐩𝐨 𝐝𝐚 𝐩𝐢𝐳𝐳𝐚 𝐞́: ${tipoEscolhido} \n`;
    mensagem += `𝐎 𝐬𝐞𝐮 𝐞𝐧𝐝𝐞𝐫𝐞𝐜̧𝐨 𝐞́: ${ender}`;
  
    alert(mensagem);
  });
  