---
layout: post
title: "Harnessing State and Props in React with Functional Components: A Pokémon Adventure"
description: >
  In this insightful blog post, we dive into the art of creating a dynamic and responsive layout for a Pokémon-themed
  React application, specifically focusing on organizing Pokémon details and their evolution chain side by side using
  CSS Flexbox. Through a practical example, we explore the steps to fetch and display data from the PokéAPI,
  highlighting the integration of Pokémon stats and evolutionary paths within a single, cohesive component. This guide
  not only demonstrates how to leverage React functional components and state management to handle API data but also
  showcases the power of Flexbox for crafting responsive designs. Perfect for developers looking to enhance their UI
  layout skills in React projects, this post provides valuable insights into combining external API data with effective
  layout strategies to create engaging, user-friendly applications.
image: /assets/img/webdevfun/harnessing-state-and-props-in-react-with-functional-components-a-pokemon-adventure.jpg
tags: ['React', 'React state management', 'Component design patterns', 'Flexbox in React', 'PokeAPI']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-06-06-setting-up-your-first-react-app-a-pokemon-adventure.md
  - webdevfun/_posts/2022-05-23-project-showcase-build-your-own-pokedex-with-javascript-and-the-pokeapi.md
sitemap: false
---

* this unordered seed list will be replaced by the toc
{:toc}

Welcome to the vibrant world of React, where the journey to mastering functional components awaits! Gone are the days when class components were the only way to manage state and lifecycle in React. With the advent of Hooks, functional components have risen to prominence, offering a more concise and elegant way to build your React applications. Today, we embark on a Pokémon-themed adventure to explore the realms of state and props using only functional components. Prepare your Poké Balls, as we dive into creating an interactive Pokédex with React Hooks!

## The Magic of `useState`: Evolving Your Pokémon

In the React ecosystem, `useState` is akin to a Rare Candy, allowing your Pokémon (components) to evolve and adapt dynamically. This Hook enables functional components to hold and set state, a capability once exclusive to class components.

### Training Your Pokémon with `useState`

Imagine you're on a quest to catch a Pikachu. Using the `useState` Hook, you can track whether you've successfully caught it in your Pokédex:

~~~jsx
import { useState } from 'react';

export function Pokéball() {
  const [isCaptured, setCaptured] = useState(false);

  const capturePikachu = () => {
    setCaptured(true);
  };

  return (
    <div>
      <p>{isCaptured ? 'Pikachu was captured!' : 'A wild Pikachu appears!'}</p>
      <button onClick={capturePikachu}>Capture</button>
    </div>
  );
}
~~~

In this snippet, `useState` initializes `isCaptured` to `false`. When the "Capture" button is clicked, `capturePikachu` is invoked, setting `isCaptured` to `true` and updating the component's state to reflect Pikachu's capture.

## `props`: Sharing Your Pokédex Entries

In the world of React, `props` act as the Pokédex data shared between Trainers. They allow you to pass data from parent components down to child components, ensuring that every part of your app can access the Pokémon information it needs.

### Displaying Your Pokémon with `props`
To showcase the Pokémon you've encountered on your journey, use `props` to pass data to a Pokémon display component:

~~~jsx
function Pokemon({ name, type }) {
  return <div>You've encountered a wild {name}, a {type} type Pokémon.</div>;
}

function App() {
  return <Pokemon name="Bulbasaur" type="Grass/Poison" />;
}
~~~

This example demonstrates how props are used to pass the name and type of a Pokémon to the Pokemon component, which then renders the information about the encountered Pokémon.

## Sharing State Across Components: A Trainer's Strategy

Sometimes, a Pokémon Trainer needs to share their Pokédex data with fellow Trainers. Similarly, in React, you might need to share state between components. This is where the concept of "lifting state up" comes into play, enabling multiple components to access and react to the same state.

### Lifting State Up in Functional Components

Consider a scenario where you have multiple components that need to know about the selected Pokémon in your Pokédex:

~~~jsx
import { useState } from 'react';

