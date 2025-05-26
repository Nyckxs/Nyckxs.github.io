document.addEventListener('DOMContentLoaded', function() {
  // Choices.js para o select de motivo
  const element = document.getElementById('id_motivo');
  if (element) {
    new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true,
      placeholderValue: 'Selecione o motivo'
    });
  }

  // Lógica do formulário de login (se existir na página)
  const form = document.getElementById("id_form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("id_email").value;
      const senha = document.getElementById("id_senha").value;
      if (email === email && senha === senha) {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
          position: 'top-center',
        }).then(() => {
          window.location.href = "reuniao.html";
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login ou senha incorretos!',
          showConfirmButton: true
        });
      }
    });
  }
});