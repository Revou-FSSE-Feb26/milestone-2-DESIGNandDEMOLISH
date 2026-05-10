let hamburgerButton = document.getElementById("hamburger-button");
let hamburgerMenu = document.getElementById("hamburger-menu");
let closeMenu = document.getElementById("close-menu");

hamburgerButton.addEventListener('click',e => {
    hamburgerMenu.classList.toggle("hidden");
});

closeMenu.addEventListener("click",e => {
    hamburgerMenu.classList.toggle("hidden");
})