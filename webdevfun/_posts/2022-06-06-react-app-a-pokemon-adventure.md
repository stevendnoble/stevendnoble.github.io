---
layout: post
title: "React App: A Pokémon Adventure"
description: >
  Dive into the captivating world of React and Pokémon with our latest blog post, where
  we guide you through creating your very own Pokédex application with React.
image: /assets/img/webdevfun/react-app-a-pokemon-adventure.jpg
tags: ['React', 'create-react-app', 'Node.js', 'Components', 'Modules', 'PokeAPI']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-06-20-state-and-props-in-react.md
  - webdevfun/_posts/2022-05-23-project-showcase-build-a-pokedex.md
sitemap: true
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

## Setting Up Your First React App: A Pokémon Adventure

Welcome to the exciting world of React and Pokémon! If you've ever dreamed of building your very own Pokédex or Pokémon-themed application, you're in the right place. This blog post will guide you through setting up your first React app with a fun twist — everything will be Pokémon-themed. So grab your Poké Balls, and let's embark on this development journey together!

## Why React for Your Pokémon Project?

React is a powerful JavaScript library for building user interfaces, particularly single-page applications. It's the perfect choice for a project like a Pokédex because of its component-based architecture, which allows for reusable code and efficient updates. Plus, React's ecosystem and tools make it easy to create interactive and dynamic web applications that can handle complex states and data — exactly what you need for displaying all those Pokémon!

## Step 1: Preparing for Your Journey
Before we dive into the code, ensure you have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your computer. These tools are essential for managing packages and dependencies in a React project. You can download them from the official Node.js website.

Open your terminal (Command Prompt for Windows, Terminal for macOS) and type the following commands to check that Node.js and npm are installed successfully:

~~~bash
node -v
npm -v
~~~

## Step 2: Creating Your React Pokédex
Open your terminal or command prompt, and let's use Create React App, a boilerplate to kickstart our React project. Run the following command to create a new React application named "my-pokedex":

### Catching Your First Pokémon with create-react-app and the PokéAPI

~~~bash
npx create-react-app my-pokedex
~~~

Navigate into your project directory:

~~~bash
cd my-pokedex
~~~

And start your development server:

~~~bash
npm start
~~~

Your browser should automatically open to http://localhost:3000, where you'll see your new React app running.

For our Pokédex to display Pokémon data, we'll use the PokéAPI, a RESTful API with a vast database of Pokémon information. Let's fetch our first Pokémon! First, clean up your `src/App.js` file to have a simple starting point. Then, modify it to fetch data from the PokéAPI:

~~~jsx
// file: "src/App.js"
import { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {pokemon ? (
          <div>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}
~~~

This code uses the useEffect hook to fetch Pikachu's data from the PokéAPI when the component mounts. It then displays Pikachu's name and image.

To make your Pokédex look more appealing, you can add some Pokémon-themed styling. Update your src/App.css file with styles of your choice. For example, you might want to give your app a color scheme that resembles a Poké Ball.

~~~css
/* file: "src/App.css" */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f8f8;
  color: #333;
  margin: 0;
  padding: 20px;
}

.App-header {
  background-color: #ffcb05; /* Pikachu yellow */
  color: #3b4cca; /* Pokédex blue */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.App {
  text-align: center;
}
~~~

## Step 3: Expanding Your Pokédex
Now that you've caught your first Pokémon, why stop there? You can extend your application to fetch and display more Pokémon, add search functionality, or even create individual pages for each Pokémon with React Router.

### Creating the Search Component

First, we need to implement a search bar that allows users to input the name or ID of a Pokémon and submit a search request to the PokéAPI. In your React app, create a new file named `Search.js` in the src directory. This component will render a search input and a button. We can also add a css module at `Search.module.css` for styling.

~~~jsx
// file: "src/Search.js"
import { useState } from 'react';
import styles from './Search.module.css';

export function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Pokémon name or ID"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
}
~~~

