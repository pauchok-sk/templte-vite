export default function player() {
  const players = document.querySelectorAll(".player");

  if (players.length) {
    players.forEach((player) => {
      const btn = player.querySelector(".player-btn");
      const audio = player.querySelector(".player-audio");
      const circle = player.querySelector(".player-timeline-circle");
      const input = player.querySelector(".player-timeline-input");
      const time = player.querySelector(".player-time");

      let isDragInput = false;
      let finalDuration = null; // Фиксированная длительность

      // Устанавливаем фиксированную длительность при загрузке метаданных
      audio.addEventListener("loadedmetadata", () => {
        finalDuration = Math.floor(audio.duration); // Фиксируем длительность
        updateTimeDisplay();
      });

      // Функция для обновления отображения времени
      function updateTimeDisplay() {
        const currentTime = formatTime(audio.currentTime);
        const duration =
          finalDuration !== null ? formatTime(finalDuration) : "00:00";
        time.innerHTML = `${currentTime} / ${duration}`;
      }

      audio.addEventListener("timeupdate", (e) => {
        const currentTime = Math.floor(e.target.currentTime);
        const duration =
          finalDuration !== null
            ? finalDuration
            : Math.floor(e.target.duration);
        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

        if (!isDragInput) {
          circle.style.left = `${progress}%`;
          input.value = progress;
        }

        // Используем фиксированную длительность для отображения
        const currentTimeFormatted = formatTime(currentTime);
        const durationFormatted =
          finalDuration !== null
            ? formatTime(finalDuration)
            : formatTime(duration);
        time.innerHTML = `${currentTimeFormatted} / ${durationFormatted}`;
      });

      audio.addEventListener("ended", (e) => {
        btn.classList.remove("_active");
        // При окончании устанавливаем точное конечное время
        if (finalDuration !== null) {
          time.innerHTML = `${formatTime(finalDuration)} / ${formatTime(
            finalDuration
          )}`;
        }
      });

      input.addEventListener("change", (e) => {
        isDragInput = false;

        const duration =
          finalDuration !== null ? finalDuration : audio.duration;
        if (duration > 0 && isFinite(duration)) {
          const value = +e.target.value;
          const audioCurrentTime = duration * (value / 100);

          if (isFinite(audioCurrentTime) && audioCurrentTime >= 0) {
            audio.currentTime = Math.min(audioCurrentTime, duration);
          }
        }
      });

      input.addEventListener("input", (e) => {
        isDragInput = true;
        circle.style.left = `${e.target.value}%`;

        // Обновляем отображение времени при перетаскивании
        const duration =
          finalDuration !== null ? finalDuration : audio.duration;
        if (duration > 0) {
          const value = +e.target.value;
          const audioCurrentTime = duration * (value / 100);
          const currentTime = formatTime(audioCurrentTime);
          const durationFormatted = formatTime(duration);
          time.innerHTML = `${currentTime} / ${durationFormatted}`;
        }
      });

      btn.addEventListener("click", () => {
        if (audio.paused) {
          handlePlay();
        } else {
          handlePause();
        }
      });

      function handlePlay() {
        audio.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
        });
        btn.classList.add("_active");
      }

      function handlePause() {
        audio.pause();
        btn.classList.remove("_active");
      }

      // Инициализация при загрузке
      if (audio.readyState > 0) {
        finalDuration = Math.floor(audio.duration);
        updateTimeDisplay();
      }
    });

    function formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
        return "00:00";
      }

      seconds = Math.floor(seconds); // Гарантируем целое число

      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;

      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  }
}
