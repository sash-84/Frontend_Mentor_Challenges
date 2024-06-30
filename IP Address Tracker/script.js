const ip_address = document.getElementById('i');
const loca = document.getElementById('l');
const timezone = document.getElementById('t');
const isp = document.getElementById('s');
const search = document.getElementById('search_icon');
const input = document.getElementById('search_bar');
const APIKEY = "https://geo.ipify.org/api/v2/country,city?apiKey=at_41S2holkuMXPRV78Y8JzySiPFip8M&ipAddress=";
let map;

async function fetchIPDetails(ip = '') {
    const response = await fetch(APIKEY + ip);
    const data = await response.json();
    console.log(data);
    return data;
}

function initializeMap(latitude, longitude, showPopup = false) {
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([latitude, longitude]).addTo(map);
    if (showPopup) {
        marker.bindPopup('You are here.').openPopup();
    }
}

async function init(ip = '', showPopup = false) {
    try {
        const data = await fetchIPDetails(ip);
        
        ip_address.textContent = data.ip;
        loca.textContent = data.location.city + ", " + data.location.region + ", " + data.location.country;
        timezone.textContent = data.location.timezone;
        isp.textContent = data.isp;
        
        initializeMap(data.location.lat, data.location.lng, showPopup);
    } catch (error) {
        alert('Invalid IP address. Please enter a valid IP address.');
        init('',true);
        console.error('Error fetching IP details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => init('', true));

search.addEventListener('click', () => {
    if (input.value === '') return;
    const ip = input.value.trim();
    init(ip);
    setTimeout(() => {
        input.value = '';
    }, 1000);
});
