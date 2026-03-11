/**
 * app.js
 * The main controller that connects everything together.
 * Handles all user interactions, state management, and control logic.
 * 
 * Purple Cartoon Edition for eng lolo! 🔮✨
 */

// ========== RICH ALGORITHM INFORMATION DATA ==========
const sortingInfo = {
    bubble: {
        title: "🫧 Bubble Sort",
        description: "Bubble Sort is one of the simplest sorting algorithms. It repeatedly walks through the list, compares adjacent elements, and swaps them if they're in the wrong order. Each pass \"bubbles\" the largest unsorted element to its correct position at the end. The algorithm keeps making passes until no more swaps are needed, meaning the list is fully sorted.",
        time: "O(n²)",
        space: "O(1)",
        stable: true,
        steps: [
            "Start at the beginning of the array",
            "Compare the first two adjacent elements",
            "If the left element is greater than the right, swap them",
            "Move to the next pair and repeat the comparison",
            "After one full pass, the largest element \"bubbles\" to the end",
            "Repeat passes, ignoring the already-sorted end, until no swaps occur"
        ],
        pros: [
            "Extremely simple to understand and implement",
            "Stable sort — equal elements keep their original order",
            "Adaptive — runs in O(n) if the array is already sorted",
            "In-place — requires no extra memory"
        ],
        cons: [
            "Very slow for large datasets — O(n²) time complexity",
            "Makes many unnecessary comparisons and swaps",
            "Not suitable for real-world applications with large data",
            "Outperformed by almost every other sorting algorithm"
        ],
        usecases: [
            "Teaching and learning — perfect for understanding sorting concepts",
            "Nearly sorted data — performs well when data is almost in order",
            "Small datasets — acceptable performance for tiny arrays (< 50 elements)",
            "Detecting if an array is sorted — one pass with zero swaps confirms it"
        ]
    },
    selection: {
        title: "👆 Selection Sort",
        description: "Selection Sort works by dividing the array into a sorted portion (left) and an unsorted portion (right). In each pass, it scans the unsorted portion to find the minimum element and swaps it with the first unsorted element. This gradually grows the sorted portion from left to right until the entire array is sorted.",
        time: "O(n²)",
        space: "O(1)",
        stable: false,
        steps: [
            "Set the first element as the current minimum",
            "Scan the entire unsorted portion to find the actual minimum",
            "Swap the found minimum with the first unsorted element",
            "Move the boundary of the sorted portion one element to the right",
            "Repeat until the entire array is sorted"
        ],
        pros: [
            "Simple and intuitive algorithm",
            "Performs the minimum number of swaps — only O(n) swaps total",
            "In-place — requires no additional memory",
            "Performs well when memory writes are expensive (e.g., flash memory)"
        ],
        cons: [
            "Always O(n²) — no best-case optimization, even for sorted data",
            "Not stable — may change the relative order of equal elements",
            "Still makes O(n²) comparisons regardless of input",
            "Slower than Insertion Sort in practice for most inputs"
        ],
        usecases: [
            "When swap cost is higher than comparison cost (e.g., writing to EEPROM)",
            "Small arrays where simplicity is more important than speed",
            "Embedded systems with limited memory — zero extra space needed",
            "Educational purposes — great for learning about search + swap patterns"
        ]
    },
    insertion: {
        title: "📥 Insertion Sort",
        description: "Insertion Sort works like sorting a hand of playing cards. You pick up one card at a time and insert it into its correct position among the cards already in your hand. The algorithm iterates through the array, taking each element and shifting larger elements to the right to make room, then inserting the element in the correct spot.",
        time: "O(n²)",
        space: "O(1)",
        stable: true,
        steps: [
            "Start with the second element (first element is 'already sorted')",
            "Save the current element as a 'key'",
            "Compare the key with elements in the sorted portion (moving left)",
            "Shift all elements greater than the key one position to the right",
            "Insert the key into the gap created by the shifting",
            "Repeat for every remaining element in the unsorted portion"
        ],
        pros: [
            "Very efficient for small or nearly-sorted arrays — can be O(n)",
            "Stable sort — preserves order of equal elements",
            "Online algorithm — can sort data as it arrives (streaming)",
            "In-place and simple to implement",
            "Fewer comparisons than Bubble Sort in practice"
        ],
        cons: [
            "O(n²) for large, randomly ordered datasets",
            "Many element shifts (moves) can be slow for arrays",
            "Not suitable as a standalone sort for large-scale data",
            "Performance degrades with reverse-sorted input"
        ],
        usecases: [
            "Nearly sorted data — runs close to O(n) on almost-sorted arrays",
            "Real-time / streaming data — inserts new elements into sorted position",
            "Small datasets — often faster than O(n log n) algorithms for n < 50",
            "Hybrid algorithms — used as a subroutine in TimSort and IntroSort"
        ]
    },
    merge: {
        title: "🔀 Merge Sort",
        description: "Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, and then merges the two sorted halves back together. The merge step is where the magic happens — it combines two sorted arrays into one sorted array in linear time. This makes Merge Sort consistently fast regardless of the input.",
        time: "O(n log n)",
        space: "O(n)",
        stable: true,
        steps: [
            "Divide the unsorted array into two halves",
            "Recursively divide each half until you have single-element subarrays",
            "Start merging: compare the first elements of both halves",
            "Place the smaller element into the result array",
            "Continue comparing and merging until one half is exhausted",
            "Copy any remaining elements from the non-empty half"
        ],
        pros: [
            "Guaranteed O(n log n) — no worst-case degradation like Quick Sort",
            "Stable sort — preserves relative order of equal elements",
            "Predictable performance — same speed regardless of input order",
            "Parallelizable — halves can be sorted independently on multiple cores",
            "Works well with linked lists (no extra space needed)"
        ],
        cons: [
            "Requires O(n) extra space — not in-place for arrays",
            "Slower than Quick Sort in practice due to memory overhead",
            "More complex to implement than simple quadratic sorts",
            "Not adaptive — doesn't benefit from partially sorted input"
        ],
        usecases: [
            "Large datasets where guaranteed performance is critical",
            "External sorting — sorting data that doesn't fit in memory (disk-based)",
            "Linked list sorting — can be done in-place with minimal extra space",
            "Stable sorting requirement — when order of equal elements matters",
            "Parallel processing — each half sorts independently"
        ]
    },
    quick: {
        title: "⚡ Quick Sort",
        description: "Quick Sort is one of the fastest and most widely used sorting algorithms. It picks a 'pivot' element and rearranges the array so that elements smaller than the pivot come before it, and elements larger come after it. This 'partitioning' puts the pivot in its final sorted position. The process then recursively sorts the two sub-arrays on either side of the pivot.",
        time: "O(n log n) avg",
        space: "O(log n)",
        stable: false,
        steps: [
            "Choose a pivot element (here we use the last element)",
            "Initialize a pointer for the partition boundary",
            "Scan through the array, comparing each element to the pivot",
            "If an element is smaller than the pivot, swap it to the left side",
            "After scanning, place the pivot in its correct sorted position",
            "Recursively apply the same process to the left and right sub-arrays"
        ],
        pros: [
            "Fastest general-purpose sorting algorithm in practice",
            "In-place — only O(log n) extra space for recursion stack",
            "Cache-friendly — sequential memory access patterns",
            "Average case O(n log n) with small constant factors",
            "Foundation of many standard library sort implementations"
        ],
        cons: [
            "Worst case O(n²) — occurs with already sorted or identical elements",
            "Not stable — may rearrange equal elements",
            "Performance depends heavily on pivot selection",
            "Recursive — can cause stack overflow on very large arrays"
        ],
        usecases: [
            "General-purpose sorting — default choice for most applications",
            "In-memory sorting — cache-efficient for arrays in RAM",
            "Systems programming — used in C's qsort(), Java's Arrays.sort() for primitives",
            "When average-case performance matters more than worst-case guarantees",
            "Large datasets where memory is limited (only O(log n) extra space)"
        ]
    }
};

