'use strict';

const START_YEAR = 1894;
const END_YEAR = 1985;

const START_AGE = 0;
const END_AGE = 91;

const path =
    document.getElementById("linePath");

const timelinePath = document.getElementById("timelinePath");

const dot =
    document.querySelector(".dot");

const yearEl =
    document.querySelector(".year");

const ageEl =
    document.querySelector(".age");

const bwToggle = document.getElementById("bwToggle");
const THEME_STORAGE_KEY = "ovartaci-theme-isBlackOnWhite";

const reveals = document.querySelectorAll(
    ".node"
);

const pathLength = path.getTotalLength();
const timelinePathLength = timelinePath.getTotalLength();

path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

timelinePath.style.strokeDasharray = timelinePathLength;
timelinePath.style.strokeDashoffset = timelinePathLength;




// --------------------
// THEME TOGGLE
// --------------------
function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY) === "true";
    } catch (error) {
        return false;
    }
}

function applyTheme(isBlackWhite) {
    const themeColor = isBlackWhite ? "#000" : "#fff";

    document.body.classList.toggle("bw-mode", isBlackWhite);
    bwToggle.setAttribute("aria-pressed", String(isBlackWhite));
    //bwToggle.textContent = isBlackWhite ? "Back to dark" : "Black / White";

    if (isBlackWhite) {
        // document.body.classList.add("bw-mode");
        console.log("BW MODE");
    } else {
        console.log("WB MODE");
        // document.body.classList.remove("bw-mode");
    }

    try {
        localStorage.setItem(THEME_STORAGE_KEY, String(isBlackWhite));
    } catch (error) {
        // Ignore storage errors and keep the UI working.
    }

    document.querySelectorAll("svg").forEach((svg) => {
        const isPauseLogo = svg.closest(".pause-screen");
        svg.style.color = isPauseLogo ? "#000" : themeColor;

        svg.querySelectorAll("[fill], [stroke]").forEach((el) => {
            const fill = el.getAttribute("fill");
            const stroke = el.getAttribute("stroke");

            if (fill && fill !== "none" && fill !== "transparent") {
                el.style.fill = fill.startsWith("url(") ? fill : "currentColor";
            }

            if (stroke && stroke !== "none" && stroke !== "transparent") {
                el.style.stroke = stroke.startsWith("url(") ? stroke : "currentColor";
            }
        });
    });
}

bwToggle.addEventListener("click", () => {
    const nextState = !document.body.classList.contains("bw-mode");
    applyTheme(nextState);
});

applyTheme(getStoredTheme());


// --------------------
// SCENE / TIMELINE UPDATE
// --------------------
function updateScene() {
    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    const progress = Math.min(Math.max(window.scrollX / maxScroll, 0), 1);

    path.style.strokeDashoffset = pathLength * (1 - progress);
    const point = path.getPointAtLength(pathLength * progress);

    timelinePath.style.strokeDashoffset = timelinePathLength * (1 - progress);
    const timelinePoint = timelinePath.getPointAtLength(timelinePathLength * progress);


    // dot.style.left = `${point.x}px`;
    // dot.style.top = `${point.y}px`;

    yearEl.textContent = Math.round(START_YEAR + (END_YEAR - START_YEAR) * progress);
    ageEl.textContent = `År ${Math.round(START_AGE + (END_AGE - START_AGE) * progress)}`;

    reveals.forEach((el) => {
        const start = Number(el.dataset.start);
        const hideAt = start - 0.0; // scroll buffer

        if (progress >= start) {
            el.classList.add("revealed");
        } else if (progress < hideAt) {
            el.classList.remove("revealed");
        }
        // if (
        //     progress >= start &&
        //     !el.classList.contains("revealed")
        // ) {
        //     el.classList.add("revealed");
        // }
    });

    // FINAL GLOW
    if (progress > 0.92) {

        dot.style.transform =
            "translate(-50%, -50%) scale(1.8)";

    } else {

        dot.style.transform =
            "translate(-50%, -50%) scale(1)";
    }

    if (progress > 0.92) {
        console.log("END REACHED - INCREMENTING COUNTER");
        localStorage.setItem("ovartaci-has-seen-end", localStorage.getItem("ovartaci-has-seen-end") ? parseInt(localStorage.getItem("ovartaci-has-seen-end")) + 1 : 1);
    }
}

