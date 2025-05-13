// redirect to main page on reload action
if (performance.navigation.type === 1) {
    window.location.href = "index.html";
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        score: params.get("score") || 0,
        missed: params.get("missed") || 0,
    };
}

window.onload = function() {
    const { score, missed } = getQueryParams();

    document.getElementById("final-score").textContent = score;
    document.getElementById("missed-count").textContent = missed;
    $(".result-screen").removeClass("hidden");
};

$("#replay").click(function() {
    window.location.href = "play.html";
});

function setVhUnit() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVhUnit();
window.addEventListener("resize", setVhUnit);