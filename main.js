const popup = document.getElementById("popup");
const slider = document.getElementById("slider");
const nama = document.getElementById("nama");
const semuaFoto = document.querySelectorAll(".box img");

semuaFoto.forEach((img, index) => {
  img.onclick = () => {
    slider.innerHTML = "";
    semuaFoto.forEach(f => {
      slider.innerHTML += `<img src="${f.src}" alt="${f.alt}">`;
    });
    popup.style.display = "flex";
    document.body.classList.add("popup-active");
    setTimeout(() => {
      slider.scrollLeft = index * slider.clientWidth;
      const fotoPopup = slider.querySelectorAll("img");
      nama.textContent = fotoPopup[index].alt;
      slider.onscroll = null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            nama.textContent = entry.target.alt;
          }
        });
      }, { threshold: 0.7 });
      fotoPopup.forEach(img => observer.observe(img));
      slider._observer = observer;
    }, 10);
  };
});

const closePopup = popup.querySelector(".close");
closePopup.onclick = () => {
  popup.style.display = "none";
  document.body.classList.remove("popup-active");
  if (slider._observer) {
    slider._observer.disconnect();
    slider._observer = null;
  }
};

// Efek jejak (trail)
function buatJejak(x, y) {
  const dot = document.createElement("div");
  dot.className = "trail";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 800);
}
document.addEventListener("mousemove", (e) => buatJejak(e.clientX, e.clientY));
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  buatJejak(touch.clientX, touch.clientY);
});

// ===================== FOTO ALBUM =====================
const foto = ["background.jpg", "1.jpg"]; // isi dengan file yang ada
let indexFoto = 0;

function bukaFoto() {
  document.getElementById("popupFoto").style.display = "flex";
  document.body.classList.add("popup-active");
  document.getElementById("sliderFoto").src = foto[indexFoto];
}
function tutupFoto() {
  document.getElementById("popupFoto").style.display = "none";
  document.body.classList.remove("popup-active");
}
function nextFoto() {
  indexFoto = (indexFoto + 1) % foto.length;
  document.getElementById("sliderFoto").src = foto[indexFoto];
}
function prevFoto() {
  indexFoto = (indexFoto - 1 + foto.length) % foto.length;
  document.getElementById("sliderFoto").src = foto[indexFoto];
}

// ===================== VIDEO ALBUM =====================
const video = ["1.mp4", "2.mp4"]; // perbaiki sintaks (koma, bukan titik koma)
let indexVideo = 0;

function bukaVideo() {
  document.getElementById("popupVideo").style.display = "flex";
  document.body.classList.add("popup-active");
  const player = document.getElementById("videoPlayer");
  player.src = video[indexVideo];
  player.load();
  tampilkanTombolVideo();
}
function tutupVideo() {
  document.getElementById("popupVideo").style.display = "none";
  document.body.classList.remove("popup-active");
  const player = document.getElementById("videoPlayer");
  player.pause();
  player.currentTime = 0;
}
function nextVideo() {
  indexVideo = (indexVideo + 1) % video.length;
  const player = document.getElementById("videoPlayer");
  player.src = video[indexVideo];
  player.load();
  player.play();
}
function prevVideo() {
  indexVideo = (indexVideo - 1 + video.length) % video.length;
  const player = document.getElementById("videoPlayer");
  player.src = video[indexVideo];
  player.load();
  player.play();
}

const tombolVideo = document.querySelectorAll(".video-nav");
const playerVideo = document.getElementById("videoPlayer");
let timerTombol;

function tampilkanTombolVideo() {
  tombolVideo.forEach(btn => btn.style.opacity = "1");
  clearTimeout(timerTombol);
  timerTombol = setTimeout(() => {
    tombolVideo.forEach(btn => btn.style.opacity = "0");
  }, 3000);
}
playerVideo.addEventListener("mousemove", tampilkanTombolVideo);
playerVideo.addEventListener("touchstart", tampilkanTombolVideo);
playerVideo.addEventListener("play", tampilkanTombolVideo);

function togglePlaylist() {
  const list = document.getElementById("playlist");
  list.style.display = list.style.display === "block" ? "none" : "block";
}
function pilihVideo(index) {
  indexVideo = index;
  const player = document.getElementById("videoPlayer");
  player.src = video[index];
  player.load();
  player.play();
  document.getElementById("playlist").style.display = "none";
}