/**
 * sorting-algorithms.js
 * Contains the logic for different sorting algorithms.
 * Uses async/await to allow eng lolo to see the process step-by-step.
 * 
 * Purple Cartoon Edition! 🔮
 * All algorithms support:
 *   - stopRequested flag to interrupt sorting
 *   - Dynamic speed via getSpeed() 
 *   - Live comparison/swap counters
 */

/**
 * Bubble Sort Algorithm
 * Compares adjacent elements and swaps them if they are in the wrong order.
 * Time: O(n²) | Space: O(1) | Stable: Yes
 */
async function bubbleSort(array, getSpeed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Check if user pressed stop
            if (stopRequested) return;

            // Highlight bars being compared
            updateBars([j, j + 1], 'comparing');
            incrementComparisons();

            await sleep((101 - getSpeed()) * 10);

            if (array[j] > array[j + 1]) {
                // Swap the values in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update the UI (swap heights)
                bars[j].style.height = `${array[j] * 4}px`;
                bars[j + 1].style.height = `${array[j + 1] * 4}px`;

                // Show swap color
                updateBars([j, j + 1], 'swapping');
                incrementSwaps();
                await sleep((101 - getSpeed()) * 10);
            }

            // Reset color back to normal
            resetBarColor(j);
            resetBarColor(j + 1);
        }
        // Mark the last element of this pass as sorted
        updateBars([n - i - 1], 'sorted');
    }
}

/**
 * Selection Sort Algorithm
 * Finds the minimum element and moves it to the beginning.
 * Time: O(n²) | Space: O(1) | Stable: No
 */
async function selectionSort(array, getSpeed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 0; i < n; i++) {
        if (stopRequested) return;

        let minIdx = i;
        updateBars([i], 'comparing');

        for (let j = i + 1; j < n; j++) {
            if (stopRequested) return;

            updateBars([j], 'comparing');
            incrementComparisons();
            await sleep((101 - getSpeed()) * 10);

            if (array[j] < array[minIdx]) {
                if (minIdx !== i) resetBarColor(minIdx);
                minIdx = j;
                updateBars([minIdx], 'swapping');
            } else {
                resetBarColor(j);
            }
        }

        // Swap the found minimum element with the first element
        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;

        bars[i].style.height = `${array[i] * 4}px`;
        bars[minIdx].style.height = `${array[minIdx] * 4}px`;
        incrementSwaps();

        resetBarColor(minIdx);
        updateBars([i], 'sorted');
        await sleep((101 - getSpeed()) * 10);
    }
}

/**
 * Insertion Sort Algorithm
 * Builds the sorted array one item at a time by inserting each new element.
 * Time: O(n²) | Space: O(1) | Stable: Yes
 */
async function insertionSort(array, getSpeed) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;

    for (let i = 1; i < n; i++) {
        if (stopRequested) return;

        let key = array[i];
        let j = i - 1;

        updateBars([i], 'comparing');
        await sleep((101 - getSpeed()) * 10);

        while (j >= 0 && array[j] > key) {
            if (stopRequested) return;

            updateBars([j], 'comparing');
            incrementComparisons();

            // Move elements
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 4}px`;
            updateBars([j + 1], 'swapping');
            incrementSwaps();

            await sleep((101 - getSpeed()) * 10);
            resetBarColor(j + 1);
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 4}px`;
        updateBars([j + 1], 'sorted');
        await sleep((101 - getSpeed()) * 10);
    }

    // Final pass to mark everything sorted
    for (let k = 0; k < n; k++) {
        updateBars([k], 'sorted');
    }
}

/**
 * Merge Sort Algorithm
 * Divides the array into halves, sorts them, and merges them back.
 * Time: O(n log n) | Space: O(n) | Stable: Yes
 */
async function mergeSort(array, getSpeed) {
    await mergeSortRecursive(array, 0, array.length - 1, getSpeed);

    if (stopRequested) return;

    // Final pass to mark everything as sorted
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        updateBars([i], 'sorted');
        await sleep(15);
    }
}

