document.addEventListener('DOMContentLoaded', function() {
    let countValue = document.getElementsByClassName('v-model-quantity');
    let plus = document.getElementsByClassName('plus-symbol');
    let minus = document.getElementsByClassName('minus-symbol');
    let buttonAddToBasket = document.getElementsByClassName('add-to-basket-butt');



    // окна сообщений нужно будет вынести в отдельный файл
    let modalMessageContainer = document.getElementsByClassName('modal-messages-container')[0];

    function showModalMessage(valueMessage) {
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





    for (let i = 0; i < countValue.length; i++) {
        let counter = productCounter();
        plus[i].addEventListener('click', () => {
            countValue[i].innerHTML = counter(true);
        });
        minus[i].addEventListener('click', () => {
            countValue[i].innerHTML = counter(false);
        });
        buttonAddToBasket[i].addEventListener('click', () => {
            localStorage.setItem('countProduct', countValue[i].innerHTML);
            showModalMessage('Успешно добавлено');
        });
    }

    function productCounter() {
        let counter = 1;

        return function(plus) {
            if (plus) {
                counter += 1;
                return counter;
            }else if (!plus && counter != 1) {
                counter -= 1;
                return counter;
            }else {
                return 1;
            }
        }
    }
});