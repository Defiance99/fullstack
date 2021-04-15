function showModalReviewWindow() {
    let modalWindow = document.querySelector('.modal-window');
    let modalWindowField = document.querySelector('.modal-window-field');
    let modalWindowButtonClose = document.querySelector('.modal-window-button-close');
    let body = document.querySelector('body');
    showModalWindow();

    modalWindowField.addEventListener('click', closeModalWindow);
    modalWindowButtonClose.addEventListener('click', closeModalWindow);

    function showModalWindow() {
        body.classList.add('overflow-hidden');
        modalWindow.classList.add('show');
    }
}

function closeModalWindow() {
    let modalWindow = document.querySelector('.modal-window');
    let body = document.querySelector('body');
    modalWindow.classList.remove('show');
    body.classList.remove('overflow-hidden');
}