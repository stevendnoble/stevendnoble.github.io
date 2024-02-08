---
layout: post
title: "Project Showcase: Build Your Own Pokédex with JavaScript and the PokéAPI"
description: >
  Embark on an interactive journey through the Pokémon universe with our dynamic Pokédex project, a captivating
  showcase that merges the realms of web development and Pokémon fandom. Utilizing the robust PokéAPI, this project
  brings to life a user-friendly Pokédex, enabling enthusiasts to search, view, and capture their favorite Pokémon in a
  personalized box. Featuring responsive design powered by Bootstrap, intricate data handling with JavaScript, and
  efficient templating with Handlebars.js, the Pokédex stands as a testament to the creative and technical prowess of
  modern web development. Whether you're a seasoned developer or a passionate Pokémon trainer, this project invites you
  to explore the vast Pokémon database, offering an engaging platform to discover, collect, and cherish the diverse
  creatures of the Pokémon world.
image: /assets/img/webdevfun/project-showcase-build-your-own-pokedex-with-javascript-and-the-pokeapi.jpg
tags: ['HTML Templating', 'API Endpoints', 'Pokémon API', 'HTTP Requests', 'Handlebars.js', 'API Calls']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-04-25-rest-apis-unleashing-the-power-of-poke-balls-in-the-digital-realm.md
  - webdevfun/_posts/2022-05-09-catching-data-with-poke-balls-dynamic-content-with-html-templating-and-the-pokeapi.md
sitemap: false
---
Embark on a thrilling journey into the digital world of Pokémon, where aspiring web developers and Pokémon enthusiasts alike can unite their passions by building their very own Pokédex. Leveraging the vast database of the PokéAPI and the dynamic capabilities of JavaScript, this project offers an engaging way to explore web development while diving deep into the Pokémon universe. Let's set off on this coding adventure to create an interactive Pokédex that brings your favorite Pokémon to life right on your web page.

## The Quest Begins: Understanding the PokéAPI

The PokéAPI is a RESTful service that provides a comprehensive database of Pokémon information, including species, abilities, moves, and much more. It's a free resource that developers can use to fetch data about Pokémon in JSON format, making it an ideal starting point for creating interactive web applications. Before you start coding, take a moment to explore the PokéAPI documentation to familiarize yourself with its structure and the types of data available.

## Crafting Your Pokédex: Setting Up Your Project

Your journey starts with setting up the foundation for your Pokédex. Create a new HTML file for your project, and link a CSS file for styling and a JavaScript file where you'll write your fetching logic and interactivity.

### HTML Structure
Start by defining the basic structure of your Pokédex in your HTML file. You'll need a search input for users to type the name or number of the Pokémon they're looking for, a button to trigger the search, and a container to display the Pokémon data.

Handlebars.js is a powerful templating engine that lets you build semantic templates effectively. First, include Handlebars.js in your project by adding the script tag in the <head>. You can read more about Handlebars in my previous blog post, [Catching Data with Poké Balls: Dynamic Content with HTML Templating and the PokéAPI](2022-05-09-catching-data-with-poke-balls-dynamic-content-with-html-templating-and-the-pokeapi.md).
{:.note title="Handlebars.js"}

~~~html
<!-- file: "index.html" -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Pokédex</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/handlebars/dist/handlebars.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <header class="mb-4">
            <h1 class="text-center">Welcome to My Pokédex</h1>
        </header>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card search-card">
                    <div class="card-body">
                        <h5 class="card-title">Search for Pokémon</h5>
                        <form id="pokemon-search-form" class="input-group mb-3">
                            <input type="text" id="pokemon-search" class="form-control" placeholder="Enter Pokémon Name or ID">
                            <div class="input-group-append">
                                <button class="btn btn-secondary" type="submit" id="search-btn">Search</button>
                            </div>
                        </form>
                        <div id="pokemon-display">
                            <script id="pokemon-template" type="text/x-handlebars-template">
                                <div class="card mt-4 mb-4">
                                    <img src="{{image}}" class="card-img-top" alt="Image of {{name}}">
                                    <div class="card-body">
                                        <h5 class="card-title">{{name}}</h5>
                                        <p class="card-text">{{types}}</p>
                                        <button class="btn btn-info btn-block capture-btn" data-name="{{name}}" data-image="{{image}}" data-types="{{types}}">Capture</button>
                                    </div>
                                </div>
                            </script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-center py-4 mt-5">
        <p>Made with love by The Pokémon Chronicles Team</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
~~~

### CSS Styling

Add some basic styling to your style.css file. You'll want your Pokédex to be visually appealing, so feel free to get creative with the design.

~~~css
/* file: "styles.css" */
body {
    background-color: whitesmoke;
}

.search-card {
    background-color: lightgray;
}

