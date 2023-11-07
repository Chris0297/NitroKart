const canvasSize = 500;
const canvas = document.getElementById("joystick");
let gameStarted = false;
canvas.width = canvasSize;
canvas.height = canvasSize;

const ctx = canvas.getContext("2d");
const scale = canvasSize / 2000;
const joystickRadius = 100 * scale;
const rectWidth = 100 * scale;
const rectHeight = 50 * scale;
let rectSpeed = 5 * scale;

const brakeWidth = 50;
const brakeHeight = 50;

const trackOuterRadius = 700 * scale;
const trackInnerRadius = 500 * scale;
const trackWidth = 1500 * scale;
const roadWidth = trackOuterRadius - trackInnerRadius;
let finishLine = canvasSize - 500 * scale;

let rectX = canvas.width / 2 - rectWidth / 2 + 20;
let rectY = canvas.height / 2 + trackInnerRadius + (trackOuterRadius - trackInnerRadius) / 2 - rectHeight / 2;
let joystickX = joystickRadius;
let joystickY = joystickRadius;
let rectRotation = 0;

const rect2Width = rectWidth;
const rect2Height = rectHeight;
let rect2Speed = 5 * scale;
const standardSpeed = 5 * scale;

let rect2X = canvas.width / 2 - rectWidth / 2 + 20;
let rect2Y = canvas.height / 2 + trackInnerRadius + (trackOuterRadius - trackInnerRadius) / 2 - rectHeight / 2;
let joystick2X = canvas.width - joystickRadius;
let joystick2Y = canvas.height - joystickRadius;
let rect2Rotation = 0;

let currentRoundBlue = 1;
let currentRoundRed = 1;
const totalRounds = 3;
let blueRoundCompleted = false;
let redRoundCompleted = false;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    let countdown = 3;
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawJoystick();
    drawJoystick2();
    drawBrake(brake1);
    drawBrake(brake2);
    drawBoostButtons();
    drawRacingTrack();
    drawFinishLine();
    drawItemBox(itemBox1);
    drawCar();
    drawSecondRect();
    const countdownInterval = setInterval(() => {
        ctx.clearRect(canvas.width / 2 - 50, canvas.height / 2 - 150, 100, 200);
        ctx.fillText(countdown.toString(), canvas.width / 2, canvas.height / 2);
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            gameStarted = true;
            update();
        }
    }, 1000);
}

