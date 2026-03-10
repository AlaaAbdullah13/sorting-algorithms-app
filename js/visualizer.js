/**
 * visualizer.js
 * Responsible for rendering and updating the sorting bars in the UI.
 * Designed for eng lolo - Simple and Modular.
 */

const container = document.getElementById('visualizer-container');

/**
 * Clears the container and creates new bar elements based on the array.
 * @param {number[]} array - The array of numbers to visualize.
 */
function renderBars(array) {
    // Clear existing bars
    container.innerHTML = '';

    // Create a new bar for each number in the array
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');

        // Set height proportional to value
        bar.style.height = `${value * 3}px`;

        container.appendChild(bar);
    });
}

/**
 * Updates the color and height of specific bars.
 * @param {number} index1 - First bar index.
 * @param {number} index2 - Second bar index.
 * @param {string} status - 'comparing', 'swapping', or 'done'.
 */
function updateBars(indices, status) {
    const bars = document.getElementsByClassName('bar');

    // Reset colors first (optional, depends on how simple we want it)
    // For simplicity, we just set the specific ones

    indices.forEach(index => {
        if (status === 'comparing') {
            bars[index].style.backgroundColor = 'var(--compare-color)';
        } else if (status === 'swapping') {
            bars[index].style.backgroundColor = 'var(--swap-color)';
        } else {
            bars[index].style.backgroundColor = 'var(--bar-color)';
        }
    });
}

/**
 * Triggers a success animation (pulse) across all bars.
 */
async function victoryAnimation() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted-pulse');
        // Stagger the animation slightly for a "wave" effect
        await sleep(20);
    }

    // Remove the class after animation completes so it can be re-triggered
    setTimeout(() => {
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.remove('sorted-pulse');
        }
    }, 1000);
}

/**
 * Utility to pause execution for a set time (to make sorting visible).
 * @param {number} ms - Milliseconds to sleep.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
