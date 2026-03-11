/**
 * visualizer.js
 * Responsible for rendering and updating the sorting bars in the UI.
 * Designed for eng lolo — Purple Cartoon Edition! 🔮
 */

const container = document.getElementById('visualizer-container');

/**
 * Clears the container and creates new bar elements based on the array.
 * Each bar gets a staggered bounce-in animation for a fun cartoon effect!
 * @param {number[]} array - The array of numbers to visualize.
 */
function renderBars(array) {
    // Clear existing bars
    container.innerHTML = '';

    // Calculate bar width based on container and array size
    const containerWidth = container.clientWidth - 48; // padding
    const gap = 3;
    const barWidth = Math.max(6, Math.floor((containerWidth - (array.length * gap)) / array.length));

    // Create a new bar for each number in the array
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar', 'animate-in');

        // Set height proportional to value (×4 for bigger bars)
        bar.style.height = `${value * 4}px`;
        bar.style.width = `${barWidth}px`;

        // Stagger the bounce animation
        bar.style.animationDelay = `${index * 15}ms`;

        container.appendChild(bar);
    });
}

/**
 * Updates the color and height of specific bars.
 * @param {number[]} indices - Array of bar indices to update.
 * @param {string} status - 'comparing', 'swapping', or 'done'.
 */
function updateBars(indices, status) {
    const bars = document.getElementsByClassName('bar');

    indices.forEach(index => {
        if (index < 0 || index >= bars.length) return;

        // Remove all status classes first
        bars[index].classList.remove('comparing', 'swapping', 'sorted');

        if (status === 'comparing') {
            bars[index].classList.add('comparing');
        } else if (status === 'swapping') {
            bars[index].classList.add('swapping');
        } else if (status === 'sorted') {
            bars[index].classList.add('sorted');
        }
        // default: no class = normal bar color from gradient
    });
}

/**
 * Resets a bar back to its normal color (removes status classes).
 * @param {number} index - The bar index to reset.
 */
function resetBarColor(index) {
    const bars = document.getElementsByClassName('bar');
    if (index >= 0 && index < bars.length) {
        bars[index].classList.remove('comparing', 'swapping', 'sorted');
    }
}

/**
 * Triggers a success animation (bounce pulse) across all bars in a wave!
 */
async function victoryAnimation() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
        bars[i].classList.add('sorted-pulse');
        // Stagger the animation slightly for a fun "wave" effect
        await sleep(25);
    }

    // Remove pulse class after animation so it can be re-triggered
    setTimeout(() => {
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.remove('sorted-pulse');
        }
    }, 1200);
}

/**
 * Utility to pause execution for a set time (to make sorting visible).
 * @param {number} ms - Milliseconds to sleep.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
