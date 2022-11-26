const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //Letras, numeros, guion y guion bajo. De 4 a 16 digitos.
    nombre: /^[a-zA-ZÀ-Ý\s]{2,40}$/, //Letras y espacios, pueden llevar acentos.
    password: /^.{4,15}$/, //De 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ //De 7 a 14 numeros.
}


const validarFormulario = (e) => {
    
    switch (e.target.name) {
        
        case 'usuario':
            validarCampo(expresiones.usuario, e.target, 'usuario');
            
            break;
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            
            break;
        case 'password':
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case 'password2':
            validarPassword2 ();            
            
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            
            break;
        
    }
    
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //Ocurre un evento al presionar una tecla dentro del input ("tecla levantada").
    input.addEventListener('blur', validarFormulario); //Ocurre un evento al presionar fuera del input.

});