/* eslint-disable indent */
'use strict';

function createBasicHTMLSection1() {
    const newTitle = document.createElement('h3');
    newTitle.classList.add('main_section1_title', 'main_title');
    const newText = document.createTextNode('Favorites❤️');
    newTitle.appendChild(newText);
    section1.appendChild(newTitle);

    const inputReset = document.createElement("INPUT");
    inputReset.setAttribute("type", "reset");
    inputReset.classList.add('main_section1_reset', 'js-reset');
    inputReset.value = 'Reset';
    section1.appendChild(inputReset);
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

renderHTMLCards(charactersList);
