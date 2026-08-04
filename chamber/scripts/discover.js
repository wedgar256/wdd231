// scripts/discover.js

document.addEventListener("DOMContentLoaded", () => {
    const messageArea = document.querySelector("#visit-message");
    const membersContainer = document.querySelector("#discover-members");

    // Number of milliseconds in a single day
    const msToDays = 84600000;

    // Get current date/time in milliseconds
    const today = Date.now();

    // Retrieve the stored date from LocalStorage (returns null if first visit)
    const storedLastVisit = window.localStorage.getItem("lastVisit-kampala");

    if (messageArea) {
        if (!storedLastVisit) {
            // Condition 1: First time visiting the page
            messageArea.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            // Convert stored string back into a number
            const lastVisitDate = Number(storedLastVisit);

            // Calculate the difference in days
            const daysBetween = Math.floor((today - lastVisitDate) / msToDays);

            if (daysBetween < 1) {
                // Condition 2: Visited less than a day ago
                messageArea.textContent = "Back so soon! Awesome!";
            } else {
                // Condition 3: Visited 1 or more days ago
                // Includes ternary operator to handle singular/plural "day" vs "days"
                messageArea.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
            }
        }
    }

    // Always update the localStorage with the most recent visit timestamp
    window.localStorage.setItem("lastVisit-kampala", today);

    async function loadCommunityMembers() {
        if (!membersContainer) return;

        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const members = Array.isArray(data) ? data.slice(0, 8) : [];

            if (!members.length) {
                membersContainer.innerHTML = '<p class="empty-state">No community members available right now.</p>';
                return;
            }

            membersContainer.innerHTML = "";
            members.forEach((member, index) => {
                const card = document.createElement("article");
                card.className = "discover-card";
                card.setAttribute("data-index", String(index + 1));

                const imagePath = member.image;
                const membershipClass = (member.membership || "Bronze").toLowerCase();
                const description = member.description || `${member.name} is a valued business partner contributing to Kampala's growing community economy.`;

                card.innerHTML = `
                    <img src="${imagePath}" alt="${member.name} logo" loading="lazy" width="220" height="140">
                    <div class="discover-card-content">
                        <h3>${member.name}</h3>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p>${description}</p>
                        <p class="badge ${membershipClass}">${member.membership || "Bronze"}</p>
                        <a class="learn-more" href="${member.website}" target="_blank" rel="noopener noreferrer">Learn More</a>
                    </div>
                `;

                membersContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error loading community members:", error);
            membersContainer.innerHTML = '<p class="empty-state">Unable to load community members at the moment.</p>';
        }
    }

    loadCommunityMembers();
});
