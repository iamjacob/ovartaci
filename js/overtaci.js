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

        const reveals = document.querySelectorAll(
            ".node"
        );

        const pathLength = path.getTotalLength();
        const timelinePathLength = timelinePath.getTotalLength();

        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        timelinePath.style.strokeDasharray = timelinePathLength;
        timelinePath.style.strokeDashoffset = timelinePathLength;




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
                const hideAt = start - 0.0; // 3% scroll buffer

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
