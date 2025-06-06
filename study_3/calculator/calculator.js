const btnAll = document.querySelector('.calculator__btn');
const display = document.getElementById('display');
const history = document.querySelector('.history__text');

let input = ''; // 입력값 저장

const calculator = () => {
    display.innerText = '0';
    btnAll.addEventListener('click', (e) => {
        const btn = e.target; // 클릭한 버튼
        const btnValue = btn.dataset.value; // 클릭한 버튼의 값
        const btnType = btn.dataset.type; // 클릭한 버튼의 타입
        const previousValue = input.charAt(input.length - 1); // 마지막에 입력된 값

        // 클릭한 버튼이 숫자일경우
        if (btnType === 'number') {
            if (input === '0' && btnValue === '0') {
                // 0이 연속으로 눌리는 경우 무시
                return;
            } else if (input === '0' && btnValue !== '0') {
                // 기존 입력이 '0'이고, 새 숫자가 1-9일 경우 0을 대체
                input = btnValue;
            } else {
                // 그 외에는 그냥 입력값 누적
                input += btnValue;
            }
            display.innerText = input;
        }


        // 클릭한 버튼이 연산자라면,
        else if (btnType === 'operator') {
            // input에 입력된 값이 없을때는 연산자 입력 하지 못하도록 한다.
            if (input === '') {
                return;
            }
            // btnValue값이 "=" "ce" "ac" 연산자가 아니고, 이전값이 숫자일때만 연산자(+, -, %, /)를 저장
            if (btnValue !== '=' && btnValue !== 'ce' && btnValue !== 'ac' && !isNaN(previousValue)) {
                input += btnValue; // 연산 저장
                display.innerText = input;
            }
        }
        // 클릭한 버튼이 = 이라면, input란의 값을 계산한다.
        if (btnValue === '=') {
            const result = math.evaluate(input);
            historyView(input, result);
            display.innerText = result;
            input = result.toString();
        }
        // 클릭한 버튼이 'ac'라면, input란을 지운다.
        if (btnValue === 'ac') {
            input = '0';
            display.innerText = input;
        }
        // 클릭한 버튼이 'ce'라면, input란에 저장된 내용중에 마지막 문자 바로전까지 잘라냄
        if (btnValue === 'ce') {
            input = input.slice(0, -1);
            display.innerText = input;
        }
    })
}
calculator();

// 연산 기록 표시 함수
const historyView = (value1, value2) => {
    const historyLength = history.querySelectorAll('p').length;
    if (historyLength < 5) {
        history.innerHTML += `<p>${value1}=${value2}</p>`;
    } else if (historyLength > 4) {
        // 처음 추가된 연산 기록부터 삭제 하고, 새로운 연산을 기록
        const firstHistory = history.querySelector('p');
        firstHistory.remove();
        history.innerHTML += `<p>${value1}=${value2}</p>`;
    }
}