window.addEventListener(
    "scroll",
    updateScene
);

window.addEventListener(
    "resize",
    updateScene
);

updateScene();

// --------------------
// PAUSE SCREEN
// --------------------
const pauseScreen = document.querySelector('.pause-screen');

let idleTimer = null;
let momentumFrame = null;
let momentumVelocity = 0;
let lastTouchX = 0;
let lastTouchTime = 0;
let touchVelocityX = 0;

// --------------------
// MOMENTUM / INERTIA
// --------------------
function stopMomentum() {
    if (momentumFrame) {
        cancelAnimationFrame(momentumFrame);
        momentumFrame = null;
    }
    momentumVelocity = 0;
}

function startMomentum(velocity) {
    stopMomentum();

    const safeVelocity = Math.max(-1800, Math.min(1800, velocity));
    if (Math.abs(safeVelocity) < 0.5) return;

    momentumVelocity = safeVelocity;

    const step = () => {
        const maxScroll = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
        const nextLeft = Math.min(Math.max(window.scrollX + momentumVelocity * 0.28, 0), maxScroll);

        window.scrollTo({ left: nextLeft, behavior: 'auto' });
        momentumVelocity *= 0.92;

        if (Math.abs(momentumVelocity) > 0.35) {
            momentumFrame = requestAnimationFrame(step);
        } else {
            stopMomentum();
        }
    };

    momentumFrame = requestAnimationFrame(step);
}

function showPauseScreen() {
    if (!pauseScreen) return;

    pauseScreen.classList.remove('is-hidden');
    document.body.classList.add('pause-active');

    window.scrollTo({
        left: 0,
        behavior: 'auto'
    });
}

function hidePauseScreen() {
    if (!pauseScreen) return;

    pauseScreen.classList.add('is-hidden');
    document.body.classList.remove('pause-active');
    resetIdleTimer();
}

function resetIdleTimer() {
    if (idleTimer) {
        clearTimeout(idleTimer);
    }

    idleTimer = window.setTimeout(() => {
        showPauseScreen();
    }, 14000);
}

if (pauseScreen) {
    pauseScreen.addEventListener('pointerdown', hidePauseScreen);
}

// --------------------
// INPUT LISTENERS
// --------------------
window.addEventListener('wheel', (event) => {
    const deltaX = event.deltaX || event.deltaY * 0.8;

    if (Math.abs(deltaX) > 1) {
        event.preventDefault();
        startMomentum(deltaX * 6);
    }
}, { passive: false });

window.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    lastTouchX = touch.clientX;
    lastTouchTime = performance.now();
    touchVelocityX = 0;
    stopMomentum();
}, { passive: true });

window.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const now = performance.now();
    const deltaX = touch.clientX - lastTouchX;
    const deltaTime = Math.max(16, now - lastTouchTime);

    touchVelocityX = (deltaX / deltaTime) * 420;
    event.preventDefault();

    lastTouchX = touch.clientX;
    lastTouchTime = now;
}, { passive: false });

window.addEventListener('touchend', () => {
    if (Math.abs(touchVelocityX) > 1) {
        startMomentum(touchVelocityX);
    }
}, { passive: true });

[
    'pointerdown',
    'pointermove',
    'touchstart',
    'touchmove',
    'wheel',
    'keydown',
    'click'
].forEach(eventName => {
    document.addEventListener(eventName, resetIdleTimer, { passive: true });
});

window.addEventListener('scroll', resetIdleTimer, { passive: true });

resetIdleTimer();