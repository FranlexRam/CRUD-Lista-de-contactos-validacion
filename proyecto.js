const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

//Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-Ý\s]{3,40}$/, //Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-Ý\s]{3,40}$/, //Letras y espacios, pueden llevar acentos.
    telefono: /^\d{11}$/ //11 numeros.
}


const validarFormulario = (e) => {
    
    switch (e.target.name) {
        
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            
            break;

        case 'apellido':
            validarCampo(expresiones.nombre, e.target, 'apellido');
            
            break;

        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            
            break;
        
    }
    
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos [campo] = true;
        
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos [campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //Ocurre un evento al presionar una tecla dentro del input ("tecla levantada").
    //input.addEventListener('blur', validarFormulario); //Ocurre un evento al presionar fuera del input.

});


var selectedRow = null;
//Mostrar alertas.
function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

//Borrar campos
function clearFields() {
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido').value = '';
    document.querySelector('#telefono').value = '';
        
}


//Agregar datos
document.querySelector('#formulario').addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener valores del formulario
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const telefono = document.querySelector('#telefono').value;

    //Validar
    if (nombre == '' || apellido == '' || telefono == '') {
        showAlert('Por favor llena todos los campos correctamente.', 'danger');        
    } else {
        if (selectedRow == null) {
            const list = document.querySelector('#contact-list');
            const row = document.createElement('tr');
            formulario.reset();

            row.innerHTML = `
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${telefono}</td>
            <td>
            <a href="#" class="btn btn-warning bt-sm edit">Editar</a>
            <a href="#" class="btn btn-danger bt-sm delete">Borrar</a>
            </td>            
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert('Nuevo contacto agregado.', "success");            
        } else {
            selectedRow.children[0].textContent = nombre;
            selectedRow.children[1].textContent = apellido;
            selectedRow.children[2].textContent = telefono;
            selectedRow = null;
            showAlert('Informacion de contacto actualizada.', 'info');
        }

        clearFields();
    


    }
});


//Editar datos
document.querySelector('#contact-list').addEventListener('click', (e) => {
    target = e.target;
    if(target.classList.contains('edit')){
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#nombre').value = selectedRow.children[0].textContent;
        document.querySelector('#apellido').value = selectedRow.children[1].textContent;
        document.querySelector('#telefono').value = selectedRow.children[2].textContent;
    }
})

//Delete data
document.querySelector('#contact-list').addEventListener('click', (e) =>{
    target = e.target;

    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Contacto borrado.', 'danger');        
    }
});