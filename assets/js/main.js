const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 50
let offset = 0

function save(){
  window.localStorage.setItem('campo1', $('#campo1').val());
}

function convertPokemonToLi(pokemon) {
  return `
    <a class="detail-page" href="./assets/pokemon-details.html" data-pokemon-number="${pokemon.number}" >
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
  `
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHTML += newHtml

      //Associando eventos de clique às âncoras após serem adicionadas ao DOM7
      document.querySelectorAll('.detail-page').forEach(anchor => {
        anchor.addEventListener('click', function(event){

          //Faz com que a página não vá para a outra
          // event.preventDefault();

          // Salvando o pokemonNumber no localStorage
          const pokemonNumber = this.dataset.pokemonNumber
           // Redirecionando para a página de detalhes do Pokémon
          localStorage.setItem('pokemonNumber', pokemonNumber)
          console.log('Id pokemon: ', pokemonNumber)      
          window.location.href = `./assets/pokemon-details.html`  
        })
      })
    })
  }
  
  //Chama somente após o DOM ter sido completamente carregado,
  // evitando possíveis erros ao tentar acessar elementos do DOM que ainda não foram carregados.
  document.addEventListener('DOMContentLoaded', function(){
    loadPokemonItens(offset, limit);
  })


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


