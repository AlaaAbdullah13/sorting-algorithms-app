/**
 * sorting-algorithms.js
 * Contains the logic for different sorting algorithms.
 * Uses async/await to allow eng lolo to see the process step-by-step.
 */

/**
 * Bubble Sort Algorithm
 * Compares adjacent elements and swaps them if they are in the wrong order.
 */
async function bubbleSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            bars[j].style.backgroundColor = 'var(--compare-color)';
            bars[j + 1].style.backgroundColor = 'var(--compare-color)';

            await sleep(101 - speed); // Wait based on user speed setting

            if (array[j] > array[j + 1]) {
                // Swap the values in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update the UI (swap heights)
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                // Show swap color
                bars[j].style.backgroundColor = 'var(--swap-color)';
                bars[j + 1].style.backgroundColor = 'var(--swap-color)';
                await sleep(101 - speed);
            }

            // Reset color back to normal
            bars[j].style.backgroundColor = 'var(--bar-color)';
            bars[j + 1].style.backgroundColor = 'var(--bar-color)';
        }
        // Mark the last element of this pass as sorted
        bars[n - i - 1].style.backgroundColor = 'var(--secondary-color)';
    }
}

/**
 * Selection Sort Algorithm
 * Finds the minimum element and moves it to the beginning.
 */
async function selectionSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = 'var(--compare-color)';

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'var(--compare-color)';
            await sleep(101 - speed);

            if (array[j] < array[minIdx]) {
                if (minIdx !== i) bars[minIdx].style.backgroundColor = 'var(--bar-color)';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'var(--swap-color)';
            } else {
                bars[j].style.backgroundColor = 'var(--bar-color)';
            }
        }

        // Swap the found minimum element with the first element
        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;

        bars[i].style.height = `${array[i] * 3}px`;
        bars[minIdx].style.height = `${array[minIdx] * 3}px`;

        bars[minIdx].style.backgroundColor = 'var(--bar-color)';
        bars[i].style.backgroundColor = 'var(--secondary-color)'; // Sorted
        await sleep(101 - speed);
    }
}

/**
 * Insertion Sort Algorithm
 * Builds the sorted array one item at a time by inserting each new element.
 */
async function insertionSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'var(--compare-color)';
        await sleep(101 - speed);

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'var(--compare-color)';

            // Move elements
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].style.backgroundColor = 'var(--swap-color)';

            await sleep(101 - speed);
            bars[j + 1].style.backgroundColor = 'var(--bar-color)';
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        bars[j + 1].style.backgroundColor = 'var(--secondary-color)';
        await sleep(101 - speed);
    }

    // Final pass to mark everything as secondary color (sorted)
    for (let k = 0; k < n; k++) {
        bars[k].style.backgroundColor = 'var(--secondary-color)';
    }
}

/**
 * Merge Sort Algorithm
 * Divides the array into halves, sorts them, and then merges them back together.
 * This is a bit more complex, but we'll visualize the "merging" part!
 */
async function mergeSort(array, speed) {
    await mergeSortRecursive(array, 0, array.length - 1, speed);

    // Final pass to mark everything as sorted
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'var(--secondary-color)';
        await sleep(10); // Quick little "done" animation
    }
}

async function mergeSortRecursive(array, start, end, speed) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Recursively sort the left and right halves
    await mergeSortRecursive(array, start, mid, speed);
    await mergeSortRecursive(array, mid + 1, end, speed);

    // Merge the sorted halves
    await merge(array, start, mid, end, speed);
}

async function merge(array, start, mid, end, speed) {
    const bars = document.getElementsByClassName('bar');
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        // Highlight bars being compared
        bars[k].style.backgroundColor = 'var(--compare-color)';
        await sleep(101 - speed);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        // Update height and show "swap/place" color
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'var(--swap-color)';
        await sleep(101 - speed);

        // Reset color partially (still in current merge range)
        bars[k].style.backgroundColor = 'var(--bar-color)';
        k++;
    }

    // Copy remaining elements
    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'var(--swap-color)';
        await sleep(101 - speed);
        bars[k].style.backgroundColor = 'var(--bar-color)';
        i++;
        k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'var(--swap-color)';
        await sleep(101 - speed);
        bars[k].style.backgroundColor = 'var(--bar-color)';
        j++;
        k++;
    }
}
