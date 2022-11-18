/* eslint-disable indent */
'use strict';
const length = document.querySelector('.js-number-characters');
let filteredCharacters = [];

function comparisson(length) {
    const array = [2, 5, 9];
    for (const n of array) {
        if (n < length) {
            console.log(`${n} es menor que ${length}`);
        } else if (n > length) {
            console.log(`${n} es mayor que ${length}`);
        } else {
            console.log('Es igual');
        }
    }
}

function handleComparisson(e) {
    // e.preventDefault();
    comparisson(filteredCharacters.length);

}

function matchCharacter() {
    const userInput = input.value.toLowerCase();
    filteredCharacters = charactersList.filter((eachChar) => eachChar.status.toLowerCase().includes(userInput));
    const filteredCharLenght = filteredCharacters.length;
    length.innerHTML = filteredCharLenght;

    renderHTMLCards(filteredCharacters);
}

function handleButtonClick(e) {
    e.preventDefault();
    matchCharacter();
}

button.addEventListener('click', handleButtonClick);
length.addEventListener('click', handleComparisson);