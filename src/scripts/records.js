'use strict';

// Declare variables
import jsonData from './albums.json';
const itemElements = document.querySelectorAll('.item-container');

// Declare functions
function populateHTML(){
    itemElements.forEach(element => {
        const fileSource = element.querySelector('.image').src;
        const fileName = fileSource.split('/').reverse()[0]; // File name will be last in URL so reverse the array and take the first item
        const originalName = fileName.split('.')[0]; // File format after parcel is: name.xxxxxx.ending so we are only interested in the first part as identifier
        jsonData.records.forEach(album => {
            if (album.id === originalName){
                element.querySelector('.title').innerHTML = album.title;
                element.querySelector('.description').innerHTML = album.desc;
            }
        });
    });
}

// Event handler
addEventListener('load', populateHTML);
