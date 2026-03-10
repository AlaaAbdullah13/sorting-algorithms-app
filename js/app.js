// Algorithm Information Data
const sortingInfo = {
    bubble: {
        title: "Bubble Sort",
        description: "Bubble Sort is an iterative sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. This process is repeated until the list is sorted. It is easy to implement but inefficient for large lists. \n\nBest case: O(n) (when already sorted), Average/Worst case: O(n²).",
        complexity: "O(n²)"
    },
    selection: {
        title: "Selection Sort",
        description: "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right and an unsorted sublist. In each iteration, it finds the smallest element in the unsorted sublist and swaps it with the leftmost unsorted element. It performs fewer swaps than Bubble Sort but the number of comparisons remains high.",
        complexity: "O(n²)"
    },
    insertion: {
        title: "Insertion Sort",
        description: "Insertion Sort builds the final sorted array one item at a time. It takes one element from the unsorted part and finds its correct position within the already-sorted part. It is efficient for small data sets or arrays that are already substantially sorted. \n\nBest case: O(n), Average/Worst case: O(n²).",
        complexity: "O(n²)"
    },
    merge: {
        title: "Merge Sort",
        description: "Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It works by dividing an array into two halves, recursively sorting each half, and then merging the sorted halves back together. This 'Divide and Conquer' strategy makes it very predictable and efficient for large datasets.",
        complexity: "O(n log n)"
    }
};

// State variables
let currentArray = [];
const arraySize = 30; // Number of bars

// DOM Elements
const newArrayBtn = document.getElementById('newArray');
const startSortBtn = document.getElementById('startSort');
const algoSelect = document.getElementById('algorithm');
const speedInput = document.getElementById('speed');
const themeToggleBtn = document.getElementById('themeToggle');
const algoTitle = document.querySelector('#algo-info h3');
const algoDesc = document.getElementById('algo-description');
const algoComplexity = document.getElementById('algo-complexity');

/**
 * Updates the information card based on the selected algorithm.
 */
function updateAlgoInfo() {
    const info = sortingInfo[algoSelect.value];
    if (info) {
        algoTitle.innerText = info.title;
        algoDesc.innerText = info.description;
        algoComplexity.innerText = info.complexity;
    }
}

/**
 * Toggles between Dark and Light mode.
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update emoji
    themeToggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌓';
}

/**
 * Initializes the theme from localStorage.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌓';
}

/**
 * Generates a random array and renders it.
 */
function createNewArray() {
    currentArray = [];
    for (let i = 0; i < arraySize; i++) {
        // Random number between 5 and 100
        const val = Math.floor(Math.random() * 95) + 5;
        currentArray.push(val);
    }
    renderBars(currentArray);
}

/**
 * Starts the sorting process.
 */
async function startSorting() {
    const algorithm = algoSelect.value;
    const speed = parseInt(speedInput.value);

    // Disable controls during sorting
    newArrayBtn.disabled = true;
    startSortBtn.disabled = true;
    algoSelect.disabled = true;
    themeToggleBtn.disabled = true;

    if (algorithm === 'bubble') {
        await bubbleSort(currentArray, speed);
    } else if (algorithm === 'selection') {
        await selectionSort(currentArray, speed);
    } else if (algorithm === 'insertion') {
        await insertionSort(currentArray, speed);
    } else if (algorithm === 'merge') {
        await mergeSort(currentArray, speed);
    }

    // Trigger success animation!
    await victoryAnimation();

    // Re-enable controls
    newArrayBtn.disabled = false;
    startSortBtn.disabled = false;
    algoSelect.disabled = false;
    themeToggleBtn.disabled = false;
}

// Event Listeners
newArrayBtn.addEventListener('click', createNewArray);
startSortBtn.addEventListener('click', startSorting);
themeToggleBtn.addEventListener('click', toggleTheme);
algoSelect.addEventListener('change', updateAlgoInfo);

// Initialize with an array and theme
window.onload = () => {
    initTheme();
    createNewArray();
    updateAlgoInfo();
};
