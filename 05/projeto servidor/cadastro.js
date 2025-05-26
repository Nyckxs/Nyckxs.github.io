// document.addEventListener('DOMContentLoaded', function() {
//     const motivoSelect = document.getElementById('id_MotivoReuniao');
//     const outroInput = document.getElementById('id_OutroMotivo');
//     const anotacao = document.getElementById('anotacaoMotivo');

//     function mostrarMotivoSalvo() {
//         const motivoSalvo = localStorage.getItem('motivoReuniao');
//         if (motivoSalvo) {
//             anotacao.textContent = 'Motivo salvo: ' + motivoSalvo;
//         } else {
//             anotacao.textContent = '';
//         }
//     }

    // if (motivoSelect) {
    //     motivoSelect.addEventListener('change', function() {
    //         if (this.value === 'outro') {
    //             outroInput.style.display = 'block';
    //         } else {
    //             outroInput.style.display = 'none';
    //             outroInput.value = ''; // Limpa o campo se não for "Outro"
    //         }
    //     });
    // }

//     const form = document.getElementById('id_formReuniao');
//     if (form) {
//         form.addEventListener('submit', function(event) {
//             event.preventDefault();
//             let motivo = motivoSelect.value;
//             let outroMotivo = outroInput.value;
//             let motivoFinal = motivo === 'outro' ? outroMotivo : motivo;
//             localStorage.setItem('motivoReuniao', motivoFinal);

//             console.log('Motivo salvo:', motivoFinal);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Motivo da reunião salvo com sucesso!',
//                 showConfirmButton: false,
//                 timer: 1500,
//                 backdrop: false,
//                 position: 'to-center',
//             });

//             mostrarMotivoSalvo();
//         });
//     }

//     mostrarMotivoSalvo();
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const formNumero = document.getElementById('id_FormNumeroReuniao');
//     const inputNumero = document.getElementById('id_NumeroReuniao');

//     if (formNumero && inputNumero) {
//         formNumero.addEventListener('submit', function(event) {
//             event.preventDefault();
//             const numero = inputNumero.value;
//             localStorage.setItem('numeroReuniao', numero);

//             // Exibe no console
//             console.log('Número da reunião salvo:', numero);

//             // Alerta com Swal
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Número da reunião salvo com sucesso!',
//                 showConfirmButton: false,
//                 timer: 1500,
//                 backdrop: false,
//                 position: 'top-center',
//             });
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    const motivoSelect = document.getElementById('id_MotivoReuniao');
    const outroInput = document.getElementById('id_OutroMotivo');
    const anotacao = document.getElementById('anotacaoMotivo');
    const form = document.getElementById('id_formReuniao');
    const formNumero = document.getElementById('id_FormNumeroReuniao');
    const inputNumero = document.getElementById('id_NumeroReuniao');

    // --- ESTE BLOCO DEVE FICAR AQUI DENTRO ---
    if (motivoSelect) {
        motivoSelect.addEventListener('change', function() {
            if (this.value === 'outro') {
                outroInput.style.display = 'block';
            } else {
                outroInput.style.display = 'none';
                outroInput.value = ''; // Limpa o campo se não for "Outro"
            }
        });
    }
    // -----------------------------------------

    // Função para buscar todas as reuniões salvas
    function getReunioes() {
        return JSON.parse(localStorage.getItem('reunioes')) || [];
    }

    // Função para salvar todas as reuniões
    function setReunioes(reunioes) {
        localStorage.setItem('reunioes', JSON.stringify(reunioes));
    }

    // Mostrar último motivo salvo
    function mostrarMotivoSalvo() {
        const reunioes = getReunioes();
        if (reunioes.length > 0) {
            const ultima = reunioes[reunioes.length - 1];
            anotacao.textContent = 'Motivo salvo: ' + ultima.motivo + (ultima.numero ? ' | Número: ' + ultima.numero : '');
        } else {
            anotacao.textContent = '';
        }
    }

    // Salvar motivo
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let motivo = motivoSelect.value;
            let outroMotivo = outroInput.value;
            let motivoFinal = motivo === 'outro' ? outroMotivo : motivo;

            let reunioes = getReunioes();
            reunioes.push({ motivo: motivoFinal, numero: null }); // número será preenchido depois
            setReunioes(reunioes);

            Swal.fire({
                icon: 'success',
                title: 'Motivo da reunião salvo com sucesso!',
                showConfirmButton: false,
                timer: 1500,
                backdrop: false,
                position: 'top-center',
            });

            mostrarMotivoSalvo();
        });
    }

    // Salvar número
    if (formNumero && inputNumero) {
        formNumero.addEventListener('submit', function(event) {
            event.preventDefault();
            let reunioes = getReunioes();
            if (reunioes.length === 0) {
                Swal.fire('Atenção', 'Cadastre um motivo antes de cadastrar o número!');
                return;
            }
            reunioes[reunioes.length - 1].numero = inputNumero.value;
            setReunioes(reunioes);

            Swal.fire({
                icon: 'success',
                title: 'Número da reunião salvo com sucesso!',
                showConfirmButton: false,
                timer: 1500,
                backdrop: false,
                position: 'top-center',
            });

            mostrarMotivoSalvo();
        });
    }

    mostrarMotivoSalvo();

    // Botão para consultar todas as reuniões
    const btnConsultar = document.createElement('button');
    btnConsultar.textContent = 'Consultar';
    btnConsultar.type = 'button';
    anotacao.after(btnConsultar);

    btnConsultar.addEventListener('click', function() {
        const reunioes = getReunioes();
        let lista = reunioes.map((r, i) => `#${i+1}: Motivo: ${r.motivo} | Número: ${r.numero ?? '---'}`).join('\n')
        `\n`;
        Swal.fire({
            title: 'Reuniões Salvas',
            text: lista || 'Nenhuma reunião cadastrada ainda.',
            backdrop: false,
            position: 'top-center',
        });
    });
});