let indiceEditando = null; 
document.addEventListener('DOMContentLoaded', function() {
    const motivoSelect = document.getElementById('id_MotivoReuniao');
    const outroInput = document.getElementById('id_OutroMotivo');
    const anotacao = document.getElementById('anotacaoMotivo');
    const form = document.getElementById('id_formReuniao');
    const formNumero = document.getElementById('id_FormNumeroReuniao');
    const inputNumero = document.getElementById('id_NumeroReuniao');


    if (motivoSelect) {
        motivoSelect.addEventListener('change', function() {
            if (this.value === 'outro') {
                outroInput.style.display = 'block';
            } else {
                outroInput.style.display = 'none';
                outroInput.value = ''; 
            }
        });
    }

    function getReunioes() {
        return JSON.parse(localStorage.getItem('reunioes')) || [];
    }

    function setReunioes(reunioes) {
        localStorage.setItem('reunioes', JSON.stringify(reunioes));
    }

    
    function mostrarMotivoSalvo() {
        const reunioes = getReunioes();
        if (reunioes.length > 0) {
        } else {
            anotacao.textContent = '';
        }
    }

    
    let indiceEditando = null;
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let motivo = motivoSelect.value;
            let outroMotivo = outroInput.value;
            let motivoFinal = motivo === 'outro' ? outroMotivo : motivo;

            let reunioes = getReunioes();

            if (indiceEditando !== null) {
                
                reunioes[indiceEditando].motivo = motivoFinal;
                setReunioes(reunioes);
                indiceEditando = null; 
                Swal.fire({
                    icon: 'success',
                    title: 'Motivo da reunião editado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false,
                    position: 'top-center',
                });
            } else {
                
                reunioes.push({ motivo: motivoFinal, numero: null });
                setReunioes(reunioes);
                Swal.fire({
                    icon: 'success',
                    title: 'Motivo da reunião salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false,
                    position: 'top-center',
                });
            }

            mostrarMotivoSalvo();
        });
    }

    
    if (formNumero && inputNumero) {
        formNumero.addEventListener('submit', function(event) {
            event.preventDefault();
            let reunioes = getReunioes();
            if (reunioes.length === 0) {
                Swal.fire('Atenção', 'Cadastre um motivo antes de cadastrar o número!');
                return;
            }
            else if (indiceEditando !== null) {
                reunioes[indiceEditando].numero = inputNumero.value;
                setReunioes(reunioes);
                indiceEditando = null;
                Swal.fire({
                    icon: 'success',
                    title: 'Número da reunião editado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false,
                    position: 'top-center',
                });
            } else {
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
            }
            mostrarMotivoSalvo();
        });
    }

    mostrarMotivoSalvo();

    
    const btnConsultar = document.createElement('button');
    btnConsultar.textContent = 'Consultar';
    btnConsultar.type = 'button';
    anotacao.after(btnConsultar);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.type = 'button';
    btnConsultar.after(btnEditar);

    btnConsultar.addEventListener('click', function() {
        const reunioes = getReunioes();
        let lista = reunioes.map((r, i) => 
            `#${i+1} Motivo: "${r.motivo}" Número: "${r.numero ?? '---'}"`
        ).join('<br>');
        Swal.fire({
            title: 'Reuniões Salvas',
            html: lista || 'Nenhuma reunião cadastrada ainda.',
            backdrop: false,
            position: 'top-center',
        });
    });

btnEditar.addEventListener('click', function() {
    const reunioes = JSON.parse(localStorage.getItem('reunioes')) || [];
    if (reunioes.length === 0) {
        Swal.fire('Atenção', 'Nenhuma reunião cadastrada para editar!');
        return;
    }

    const options = reunioes.map((r, i) => `<option value="${i}">#${i+1} - ${r.motivo} (${r.numero ?? '---'})</option>`).join('');
    
    Swal.fire({
        title: 'Editar Reunião',
        html: `<select id="selectReuniao">${options}</select>`,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        backdrop: false,
        position: 'top-center',
    }).then(result => {
        if (result.isConfirmed) {
            const select = document.getElementById('selectReuniao');
            const index = select.value;
            const reuniao = reunioes[index];
            motivoSelect.value = reuniao.motivo;
            const motivosPadrao = ['reuniao', 'treinamento'];

motivoSelect.value = motivosPadrao.includes(reuniao.motivo) ? reuniao.motivo : 'outro';
outroInput.value = motivosPadrao.includes(reuniao.motivo) ? '' : reuniao.motivo;
outroInput.style.display = motivosPadrao.includes(reuniao.motivo) ? 'none' : 'block';
            inputNumero.value = reuniao.numero || '';
            indiceEditando = Number(index); 
        }
    });
});

bntExcluir = document.createElement('button');
bntExcluir.textContent = 'Excluir';
bntExcluir.type = 'button';     
anotacao.after(bntExcluir);
bntExcluir.addEventListener('click', function() {
    const reunioes = getReunioes();
    if (reunioes.length === 0) {
        Swal.fire('Atenção', 'Nenhuma reunião cadastrada para excluir!');
        return;
    }

    const options = reunioes.map((r, i) => `<option value="${i}">#${i+1} - ${r.motivo} (${r.numero ?? '---'})</option>`).join('');
    
    Swal.fire({
        title: 'Excluir Reunião',
        html: `<select id="selectReuniao">${options}</select>`,
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
        backdrop: false,
        position: 'top-center',
    }).then(result => {
        if (result.isConfirmed) {
            const select = document.getElementById('selectReuniao');
            const index = select.value;
            reunioes.splice(index, 1); 
            setReunioes(reunioes);
            mostrarMotivoSalvo();
            Swal.fire({
                icon: 'success',
                title: 'Reunião excluída com sucesso!',
                showConfirmButton: false,
                timer: 1500,
                backdrop: false,
                position: 'top-center',
            });
        }
    });

});

    if (motivoSelect) {
        new Choices(motivoSelect, {
            searchEnabled: false,
            itemSelectText: '',
            placeholder: true,
            placeholderValue: 'Selecione o motivo'
        });
    }
}
);