'use strict';

/*innput: 
elinput busca personajes por su título*/

// HTML selectors
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');

//Global variables
let charactersList = [];
let characterFeatures = [];

/*
    //asumo q la api devuelve un obj
    //cuando se recargue la página, recjo la info del obj y la pinto con DOM
*/

    
function receivedCharactersList(list) {
    for (const character of list) {
        let img = character.img;
        let name = character.name;
        let status = character.status;
        characterFeatures.push([img, name, status]); //pushes a list of 3 elements so characterFeatures would be a list of lists one of each character. [] build the list in the moment
        console.log(characterFeatures);
    }
}

function renderHTMLCards() {
    //paints in DOM
    for (let character of characterFeatures) {
        //Creates elements in DOM
        const newArticle = document.createElement("article");
        const newImage = document.createElement("img");
        const newName = document.createElement("name");
        const newParagraph = document.createElement("p");
    
        
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
        console.log(section2);
    }
}

    /*     //pido al API y pinto todo lo que me devulve */

function returnServerInfo() {
    fetch('https://breakingbadapi.com/api/characters')
        .then(function (response) { //promise
        return response.json(); //acts like stringify
        })
        .then(function (data) {
        charactersList = data;
        receivedCharactersList(charactersList);
        renderHTMLCards();
    });
}

returnServerInfo();


    //pido a la api en base al texto del botón y pinto lo que me devuleve 