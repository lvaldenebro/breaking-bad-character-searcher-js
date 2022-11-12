'use strict';

/*innput: 
elinput busca personajes por su título*/

// HTML selectors
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');

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

    //recojo los elementos del objeto uno por uno
    const name = object.name;
    console.log('name');
    const img = object.img;
    console.log('img');
    const status = object.status;
    console.log('status');

    //asumo q la api devuelve un obj
    //cuando se recargue la página, recjo la info del obj y la pinto con DOM
    //generalizar para recbir una array de obj
    //pido al API y pinto todo lo que me devulve
    //pido a la api en base al texto del botón y pinto lo que me devuleve 