async function mergeSortRecursive(array, start, end, getSpeed) {
    if (start >= end || stopRequested) return;

    const mid = Math.floor((start + end) / 2);

    // Recursively sort the left and right halves
    await mergeSortRecursive(array, start, mid, getSpeed);
    await mergeSortRecursive(array, mid + 1, end, getSpeed);

    // Merge the sorted halves
    await merge(array, start, mid, end, getSpeed);
}

async function merge(array, start, mid, end, getSpeed) {
    if (stopRequested) return;

    const bars = document.getElementsByClassName('bar');
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (stopRequested) return;

        // Highlight bars being compared
        updateBars([k], 'comparing');
        incrementComparisons();
        await sleep((101 - getSpeed()) * 10);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        // Update height and show "swap/place" color
        bars[k].style.height = `${array[k] * 4}px`;
        updateBars([k], 'swapping');
        incrementSwaps();
        await sleep((101 - getSpeed()) * 10);

        resetBarColor(k);
        k++;
    }

    // Copy remaining elements from left
    while (i < left.length) {
        if (stopRequested) return;
        array[k] = left[i];
        bars[k].style.height = `${array[k] * 4}px`;
        updateBars([k], 'swapping');
        incrementSwaps();
        await sleep((101 - getSpeed()) * 10);
        resetBarColor(k);
        i++;
        k++;
    }

    // Copy remaining elements from right
    while (j < right.length) {
        if (stopRequested) return;
        array[k] = right[j];
        bars[k].style.height = `${array[k] * 4}px`;
        updateBars([k], 'swapping');
        incrementSwaps();
        await sleep(101 - getSpeed());
        resetBarColor(k);
        j++;
        k++;
    }
}

/**
 * Quick Sort Algorithm (NEW!)
 * Uses a pivot to partition the array and recursively sorts.
 * Time: O(n log n) avg, O(n²) worst | Space: O(log n) | Stable: No
 */
async function quickSort(array, getSpeed) {
    await quickSortRecursive(array, 0, array.length - 1, getSpeed);

    if (stopRequested) return;

    // Final pass to mark everything as sorted
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        updateBars([i], 'sorted');
        await sleep(15);
    }
}

async function quickSortRecursive(array, low, high, getSpeed) {
    if (low >= high || stopRequested) return;

    const pivotIndex = await partition(array, low, high, getSpeed);
    if (stopRequested) return;

    // Mark pivot as sorted
    updateBars([pivotIndex], 'sorted');

    await quickSortRecursive(array, low, pivotIndex - 1, getSpeed);
    await quickSortRecursive(array, pivotIndex + 1, high, getSpeed);
}

async function partition(array, low, high, getSpeed) {
    const bars = document.getElementsByClassName('bar');
    const pivot = array[high];
    let i = low - 1;

    // Highlight the pivot
    updateBars([high], 'swapping');

    for (let j = low; j < high; j++) {
        if (stopRequested) return i + 1;

        updateBars([j], 'comparing');
        incrementComparisons();
        await sleep((101 - getSpeed()) * 10);

        if (array[j] < pivot) {
            i++;

            // Swap array[i] and array[j]
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i] * 4}px`;
            bars[j].style.height = `${array[j] * 4}px`;

            updateBars([i, j], 'swapping');
            incrementSwaps();
            await sleep((101 - getSpeed()) * 10);
        }

        resetBarColor(j);
        if (i >= low) resetBarColor(i);
    }

    // Place pivot in correct position
    i++;
    let temp = array[i];
    array[i] = array[high];
    array[high] = temp;

    bars[i].style.height = `${array[i] * 4}px`;
    bars[high].style.height = `${array[high] * 4}px`;
    incrementSwaps();

    resetBarColor(high);
    updateBars([i], 'sorted');

    return i;
}