export function SelectPokemon({ onPokemonSelect }) {
  const handleChange = (event) => {
    onPokemonSelect(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="pikachu">Pikachu</option>
      <option value="charmander">Charmander</option>
      {/* More Pokémon options */}
    </select>
  );
}

export function App() {
  const [selectedPokemon, setSelectedPokemon] = useState('');

  return (
    <div>
      <SelectPokemon onPokemonSelect={setSelectedPokemon} />
      <p>Selected Pokémon: {selectedPokemon.toUpperCase()}</p>
    </div>
  );
}
~~~

In this example, `App` maintains the state of the selected Pokémon, while `SelectPokemon` updates it. This pattern allows the state to be shared and updated across different parts of the application.

## Adding New Features to the Pokémon App

If you are not starting from the previous blog post, [clone the repo](https://github.com/stevendnoble/my-pokedex).

### Suggested Structure

Start by updating the structure of the React application.

~~~arduino
my-pokedex/
└── src/
    ├── components/
    │   ├── PokemonDetails/
    │   │   ├── PokemonDetails.js
    │   │   └── PokemonDetails.module.css
    │   ├── EvolutionChain/
    │   │   ├── EvolutionChain.js
    │   │   └── EvolutionChain.module.css
    │   └── Search/
    │       ├── Search.js
    │       └── Search.module.css
    ├── api/
    │   └── pokeApi.js
    ├── App.js
    ├── App.css
    └── index.js
~~~

#### Description of the Structure
**`src/components`/:** This directory houses the React components with CSS modules alongside them, ensuring styles are scoped to that component only. For the Pokédex app, it includes:

* **`PokemonDetails.js`:** This component displays the detailed information about a selected Pokémon, including its stats and evolution chain.
* **`Pokedex.js`:** This component displays all Pokémon that have been caught by the user.
* **`Search.js`:** This component has a search bar and functionality.

**`src/api/`:** This directory is suggested for organizing API-related functions or services. It's not a default directory created by Create React App, but it's a useful convention for separating API logic from UI components. For the Pokédex app, it includes:

* **`pokeApi.js`:** Contains the functions to fetch data from the PokéAPI. This includes fetching Pokémon details, species information, and evolution chain data. By isolating these functions in a separate file, you keep your components cleaner and more focused on rendering UI.

**`src/App.js`:** The main component that serves as the entry point for your application. It would typically manage the state for the selected Pokémon and render the PokemonDetails component, among other things.

**`src/App.css`:** Contains global styles for your app. You can also include component-specific styles here, or you might choose to create separate CSS modules or files for each component (e.g., PokemonDetails.css).

**`src/index.js`:** The JavaScript entry file where you render the root React component (<App />) into the DOM, typically inside a div with the ID of "root".

When the files are moved into these subdirectories, change the references to the files in the imports in `App.js`:

~~~jsx
// file: "update in App.js"
import Search from './components/Search/Search';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import Pokedex from './components/Pokedex/Pokedex';
~~~

#### Move API Calls to `src/api/`

The `pokeApi.js` file acts as a service layer in your React application, abstracting away the API logic required to fetch data from the PokéAPI. This file should contain the function for fetching Pokémon details as well as any new API calls. Here's an example of what the `pokeApi.js` file might look like,:

~~~js
// file: "src/api/pokeApi.js"

const BASE_URL = 'https://pokeapi.co/api/v2/';

// Fetch details for a single Pokémon by name
export const fetchPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch Pokémon details:", error);
    throw error;
  }
};
~~~

To use this functions in your components, you would typically call them when a component mounts or in response to user actions (e.g., selecting a Pokémon to view its details). For example, in `App.js` we import the `fetchPokemonDetails` method, add loading and error states, implement a `handleSearch` function that calls the `fetchPokemonDetails` method, and add that to the `onSearch` prop:

~~~jsx
// file: "src/App.js"
import { useState } from 'react';
import { Search } from './components/Search/Search';
import { PokemonDetail } from './components/PokemonDetail/PokemonDetail';
import { Pokedex } from './components/Pokedex/Pokedex';
import { fetchPokemonDetails } from './api/pokeApi';
import './App.css';

