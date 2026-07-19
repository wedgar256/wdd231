const spotlightContainer = document.querySelector("#spotlight-container");
const membersUrl = "data/members.json";

async function loadFeaturedMembers() {
    if (!spotlightContainer) return;

    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();
        const featuredMembers = Array.isArray(members)
            ? members.slice(0, 3)
            : (members.members || []).slice(0, 3);

        renderMembers(featuredMembers);
    } catch (error) {
        console.error("Error loading featured members:", error);
        spotlightContainer.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: #b91c1c;">
                Sorry, unable to load member spotlights right now.
            </p>
        `;
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
            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>
            <p class="badge ${membershipClass}">
                <strong>${member.membership}</strong>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadFeaturedMembers();
