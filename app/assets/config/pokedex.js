const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
var pokedex = {}; // {1 : {"name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

// When the window loads, fetch the total count of Pokémon from the API and populate the Pokedex
window.onload = async function() {
    // getPokemon(1);

    const totalPokemonCount = await getTotalPokemonCount();

    for (let i = 1; i <= totalPokemonCount; i++) {
        await getPokemon(i);
        createPokemonElement(i);
    }

    // Set the description for the first Pokémon in the Pokedex
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
}

// Fetch the total count of Pokémon from the API
async function getTotalPokemonCount() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.count;
}

// Fetch details for a specific Pokémon and update the Pokedex
async function getPokemon(num) {
    const url = `${apiUrl}${num}`;

    const response = await fetch(url);
    const pokemon = await response.json();

    const pokemonName = pokemon["name"];
    const pokemonType = pokemon["types"];
    const pokemonImg = pokemon["sprites"]["front_default"];

    const speciesUrl = pokemon["species"]["url"];
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    // Check if flavor text entries exist and select the first one if available
    const flavorTextEntries = speciesData["flavor_text_entries"];
    const pokemonDesc = flavorTextEntries.length > 0 ? flavorTextEntries[0]["flavor_text"] : "No description available.";

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
}

// Create a new element for a Pokémon and append it to the Pokedex
function createPokemonElement(num) {
    const pokemonElement = document.createElement("div");
    pokemonElement.id = num;
    pokemonElement.innerText = num.toString() + ". " + pokedex[num]["name"].toUpperCase();
    pokemonElement.classList.add("pokemon-name");
    pokemonElement.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemonElement);
}

// Update the displayed information when a Pokémon is clicked
function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    // Clear previous type information
    const typesDiv = document.getElementById("pokemon-types");
    typesDiv.innerHTML = '';

    // Update the displayed types for the current Pokémon
    const types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        const type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // Add background color and font color
        typesDiv.append(type);
    }

    // Update the displayed description for the current Pokémon
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}
