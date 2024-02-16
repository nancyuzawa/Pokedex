const pokemonDetail = document.getElementById('pokemonDetail')
let isLike = false

document.addEventListener('DOMContentLoaded', function() {
    const savedPokemonNumber = localStorage.getItem('pokemonNumber')
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
    // Chama a função para formatar o número
    const formattedNumber = formattedNumberPokemon(pokemon.number)
    const newHtml = `
    <section class="${pokemon.type} content sectionPoke">
        <div id="firstPart">
            <div class="icones">
                <a href="../index.html">
                    <img id="iconArrow" src="../assets/image/left-arrow.png" alt="return">
                </a>
                <button onclick="exchangeHeart()" class="heartButton">
                    <img class="icone" src="../assets/image/heart.png" alt="like">
                </button>
            </div>

            <div class="poke">
                <h1 class="pokeName">${pokemon.name}</h1>
                <span class="pokeNumber">#${formattedNumber}</span>
                <div class="type">
                    <ol class="pokeType">
                        ${pokemon.types.map((type) => `<li class="liType ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <div class="divImage">
                <img class="pokeImage" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>

        <div id="secondParty">
            <div class="pokeInformation">
                <h2>About</h2>
                <div class="divInformationAbout">
                    <div class="divInformationAboutDescription">
                        <p class="informationText">Weight</p>
                        <p class="informationText">Height</p>
                        <p class="informationText">Abilities</p>
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
                <div class="divInformationAbout">
                    <div class="divInformationAboutDescription">
                        <p class="informationText" >${pokemon.statsName.map((stat) => `${stat}`).join('</br><p class="informationText">')}</p>
                    <p class="informationTextTotal">Total</p>
                    </div>
                    <div>
                        <p>${pokemon.stats.map((base_stat) => `${base_stat}`).join('</br><p>')}</p>
                        <p class="informationTextTotal">
                        ${pokemon.stats.reduce((acumulator, currentValue) => acumulator + currentValue)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <span class="credit" >&copy; 2024. Todos os direitos reservados </span>
            <span class="credit" >Desenvolvido por Nancy Yuzawa</span>
        </footer>
    </section>
    `

    pokemonDetail.innerHTML += newHtml

    // Seleciona todos os elementos de texto no documento
    const textElements = pokemonDetail.querySelectorAll('*:not(script):not(style)');

    // Itera sobre cada elemento de texto
    textElements.forEach(element => {
        // Verifica se o texto do elemento contém a palavra 'hp'
        if (element.textContent.includes('hp')) {
            // Modifica o texto para tornar 'hp' em maiúsculo
            element.innerHTML = element.innerHTML.replace(/hp/g, '<span class="uppercase">HP</span>');
        }
    });
}

function exchangeHeart(){
    if(isLike == false){
        const filledHeart = document.querySelector('.heartButton')
            filledHeart.innerHTML = filledHeart.innerHTML.replace(
                '<img class="icone" src="../assets/image/heart.png" alt="like">',
                '<img class="icone" src="../assets/image/filled-heart.png" alt="like">'
            )
        isLike = true
    }
    else{
        const filledHeart = document.querySelector('.heartButton')
            filledHeart.innerHTML = filledHeart.innerHTML.replace(
                '<img class="icone" src="../assets/image/filled-heart.png" alt="like">',
                '<img class="icone" src="../assets/image/heart.png" alt="like">'
            )
        isLike = false
    }
}
