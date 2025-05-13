document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector(".playbtn");
    playBtn.addEventListener("click", function() {
        window.location.href = "play.html"; // Navigate to game screen
    });
});