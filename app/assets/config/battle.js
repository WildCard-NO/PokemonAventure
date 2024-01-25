    // Function to fetch Pokemon data and create elements
    function fetchAndDisplayPokemon(pokemonName, elementId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        .then(response => response.json())
        .then(data => {
          const pokemonInfo = document.getElementById(elementId);

          // Display Pokemon's sprite and name
          const spriteUrl = data.sprites.front_default;
          const name = data.name;

          const imgElement = document.createElement('img');
          imgElement.src = spriteUrl;

          const nameElement = document.createElement('p');
          nameElement.textContent = `Name: ${name}`;

          // Append the image and name elements to the pokemonInfo div
          pokemonInfo.appendChild(imgElement);
          pokemonInfo.appendChild(nameElement);
        })
        .catch(error => console.error(`Error fetching ${pokemonName} data:`, error));
    }

    // Fetch and display Ditto
    fetchAndDisplayPokemon('ditto', 'pokemon1-info');
    
    // Fetch and display Pikachu
    fetchAndDisplayPokemon('pikachu', 'pokemon2-info');
    

    