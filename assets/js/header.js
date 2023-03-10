//Header elements
const header = document.getElementById("header");
const hamburguerIcon = document.getElementById("menu-hamburguer");
const logo = document.getElementById("header-nav-logo-img");
const navMenu = document.getElementById("header-nav-list");


hamburguerIcon.addEventListener("click", () => {
    //on click event on the hamburger menu icon the menu can be shown and also collapsed
    //toggle the class 'active' on the header element
    header.classList.toggle("active");

    if (header.classList.contains("active")) {
        //add the class 'active' to the navMenu element and change the image source to the close icon
        navMenu.classList.add("active");
        hamburguerIcon.src = "/assets/images/icon-close.svg";
        document.body.style.overflowY = "hidden"
    } else {
        //remove the class 'active' from the navMenu element and change the image source to the hamburger icon
        navMenu.classList.remove("active");
        hamburguerIcon.src = "/assets/images/icon-hamburger.svg";
        hamburguerIcon.classList.remove("active-img");
        document.body.style.overflowY = "visible"
    }
});

//hide the header when the user scrolls down and when the user scrolls up it appears
let lastScrollTop = 0;

window.addEventListener('scroll', function (e) {
    //same position
    if (e.scrollY === lastScrollTop) {
        //display the header element
        header.style.display = "block"
    } else if (this.scrollY > lastScrollTop) {
        //scrolling down
        //hide the header element
        header.style.display = "none"
    } else {
        //scrolling up
        //display the header element
        header.style.display = "block"
    }
    lastScrollTop = this.scrollY;
})