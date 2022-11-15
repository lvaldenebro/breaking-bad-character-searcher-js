/* eslint-disable indent */
'use strict';

//WHEN THE WEBPAGE LOADS

function returnServerInfo() {
    fetch('https://breakingbadapi.com/api/characters')
        .then(function (response) { //promise
        return response.json(); //acts like stringify
        })
        .then(function (data) {
        charactersList = data;
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