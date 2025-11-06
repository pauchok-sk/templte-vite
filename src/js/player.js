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
      let durationAudio = 0;
      let durationAudioFormat = "00:00";

      // Ждем загрузки метаданных аудио
      audio.addEventListener("loadedmetadata", () => {
        durationAudio = audio.duration;
        durationAudioFormat = formatTime(durationAudio);
        time.innerHTML = `00:00 / ${durationAudioFormat}`;
      });

      audio.addEventListener("timeupdate", (e) => {
        const currentTime = formatTime(e.target.currentTime);
        const progress =
          e.target.duration > 0
            ? (e.target.currentTime / e.target.duration) * 100
            : 0;

        if (!isDragInput) {
          circle.style.left = `${progress}%`;
          input.value = progress;
        }

        time.innerHTML = `${currentTime} / ${durationAudioFormat}`;
      });

      audio.addEventListener("ended", (e) => {
        btn.classList.remove("_active");
      });

      input.addEventListener("change", (e) => {
        isDragInput = false;

        // Проверяем, что duration валидный
        if (audio.duration > 0 && isFinite(audio.duration)) {
          const value = +e.target.value;
          const audioCurrentTime = audio.duration * (value / 100);

          // Проверяем, что значение валидное
          if (isFinite(audioCurrentTime) && audioCurrentTime >= 0) {
            audio.currentTime = audioCurrentTime;
          }
        }
      });

      input.addEventListener("input", (e) => {
        isDragInput = true;
        circle.style.left = `${e.target.value}%`;
      });

      btn.addEventListener("click", () => {
        if (btn.classList.contains("_active")) {
          handlePause();
        } else {
          handlePlay();
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
    });

    function formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
        return "00:00";
      }

      seconds = Math.floor(seconds);

      const minutes = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);

      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  }
}
