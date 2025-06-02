
const alarmHour = document.getElementById('alarmHour');
const alarmMinute = document.getElementById('alarmMinute');
const alarmSecond = document.getElementById('alarmSecond');
const alarmBtn = document.getElementById('alarm__setting-time-btn');
const alarmList = document.getElementById('alarm__list');
const alertBox = document.getElementById('alarm__alert'); // 알람 경고창

const showAlert = (message) => {
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none'
    }, 1500);
}
const alarmAlert = (type) => {
    // 입력 안했다고 알림창
    // 숫자가 아닐경우 알림창
    // 숫자가 일정 숫자를 넘어서면 알림창
    switch (type) {
        case 'noText':
            showAlert('숫자를 입력하세요');
            break;
    }
}
const alarmSetting = () => {
    // 입력하지 않고 + 누르면 알림창
    // 입력한게 숫자인지 확인
    // 숫자가 아니라면 알림창 띄우기
    // 숫자인데, 시(0~12), 분(0~60), 초(0~60)를 넘어서면 알림창
    const hour = alarmHour.value;
    const minute = alarmMinute.value;
    const second = alarmSecond.value;
    alarmBtn.addEventListener('click', () => {
        if (hour === '' && minute === '' && second === '') {
            alarmAlert('noText');
        }
    })
}
alarmSetting();

const alarmListView = () => {
    // 알람 추가
}