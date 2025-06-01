const phoneHomeBackground = document.getElementById('phone-home'); // 홈화면 (배경제어)
const clockDate = document.getElementById('phone__clock-date-value'); // 날짜
const clockTime = document.getElementById('phone__clock-time-value'); // 시간(ex. 18:20)
const clockSecondTime = document.getElementById('phone__clock-time-second'); // 초(ex. 46)
const battery = document.getElementById('phone__top-battery-value'); // 배터리

// --------- 날짜 및 시간 표시 ----------
const clock = () => {
    // 현재 날짜 표시 
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const date = nowDate.getDate();
    const day = nowDate.getDay();
    const hour = nowDate.getHours();
    const minute = nowDate.getMinutes();
    const second = nowDate.getSeconds();


    // 1~9분대는 앞에 0을 붙임
    let minuteZero = '';
    if (minute < 10) {
        minuteZero = '0' + minute;
    }

    // 0~5 요일들을 한글로 변환
    let dayName = '';
    switch (day) {
        case 0: dayName = '일요일'; break;
        case 1: dayName = '월요일'; break;
        case 2: dayName = '수요일'; break;
        case 3: dayName = '목요일'; break;
        case 4: dayName = '금요일'; break;
        case 5: dayName = '토요일'; break;
    }

    clockDate.innerText = `${year}년 ${month}월 ${date}일 ${dayName}`;
    clockTime.innerText = `${hour}:${minute}`;
    clockSecondTime.innerText = `${second}`;
    battery.innerText = `${batteryCount}`;
}
clock();
// 1초마다 시계 함수 호출
setInterval(clock, 1000);





let batteryCount = 100; // 배터리 100으로 시작
// ---------- 배터리 감소 함수 ---------- 
const clockBattery = () => {
    if (batteryCount > 0) {
        batteryCount--;
    } else if (batteryCount === 0) {
        // 배터리가 0퍼가 되면, 홈 화면 이미지를 제거하고 검정배경으로 교체 + 배터리 글자색도 검정
        phoneHomeBackground.style.backgroundImage = 'none';
        phoneHomeBackground.style.backgroundColor = 'black';
        battery.style.color = 'black';
    }
}
clockBattery();
// 1초마다 배터리 1% 감소
setInterval(clockBattery, 1000);





// const clockBatteryReset = () => {

// }

