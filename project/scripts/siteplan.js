document.addEventListener("DOMContentLoaded", () => {
    // Inject current dynamic year
    const yearSpan = document.querySelector("#year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Inject document last modified date
    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});