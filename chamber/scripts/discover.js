// scripts/discover.js

document.addEventListener("DOMContentLoaded", () => {
    const messageArea = document.querySelector("#visit-message");
    
    // Number of milliseconds in a single day
    const msToDays = 84600000;
    
    // Get current date/time in milliseconds
    const today = Date.now();
    
    // Retrieve the stored date from LocalStorage (returns null if first visit)
    const storedLastVisit = window.localStorage.getItem("lastVisit-kampala");

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

    // Always update the localStorage with the most recent visit timestamp
    window.localStorage.setItem("lastVisit-kampala", today);
});