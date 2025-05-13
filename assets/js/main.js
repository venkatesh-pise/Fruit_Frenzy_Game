document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector(".playbtn");
    playBtn.addEventListener("click", function() {
        window.location.href = "play.html"; // Navigate to game screen
    });
});

function setVhUnit() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVhUnit();
window.addEventListener("resize", setVhUnit);