.container {
    width: 80%;
    margin: auto;
    text-align: center;
}

#pokemon-display {
    margin-top: 20px;
}

.card {
    width: 100%;
}
~~~

### JavaScript Magic

In your script.js file, use the Fetch API to retrieve data from the PokéAPI based on the user's input. Then, dynamically update the #pokemon-display container with the fetched Pokémon data, including the Pokémon's name, image, and any other information you'd like to include.

~~~javascript
// file: "script.js"
const pokemonTemplate = document.getElementById('pokemon-template').innerHTML;

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
~~~

With your HTML structure in place, your CSS adding style to your Pokédex, and your JavaScript fetching and displaying Pokémon data, you're now the proud creator of an interactive Pokédex. This project not only enhances your web development skills but also deepens your appreciation for the Pokémon world through a developer's lens.

## Capturing and Storing Pokémon

Diving deeper into the realm of Pokémon and web development, let's extend the functionality to allow users to capture Pokémon by clicking the "Capture" button. First, check to see if the pokémon is already in your box. If it is not, add the Pokémon to a local array and stores it in localStorage.

~~~javascript
// file: "add to script.js"
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
~~~

## Viewing the Pokémon Box
Now that the pokémon are stored in the box, let's allow users to view captured Pokémon by implementing a feature to display the Pokémon stored in their box. First, move the search box to the left (remove the offset and change it to col-md-5) and add another box for the captured pokémon. Also add a template for

~~~html
<!-- file: "add to index.html" -->
<div class="col-md-7">
    <div class="card box-card">
        <div class="card-body">
            <h5 class="card-title">My Box</h5>
            <div id="pokemon-box" class="row">
                <script id="captured-pokemon-template" type="text/x-handlebars-template">
                    <div class="col-sm-6">
                        <div class="captured-pokemon-card card mt-4 mb-4" data-name="{{name}}"">
                            <img src="{{image}}" class="card-img-top" alt="Image of {{name}}">
                            <div class="card-body">
                                <h5 class="card-title">{{name}}</h5>
                                <p class="card-text">{{types}}</p>
                            </div>
                        </div>
                    </div>
                </script>
            </div>
            <button id="view-box-btn" class="btn btn-info mb-3">View My Pokémon Box</button>
        </div>
    </div>
</div>
~~~

Then add the javascript to show the pokémon that are stored. Here are the steps:

1. Generate a template from the `script#captured-pokemon-template` in the html file.
2. Load the array of pokémon in localStorage
3. Use Handlebars to compile the template that we pulled from the html.
4. Create an empty string `boxHtml` where we will append all of the html we want to add to the page.
5. Loop through all of the pokémon and append the template (with the data for each pokémon) to the boxHtml variable
6. Set that as the html inside the <div id="pokemon-box"> element.
7. Change the text in the button to say Update instead of View.

~~~js
// file: "add to script.js"
const capturedPokemonTemplate = document.getElementById('captured-pokemon-template').innerHTML;

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
~~~

## Releasing Pokémon

As you capture more and more pokémon, you will notice that the box does not ever empty. Since the pokémon are stored in localStorage, you need to explicitly release the pokémon. Let's add some functionality for that. First, update the template for the captured pokémon. Then add a data-name to the outer `<div>` and add the new `<button>` with the data-name.

~~~html
<!-- file: "add to index.html" -->
<script id="captured-pokemon-template" type="text/x-handlebars-template">
    <div class="col-sm-6">
        <div class="card mt-4 mb-4" data-name="{{name}}"">
            <img src="{{image}}" class="card-img-top" alt="Image of {{name}}">
            <div class="card-body">
                <h5 class="card-title">{{name}}</h5>
                <p class="card-text">{{types}}</p>
                <button class="btn btn-info btn-block release-btn" data-name="{{name}}">Release</button>
            </div>
        </div>
    </div>
</script>

~~~~

Implement a function to handle the release of a Pokémon. This function should filter the Pokémon with the given name from the array stored in localStorage, save it back to localStorage, and then update the display to reflect this change.

~~~javascript
// file: "add to script.js"
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
    document.querySelector(`.pokemon-card[data-name="${pokemonName}"]`).remove();
}
~~~

![Project Showcase Website Screenshot](/assets/img/webdevfun/pokemon/interactive-pokedex.png){:lead loading="lazy"}

[See it live!](/webdevfun/pokemon/pokedex)
{:.figcaption}

## Conclusion

As you continue to refine your Pokédex, consider adding more features, such as displaying a list of moves, evolutionary chains, or even integrating voice recognition for hands-free searches. The possibilities are as vast as the Pokémon universe itself, and your journey as a web developer and Pokémon Master is just beginning. So go forth, experiment, learn, and most importantly, have fun on this coding adventure!