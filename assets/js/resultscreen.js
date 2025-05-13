// redirect to main page on reload action
if (performance.navigation.type === 1) {
    window.location.href = "main.html";
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