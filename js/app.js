//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
    });
}

//Funciones

function agregarTweet(e) {
    e.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validación
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacío');

        //return evita que se ejecute más línea de código
        return;
    }

    const tweetObj = {
        id: Date.now(),
        //Como llave y valor son iguales, solo pasamos "tweet" una vez
        tweet

    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Una vez agregado, creamos el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar el error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            const li = document.createElement('LI');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Insetarlo en el html
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a Local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}