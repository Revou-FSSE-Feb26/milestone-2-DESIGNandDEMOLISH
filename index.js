let hamburgerButton = document.getElementById("hamburger-button");
let hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerButton.addEventListener('click',e => {
    hamburgerMenu.classList.toggle("hidden");
})