const url = "data/members.json";
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

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
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        const members = Array.isArray(data) ? data : data.members || [];
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        membersContainer.innerHTML = `<p>Sorry, unable to load the business directory.</p>`;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = ""; 

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");
        const membershipClass = (member.membership || "Bronze").toLowerCase();

        // 4 child elements total to match the CSS grid-template-columns: repeat(4, 1fr);
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="120">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong><br>${member.address}</p>
            <p><strong>Phone:</strong><br>${member.phone}</p>
            <div class="card-meta">
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                <p class="badge ${membershipClass}">${member.membership}</p>
            </div>
        `;
        membersContainer.appendChild(card);
    });
}

if (gridButton) gridButton.addEventListener("click", () => toggleView("grid"));
if (listButton) listButton.addEventListener("click", () => toggleView("list"));

getMembers();