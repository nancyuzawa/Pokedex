const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 50
let offset = 0


function loadPokemonItens(offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
    <a class="detail-page" href="./assets/pokemon-details.html">
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
    
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
              alt="${pokemon.name}">
          </div>
        </li>
      </a>
    `).join('')
    //pokemonList.innerHTML = newHtml  -> ao invés de substituir quero que ele concatene portanto:
    pokemonList.innerHTML += newHtml
  })
}
loadPokemonItens(offset, limit)


//Quando clicar no botão
/*loadMoreButton.addEventListener('click', () => {
  offset += limit
  // debugger
  const qtdRecordsWithNextPage = offset + limit

  if(qtdRecordsWithNextPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    //Para remover o botão eu preciso pegar o pai dele
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit)
  }
})*/