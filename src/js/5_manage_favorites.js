/* eslint-disable indent */
'use strict';

//FUNCTIONS
function resetFavoriteSection() {
    while (section1.firstChild) {
        section1.removeChild(section1.lastChild);
    }

    characterFavorites = [];
    const newTitle = document.createElement('h3');
    newTitle.classList.add('main_section1_title', 'main_title');
    const newText = document.createTextNode('Favorites❤️');
    newTitle.appendChild(newText);
    section1.appendChild(newTitle);

    const inputReset = document.createElement("INPUT");
    inputReset.setAttribute("type", "reset");
    inputReset.value = 'Reset';
    section1.appendChild(inputReset);


    localStorage.setItem('characterFavorites', JSON.stringify(characterFavorites));
    renderFavoriteCharacters();
    renderHTMLCards(charactersList);
}

function handleButtonReset(e) {
    console.log('holii');
    e.preventDefault();
    resetFavoriteSection();
}


function deleteFavoriteCard(event) {
    const characterIndexInFavoritesList = characterFavorites.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    
    characterFavorites.splice(characterIndexInFavoritesList, 1);
    
    localStorage.setItem('characterFavorites', JSON.stringify(characterFavorites));
    renderFavoriteCharacters();
    renderHTMLCards(charactersList); //reprints the list so it loses the favorite class
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

    const inputReset = document.createElement("INPUT");
    inputReset.setAttribute("type", "reset");
    inputReset.value = 'Reset';
    section1.appendChild(inputReset);

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
    inputReset.addEventListener('click', handleButtonReset);
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