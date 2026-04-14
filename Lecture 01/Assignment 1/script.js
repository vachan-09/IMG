"use strict";

// --- 1. Top Bar Mobile Dropdown Logic ---
const mobileDropdown = document.querySelector('.mobile-dropdown');
if (mobileDropdown) {
    mobileDropdown.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        console.log("Navigating to:", selectedValue);
        // Add window.location.href = "#" logic here if needed
    });
}

// --- 2. Sliders Logic (Generic Function for Reuse) ---
// This handles the "Recently Granted Patents" and "Achievements"
function setupSlider(trackId, prevBtnId, nextBtnId, itemClass) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll(itemClass);
    let index = 0;

    function moveSlide() {
        index = (index + 1) % items.length;
        updateTransform();
    }

    function updateTransform() {
        items.forEach(item => {
            item.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    let timer = setInterval(moveSlide, 3000);

    nextBtn.addEventListener('click', () => {
        clearInterval(timer);
        index = (index + 1) % items.length;
        updateTransform();
        timer = setInterval(moveSlide, 3000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(timer);
        index = (index - 1 + items.length) % items.length;
        updateTransform();
        timer = setInterval(moveSlide, 3000);
    });
}

// Initialize Sliders (matching your IDs)
setupSlider('topbartext2g', 'topbartext1g', 'topbartext3g', '.topbartext3c'); // Patents
setupSlider('topbartext5g', 'topbartext4g', 'topbartext1h', '.topbartext2d'); // Achievements

// --- 3. Milestones Year Switching Logic ---
const years = document.querySelectorAll('.mile-year p');
const dots = document.querySelectorAll('.mile-bullets div');
const milestoneImg = document.querySelector('.mile-img img');
const milestoneHead = document.querySelector('.mile-head');
const milestoneBody = document.querySelector('.mile-body p');

// Mock data for Milestone switching
const milestoneData = {
    "2018": {
        img: "architecture-certificate.png",
        head: "IITR Architecture Department ranked 1st among all colleges in India",
        body: "Department of Architecture, IIT Roorkee remains unparalleled and has maintained its position as rank #1 in the NIRF Rankings for 2018."
    },
    "2023": {
        img: "architecture-certificate.png",
        head: "IITR Architecture Department ranked 1st among all colleges in India (2023)",
        body: "Maintaining excellence for the third consecutive time in the NIRF India rankings."
    }
    // Add more years here...
};

function updateMilestone(yearIndex) {
    const yearElement = years[yearIndex];
    const yearText = yearElement.innerText;

    // Update active UI states
    years.forEach(y => y.classList.remove('year-2023'));
    dots.forEach(d => d.className = 'circle');

    yearElement.classList.add('year-2023');
    if (dots[yearIndex]) dots[yearIndex].className = 'circle-active';

    // Update content if data exists
    if (milestoneData[yearText]) {
        milestoneImg.src = milestoneData[yearText].img;
        milestoneHead.innerHTML = milestoneData[yearText].head;
        milestoneBody.innerText = milestoneData[yearText].body;
    }
}

years.forEach((yearBtn, i) => {
    yearBtn.addEventListener('click', () => updateMilestone(i));
});

// --- 4. Events Gallery Tab Logic ---
const eventTabs = document.querySelectorAll('.events-list p');
const eventMainImg = document.querySelector('.events-img img');
const eventDesc = document.querySelector('.cogni-text p');

eventTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Reset Tabs
        eventTabs.forEach(t => t.classList.remove('cogni'));
        tab.classList.add('cogni');

        // Logic to switch image/text based on tab text
        const category = tab.innerText;
        console.log("Switched to gallery:", category);
        // Update eventMainImg.src and eventDesc.innerText here...
    });
});