const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const tbody = document.getElementById('contact-list');
const contador = document.getElementById('cont'); 
let numero= 0;

//Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-Ý\s]{3,40}$/, //Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-Ý\s]{3,40}$/, //Letras y espacios, pueden llevar acentos.
    telefono: /^\d{11}$/ //11 numeros.
}


const campos = {
    nombre: false,
    apellido: false,
    telefono: false  //NO se coloca coma (,) al ultimo elemento del objecto.
}


const validarFormulario = (e) => {

    switch (e.target.name) {

        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');

            break;

        case 'apellido':
            validarCampo(expresiones.apellido, e.target, 'apellido');

            break;

        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');

            break;

    }

}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;

    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //Ocurre un evento al presionar una tecla dentro del input ("tecla levantada").
    input.addEventListener('blur', validarFormulario); //Ocurre un evento al presionar fuera del input.

});





var selectedRow = null;
//Mostrar alertas.
function showAlert(message, className) {
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
    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
        icono.classList.remove('formulario__grupo-correcto');
    });
    document.querySelectorAll('.formulario__grupo-incorrecto').forEach((icono) => {
        icono.classList.remove('formulario__grupo-incorrecto');
    });

}


//Agregar datos
document.querySelector('#formulario').addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener valores del formulario
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const telefono = document.querySelector('#telefono').value;


    //Validar
    if (nombre == '' || apellido == '' || telefono == '' || !campos.nombre || !campos.apellido || !campos.telefono) {
        showAlert('Por favor llena todos los campos correctamente.', 'danger');
    } else {


        if (selectedRow == null) {
            formulario.reset();

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });


            const list = document.querySelector('#contact-list');
            const row = document.createElement('tr');


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
            localStorage.setItem('lista', tbody.innerHTML);

            console.log(tbody.children.length)
            // numero++;
            contador.innerHTML = tbody.children.length; 
            // localStorage.setItem('contador', contador.innerHTML);//contador suma


        } else {
            selectedRow.children[0].textContent = nombre;
            selectedRow.children[1].textContent = apellido;
            selectedRow.children[2].textContent = telefono;
            selectedRow = null;
            showAlert('Informacion de contacto actualizada.', 'info');
            localStorage.setItem('lista', tbody.innerHTML);
        }

        clearFields();



    }
});


//Editar datos
document.querySelector('#contact-list').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains('edit')) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#nombre').value = selectedRow.children[0].textContent;
        document.querySelector('#apellido').value = selectedRow.children[1].textContent;
        document.querySelector('#telefono').value = selectedRow.children[2].textContent;
        
        const campos = {
            nombre: false,
            apellido: false,
            telefono: false  //NO se coloca coma (,) al ultimo elemento del objecto.
        }

        // inputs.forEach((input) => {
        //     document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //     campos[campo] = true;   
        // }); 


        // validarCampo(expresiones.nombre, e.target, 'nombre');
        // validarCampo(expresiones.apellido, e.target, 'apellido');
        // validarCampo(expresiones.telefono, e.target, 'telefono');

    }
})

//Delete data
document.querySelector('#contact-list').addEventListener('click', (e) => {
    target = e.target;

    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Contacto borrado.', 'danger');
        localStorage.setItem('lista', tbody.innerHTML);
        contador.innerHTML = tbody.children.length; 

    }
});


//Almacenar datos:

(() => {
    tbody.innerHTML = localStorage.getItem('lista');
    contador.innerHTML = tbody.children.length;
})()


// IIFE immediatelly invoked function expression
