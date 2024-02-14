const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 50;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <a class="detail-page" href="./assets/pokemon-details.html" data-pokemon-number="${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Associando eventos de clique às âncoras após serem adicionadas ao DOM
        document.querySelectorAll('.detail-page').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();
                const pokemonNumber = this.dataset.pokemonNumber;
                console.log('Número do Pokémon:', pokemonNumber);
                // Faça o que quiser com o número do Pokémon
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadPokemonItens(offset, limit);
});

//Quando clicar no botão
/*loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;
    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        // Para remover o botão, você pode adicionar essa lógica aqui
        // loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});*/