export function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  const handleSearch = pokemonName => {
    setLoading(true);
    setError(null);

    fetchPokemonDetails(pokemonName)
      .then(data => {
        setPokemon(data); // Store the fetched Pokémon data in state
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch Pokémon:", err);
        setError('Failed to fetch Pokémon. Please try again.');
        setLoading(false);
      });
  }

  const capturePokemon = pokemon => {
    if (!capturedPokemons.find(p => p.name === pokemon.name)) {
      setCapturedPokemons(prev => [...prev, pokemon]);
    }
  };

  return (
    <div className="App">
      <Search onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}      {pokemon && <PokemonDetail pokemon={pokemon} onCapture={capturePokemon} />}
      <Pokedex capturedPokemons={capturedPokemons} />
    </div>
  );
}
~~~

### Enhancing the Pokémon Details Page

Every Pokémon Trainer values detailed information about their Pokémon's strengths, weaknesses, and abilities. Implementing a detailed stats page allows users to explore in-depth data about their captured Pokémon.

#### Implementing the Enhanced Details

**Fetch Detailed Pokémon Data:** When a user selects a Pokémon, fetch detailed data from the PokéAPI, including stats like HP, Attack, Defense, Speed, Special Attack, and Special Defense.

**Create a PokemonDetails Component:** This component displays the detailed information. Use props to pass the Pokémon data to this component.

~~~jsx
// file: "add to PokemonDetail.js"
<div className={styles.pokemonStats}>
   {pokemon.stats.map((stat) => (
     <p key={stat.stat.name} className={styles.detailText}><b>{`${stat.stat.name}:`}</b> {`${stat.base_stat}`}</p>
   ))}
 </div>
~~~

~~~css
/* file: "add to PokemonDetail.module.css" */
.pokemonStats {
  width: 80%;
  background-color: #f0f0f8;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
~~~

You can now see the stats on the card when you search for a new pokémon.

#### Evolution Chain Display

The journey of a Pokémon's growth through evolution is a tale as old as the Pokémon world itself. Displaying a Pokémon's evolution chain adds a layer of depth to your Pokédex.

**Fetch Evolution Chain Data:** Upon selecting a Pokémon, fetch its evolution chain data from the PokéAPI. This data outlines the evolution stages of the Pokémon, from its initial form to its final evolution. In the `pokeApi.js` file, create new functions to fetch the species and evolution data. In the `App.js` file, import the new functions and update the `handleSearch` method.

~~~js
// file: "add to pokeApi.js"
// Fetch species information to get the evolution chain URL
export const fetchPokemonSpecies = async (pokemonId) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon-species/${pokemonId}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch Pokémon species:", error);
    throw error;
  }
};

