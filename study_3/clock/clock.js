let batteryCount = 100; // 배터리 100으로 시작

const phoneHomeBackground = document.getElementById('phone-home'); // 홈화면 (배경제어)
const clockDate = document.getElementById('phone__clock-date-value'); // 날짜
const clockTime = document.getElementById('phone__clock-time-value'); // 시간(ex. 18:20)
const clockSecondTime = document.getElementById('phone__clock-time-second'); // 초(ex. 46)
const battery = document.getElementById('phone__top-battery-value'); // 배터리 표시
const batteryCharging = document.getElementById('battery-charging'); // 배터리 충전선

const alarmBackgroundOverlay = document.getElementById('alarm__overlay'); // 알람 화면 (배경제어)
const alarmHour = document.getElementById('alarmHour'); // 시
const alarmMinute = document.getElementById('alarmMinute'); // 분
const alarmSecond = document.getElementById('alarmSecond'); // 초
const alarmBtn = document.getElementById('alarm__setting-time-btn'); // 알람 설정 버튼
const alarmList = document.getElementById('alarm__list'); // 알람 표시하는 곳
const alertBox = document.getElementById('alarm__alert'); // 알람 경고창
const alarmTime = document.getElementById('alarm__top-time'); // 현재시간 표시
const alarmBattery = document.getElementById('alarm__top-battery-value'); // 배터리 표시


// 📌 홈(시간) 화면 --------------------------------------------

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
    } else {
        minuteZero = minute;
    }

    let hourMidnight = '';
    if (hour === 0) {
        hourMidnight = '0' + hour;
    } else {
        hourMidnight = hour;
    }

    // 0~5 요일들을 한글로 변환
    let dayName = '';
    switch (day) {
        case 0: dayName = '일요일'; break;
        case 1: dayName = '월요일'; break;
        case 2: dayName = '화요일'; break;
        case 3: dayName = '수요일'; break;
        case 4: dayName = '목요일'; break;
        case 5: dayName = '금요일'; break;
        case 6: dayName = '토요일'; break;
    }


    clockDate.innerText = `${year}년 ${month}월 ${date}일 ${dayName}`;
    clockTime.innerText = `${hourMidnight}:${minuteZero}`;
    alarmTime.innerText = `${hourMidnight}:${minuteZero}`;
    clockSecondTime.innerText = `${second}`;
    battery.innerText = `${batteryCount}`;
    alarmBattery.innerText = `${batteryCount}`;
};
clock();
// // 1초마다 시계 함수 호출
setInterval(clock, 1000);





// ---------- 배터리 감소 함수 ---------- 
const clockBattery = () => {
    if (batteryCount > 0) {
        batteryCount--;
    } else if (batteryCount === 0) {
        // 배터리가 0퍼가 되면, 홈 화면 이미지를 제거하고 검정배경으로 교체 + 배터리 글자색도 검정
        phoneHomeBackground.style.backgroundImage = 'none';
        phoneHomeBackground.style.backgroundColor = 'black';
        alarmBackgroundOverlay.style.visibility = 'visible';
        battery.style.color = 'black';
    }
}
clockBattery();
// 1초마다 배터리 1% 감소
setInterval(clockBattery, 1000);




// ----------- 배터리 충전 함수 ------------
const clockBatteryCharging = () => {
    // 충전선 클릭하면 휴대폰을 충전선에 꽂고, 배터리를 100%으로 충전시킴
    batteryCharging.onclick = () => {
        phoneHomeBackground.style.marginBottom = '0px';
        batteryCount = 100;
        phoneHomeBackground.style.backgroundImage = '';
        alarmBackgroundOverlay.style.visibility = 'hidden';
        battery.style.color = 'white';
        // 배터리 100% 충전되면, 2초 뒤 휴대폰을 원위치로 복귀
        setTimeout(() => {
            phoneHomeBackground.style.marginBottom = '70px';
        }, 2000);
    }
}
clockBatteryCharging();




// 📌 알람 화면 --------------------------------------------

// -------------- 경고창 -------------
const showAlert = (message) => {
    alertBox.innerText = `⚠️ ${message}`;
    alertBox.style.visibility = 'visible';
    setTimeout(() => {
        alertBox.style.visibility = 'hidden'
    }, 2000);
}
// ------------- 알람 설정에 문제가 있을시 실행되는 함수 ----------
const alarmAlert = (type) => {
    // 입력 안했다고 알림창
    // 숫자가 아닐경우 알림창
    // 숫자가 일정 숫자를 넘어서면 알림창
    // 알람 갯수 3개이상 초과시 알림창
    switch (type) {
        case 'noText':
            showAlert('시, 분, 초 모두 입력하세요.');
            break;
        case 'noNumber':
            showAlert('숫자만 입력하세요.');
            break;
        case 'outNumber':
            showAlert('시(0~12), 분(0~60), 초(0~60)을 내에서만 입력하세요.');
            break;
        case 'outLength':
            showAlert('알람은 최대 3개까지만 추가 가능합니다.');
    }
}
// 입력창 초기화 함수
const valueReset = () => {
    alarmHour.value = '';
    alarmMinute.value = '';
    alarmSecond.value = '';
}
const alarmSetting = () => {
    // 입력하지 않고 + 누르면 알림창
    // 입력한게 숫자인지 확인
    // 숫자가 아니라면 알림창 띄우기
    // 숫자인데, 시(0~12), 분(0~60), 초(0~60)를 넘어서면 알림창
    // 모든 조건이 알람설정조건에 부합하면, alarmView()함수 호출하여 데이터 전달

    alarmBtn.addEventListener('click', () => {
        const hour = alarmHour.value;
        const minute = alarmMinute.value;
        const second = alarmSecond.value;
        if (hour === '' || minute === '' || second === '') {
            alarmAlert('noText');
            valueReset();
            return;
        }
        else if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
            alarmAlert('noNumber');
            valueReset();
            return;
        }
        else if ((hour < 0 || hour > 12) || (minute < 0 || minute > 60) || (second < 0 || second > 60)) {
            alarmAlert('outNumber');
            valueReset();
            return;
        } else {
            alarmListView(hour, minute, second);
            valueReset();
        }
    })
}
alarmSetting();

// ------------ 알람 목록 -------------
const alarmListView = (hourData, minuteData, secondData) => {
    // alarmList에 <span>태그를 이용해서 알람 표시
    // <span>태그 갯수(알람갯수)가 3개 이상이 되면, 더이상 알람을 추가할 수 없다고 alarmAlert 호출해서 알림 띄우기
    const alarmLength = alarmList.querySelectorAll('span').length;
    if (alarmLength < 3) {
        alarmList.innerHTML += `<span>${hourData}시 ${minuteData}분 ${secondData}초</span>`;
    } else {
        alarmAlert('outLength');
    }
}