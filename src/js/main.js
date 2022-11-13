'use strict';

// HTML SELECTORS

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');

//GLOBAL VARIABLES

let charactersList = [];
let characterFeatures = [];

//FUNCTIONS

function matchCharacter(list) {
    const allCharacters = document.querySelectorAll('.bb-character');

    for (let character of allCharacters) {
        //.childNodes access to the article children, with [i], access to the h4 position, with .text access to the value of h4
        if (!character.childNodes[1].textContent.toLowerCase().includes(input.value.toLowerCase())) {
            character.classList.add("hidden");
        }
    }
}

function handleClick(e) {
    e.preventDefault();
    matchCharacter(charactersList);
}

function receivedCharactersList(list) {
    for (const character of list) {
        let img = character.img;
        let name = character.name;
        let status = character.status;
        characterFeatures.push([img, name, status]); //pushes a list of 3 elements so characterFeatures would be a list of lists one of each character. [] build the list in the moment
        //console.log(characterFeatures);
    }
}

function renderHTMLCards() {
    //paints in DOM
    for (let character of characterFeatures) {
        //Creates elements in DOM
        const newArticle = document.createElement("article");
        const newImage = document.createElement("img");
        const newName = document.createElement("h4");
        const newParagraph = document.createElement("p");
        
        //Adds classes to newArticle
        newArticle.classList.add("bb-character") //maybe another with the name of the character
        
        //Adds content to the new elements in DOM
        newImage.src = character[0];//because img is an empty element and does not have content, we need to add the content to source attribute
        const contentName = document.createTextNode(character[1]);
        const contentParagraph = document.createTextNode(character[2]);
    
        //Adds elements to DOM
        newName.appendChild(contentName);
        newParagraph.appendChild(contentParagraph);
    
        newArticle.appendChild(newImage);
        newArticle.appendChild(newName);
        newArticle.appendChild(newParagraph);

        section2.appendChild(newArticle);
    }
}

//CALL FUNCTIONS
returnServerInfo();

//EVENTS

button.addEventListener('click', handleClick);

//WHEN THE WEBPAGE LOADS

function returnServerInfo() {
    fetch('https://breakingbadapi.com/api/characters?limit=10&offset=0') //TODO: remove limit, this is set to help the code devlopment
        .then(function (response) { //promise
        return response.json(); //acts like stringify
        })
        .then(function (data) {
        charactersList = data;
        receivedCharactersList(charactersList);
        renderHTMLCards();
    });
}