~~~css
/* file: "src/Search.module.css" */
.searchForm {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.searchInput {
  padding: 10px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  width: 250px;
}

.searchButton {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.searchButton:hover {
  background-color: #0056b3;
}
~~~

Modify `App.js` to include the Search component and handle the search functionality. When a user submits a search, fetch the Pokémon data from the PokéAPI and display it.

~~~jsx
// file: "src/App.js"
import { useState } from 'react';
import { Search } from './Search';
import './App.css';

export function App() {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = (query) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <Search onSearch={fetchPokemon} />
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}
~~~

### Creating a Pokémon Detail Page
To provide users with more detailed information about a Pokémon, let's create a dedicated detail page that displays attributes such as types, abilities, and stats. Create a new file named `PokemonDetail.js` in the src directory. This component will receive a Pokémon object as a prop and render its details. Similarly, add a `PokemonDetail.module.css`

~~~jsx
// file: "src/PokemonDetail.js"
import styles from './PokemonDetail.module.css';

export function PokemonDetail({ pokemon }) {
  return (
    <div className={styles.detailContainer}>
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.detailImage} />
      <p className={styles.detailText}>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p className={styles.detailText}>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
}
~~~

~~~css
/* file: "src/PokemonDetail.module.css" */
.detailContainer {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 400px;
}

.detailImage {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.detailText {
  color: #333;
  margin: 5px 0;
}
~~~

Back in `App.js`, import and use the PokemonDetail component to render the detailed information of the fetched Pokémon.

~~~jsx
// file: "src/App.js"
import { useState } from 'react';
import { Search } from './Search';
import { PokemonDetail } from './PokemonDetail';
import './App.css';

// App component definition...

      {pokemon && <PokemonDetail pokemon={pokemon} />}
~~~

By adding search functionality and a detailed Pokémon information page to your React app, you've significantly enhanced its interactivity and informational value. Users can now easily search for their favorite Pokémon and learn more about their characteristics, making your app a go-to Pokédex for Pokémon enthusiasts. Remember, the key to a successful app is not just the information it provides but also how engaging and user-friendly it is. Continue to refine and expand your app with more features, such as sorting, filtering, and even a comparison tool, to make it the ultimate Pokémon resource.

## Step 4: Creating a Pokédex

To add a Pokedex component to your React app that allows users to capture Pokémon and add them to their Pokedex, you'll need to follow these steps:

* **Create the Pokedex Component:** This component will display a list of captured Pokémon.

* **Modify the App Component:** To manage the state of captured Pokémon and pass down the functionality to capture a Pokémon.

* **Update the PokémonDetail Component:** To include a "Capture" button that adds the Pokémon to the Pokedex.

Create a new file named `Pokedex.js` in your src directory. This component will receive the list of captured Pokémon as props and render them. Also add a `Pokedex.module.css`

~~~jsx
// file: "src/Pokedex.js"
import styles from './Pokedex.module.css';

export function Pokedex({ capturedPokemons }) {
  return (
    <div className={styles.pokedexContainer}>
      <h2>My Pokedex</h2>
      <div className={styles.pokemonList}>
        {capturedPokemons.map(pokemon => (
          <div key={pokemon.name} className={styles.pokemonCard}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name.toUpperCase()}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
~~~

~~~css
/* file: "Pokedex.module.css" */
.pokedexContainer {
  padding: 20px;
  background-color: #f0f0f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.pokedexContainer h2 {
  color: #d53b47; /* Pokémon title color */
}

.pokemonList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.pokemonCard {
  background-color: white;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.pokemonCard img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.pokemonCard h3 {
  margin-top: 10px;
  color: #333;
  font-size: 16px;
}
~~~

Update your `App.js` to include state management for the Pokedex and a function to capture Pokémon. Additionally, render the Pokedex component and pass the captured Pokémon to it.

~~~jsx
// file: "src/App.js"
import { useState } from 'react';
import { Search } from './Search';
import PokemonDetail from './PokemonDetail';
import Pokedex from './Pokedex';
import './App.css';

export function App() {
  const [pokemon, setPokemon] = useState(null);
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  const fetchPokemon = query => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error:', error));
  };

  const capturePokemon = pokemon => {
    if (!capturedPokemons.find(p => p.name === pokemon.name)) {
      setCapturedPokemons(prev => [...prev, pokemon]);
    }
  };

  return (
    <div className="App">
      <Search onSearch={fetchPokemon} />
      {pokemon && <PokemonDetail pokemon={pokemon} onCapture={capturePokemon} />}
      <Pokedex capturedPokemons={capturedPokemons} />
    </div>
  );
}
~~~

Modify the PokemonDetail component to include a "Capture" button. You'll need to pass an onCapture function from the parent App component and call it when the button is clicked.

~~~jsx
// file: "src/PokemonDetail.js"
export function PokemonDetail({ pokemon, onCapture }) {
  return (
    <div className={styles.detailContainer}>
      {/* Existing code to display Pokémon details */}
      <button onClick={() => onCapture(pokemon)}>Capture</button>
    </div>
  );
}
~~~

~~~css
/*f ile: "add to PokemonDetail.module.css" */
.captureBtn {
  background-color: #ee6b2f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;
}

.captureBtn:hover {
  background-color: #cc5a24;
}
~~~

With these changes, your React app now includes a functional Pokedex component where users can capture Pokémon and view them in their Pokedex. The app fetches Pokémon data from the PokéAPI, allows for searching and viewing detailed information about Pokémon, and provides the ability to capture and collect them. This setup offers a solid foundation that you can further expand, such as adding the ability to release Pokémon from the Pokedex or enhancing the UI/UX with animations and more detailed styling.

![Project Showcase Website Screenshot](/assets/img/webdevfun/pokemon/pokedex-react.png){:lead loading="lazy"}

[See it live!](/webdevfun/pokemon/pokedex-react)
{:.figcaption}

## Embarking on Your Pokémon Development Adventure

Congratulations! You've set up your first React app and your own Pokédex. This is just the beginning of your adventure. As you become more familiar with React and the PokéAPI, you'll find endless possibilities for expanding your Pokédex and incorporating more features.

React makes it easy to build dynamic and interactive web applications, and when combined with the richness of the Pokémon universe, it opens up a world of creative opportunities. So continue exploring, learning, and building. The world of React and Pokémon awaits!