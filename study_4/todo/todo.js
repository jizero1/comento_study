
const noText = document.querySelector('.container__noText');
const todoAddBtn = document.querySelector('.container__todoAddBtn');
const modal = document.querySelector('.modal');

document.addEventListener("DOMContentLoaded", () => {
    todoAddBtn.addEventListener("click", clickTodoAddBtn);
})
let isModalToggle = false;
const clickTodoAddBtn = () => {
    isModalToggle = !isModalToggle;
    if (isModalToggle) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}