const pokemonDetail = document.getElementById('pokemonDetail')

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  
    // Isso quer dizer que este é o primeiro elemento do array
    const [type] = types
  
    pokemon.types = types
    pokemon.type = type
  
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)

    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability
    
    const stats = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat)

    const [base_stat] = stats
    pokemon.stats = stats
    pokemon.base_stat = base_stat

    const statsName = pokeDetail.stats.map((typeSlot) => typeSlot.stat.name)

    const[stat] = statsName
    pokemon.statsName = statsName
    pokemon.stat = stat

  
    return pokemon
}

document.addEventListener('DOMContentLoaded', function() {
    const savedPokemonNumber = localStorage.getItem('pokemonNumber');
    console.log('Número do Pokémon salvo:', savedPokemonNumber);

    if (savedPokemonNumber) {
        pokeApi.getPokemons().then((pokemons = []) => {
            const pokemon = pokemons.find(pokemon => pokemon.number == savedPokemonNumber);
            if (pokemon) {
                adicionandoNoHtml(pokemon);
            } else {
                console.log('Pokémon não encontrado com o número:', savedPokemonNumber);
            }
        });
    } else {
        console.log('Número do Pokémon não salvo no localStorage.');
    }
});

function adicionandoNoHtml(pokemon) {
    const newHtml = `
        <a href="../index.html">
            <img id="icon-arrow" src="../arrow-left.png" alt="">
        </a>

        <div class="poke">
            <h1 class="poke-name">${pokemon.name}</h1>
            <span class="poke-number">#${pokemon.number}</span>
            <div class="type">
                <ol class="poke-type">
                    ${pokemon.types.map((type) => `<li class="li-type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </div>
        <div class="div-image">
            <img class="poke-image" src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="poke-information">
            <h2>About</h2>
            <div class="div-information-about">
                <div class="div-information-about-description">
                    <p class="information-text">Weight</p>
                    <p class="information-text">Height</p>
                    <p class="information-text">Abilities</p>
                </div>
                <div>
                    <p>${pokemon.weight}</p>
                    <p>${pokemon.height}</p>
                    <p>
                        ${pokemon.abilities.map((ability) => `${ability}`).join(', ')}
                    </p>
                </div>
            </div>
            <h2>Base States</h2>
            <div class="div-information-about">
                <div class="div-information-about-description">
                    <p>${pokemon.statsName.map((stat) => `${stat}`).join('</br><p>')}</p>
                <p class="information-text">Total</p>
                </div>
                <div>
                    <p>${pokemon.stats.map((base_stat) => `${base_stat}`).join('</br><p>')}</p>
                    <p>
                    ${pokemon.stats.reduce((acumulator, currentValue) => acumulator + currentValue)}
                    </p>
                </div>
            </div>
        </div>
    `;
    pokemonDetail.innerHTML = newHtml;
}
