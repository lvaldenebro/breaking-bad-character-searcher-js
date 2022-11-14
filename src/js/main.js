/* eslint-disable indent */
'use strict';

// HTML SELECTORS

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');
const section1 = document.querySelector('.js-section1');
//GLOBAL VARIABLES

let charactersList = [];
let characterFavorites = [];

//FUNCTIONS

function deleteFavoriteCard(event) {
    const characterIndexInFavoritesList = characterFavorites.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    
    characterFavorites.splice(characterIndexInFavoritesList, 1);
    
    localStorage.setItem('characterFavorites', JSON.stringify(characterFavorites));
    renderFavoriteCharacters();
    renderHTMLCards(charactersList); //reprints the list so it looses the favorite class
}

function handleDeleteSelector(e) {
    e.preventDefault();
    deleteFavoriteCard(e);
}

function renderFavoriteCharacters() {
    //reset left section

    while (section1.firstChild) { //while section1 has any child, remove them
        section1.removeChild(section1.lastChild);
    }
    //recreates the section1 title
    const newTitle = document.createElement('h3');
    newTitle.classList.add('main_section1_title', 'main_title');
    const newText = document.createTextNode('Favorites❤️');
    newTitle.appendChild(newText);
    section1.appendChild(newTitle);

     //adds left nodes
    for (let character of characterFavorites) { //says which list to use
        //Creates elements in DOM (nodes)
        const newArticle = createNode(character); //its de results of the previous function
        const newSelector = document.createElement('p');
        newSelector.classList.add('main_section2_article_selector', 'js-delete-selector');
        const contentSelector = document.createTextNode('x');
        newSelector.appendChild(contentSelector);
        newArticle.appendChild(newSelector);
    
        section1.appendChild(newArticle);

        // we don't  need query selector because the item is already selected
        newSelector.addEventListener('click', handleDeleteSelector);
    }
}

function favoriteCharacters(event) {
    event.currentTarget.classList.toggle('favorite');

    //CONDITIONALS
    //this variable looks for the object
    //parseInt() -> because the given id by json is an integer
    const selectedCharacter = charactersList.find((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    //this variable looks only for the index(id)
    const characterIndexInFavoritesList = characterFavorites.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));

    if (characterIndexInFavoritesList === -1) { //it is not added
            characterFavorites.push(selectedCharacter);
        } else {
            //.splice('initial position', 'how many elements do we delete')
            characterFavorites.splice(characterIndexInFavoritesList, 1);
    }

    localStorage.setItem('characterFavorites', JSON.stringify(characterFavorites));
    renderFavoriteCharacters();
}

function handleArticleClick(e) {
    e.preventDefault(); //it is a method --> ()
    favoriteCharacters(e);
}

function matchCharacter() {
    const userInput = input.value.toLowerCase();
    const filteredCharacters = charactersList.filter((eachChar) => eachChar.name.toLowerCase().includes(userInput));

    renderHTMLCards(filteredCharacters);
}

function handleButtonClick(e) {
    e.preventDefault();
    matchCharacter();
}

function createNode(characterObject) {

    //For localstorage

    const characterInFavouritesIndex = characterFavorites.findIndex((listElement) => listElement.char_id === characterObject.char_id);
    
    //Creates elements
    const newArticle = document.createElement('article');
    const newImage = document.createElement('img');
    const newName = document.createElement('h4');
    const newParagraph = document.createElement('p');
    
    //Adds classes to elements
    if (characterInFavouritesIndex !== -1) {
        newArticle.classList.add('favorite');
    }
    
    newArticle.classList.add('js-bb-character', 'main_section2_article');
    newImage.classList.add('main_section2_article_img');
    newName.classList.add('main_section2_article_h4');
    newParagraph.classList.add('main_section2_article_p');

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

function renderHTMLCards(list) {
    //RESET
    while (section2.firstChild) {
        section2.removeChild(section2.lastChild);
    }
    //recreates the section1 title
    const newTitle = document.createElement('h3');
    newTitle.classList.add('main_section2_title', 'main_title');
    const newContent = document.createTextNode('Characters❤️');
    newTitle.appendChild(newContent);
    section2.appendChild(newTitle);
    
    //paints in DOM
    for (let character of list) {
        //Creates elements in DOM (nodes)
        const newArticle = createNode(character); //its de results of the previous function
        section2.appendChild(newArticle);

        //Add event listener to each article
        newArticle.addEventListener('click', handleArticleClick);
    }
}

//CALL FUNCTIONS
returnServerInfo();
renderHTMLCards(charactersList);

//EVENTS
button.addEventListener('click', handleButtonClick);

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