// ========== STATE VARIABLES ==========
let currentArray = [];
let originalArray = [];
let arraySize = 30;
let isSorting = false;
let stopRequested = false;
let comparisonCount = 0;
let swapCount = 0;
let timerInterval = null;
let elapsedMs = 0;

// ========== DOM ELEMENTS ==========
const newArrayBtn = document.getElementById('newArray');
const startSortBtn = document.getElementById('startSort');
const stopSortBtn = document.getElementById('stopSort');
const resetArrayBtn = document.getElementById('resetArray');
const speedUpBtn = document.getElementById('speedUp');
const speedDownBtn = document.getElementById('speedDown');
const algoSelect = document.getElementById('algorithm');
const speedInput = document.getElementById('speed');
const arraySizeInput = document.getElementById('arraySize');
const themeToggleBtn = document.getElementById('themeToggle');
const comparisonDisplay = document.getElementById('comparisonCount');
const swapDisplay = document.getElementById('swapCount');
const timeDisplay = document.getElementById('elapsedTime');

// Slide panel elements
const algoTitleEl = document.getElementById('algo-title');
const algoDescEl = document.getElementById('algo-description');
const algoTimeEl = document.getElementById('algo-time');
const algoSpaceEl = document.getElementById('algo-space');
const algoStableEl = document.getElementById('algo-stable');
const algoStepsEl = document.getElementById('algo-steps');
const algoProsEl = document.getElementById('algo-pros');
const algoConsEl = document.getElementById('algo-cons');
const algoUsecasesEl = document.getElementById('algo-usecases');

