const pokemonTemplate = document.getElementById('pokemon-template').innerHTML;
const capturedPokemonTemplate = document.getElementById('captured-pokemon-template').innerHTML;

document.getElementById('pokemon-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const pokemonName = document.getElementById('pokemon-search').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            const template = Handlebars.compile(pokemonTemplate);
            const context = {
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map(type => type.type.name).join(', ')
            };
            const html = template(context);
            document.getElementById('pokemon-display').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
});

function capturePokemon(pokemon) {
    let pokemonBox = JSON.parse(localStorage.getItem('pokemonBox')) || [];

    const isPokemonCaptured = pokemonBox.some(storedPokemon => storedPokemon.name === pokemon.name);

    if (!isPokemonCaptured) {
        pokemonBox.push(pokemon);
        localStorage.setItem('pokemonBox', JSON.stringify(pokemonBox));
        alert(`${pokemon.name} was captured and added to your box!`);
    } else {
        alert(`${pokemon.name} is already in your box.`);
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.className.includes('capture-btn')) {
        const pokemon = {
            name: e.target.getAttribute('data-name'),
            image: e.target.getAttribute('data-image'),
            types: e.target.getAttribute('data-types')
        };
        capturePokemon(pokemon);
    }
});

document.getElementById('view-box-btn').addEventListener('click', function(e) {
    const pokemonBox = JSON.parse(localStorage.getItem('pokemonBox')) || [];
    const template = Handlebars.compile(capturedPokemonTemplate);
    let boxHtml = '';
    pokemonBox.forEach(pokemon => {
        boxHtml += template(pokemon);
    });
    document.getElementById('pokemon-box').innerHTML = boxHtml;
    event.target.textContent = "Update My Pokémon Box";
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.className.includes('release-btn')) {
        const pokemonName = event.target.getAttribute('data-name');
        releasePokemon(pokemonName);
    }
});

function releasePokemon(pokemonName) {
    let pokemonBox = JSON.parse(localStorage.getItem('pokemonBox')) || [];
    pokemonBox = pokemonBox.filter(pokemon => pokemon.name !== pokemonName);
    localStorage.setItem('pokemonBox', JSON.stringify(pokemonBox));
    document.querySelector(`.captured-pokemon-card[data-name="${pokemonName}"]`).remove();
}