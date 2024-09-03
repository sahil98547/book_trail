// document.addEventListener('DOMContentLoaded', function () {
//     const headings = document.querySelectorAll('.unique-counter-section .heading');

//     headings.forEach(function (heading) {
//         const countTo = parseInt(heading.getAttribute('data-countto'), 10);
//         const countDuration = parseInt(heading.getAttribute('data-duration'), 10);

//         const startTime = performance.now();

//         function updateCounter(timestamp) {
//             const elapsed = timestamp - startTime;
//             const progress = Math.min(elapsed / countDuration, 1);
//             const currentCount = Math.floor(progress * countTo);

//             heading.textContent = currentCount;

//             if (progress < 1) {
//                 requestAnimationFrame(updateCounter);
//             } else {
//                 heading.textContent = `${countTo}+`;
//             }
//         }
//         requestAnimationFrame(updateCounter);
//     });
// });



document.addEventListener('DOMContentLoaded', function () {
    // Function to handle the counter animation
    function startCounterAnimation(heading) {
        const countTo = parseInt(heading.getAttribute('data-countto'), 10);
        const countDuration = parseInt(heading.getAttribute('data-duration'), 10);

        const startTime = performance.now();

        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / countDuration, 1);
            const currentCount = Math.floor(progress * countTo);

            heading.textContent = currentCount;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                heading.textContent = `${countTo}+`;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Get all heading elements in the unique counter section
    const headings = document.querySelectorAll('.unique-counter-section .heading');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is in view, start the counter animation
                startCounterAnimation(entry.target);
                // Optionally, unobserve the target to run the animation only once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5  // Adjust as needed (e.g., 0.5 means 50% of the section must be visible)
    });

    // Observe each heading element
    headings.forEach(heading => observer.observe(heading));
});
