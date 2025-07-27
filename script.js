document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const volumeControl = document.getElementById('volume');
    const tickSound = document.getElementById('tickSound');

    let timer;
    let totalSeconds = 5;
    let isRunning = false;

    // Установка громкости
    volumeControl.addEventListener('input', () => {
        tickSound.volume = volumeControl.value;
    });

    // Обновление отображения таймера
    function updateDisplay() {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // Изменение цвета при малом времени
        if (totalSeconds <= 5) {
            timerDisplay.style.color = '#f44336';
        } else {
            timerDisplay.style.color = '#333';
        }
    }

    // Обратный отсчет
    function countdown() {
        if (totalSeconds <= 0) {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = '▶ Старт';
            return;
        }
        
        totalSeconds--;
        updateDisplay();
        
        // Воспроизведение звука тиканья
        tickSound.currentTime = 0;
        tickSound.play();
    }

    // Установка начального времени
    function setInitialTime() {
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        totalSeconds = mins * 60 + secs;
        updateDisplay();
    }

    // Обработчики событий
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            if (totalSeconds <= 0) setInitialTime();
            if (totalSeconds > 0) {
                timer = setInterval(countdown, 1000);
                isRunning = true;
                startBtn.textContent = '⏸ Пауза';
            }
        } else {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = '▶ Продолжить';
        }
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = '▶ Продолжить';
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        setInitialTime();
        startBtn.textContent = '▶ Старт';
    });

    // Инициализация
    setInitialTime();
    tickSound.volume = volumeControl.value;
});
