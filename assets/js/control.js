// Code starts for control or mvement

// varibale decleration
let pos = 50;

var score = 0;
var missedCount = 0;

var fruitsimage = [{
        name: "fruit1",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit2",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit3",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit4",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit5",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit6",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit7",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit8",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit9",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit10",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit11",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    },
    {
        name: "fruit12",
        path: "assets/images/fruits/fruit2.png",
        type: "fruit"
    },
    {
        name: "fruit13",
        path: "assets/images/fruits/fruit1.png",
        type: "fruit"
    }
]

var bombs = [{
        name: "bomb1",
        path: "assets/images/bombs/bomb1.png",
        type: "bomb"
    },
    {
        name: "bomb2",
        path: "assets/images/bombs/bomb2.png",
        type: "bomb"
    },
    {
        name: "bomb3",
        path: "assets/images/bombs/bomb3.png",
        type: "bomb"
    },
    {
        name: "bomb4",
        path: "assets/images/bombs/bomb4.png",
        type: "bomb"
    },
    {
        name: "bomb",
        path: "assets/images/bombs/bomb5.png",
        type: "bomb"
    }
]

const basket = document.getElementById("basket");

function init() {
    enableButtons()
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

    // Random horizontal position between 5% to 95%
    let leftPercent = Math.random() * 40 + 30;
    img.css("left", leftPercent + "%");

    $(".hidden-container").append(img);

    animateFall(img);
}

function animateFall(element) {
    let start = null;


    function step(timestamp) {
        if (!start) start = timestamp;

        let progress = timestamp - start;
        let percent = Math.min(progress / 3000, 1); // animate over 3 sec
        element.css("top", percent * 80 + "%"); // from 0% to 80%

        // Check for collision
        if (isColliding(element, basket)) {
            let type = element.attr("type");
            if (type === "fruit") {
                score += 10;
                element.remove();
            } else if (type === "bomb") {
                endGame(missedCount, score);
                return;
            }
        } else if (percent >= 1) {
            // Missed fruit
            if (element.attr("type") === "fruit") {
                missedCount++;
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

function endGame(miss, score) {
    console.log("score: " + score, "missed: " + miss)
    return;
}


function enableButtons() {
    $(".left-btn,.right-btn").css("cursor", "pointer").css("pointer-events", "auto");
    $(".basketArea").css("left", pos + "%");
}

// button logic here

$(".left-btn").click(function() {
    updatePosition("left");
});

$(".right-btn").click(function() {
    updatePosition("right")
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