// Fetch the evolution chain data
export const fetchEvolutionChain = async (evolutionChainUrl) => {
  try {
    const response = await fetch(evolutionChainUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch evolution chain:", error);
    throw error;
  }
};
~~~

~~~jsx
// file: "update in App.js"
import { fetchPokemonDetails, fetchPokemonSpecies, fetchEvolutionChain } from '../api/pokeApi';

// ...

const handleSearch = async (pokemonName) => {
  setLoading(true);
  setError(null);
  try {
    // Fetch the basic Pokémon details
    const details = await fetchPokemonDetails(pokemonName);

    // Once we have the details, fetch the species information for the evolution chain URL
    const species = await fetchPokemonSpecies(details.species.id);

    // Now, fetch the actual evolution chain data using the URL from the species data
    const evolutionData = await fetchEvolutionChain(species.evolution_chain.url);

    setPokemon(details);
    setEvolutionChain(evolutionData);
  } catch (err) {
    console.error("Failed to fetch Pokémon data:", err);
    setError('Failed to fetch Pokémon data. Please try again.');
  } finally {
    setLoading(false);
  }
};

// ...

// add evolutionChain to the props sent to PokemonDetail component
{pokemon && <PokemonDetail pokemon={pokemon} evolutionChain={EvolutionChain} onCapture={capturePokemon} />}
~~~

* **Sequential API Calls:** The `handleSearch` function first fetches the Pokémon details using its name. It then uses the species URL from the details response to fetch the species data, which contains the URL for the evolution chain. Finally, it fetches the evolution chain data.
* **State Management:** The function updates the React state with the fetched Pokémon details and evolution chain data. It also handles loading and error states to provide feedback to the user.
* **Error Handling:** The function uses a try-catch block to catch any errors that may occur during the API calls. If an error occurs, it sets the error state, which can be displayed to the user.
* **Component Rendering:** The `App` component conditionally renders the `PokemonDetail` component, passing it the fetched pokemon and evolutionChain data as props.

By updating the `handleSearch` function to include fetching the evolution data, you provide a more comprehensive overview of each Pokémon, enhancing the user experience by offering detailed insights into their evolution paths directly within your search functionality.

**Create an EvolutionChain Component:** This component visualizes the evolution chain. Pass the evolution data to this component using props. Then use that component in the `PokemonDetail` component.

~~~jsx
// file: "src/components/EvolutionChain/EvolutionChain.js"
import styles from './EvolutionChain.module.css';

// Helper function to recursively render the evolution chain
const renderEvolution = (species, evolutionDetails) => {
  return (
    <div key={species.name}>
      <p>{species.name.toUpperCase()}</p>
      {evolutionDetails && evolutionDetails.length > 0 && (
        evolutionDetails.map(evolution => (
          <div key={evolution.species.name}>
            <p>→ Evolves to: {evolution.species.name.toUpperCase()}</p>
            {evolution.evolves_to && renderEvolution(evolution.species, evolution.evolves_to)}
          </div>
        ))
      )}
    </div>
  );
};

export function EvolutionChain({ evolutionChain }) {
  if (!evolutionChain) {
    return <p>Loading evolution chain...</p>;
  }

  return (
    <div>
      <h2>Evolution Chain</h2>
      {renderEvolution(evolutionChain.chain.species, evolutionChain.chain.evolves_to)}
    </div>
  );
};
~~~

**Integrate Evolution Chain on the Details Page:** On the PokemonDetails page, include the EvolutionChain component to show how the selected Pokémon evolves. Ensure you handle Pokémon without evolutions or those with multiple evolutionary paths.

~~~jsx
// file: "PokemonDetail.js"
import { EvolutionChain } from '../EvolutionChain/EvolutionChain';
import styles from './PokemonDetail.module.css';

export function PokemonDetail({ pokemon, evolutionChain, onCapture }) {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.pokemonInfo}>
        <h2>{pokemon.name.toUpperCase()}</h2>
        <p className={styles.detailText}><b>Type:</b> {pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p className={styles.detailText}><b>Abilities:</b> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <div className={styles.pokemonStats}>
          <h3>Stats</h3>
            {pokemon.stats.map((stat) => (
              <p key={stat.stat.name} className={styles.detailText}><b>{`${stat.stat.name}:`}</b> {`${stat.base_stat}`}</p>
            ))}
         </div>
        {/* Add more details as needed */}
        <button onClick={() => onCapture(pokemon)} className={styles.captureBtn}>Capture</button>
      </div>
      <div className={styles.evolutionChain}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.detailImage} />
        <EvolutionChain evolutionChain={evolutionChain} />
      </div>
    </div>
  );
}
~~~

With some rearranging of the HTML and some additions to the CSS, the results look pretty nifty!

~~~css
/* file: "add to PokemonDetail.module.css" */
.captureBtn {
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 18px;
}

.detailContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.detailImage {
  width: 200px;
}

.detailText {
  color: #333;
  margin: 5px 0;
}

.pokemonInfo, .evolutionChain {
  flex: 1;
}
~~~

![Project Showcase Website Screenshot](/assets/img/webdevfun/pokemon/pokedex-react-enhanced.png){:lead loading="lazy"}

[See it live!](/webdevfun/pokemon/pokedex-react-enhanced)
{:.figcaption}

## Conclusion
By enriching your "My Pokédex" React app with a Detailed Pokémon Stats Page and an Evolution Chain Display, you not only make your app more informative and engaging but also demonstrate an effective use of React props to manage and display complex data structures. These features provide users with a comprehensive look at their Pokémon, from basic stats to their growth potential, making your Pokédex a valuable tool for both new and seasoned Pokémon trainers alike.

By embracing functional components and Hooks in React, you're equipped to embark on a Pokémon-catching adventure, creating dynamic and interactive web applications with ease. The useState Hook and props offer powerful and intuitive ways to manage and share data within your apps, bringing the magical world of Pokémon to life. As you continue to explore React's functional components, remember that each component, much like each Pokémon, has its unique role and abilities. Happy coding, and may your journey through the React ecosystem be as thrilling as exploring the vast Pokémon universe!