// ========== HELPER: Get current speed dynamically ==========
function getSpeed() {
    return parseInt(speedInput.value);
}

// ========== COUNTER FUNCTIONS ==========
function incrementComparisons() {
    comparisonCount++;
    comparisonDisplay.innerText = comparisonCount;
}

function incrementSwaps() {
    swapCount++;
    swapDisplay.innerText = swapCount;
}

function resetCounters() {
    comparisonCount = 0;
    swapCount = 0;
    elapsedMs = 0;
    comparisonDisplay.innerText = '0';
    swapDisplay.innerText = '0';
    timeDisplay.innerText = '0.0s';
}

function startTimer() {
    elapsedMs = 0;
    timerInterval = setInterval(() => {
        elapsedMs += 100;
        timeDisplay.innerText = (elapsedMs / 1000).toFixed(1) + 's';
    }, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// ========== SLIDE PANEL — ALGORITHM INFO ==========

/** Populates all tabs with data for the selected algorithm */
function updateAlgoInfo() {
    const info = sortingInfo[algoSelect.value];
    if (!info) return;

    // Overview tab
    algoTitleEl.innerText = info.title;
    algoDescEl.innerText = info.description;
    algoTimeEl.innerText = info.time;
    algoSpaceEl.innerText = info.space;

    // Stable badge
    if (info.stable) {
        algoStableEl.innerText = '✅ Stable';
        algoStableEl.className = 'badge stable-badge';
    } else {
        algoStableEl.innerText = '❌ Unstable';
        algoStableEl.className = 'badge stable-badge unstable';
    }

    // How It Works
    algoStepsEl.innerHTML = '';
    info.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        algoStepsEl.appendChild(li);
    });

    // Pros
    algoProsEl.innerHTML = '';
    info.pros.forEach(pro => {
        const li = document.createElement('li');
        li.textContent = pro;
        algoProsEl.appendChild(li);
    });

    // Cons
    algoConsEl.innerHTML = '';
    info.cons.forEach(con => {
        const li = document.createElement('li');
        li.textContent = con;
        algoConsEl.appendChild(li);
    });

    // Use Cases
    algoUsecasesEl.innerHTML = '';
    info.usecases.forEach(uc => {
        const li = document.createElement('li');
        li.textContent = uc;
        algoUsecasesEl.appendChild(li);
    });
}

