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

loadFeaturedMembers();