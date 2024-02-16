//Obs: eu preciso importar antes essa arquivo antes do global.js
// import { Pokemon } from '../js/pokemon-model';
const pokeApi = {}

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