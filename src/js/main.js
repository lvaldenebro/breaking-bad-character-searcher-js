'use strict';

/*innput: 
elinput busca personajes por su título*/

// HTML selectors
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const section2 = document.querySelector('.js-section2');


/*
    //asumo q la api devuelve un obj
    //cuando se recargue la página, recjo la info del obj y la pinto con DOM
*/


//variables
const character = {
    "char_id": 1,
    "name": "Walter White", //this character.name
    "birthday": "09-07-1958",
    "occupation": [
    "High School Chemistry Teacher",
    "Meth King Pin"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg", //this character.img
    "status": "Presumed dead", //this character.status
    "nickname": "Heisenberg",
    "appearance": [
    1,
    2,
    3,
    4,
    5
    ],
    "portrayed": "Bryan Cranston",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
    }

    //Create new elements with DOM
    const newArticle = document.createElement("article");
    console.log(newArticle);
    const newImage = document.createElement("img");
    console.log(newImage);
    const newName = document.createElement("name");
    console.log(newName);
    const newParagraph = document.createElement("p");
    console.log(newParagraph);

    //Add content to the new elements in DOM
    newImage.src = character.img; //because img is an empty element and does not have content, we need to add the content to source attribute
    console.log(newImage);
    const contentName = document.createTextNode(name);
    console.log(contentName);
    const contentParagraph = document.createTextNode(status);
    console.log(contentParagraph);

    //Add elements to DOM
    newName.appendChild(contentName);
    console.log(newName);
    newParagraph.appendChild(contentParagraph);
    console.log(newParagraph);

    newArticle.appendChild(newImage);
    newArticle.appendChild(newName);
    newArticle.appendChild(newParagraph);
    console.log(newArticle);

    section2.appendChild(newArticle);
    console.log(section2);

       //generalizar para recbir una array de obj


    let charactersList = [];
    let characterFeatures = [];
    
    function receivedCharactersList(list) {
        for (const character of list) {
            let name = character.name;
            let img = character.img;
            let status = character.status;
            characterFeatures.push([name, img, status]); //pushes a list of 3 elements so characterFeatures would be a list of lists one of each character. [] build the list in the moment
        }
    }
    charactersList = [character]; // borrar en cuanto tenga listo el fetch
    receivedCharactersList(charactersList);
    console.log(`Mi lista: ${characterFeatures}`);

    function renderHTMLCards() {
        //pintar en el DOM todo lo que devuelve la función receivedCharacters
    }

    /*     //pido al API y pinto todo lo que me devulve */

    // function returnServerInfo() {
    //     fetch('https://breakingbadapi.com/api/characters')
    //         .then(function (response) { //promise
    //         return response.json();
    //         })
    //         .then(function (data) {
    //         document.body.innerHTML = data.result;
    //         //receivedCharacters(list);
    //         //renderHTMLCards();
    //     });
    // }


    //pido a la api en base al texto del botón y pinto lo que me devuleve 