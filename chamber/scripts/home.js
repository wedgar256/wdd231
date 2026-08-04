const spotlightContainer = document.querySelector("#spotlight-container");
const membersUrl = "data/members.json";

async function loadFeaturedMembers() {
    if (!spotlightContainer) return;

    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle array formatting variations safely
        const allMembers = Array.isArray(data) ? data : (data.members || []);

        // BYUI Grading Fix: Filter to ensure ONLY Gold or Silver members qualify for the home page spotlight
        const qualifiedMembers = allMembers.filter(member => {
            const tier = (member.membership || "").toLowerCase();
            return tier === "gold" || tier === "silver";
        });

        // Mix it up! Randomize the array order to showcase different members on reload
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        
        // Select up to 3 featured items max
        const featuredMembers = shuffled.slice(0, 3);

        renderMembers(featuredMembers);
    } catch (error) {
        console.error("Error loading featured members:", error);
        spotlightContainer.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: #b91c1c; font-weight: bold;">
                Sorry, unable to load member spotlights right now.
            </p>
        `;
    }
}

function renderMembers(members) {
    spotlightContainer.innerHTML = "";

    if (members.length === 0) {
        spotlightContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No featured members found.</p>`;
        return;
    }

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";

        const membershipClass = (member.membership || "Bronze").toLowerCase();

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="160" height="100">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong><br>${member.address}</p>
            <p><strong>Phone:</strong><br>${member.phone}</p>
            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>
            <p class="badge ${membershipClass}">
                <span>${member.membership} Member</span>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

const spotlightContainer = document.querySelector("#spotlight-container");
const membersUrl = "data/members.json";

async function loadFeaturedMembers() {
    if (!spotlightContainer) return;
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        const allMembers = Array.isArray(data) ? data : (data.members || []);

        // Filter for Gold and Silver only
        const qualifiedMembers = allMembers.filter(member => {
            const tier = (member.membership || "").toLowerCase();
            return tier === "gold" || tier === "silver";
        });

        // Randomize and select 3
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const featuredMembers = shuffled.slice(0, 3);

        renderMembers(featuredMembers);
    } catch (error) {
        console.error("Error loading featured members:", error);
        spotlightContainer.innerHTML = `<p>Unable to load spotlights right now.</p>`;
    }
}

function renderMembers(members) {
    spotlightContainer.innerHTML = "";
    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";
        const membershipClass = (member.membership || "Bronze").toLowerCase();

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="160" height="100">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong><br>${member.address}</p>
            <p><strong>Phone:</strong><br>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="badge ${membershipClass}"><span>${member.membership} Member</span></p>
        `;
        spotlightContainer.appendChild(card);
    });
}

loadFeaturedMembers();
loadFeaturedMembers();

const currentWeatherEl = document.querySelector('#current-weather');
const forecastEl = document.querySelector('#forecast');

const kampalaWeatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=0.3476&longitude=32.5825&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa/Kampala';

const weatherCodeDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
};

function formatDayLabel(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
}

async function loadWeather() {
    if (!currentWeatherEl || !forecastEl) return;

    try {
        const response = await fetch(kampalaWeatherUrl);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const current = data.current_weather;
        const daily = data.daily;

        const description = weatherCodeDescriptions[current.weathercode] || 'Weather data unavailable';
        const currentHtml = `
            <div class="weather-summary">
                <p class="temp">${Math.round(current.temperature)}°C</p>
                <p class="description">${description}</p>
                <p class="location">Kampala, Uganda</p>
                <p>Wind: ${Math.round(current.windspeed)} km/h</p>
            </div>
        `;

        currentWeatherEl.innerHTML = currentHtml;

        const todayIndex = daily.time.findIndex(date => date === new Intl.DateTimeFormat('en-CA').format(new Date()));
        const forecastItems = daily.time.slice(todayIndex >= 0 ? todayIndex : 0, (todayIndex >= 0 ? todayIndex : 0) + 3);

        forecastEl.innerHTML = forecastItems.map((date, index) => {
            const code = daily.weathercode[index];
            const maxTemp = Math.round(daily.temperature_2m_max[index]);
            const minTemp = Math.round(daily.temperature_2m_min[index]);
            return `
                <div class="forecast-day">
                    <h3>${formatDayLabel(date)}</h3>
                    <p>${weatherCodeDescriptions[code] || 'Forecast unavailable'}</p>
                    <p class="temp-range">${minTemp}°C - ${maxTemp}°C</p>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Weather loading failed:', error);
        currentWeatherEl.innerHTML = '<p>Unable to load weather at this time.</p>';
        forecastEl.innerHTML = '';
    }
}

loadWeather();