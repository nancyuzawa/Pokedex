//Obs: eu preciso importar antes essa arquivo antes do global.js
// import { Pokemon } from '../js/pokemon-model';
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

  //isso quer diser que esse é a primeira posição de um array
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}


pokeApi.getPokemonDetail = (pokemon) =>{
  console.log(pokemon)
  return fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 151) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  
  
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    //Essa é a minha lista de promessa
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch('https://pokeapi.co/api/v2/pokemon/4')
// ]).then(results=> {
//   // console.log(results)
// })
