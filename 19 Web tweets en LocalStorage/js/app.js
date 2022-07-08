// ! Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// ! Events listeners
addEventListener();
function addEventListener() {
    // User add tweet
    formulario.addEventListener('submit', agregarTweet);
    // Document is ready
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

// ! Functions
function agregarTweet(e) {
    e.preventDefault();
    // Textarea write
    const tweet = document.querySelector('#tweet').value;
    if (tweet.length > 2) {
        // Create a new object
        const tweetObj = {
            id: Date.now(),
            tweet: tweet,
            // only tweet, working, not necessarily tweet: tweet,
        };
        // Add object to the array tweets
        tweets = [...tweets, tweetObj];
        // Call function to create html element
        crearHTML();
        // Reset form
        formulario.reset();
    } else if (tweet.length === 0) {
        mostrarError('El texto no puede ir vacio');
    } else {
        mostrarError('Debe tener al menos 3 caracteres');
    }
}

// Show error message
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    // Insert HTML in content
    const contenido = document.querySelector('#contenido');
    if (contenido.lastChild.classList === undefined) {
        contenido.appendChild(mensajeError);
        setTimeout(() => {
            mensajeError.remove();
        }, 2000);
    }
}

// Create tweets html element
function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach((tweet) => {
            // Create btn to delete tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };
            // Create html element
            const li = document.createElement('li');
            // Add text
            li.innerText = tweet.tweet;
            li.id = tweet.id;
            // Add btnEliminar
            li.appendChild(btnEliminar);
            // Insert in html
            listaTweets.appendChild(li);
        });
    }
    actualizarLocalStorage();
}

// Add tweets to local storage
function actualizarLocalStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Delete tweet
function borrarTweet(id) {
    tweets = tweets.filter((tweets) => tweets.id !== id);
    crearHTML();
}

// Clear html
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}