/** Sets up tab switching for the slide panel */
function initSlideTabs() {
    const tabs = document.querySelectorAll('.slide-tab');
    const contents = document.querySelectorAll('.slide-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Activate clicked tab
            tab.classList.add('active');
            const targetId = 'tab-' + tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                // Re-trigger animation
                targetContent.style.animation = 'none';
                targetContent.offsetHeight; // force reflow
                targetContent.style.animation = '';
            }
        });
    });
}

// ========== THEME ==========
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌓';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌓';
}

// ========== ARRAY GENERATION ==========
function createNewArray() {
    if (isSorting) return;
    arraySize = parseInt(arraySizeInput.value);
    currentArray = [];
    for (let i = 0; i < arraySize; i++) {
        const val = Math.floor(Math.random() * 95) + 5;
        currentArray.push(val);
    }
    originalArray = [...currentArray];
    resetCounters();
    renderBars(currentArray);
}

// ========== CONTROL FUNCTIONS ==========
function resetArray() {
    if (isSorting) {
        stopRequested = true;
        setTimeout(() => {
            currentArray = [...originalArray];
            resetCounters();
            renderBars(currentArray);
            finishSorting();
        }, 200);
    } else {
        currentArray = [...originalArray];
        resetCounters();
        renderBars(currentArray);
    }
}

function stopSorting() {
    if (isSorting) {
        stopRequested = true;
    }
}

function increaseSpeed() {
    const current = parseInt(speedInput.value);
    speedInput.value = Math.min(100, current + 10);
}

function decreaseSpeed() {
    const current = parseInt(speedInput.value);
    speedInput.value = Math.max(1, current - 10);
}

// ========== UI STATE MANAGEMENT ==========
function setControlsForSorting() {
    isSorting = true;
    stopRequested = false;
    newArrayBtn.disabled = true;
    startSortBtn.disabled = true;
    resetArrayBtn.disabled = false;
    stopSortBtn.disabled = false;
    algoSelect.disabled = true;
    arraySizeInput.disabled = true;
}

function finishSorting() {
    isSorting = false;
    stopRequested = false;
    stopTimer();
    newArrayBtn.disabled = false;
    startSortBtn.disabled = false;
    resetArrayBtn.disabled = false;
    stopSortBtn.disabled = true;
    algoSelect.disabled = false;
    arraySizeInput.disabled = false;
}

// ========== START SORTING ==========
async function startSorting() {
    if (isSorting) return;
    const algorithm = algoSelect.value;
    setControlsForSorting();
    resetCounters();
    startTimer();

    if (algorithm === 'bubble') {
        await bubbleSort(currentArray, getSpeed);
    } else if (algorithm === 'selection') {
        await selectionSort(currentArray, getSpeed);
    } else if (algorithm === 'insertion') {
        await insertionSort(currentArray, getSpeed);
    } else if (algorithm === 'merge') {
        await mergeSort(currentArray, getSpeed);
    } else if (algorithm === 'quick') {
        await quickSort(currentArray, getSpeed);
    }

    stopTimer();
    if (!stopRequested) {
        await victoryAnimation();
    }
    finishSorting();
}

// ========== EVENT LISTENERS ==========
newArrayBtn.addEventListener('click', createNewArray);
startSortBtn.addEventListener('click', startSorting);
stopSortBtn.addEventListener('click', stopSorting);
resetArrayBtn.addEventListener('click', resetArray);
speedUpBtn.addEventListener('click', increaseSpeed);
speedDownBtn.addEventListener('click', decreaseSpeed);
themeToggleBtn.addEventListener('click', toggleTheme);
algoSelect.addEventListener('change', updateAlgoInfo);

arraySizeInput.addEventListener('input', () => {
    if (!isSorting) createNewArray();
});

// ========== INITIALIZE ON PAGE LOAD ==========
window.onload = () => {
    initTheme();
    initSlideTabs();
    createNewArray();
    updateAlgoInfo();
};