function drawNumberOfRoundsBlue() {
    ctx.save();
    ctx.translate(20, 150);
    ctx.rotate(Math.PI / 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";

    ctx.fillText(`Blue Round: ${currentRoundBlue}/${totalRounds}`, 0, 0);
    ctx.restore();
}



function drawNumberOfRoundsRed() {
    ctx.save();

    ctx.translate(480, 150);
    ctx.rotate(-Math.PI / 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(`Red Round: ${currentRoundRed}/${totalRounds}`, 0, 0);
    ctx.restore();
}

function showWinner(winner) {
    const winnerText = winner === 'blue' ? 'Blau gewinnt!' : 'Rot gewinnt!';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(winnerText, canvas.width / 2, canvas.height / 2);
    gameStarted = false;
    drawItemBox = function () { };
    drawBrake = function () { };
    drawRect = function () { };
}

function updateRoundBlue() {
    if (rectX > canvasSize / 2 && rectX < (canvasSize / 2 + 10 * scale) && rectY > finishLine && rectY < finishLine + 200 * scale) {
        if (!blueRoundCompleted) {
            currentRoundBlue++;
            blueRoundCompleted = true;
        }
    } else {
        blueRoundCompleted = false;
    }
    if (currentRoundBlue > totalRounds) {
        showWinner('blue');
    }
    drawNumberOfRoundsBlue();
}


function updateRoundRed() {
    if (rect2X > canvasSize / 2 && rect2X < (canvasSize / 2 + 10 * scale) && rect2Y > finishLine && rect2Y < finishLine + 200 * scale) {
        if (!redRoundCompleted) {
            currentRoundRed++;
            redRoundCompleted = true;
        }
    } else {
        redRoundCompleted = false;
    }
    if (currentRoundRed > totalRounds) {
        showWinner('red');
    }
    drawNumberOfRoundsRed();
}



function drawJoystick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(joystickRadius, joystickRadius, joystickRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(joystickX, joystickY, 10 * scale, 0, 2 * Math.PI);
    ctx.fill();
}

function drawJoystick2() {
    ctx.beginPath();
    ctx.arc(canvas.width - joystickRadius, canvas.height - joystickRadius, joystickRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(joystick2X, joystick2Y, 10 * scale, 0, 2 * Math.PI);
    ctx.fill();
}

function drawCar() {
    ctx.save();
    ctx.translate(rectX + rectWidth / 2, rectY + rectHeight / 2);
    ctx.rotate(rectRotation);
    ctx.fillStyle = "blue";
    ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
    ctx.restore();
}

function drawSecondRect() {
    ctx.save();
    ctx.translate(rect2X + rect2Width / 2, rect2Y + rect2Height / 2);
    ctx.rotate(rect2Rotation);
    ctx.fillStyle = "red";
    ctx.fillRect(-rect2Width / 2, -rect2Height / 2, rect2Width, rect2Height);
    ctx.restore();
}

function drawRacingTrack() {
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - trackWidth / 2, canvas.height / 2 - trackOuterRadius, trackWidth, trackOuterRadius * 2);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - (trackWidth / 2 - roadWidth), canvas.height / 2 - trackInnerRadius, trackWidth - 2 * roadWidth, trackInnerRadius * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
}

function drawFinishLine() {
    ctx.fillStyle = "black";
    ctx.fillRect(canvasSize / 2, finishLine, 10 * scale, 200 * scale);
}


let brake1 = {
    x: 5 * scale,
    y: canvas.height - 180,
    width: brakeWidth,
    height: brakeHeight,
    beingTouched: false
};

let brake2 = {
    x: canvas.width - brakeWidth - 10 * scale,
    y: canvas.height - 180,
    width: brakeWidth,
    height: brakeHeight,
    beingTouched: false
};

function drawBrake(brake) {
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(brake.x, brake.y, brake.width, brake.height);
    ctx.restore();
}

function adjustSpeed() {
    if (brake1.beingTouched && rectSpeed > 0) {
        rectSpeed -= 0.5 * scale;
    } else if (!brake1.beingTouched && rectSpeed < standardSpeed) {
        rectSpeed += 0.5 * scale;
    }

    if (brake2.beingTouched && rect2Speed > 0) {
        rect2Speed -= 0.5 * scale;
    } else if (!brake2.beingTouched && rect2Speed < standardSpeed) {
        rect2Speed += 0.5 * scale;
    }
}

canvas.addEventListener("touchstart", function (e) {
    const touches = e.touches;
    for (let i = 0; i < touches.length; i++) {
        let touchX = touches[i].clientX - canvas.getBoundingClientRect().left;
        let touchY = touches[i].clientY - canvas.getBoundingClientRect().top;
        if (isBoost1 && touchX > boostButtonBlue.x && touchX < boostButtonBlue.x + boostButtonBlue.width &&
            touchY > boostButtonBlue.y && touchY < boostButtonBlue.y + boostButtonBlue.height) {
            activateBoost('blue');
            isBoost1 = false;
        }


        if (isBoost2 && touchX > boostButtonRed.x && touchX < boostButtonRed.x + boostButtonRed.width &&
            touchY > boostButtonRed.y && touchY < boostButtonRed.y + boostButtonRed.height) {
            activateBoost('red');
            isBoost2 = false;
        }
    }
}, false);


function moveRect() {
    const dx = joystickX - joystickRadius;
    const dy = joystickY - joystickRadius;
    const angle = Math.atan2(dy, dx);
    const vx = rectSpeed * Math.cos(angle);
    const vy = rectSpeed * Math.sin(angle);
    let newX = rectX + vx;
    let newY = rectY + vy;


    const leftLimit = canvas.width / 2 - trackOuterRadius + rectWidth / 2 - 25;
    const rightLimit = canvas.width / 2 + trackOuterRadius - rectWidth / 2 + 25;
    const topLimit = canvas.height / 2 - trackOuterRadius + rectHeight / 2;
    const bottomLimit = canvas.height / 2 + trackOuterRadius - rectHeight / 2;


    const distFromCenterX = Math.abs(canvas.width / 2 - (newX + rectWidth / 2));
    const distFromCenterY = Math.abs(canvas.height / 2 - (newY + rectHeight / 2));
    if (distFromCenterX < trackInnerRadius && distFromCenterY < trackInnerRadius) {
        if (Math.abs(dx) > Math.abs(dy)) {
            newY = rectY;
        } else {
            newX = rectX;
        }
    } else {

        newX = clamp(newX, leftLimit, rightLimit - rectWidth);
        newY = clamp(newY, topLimit, bottomLimit - rectHeight);
        rectX = newX;
        rectY = newY;
    }
    rectRotation = angle;
}


function moveSecondRect() {
    const dx = joystick2X - (canvas.width - joystickRadius);
    const dy = joystick2Y - (canvas.height - joystickRadius);
    const angle = Math.atan2(dy, dx);
    const vx = rect2Speed * Math.cos(angle);
    const vy = rect2Speed * Math.sin(angle);
    let newX = rect2X + vx;
    let newY = rect2Y + vy;

    const leftLimit = canvas.width / 2 - trackOuterRadius + rect2Width / 2 - 25;
    const rightLimit = canvas.width / 2 + trackOuterRadius - rect2Width / 2 + 25;
    const topLimit = canvas.height / 2 - trackOuterRadius + rect2Height / 2;
    const bottomLimit = canvas.height / 2 + trackOuterRadius - rect2Height / 2;


    const distFromCenterX = Math.abs(canvas.width / 2 - (newX + rect2Width / 2));
    const distFromCenterY = Math.abs(canvas.height / 2 - (newY + rect2Height / 2));
    if (distFromCenterX < trackInnerRadius && distFromCenterY < trackInnerRadius) {
        if (Math.abs(dx) > Math.abs(dy)) {
            newY = rect2Y;
        } else {
            newX = rect2X;
        }
    } else {

        newX = clamp(newX, leftLimit, rightLimit - rect2Width);
        newY = clamp(newY, topLimit, bottomLimit - rect2Height);
        rect2X = newX;
        rect2Y = newY;
    }
    rect2Rotation = angle;
}


function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

let itemBox1 = {
    x: 100,
    y: 100,
    width: 25,
    height: 25,
    visible: true
};

function drawItemBox(itemBox) {
    if (itemBox.visible) {
        ctx.save();
        ctx.fillStyle = "brown";
        ctx.fillRect(itemBox.x, itemBox.y, itemBox.width, itemBox.height);
        ctx.restore();
    }
}

let isBoost1 = false;
let isBoost2 = false;
const buttonWidth = 50;
const buttonHeight = 50;

const boostButtonBlue = {
    x: 0,
    y: 250,
    width: buttonWidth,
    height: buttonHeight,
};

const boostButtonRed = {
    x: 450,
    y: 250,
    width: buttonWidth,
    height: buttonHeight,
}

let isRed = false;
let isBlue = false;
function checkCollisionWithItemBox() {
    if (itemBox1.visible) {

        if (rectX < itemBox1.x + itemBox1.width && rectX + rectWidth > itemBox1.x &&
            rectY < itemBox1.y + itemBox1.height && rectY + rectHeight > itemBox1.y) {
            isBoost1 = true;
            itemBox1.visible = false;
            setTimeout(() => {
                itemBox1.visible = true;
            }, 3000);
        }

        else if (rect2X < itemBox1.x + itemBox1.width && rect2X + rect2Width > itemBox1.x &&
            rect2Y < itemBox1.y + itemBox1.height && rect2Y + rect2Height > itemBox1.y) {
            isBoost2 = true;
            itemBox1.visible = false;
            setTimeout(() => {
                itemBox1.visible = true;
            }, 3000);
        }
    }
}




let hasBoostBeenUsedBlue = false;
let hasBoostBeenUsedRed = false;

function drawBoostButtons() {
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.strokeRect(boostButtonBlue.x, boostButtonBlue.y, boostButtonBlue.width, boostButtonBlue.height);
    ctx.fillStyle = hasBoostBeenUsedBlue ? "white" : (isBoost1 ? "blue" : "white");
    ctx.fillRect(boostButtonBlue.x, boostButtonBlue.y, boostButtonBlue.width, boostButtonBlue.height);
    ctx.strokeRect(boostButtonRed.x, boostButtonRed.y, boostButtonRed.width, boostButtonRed.height);
    ctx.fillStyle = hasBoostBeenUsedRed ? "white" : (isBoost2 ? "red" : "white");
    ctx.fillRect(boostButtonRed.x, boostButtonRed.y, boostButtonRed.width, boostButtonRed.height);
    ctx.restore();
}


const joysticks = {};

function limitJoystickPosition(joystick, centerX, centerY, radius) {
    const dx = joystick.x - centerX;
    const dy = joystick.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > radius) {
        joystick.x = centerX + (dx / distance) * radius;
        joystick.y = centerY + (dy / distance) * radius;
    }
}

canvas.addEventListener("touchstart", function (e) {
    const touches = e.touches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        let touchX = touch.clientX - canvas.getBoundingClientRect().left;
        let touchY = touch.clientY - canvas.getBoundingClientRect().top;
        if (touchX >= brake1.x && touchX <= brake1.x + brakeWidth &&
            touchY >= brake1.y && touchY <= brake1.y + brakeHeight) {
            brake1.beingTouched = true;
        } else if (touchX >= brake2.x && touchX <= brake2.x + brakeWidth &&
            touchY >= brake2.y && touchY <= brake2.y + brakeHeight) {
            brake2.beingTouched = true;
        } else {
            if (touchX < canvas.width / 2) {
                joysticks[touch.identifier] = { type: 'left', x: touchX, y: touchY };
            } else {
                joysticks[touch.identifier] = { type: 'right', x: touchX, y: touchY };
            }
        }
    }
}, false);


canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    const touches = e.touches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        if (joysticks[touch.identifier]) {
            let touchX = touch.clientX - canvas.getBoundingClientRect().left;
            let touchY = touch.clientY - canvas.getBoundingClientRect().top;
            const joystick = joysticks[touch.identifier];
            if (joystick.type === 'left') {
                joystick.x = touchX;
                joystick.y = touchY;
                limitJoystickPosition(joystick, joystickRadius, joystickRadius, joystickRadius);
                joystickX = joystick.x;
                joystickY = joystick.y;
            } else {
                joystick.x = touchX;
                joystick.y = touchY;
                limitJoystickPosition(joystick, canvas.width - joystickRadius, canvas.height - joystickRadius, joystickRadius);
                joystick2X = joystick.x;
                joystick2Y = joystick.y;
            }
        }
    }
}, { passive: false });

canvas.addEventListener("touchend", function (e) {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        let touchX = touch.clientX - canvas.getBoundingClientRect().left;
        let touchY = touch.clientY - canvas.getBoundingClientRect().top;
        if ((touchX >= brake1.x && touchX <= brake1.x + brakeWidth &&
            touchY >= brake1.y && touchY <= brake1.y + brakeHeight) ||
            (touchX >= brake2.x && touchX <= brake2.x + brakeWidth &&
                touchY >= brake2.y && touchY <= brake2.y + brakeHeight)) {
            brake1.beingTouched = false;
            brake2.beingTouched = false;
        }

        if (joysticks[touch.identifier]) {
            delete joysticks[touch.identifier];
        }
    }
}, false);



