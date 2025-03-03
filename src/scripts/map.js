"use strict";

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

/**
 * Get location data based on search term
 */
async function getData() {
    const searchTerm = searchBar.value || "Leipzig";
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`);
        if (!response.ok) {
            throw new Error("Invalid response!");
        }
        const locationData = await response.json();
        getCoordinates(locationData);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Extract coordinates from JSON data
 * @param {Array} data - Location data from nominatim
 */
function getCoordinates(data) {
    const posLat = data[0].lat;
    const posLon = data[0].lon;
}

addEventListener("load", getData);
searchBtn.addEventListener("click", getData);
