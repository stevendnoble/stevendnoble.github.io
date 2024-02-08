document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=12'; // Fetches first 12 Pokémon
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const source = document.getElementById('pokemon-template').innerHTML;
            const template = Handlebars.compile(source);
            data.results.forEach(pokemon => {
                fetch(pokemon.url) // Fetch individual Pokémon details
                    .then(response => response.json())
                    .then(details => {
                        const context = {
                            name: details.name,
                            sprites: details.sprites,
                            types: details.types.map(type => type.type.name).join(', ')
                        };
                        const html = template(context);
                        document.getElementById('pokemon-container').innerHTML += html;
                    });
            });
        })
        .catch(error => console.error('Error:', error));
});