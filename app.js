let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
//El jugador no podrá jugar más de 5 juegos:
let maximoJuegos = 5;
/*El jugador sólo puede elegir entre 1 y numeroMaximo que es 10.
Los números generados se mantendrán dentro de ese rango.*/
let numeroMaximo = 10;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        //El usuario acertó.
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor.');
        } else {
            asignarTextoElemento('p','El número secreto es mayor.');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    /*Si ya sorteamos 5 números, el jugador no puede jugar más.
    El array listaNumerosSorteados no puede tener más de 5 elementos:*/
    if (listaNumerosSorteados.length === maximoJuegos) {
        asignarTextoElemento('p',`Ya jugaste el máximo de ${maximoJuegos} juegos.`);
        return;
    } else if (listaNumerosSorteados.includes(numeroGenerado)) { //(Si el numero generado está incluido en la lista.)
            return generarNumeroSecreto();       
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

function condicionesIniciales() {
    asignarTextoElemento('h1','¡Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja:
    limpiarCaja();
    //Indicar mensaje de intervalo de números.
    //Generar el número aleatorio.
    //Inicializar el número intentos.
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego:
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();