const boostDuration = 3000;

function activateBoost(color) {
    if (color === 'blue' && isBoost1 && !hasBoostBeenUsedBlue) {
        hasBoostBeenUsedBlue = true;
        isBoost1 = false;
        rectSpeed = standardSpeed * 2;
        setTimeout(() => {
            rectSpeed = standardSpeed;

            setTimeout(() => {
                hasBoostBeenUsedBlue = false;
                itemBox1.visible = true;
            }, 3000);
        }, boostDuration);
    } else if (color === 'red' && isBoost2 && !hasBoostBeenUsedRed) {
        hasBoostBeenUsedRed = true;
        isBoost2 = false;
        rect2Speed = standardSpeed * 2;
        setTimeout(() => {
            rect2Speed = standardSpeed;

            setTimeout(() => {
                hasBoostBeenUsedRed = false;
                itemBox1.visible = true;
            }, 3000);
        }, boostDuration);
    }
}

function update() {
    if (!gameStarted) {
        return;
    }
    drawJoystick();
    drawJoystick2();
    drawRacingTrack();
    drawFinishLine();
    drawCar();
    drawSecondRect();
    updateRoundBlue();
    updateRoundRed();
    moveRect();
    moveSecondRect();
    checkCollisionWithItemBox();
    drawItemBox(itemBox1);
    drawBoostButtons();
    drawBrake(brake1);
    drawBrake(brake2);
    adjustSpeed();
    window.requestAnimationFrame(update);
}

update();