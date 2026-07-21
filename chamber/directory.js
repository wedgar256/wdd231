// chamber/directory.js
const url = "data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Toggle between grid and list view classes dynamically
function toggleView(view) {
    if (!membersContainer) return;
    
    if (view === "grid") {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
        gridButton?.classList.add("active");
        listButton?.classList.remove("active");
    } else {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
        gridButton?.classList.remove("active");
        listButton?.classList.add("active");
    }
}

async function getMembers() {
    if (!membersContainer) return;

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
            <p style="color: #b91c1c; grid-column: 1 / -1; text-align: center; font-weight: bold;">
                Sorry, unable to load the business directory. Please try again later.
            </p>`;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear layout grid spaces completely

    members.forEach(member => {
        // Use 'article' element matching home page components for structural uniformity
        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipClass = (member.membership || "Bronze").toLowerCase();

        // Elements are structured as exactly 5 tags total (1 image, 4 text nodes).
        // Since list view hides the image, exactly 4 child containers remain to match 'repeat(4, 1fr)' perfectly!
        card.innerHTML = `
            <img src="${member.image}" 
                 alt="${member.name} business logo" 
                 loading="lazy"
                 width="200" height="120">

            <h2>${member.name}</h2>
            
            <p class="directory-address"><strong>Address:</strong><br>${member.address}</p>
            <p class="directory-phone"><strong>Phone:</strong><br>${member.phone}</p>
            
            <div class="card-meta-actions">
                <p>
                    <a href="${member.website}" target="_blank" rel="noopener">
                        Visit Website
                    </a>
                </p>
                <p class="badge ${membershipClass}">
                    <span>${member.membership}</span>
                </p>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

// Event Listeners with optional chaining safety hooks
if (gridButton) {
    gridButton.addEventListener("click", () => toggleView("grid"));
}
if (listButton) {
    listButton.addEventListener("click", () => toggleView("list"));
}

// Initialize directory load cycle
getMembers();