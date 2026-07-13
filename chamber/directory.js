// chamber/directory.js
const url = "../data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Toggle between grid and list view
function toggleView(view) {
    if (view === "grid") {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    } else {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
        gridButton.classList.remove("active");
        listButton.classList.add("active");
    }
}

async function getMembers() {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const members = Array.isArray(data) ? data : data.members || [];
        displayMembers(members);

    } catch (error) {
        console.error("Error fetching members:", error);
        membersContainer.innerHTML = `
            <p style="color: red; grid-column: 1 / -1; text-align: center;">
                Sorry, unable to load business directory. Please try again later.
            </p>`;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";   // Clear previous content

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" 
                 alt="${member.name} business logo" 
                 loading="lazy"
                 width="200" height="120">

            <h3>${member.name}</h3>
            
            <p><strong>Address:</strong><br>${member.address}</p>
            <p><strong>Phone:</strong><br>${member.phone}</p>
            
            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    🌐 Visit Website
                </a>
            </p>
            
            <p class="membership ${member.membership.toLowerCase()}">
                <strong>Membership:</strong> ${member.membership}
            </p>
        `;

        membersContainer.appendChild(card);
    });
}

// Event Listeners
if (gridButton) {
    gridButton.addEventListener("click", () => toggleView("grid"));
}
if (listButton) {
    listButton.addEventListener("click", () => toggleView("list"));
}

// Initialize
getMembers();
