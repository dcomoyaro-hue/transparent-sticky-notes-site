(() => {
  const opacityControl = document.querySelector("[data-opacity-control]");
  const opacityValue = document.querySelector("[data-opacity-value]");
  const demoNote = document.querySelector("[data-demo-note]");

  if (opacityControl && opacityValue && demoNote) {
    const updateOpacity = () => {
      const value = Number(opacityControl.value);
      demoNote.style.background = `rgba(255, 230, 129, ${value / 100})`;
      opacityValue.textContent = `${value}%`;
    };
    opacityControl.addEventListener("input", updateOpacity);
    updateOpacity();
  }

  const fileDemo = document.querySelector("[data-file-demo]");
  if (fileDemo) {
    fileDemo.addEventListener("click", () => {
      fileDemo.classList.toggle("is-open");
      const label = fileDemo.querySelector("small");
      if (label) {
        label.textContent = fileDemo.classList.contains("is-open")
          ? "フォルダを開きました"
          : "3個のファイル";
      }
    });
  }

  const playButton = document.querySelector("[data-play-demo]");
  if (playButton) {
    playButton.addEventListener("click", () => {
      const player = playButton.closest(".player");
      const status = player?.querySelector("[data-play-status]");
      const isPlaying = player?.classList.toggle("is-playing");
      const icon = playButton.querySelector("span");
      if (icon) icon.textContent = isPlaying ? "Ⅱ" : "▶";
      playButton.setAttribute("aria-label", isPlaying ? "音声を一時停止" : "音声を再生");
      if (status) status.textContent = isPlaying ? "再生中" : "音声メモ";
    });
  }

  const replayButton = document.querySelector("[data-replay]");
  const animationStage = document.querySelector("[data-animation-stage]");
  const animationCaption = document.querySelector("[data-animation-caption]");
  const animationSteps = [...document.querySelectorAll("[data-animation-step]")];
  if (replayButton && animationStage) {
    const captions = [
      ["1", "付箋を確認", "短い言葉で、次にやることを思い出します。"],
      ["2", "透明に切り替え", "付箋を視界に残したまま、背面操作へ切り替えます。"],
      ["3", "背面で作業を開始", "クリックが付箋の向こう側へ届き、資料を操作できます。"]
    ];
    let captionTimers = [];

    const showCaption = (index) => {
      if (!animationCaption) return;
      const [number, title, detail] = captions[index];
      animationCaption.querySelector("span").textContent = number;
      animationCaption.querySelector("strong").textContent = title;
      animationCaption.querySelector("small").textContent = detail;
      animationSteps.forEach((step, stepIndex) => {
        step.classList.toggle("is-current", stepIndex === index);
      });
    };

    const startCaptions = () => {
      captionTimers.forEach(window.clearTimeout);
      showCaption(0);
      captionTimers = [
        window.setTimeout(() => showCaption(1), 2500),
        window.setTimeout(() => showCaption(2), 4700),
        window.setTimeout(() => showCaption(0), 7900)
      ];
    };

    replayButton.addEventListener("click", () => {
      animationStage.classList.remove("is-replaying");
      void animationStage.offsetWidth;
      animationStage.classList.add("is-replaying");
      window.setTimeout(() => animationStage.classList.remove("is-replaying"), 8200);
      startCaptions();
    });
    startCaptions();
    window.setInterval(startCaptions, 8000);
  }

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, { rootMargin: "-25% 0px -65%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
