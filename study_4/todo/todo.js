
const noText = document.querySelector('.container__noText'); // 할일이 없을때만 표시되는 텍스트
const modalBtn = document.querySelector('.container__todoAddBtn'); // 하단에 + 버튼(모달열기)
const modal = document.querySelector('.modal'); // 모달창 (할일 입력 및 추가 하는곳)
const modalClose = document.querySelector('.close'); // 할일 닫기
const todoInput = document.getElementById('todo-input'); // 할일 입력할 input
const todoAddBtn = document.getElementById('todo-btn'); // 할일 추가 버튼
const todo = document.querySelector('.todo');


document.addEventListener("DOMContentLoaded", () => {
    modalBtn.addEventListener("click", modalToggle);
    modalClose.addEventListener("click", modalToggle);
    todoAddBtn.addEventListener("click", modalInput);
    todoAddBtn.addEventListener("click", modalToggle);
})

// 할일 입력 모달 열기/닫기
let isModalToggle = false;
const modalToggle = () => {
    isModalToggle = !isModalToggle;
    if (isModalToggle) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}

// 할일 입력후, 할일 카드 추가
// 추가된 할일 카드가 6개 이상일시 alert("할일이 너무 많아요.")라고 알림창을 띄운다.
const modalInput = () => {
    const inputValue = todoInput.value;
    if (inputValue) {
        if (todoCount()) {
            const todoCard = document.createElement("div");
            todoCard.className = "todo__card";
            todoCard.textContent = inputValue;
            todo.appendChild(todoCard);

            // 삭제 버튼 추가
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "todo__deleteBtn";
            deleteBtn.textContent = "x";
            todoCard.appendChild(deleteBtn);

            // 삭제 버튼 클릭시 해당 할일은 삭제 
            deleteBtn.addEventListener("click", () => {
                todoCard.remove();
                // 할일을 다 삭제해서 아무것도 없으면 다시 noTodo()함수호출하여, 할일을 추가하라는 텍스트 띄우기
                noTodo();
            })
            noTodo();
        } else {
            alert("할일이 너무 많아요.");
        }
    } else {
        alert("할일을 입력 해주세요");
    }
}

// todoCard 갯수 제한
const todoCount = () => {
    const count = document.querySelectorAll('.todo__card');
    if (count.length < 6) {
        return true;
    } else {
        return false;
    }
}

// 할일이 하나라도 추가된다면, "아래 + 버튼을 눌러 새로운 할일을 추가하세요."이 글자를 보이지 않게 한다.
const noTodo = () => {
    const count = document.querySelectorAll('.todo__card');
    if (count.length > 0) {
        noText.style.display = 'none';
    } else {
        noText.style.display = 'block';
    }
}
