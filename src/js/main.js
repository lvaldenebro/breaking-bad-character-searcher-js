'use strict';

//do we want a listner in favourites section so we can umark them?

//me toca local storage y que los datos de a usuaria no se 
//la izqda no debe cambiar aunque se realicen varias búsquedas, son los favoritos

// HTML SELECTORS

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');
const section1 = document.querySelector('.js-section1');

const allCharacters = document.querySelectorAll('.js-bb-character');

//GLOBAL VARIABLES

let charactersList = [];
let characterFeatures = [];
const characterFavorites = [];

//FUNCTIONS

function renderFavoriteCharacters(list) {
    for (let character of characterFeatures) {
        //Creates elements in DOM (nodes)
        const newArticle = createNode(character[0], character[1], character[2]); //its de results of the previous function
        section1.appendChild(newArticle);
    }
}

function favoriteCharacters(event) {
    if (event.currentTarget.classList.contains('favorite')) {
        event.currentTarget.classList.remove('favorite');
        const currentTargetIndex = characterFavorites.indexOf(event.currentTarget);
        characterFavorites.splice(currentTargetIndex);
    } else {
        event.currentTarget.classList.add('favorite');
        console.log(`current targ`)
        console.dir(event.currentTarget);
        characterFavorites.push(event.currentTarget);
    }
    renderFavoriteCharacters(characterFavorites);
}

function handleArticleClick(e) {
    e.preventDefault(); //it is a method --> ()
    favoriteCharacters(e);
}

function matchCharacter(list) {

    for (let character of allCharacters) {
        console.log(character);
        //.childNodes access to the article children, with [i], access to the h4 position, with .text access to the value of h4
        if (!character.childNodes[1].textContent.toLowerCase().includes(input.value.toLowerCase())) {
            character.classList.add("hidden");
        }
    }
}

function handleButtonClick(e) {
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

function createNode(paramImg, paramName, paramStatus) {
    const newArticle = document.createElement("article");
    const newImage = document.createElement("img");
    const newName = document.createElement("h4");
    const newParagraph = document.createElement("p");
    
    //Adds classes to elements
    newArticle.classList.add("js-bb-character", "main_section2_article"); //maybe another with the name of the character
    newImage.classList.add("main_section2_article_img");
    newName.classList.add("main_section2_article_h4");
    newParagraph.classList.add("main_section2_article_p");
    
    //Adds content to the new elements in DOM
    newImage.src = paramImg;//because img is an empty element and does not have content, we need to add the content to source attribute
    const contentName = document.createTextNode(paramName);
    const contentParagraph = document.createTextNode(paramStatus);

    //Adds elements to DOM
    newName.appendChild(contentName);
    newParagraph.appendChild(contentParagraph);

    newArticle.appendChild(newImage);
    newArticle.appendChild(newName);
    newArticle.appendChild(newParagraph);

    return newArticle;
}

function renderHTMLCards() {
    //paints in DOM
    for (let character of characterFeatures) {
        //Creates elements in DOM (nodes)
        const newArticle = createNode(character[0], character[1], character[2]); //its de results of the previous function
        section2.appendChild(newArticle);

        //Add event listener to article
        newArticle.addEventListener('click', handleArticleClick);
    }
}

//CALL FUNCTIONS
returnServerInfo();

//EVENTS

button.addEventListener('click', handleButtonClick);

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