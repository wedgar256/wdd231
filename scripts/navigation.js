// =======================================
// WDD 231 - Navigation
// Author: Wanyama Edgar
// =======================================

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

// Toggle menu on small screens
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});

// Close menu when a navigation link is clicked
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.classList.remove("open");
    });
});

// Close menu automatically if window is resized to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        navigation.classList.remove("open");
        menuButton.classList.remove("open");
    }
});