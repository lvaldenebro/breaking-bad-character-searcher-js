'use strict';

//revisar por qué se añade más de una vez un personaje y por qué no se borra al volver a seleccionar
//local storage
//la izqda no debe cambiar aunque se realicen varias búsquedas, son los favoritos

// HTML SELECTORS

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');
const section1 = document.querySelector('.js-section1');

const allCharacters = document.querySelectorAll('.js-bb-character');

//GLOBAL VARIABLES

let charactersList = [];
let characterFavorites = [];

//FUNCTIONS

function renderFavoriteCharacters() {
    for (let character of characterFavorites) { //says which list to use
        //Creates elements in DOM (nodes)
        console.log("Pintando favoritos");
        console.log("El objecto actual es:");
        console.dir(character);
        const newArticle = createNode(character); //its de results of the previous function
        section1.appendChild(newArticle);
    }
}

function favoriteCharacters(event) {
    //this variable looks for the object
    //parseInt() -> because the given id by json is an integer
    const selectedCharacter = charactersList.find((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    console.log("selectedCharacter is:");
    console.dir(selectedCharacter);
    console.log("El id que buscábamos es:");
    console.dir(event.currentTarget);
    //this variable looks only for the index(id)
    const characterInFavoritesIndex = characterFavorites.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));

    if (event.currentTarget.classList.contains('favorite')) {
        event.currentTarget.classList.remove('favorite');
        //.splice('initial position', 'how many elements do we delete')
        characterFavorites.splice(characterInFavoritesIndex, 1);
    } else {
        event.currentTarget.classList.add('favorite');
        characterFavorites.push(selectedCharacter);
    }

    renderFavoriteCharacters();
}

function handleArticleClick(e) {
    e.preventDefault(); //it is a method --> ()
    favoriteCharacters(e);
}

function matchCharacter() {
    for (let character of allCharacters) {
        //.childNodes access to the article children, with [i], access to the h4 position, with .text access to the value of h4
        if (!character.childNodes[1].textContent.toLowerCase().includes(input.value.toLowerCase())) {
            character.classList.add("hidden");
        }
    }
}

function handleButtonClick(e) {
    e.preventDefault();
    matchCharacter();
}

function createNode(characterObject) {
    const newArticle = document.createElement("article");
    const newImage = document.createElement("img");
    const newName = document.createElement("h4");
    const newParagraph = document.createElement("p");
    
    //Adds classes to elements
    newArticle.classList.add("js-bb-character", "main_section2_article"); //maybe another with the name of the character
    newImage.classList.add("main_section2_article_img");
    newName.classList.add("main_section2_article_h4");
    newParagraph.classList.add("main_section2_article_p");

    //Adds attribute to article with the id given in jason data
    newArticle.setAttribute('id', characterObject.char_id);
    
    //Adds content to the new elements in DOM
    newImage.src = characterObject.img;//because img is an empty element and does not have content, we need to add the content to source attribute
    const contentName = document.createTextNode(characterObject.name);
    const contentParagraph = document.createTextNode(characterObject.status);

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
    for (let character of charactersList) {
        //Creates elements in DOM (nodes)
        const newArticle = createNode(character); //its de results of the previous function
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
        renderHTMLCards();
    });
}