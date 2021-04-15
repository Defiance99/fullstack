function showModalMessage(valueMessage) {
    let modalMessageContainer = document.getElementsByClassName('modal-messages-container')[0];
    let modalMessage = document.createElement('div');

    modalMessage.classList.add('modal-message');
    modalMessage.innerHTML = `<p class="modal-message-text"> ${valueMessage} </p>`;
    modalMessage.addEventListener('click', () => {
        clearTimeout(timeOut);
        removeElement();
    });

    modalMessageContainer.append(modalMessage);

    let timeOut = setTimeout(removeElement, 3000);

    function removeElement() {
        modalMessage.classList.add('hiddenModalMessage');

        setTimeout(() => {
            modalMessage.remove();
        }, 290) // 290 is animation time    
    }
}