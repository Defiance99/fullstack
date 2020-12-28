document.addEventListener('DOMContentLoaded', () => {
    let buttonsReview = document.getElementsByClassName('button-write-review');
    let modalWindow = document.getElementsByClassName('modal-window')[0];
    let modalWindowField = document.getElementsByClassName('modal-window-field')[0];
    let modalWindowButtonClose = document.getElementsByClassName('modal-window-button-close')[0];
    let body = document.querySelector('body');

    modalWindowField.addEventListener('click', closeModalWindow);
    modalWindowButtonClose.addEventListener('click', closeModalWindow);

    if (buttonsReview) {
        for (let i = 0; i < buttonsReview.length; i++) {
            buttonsReview[i].addEventListener('click', showModalWindow);
        }
    }

    function closeModalWindow() {
        modalWindow.classList.remove('show');
        body.classList.remove('overflow-hidden');
    }

    function showModalWindow() {
        body.classList.add('overflow-hidden');
        modalWindow.classList.add('show');
    }

    

});