document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = currentUrl.split('?')[1];

    const resultsContainer = document.querySelector("#results");

    if (!formData) {
        resultsContainer.innerHTML = "<p>No application data found.</p>";
        return;
    }

    // Extract parameters using URLSearchParams
    const showInfo = new URLSearchParams(window.location.search);

    function formatDate(isoString) {
        if (!isoString) return "N/A";
        const date = new Date(isoString);
        return date.toLocaleString();
    }

    resultsContainer.innerHTML = `
        <ul class="submitted-info">
            <li><strong>First Name:</strong> ${showInfo.get("fname") || "N/A"}</li>
            <li><strong>Last Name:</strong> ${showInfo.get("lname") || "N/A"}</li>
            <li><strong>Title:</strong> ${showInfo.get("title") || "N/A"}</li>
            <li><strong>Email:</strong> ${showInfo.get("email") || "N/A"}</li>
            <li><strong>Phone:</strong> ${showInfo.get("phone") || "N/A"}</li>
            <li><strong>Organization:</strong> ${showInfo.get("organization") || "N/A"}</li>
            <li><strong>Membership Level:</strong> ${showInfo.get("membership")?.toUpperCase() || "N/A"}</li>
            <li><strong>Submission Date/Time:</strong> ${formatDate(showInfo.get("timestamp"))}</li>
        </ul>
    `;
});