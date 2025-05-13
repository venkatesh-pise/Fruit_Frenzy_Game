// Code starts for control or mvement

// varibale decleration
let pos = 50;

var score = 0;
var missedCount = 0;
let gameOver = false;

var fruitsimage = [{
        name: "fruit1",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit2",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit3",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit4",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit5",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit6",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit7",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit8",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit9",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit10",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit11",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
    {
        name: "fruit12",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit",
    },
    {
        name: "fruit13",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit",
    },
];

var bombs = [{
        name: "bomb1",
        path: "assets/images/bombs/bomb1.png",
        type: "bomb",
    },
    {
        name: "bomb2",
        path: "assets/images/bombs/bomb2.png",
        type: "bomb",
    },
    {
        name: "bomb3",
        path: "assets/images/bombs/bomb3.png",
        type: "bomb",
    },
    {
        name: "bomb4",
        path: "assets/images/bombs/bomb4.png",
        type: "bomb",
    },
    {
        name: "bomb",
        path: "assets/images/bombs/bomb5.png",
        type: "bomb",
    },
];

const basket = document.getElementById("basket");

// redirect to main page on reload action
if (performance.navigation.type === 1) {
    window.location.href = "index.html";
}

function init() {
    enableButtons();
    setInterval(dropRandomItem, 1500);
}

// create random element
function getRandomItem(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function dropRandomItem() {
    let isFruit = Math.random() < 0.7; // 70% fruit, 30% bomb
    let item = isFruit ? getRandomItem(fruitsimage) : getRandomItem(bombs);

    let img = $("<img>");
    img.attr("src", item.path);
    img.addClass("falling-item");
    img.attr("type", item.type);

    // Random horizontal position between 40% to 60%
    let leftPercent = Math.round(Math.random() * 20 + 40);
    img.css("left", leftPercent + "%");

    $(".hidden-container").append(img);

    animateFall(img);
}

function animateFall(element) {
    let start = null;

    function step(timestamp) {
        if (gameOver) {
            element.remove(); // Optional: clear leftover items
            return;
        }

        if (!start) start = timestamp;

        let progress = timestamp - start;
        let percent = Math.min(progress / 3000, 1);
        element.css("top", percent * 80 + "%");
        if (score > 30 && score <= 60) {
            $("#basket").attr("src", "assets/images/basket2.png");
        } else if (score > 60) {
            $("#basket").attr("src", "assets/images/basket3.png");
        }
        if (isColliding(element, basket)) {
            let type = element.attr("type");
            if (type === "fruit") {
                score += 10;
                element.remove();
            } else if (type === "bomb") {
                gameOver = true;
                endGame(missedCount, score);
                return;
            }
        } else if (percent >= 1) {
            if (element.attr("type") === "fruit") {
                missedCount++;
                if (missedCount == 5) {
                    gameOver = true;
                    endGame(missedCount, score);
                    return;
                }
            }
            element.remove();
        } else {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function isColliding(fallingItem, basket) {
    const itemRect = $(fallingItem).get(0).getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    return !(
        itemRect.bottom < basketRect.top ||
        itemRect.top > basketRect.bottom ||
        itemRect.right < basketRect.left ||
        itemRect.left > basketRect.right
    );
}

function endGame(missed, score) {
    gameOver = true;

    // Optional: remove all items still falling
    $(".falling-item").remove();

    // Show game over message
    // cancelAnimationFrame(animationId);
    window.location.href = `lastpage.html?score=${score}&missed=${missedCount}`;
}

function enableButtons() {
    $(".left-btn,.right-btn")
        .css("cursor", "pointer")
        .css("pointer-events", "auto");
    $(".basketArea").css("left", pos + "%");
}

// button logic here

$(".left-btn").click(function() {
    updatePosition("left");
});

$(".right-btn").click(function() {
    updatePosition("right");
});

// basket movement on button click

function updatePosition(direction) {
    if (direction == "left" && pos > 10) {
        pos = pos - 10;
    } else if (direction == "right" && pos < 90) {
        pos = pos + 10;
    }

    $(".basketArea").css("left", pos + "%");
}

window.onload = init;

function setVhUnit() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVhUnit();
window.addEventListener("resize", setVhUnit);