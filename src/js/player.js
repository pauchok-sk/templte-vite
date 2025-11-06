export default function player() {
  const players = document.querySelectorAll(".player");

  if (players.length) {
    players.forEach((player) => {
      const btn = player.querySelector(".player-btn");
      const audio = player.querySelector(".player-audio");
      const audioObj = new Audio(audio.src);
      const circle = player.querySelector(".player-timeline-circle");
      const input = player.querySelector(".player-timeline-input");
      const time = player.querySelector(".player-time");
      let durationAudio = audio.duration;
      let durationAudioFormat = formatTime(durationAudio);

      let isDragInput = false;
      time.innerHTML = `00:00 / ${durationAudioFormat}`;

      audio.addEventListener("timeupdate", (e) => {
        const currentTime = formatTime(e.target.currentTime);
        const progress = (e.target.currentTime / e.target.duration) * 100;

        if (!isDragInput) {
          circle.style.left = `${progress}%`;
        }

        time.innerHTML =
          time.innerHTML = `${currentTime} / ${durationAudioFormat}`;
      });
      audio.addEventListener("ended", (e) => {
        btn.classList.remove("_active");
      });

      input.addEventListener("change", (e) => {
        isDragInput = false;
        if (!audio.paused) {
          const value = +e.target.value;
          const videoCurrentTime = durationAudio * (value / 100);

          audio.currentTime = videoCurrentTime;
        }
      });
      input.addEventListener("input", (e) => {
        isDragInput = true;
        if (!audio.paused) {
          circle.style.left = `${e.target.value}%`;
        }
      });

      btn.addEventListener("click", () => {
        if (btn.classList.contains("_active")) {
          handlePause();
        } else {
          handlePlay();
        }
      });

      function handlePlay() {
        audio.play();
        btn.classList.add("_active");
      }

      function handlePause() {
        audio.pause();
        btn.classList.remove("_active");
      }
    });

    function formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds)) {
        return "00:00";
      }

      seconds = Math.floor(seconds);

      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);

      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  }
}
