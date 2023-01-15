/* eslint-disable indent */
'use strict';

//WHEN THE WEBPAGE LOADS

function returnServerInfo() {
    //commented since the API is no longer available
    // fetch('https://breakingbadapi.com/api/characters')
    fetch('./assets/data/data.json')
        .then(function (response) { //promise
            return response.json(); //acts like stringify
        })
        .then(function (data) {
            charactersList = data.slice(0, 20);
            renderHTMLCards(charactersList);
    });
}

const savedCharacters = JSON.parse(localStorage.getItem('characterFavorites'));

if (savedCharacters !== null) {
    characterFavorites = savedCharacters;
    renderFavoriteCharacters();
    renderHTMLCards(charactersList);
}

returnServerInfo();