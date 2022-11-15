/* eslint-disable indent */
'use strict';

function matchCharacter() {
    const userInput = input.value.toLowerCase();
    const filteredCharacters = charactersList.filter((eachChar) => eachChar.name.toLowerCase().includes(userInput));

    renderHTMLCards(filteredCharacters);
}

function handleButtonClick(e) {
    e.preventDefault();
    matchCharacter();
}

button.addEventListener('click', handleButtonClick);