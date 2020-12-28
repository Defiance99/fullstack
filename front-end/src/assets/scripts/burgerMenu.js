document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 800) {
        let burgerMenu = document.getElementsByClassName('custom-burger-menu')[0];
        let mobileMenu = document.getElementsByClassName('mobile-nav-menu')[0];
        let topLine = document.getElementsByClassName('top-line')[0];
        let middleLine = document.getElementsByClassName('middle-line')[0];
        let bottomLine = document.getElementsByClassName('bottom-line')[0];
        let isDisplayedMenu = false;
    
        burgerMenu.addEventListener('click', function() {
            if (isDisplayedMenu) {
                mobileMenu.classList.remove('showBurgerMenu');
                topLine.classList.remove('top-line__Burger-menu');
                middleLine.classList.remove('middle-line__Burger-menu');
                bottomLine.classList.remove('bottom-line__Burger-menu');
                isDisplayedMenu = false;
            }else {
                mobileMenu.classList.add('showBurgerMenu');
                topLine.classList.add('top-line__Burger-menu');
                middleLine.classList.add('middle-line__Burger-menu');
                bottomLine.classList.add('bottom-line__Burger-menu');
                isDisplayedMenu = true;
            }

        });
    } 
});