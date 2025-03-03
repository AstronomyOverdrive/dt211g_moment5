"use strict";

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

// Initialize map and marker
const map = L.map("map").setView([51.3406321, 12.3747329], 13);
const marker = L.marker([51.3406321, 12.3747329]).addTo(map);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(map);

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
    updateMap(posLon, posLat);
}

/**
 * Updates map position and marker
 * @param {number} lon - New position longitude
 * @param {number} lat - New position latitude
 */
function updateMap(lon, lat) {
    map.panTo([lat, lon]);
    marker.setLatLng([lat, lon]);
}

/**
 * Checks if enter was pressed and calls "getData()"
 * @param {string} key - Key that got pressed down
 */
function checkKey(key) {
    if (key.code === "Enter") {
        getData();
        // Prevent enter from submitting form(which would reload the page)
        key.preventDefault();
        return false;
    }
}

searchBtn.addEventListener("click", getData);
searchBar.addEventListener("keydown", checkKey);
