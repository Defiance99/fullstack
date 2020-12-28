/* document.addEventListener('DOMContentLoaded', function() {
    let leftArrowSlider = document.getElementsByClassName('custom-left-arrow-container')[0];
    let rightArrowSlider = document.getElementsByClassName('custom-right-arrow-container')[0];
    let reviewSlider = document.getElementsByClassName('review-block-wrapper')[0];
    let widthBlockSlider = 746; 
    let maxWidthSlider = (reviewSlider.children.length - 1) * widthBlockSlider;
    let currentPosition = 0;
    let currentIndex = 1;

    leftArrowSlider.addEventListener('click', leftMovingOnClick);
    rightArrowSlider.addEventListener('click', rightMovingOnClick);
    reviewSlider.addEventListener('mousedown', mouseMoveSlider);
    reviewSlider.addEventListener('mouseup', () => {
        reviewSlider.removeEventListener('mousemove', moveAt);
    });

    function leftMovingOnClick() {
        if (currentPosition > 0) {
            currentPosition = currentPosition - widthBlockSlider;
            reviewSlider.style.right = currentPosition + 'px';
        }
    }

    function rightMovingOnClick() {
        if (currentPosition < maxWidthSlider) {
            currentPosition = currentPosition + widthBlockSlider;
            reviewSlider.style.right = currentPosition + 'px';
        }
    }

    function mouseMoveSlider() {
        reviewSlider.addEventListener('mousemove', moveAt);
    }
    function moveAt(event) {
        reviewSlider.style.right = event.pageX - reviewSlider.offsetWidth / 2 + 'px';
    }
}); */

document.addEventListener('DOMContentLoaded', function() {
    let leftArrowSlider = document.getElementsByClassName('custom-left-arrow-container')[0];
    let rightArrowSlider = document.getElementsByClassName('custom-right-arrow-container')[0];
    let reviewSlider = document.getElementsByClassName('review-block-wrapper')[0];
   /*  let widthBlockSlider = 746;  */
    let maxSliderElements = (reviewSlider.children.length - 1);
    let currentIndex = 0;

    leftArrowSlider.addEventListener('click', leftMovingOnClick);
    rightArrowSlider.addEventListener('click', rightMovingOnClick);
    /* reviewSlider.addEventListener('mousedown', mouseMoveSlider);
    reviewSlider.addEventListener('mouseup', () => {
        reviewSlider.removeEventListener('mousemove', moveAt);
    }); */

    function leftMovingOnClick() {
        if (currentIndex > 0) {
            let widthBlockSlider = reviewSlider.offsetWidth;
            currentIndex--;
            let position = currentIndex * widthBlockSlider;
            reviewSlider.style.transform = `translateX(-${position}px)`;
        }
    }

    function rightMovingOnClick() {
        if (currentIndex < maxSliderElements) {
            let widthBlockSlider = reviewSlider.offsetWidth;
            currentIndex++;
            let position = currentIndex * widthBlockSlider;
            reviewSlider.style.transform = `translateX(-${position}px)`;
        }
    }

    /* function mouseMoveSlider() {
        reviewSlider.addEventListener('mousemove', moveAt);
    }
    function moveAt(event) {
        reviewSlider.style.right = event.pageX - reviewSlider.offsetWidth / 2 + 'px';
    } */
});