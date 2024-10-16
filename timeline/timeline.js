// timeline.js

document.addEventListener('DOMContentLoaded', function () {
    // Zoom control variables
    let zoomLevel = 1;
    const zoomSpeed = 0.1;
    const timelineContainer = document.getElementById('timeline-container');

    // Array of years for the timeline (adjust as necessary)
    const years = Array.from({ length: 150 }, (_, i) => 2024 - i);

    // Fetch JSON Data for Events and Timeline
    async function loadTimelineData() {
        try {
            const response = await fetch('timeline.json'); // Adjust the path if needed
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.timeline;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // Populate the timeline with years
    function generateTimeline() {
        if (timelineContainer) {
            const arrow = document.createElement('div');
            arrow.classList.add('timeline-arrow');
            timelineContainer.appendChild(arrow);

            years.forEach((year, index) => {
                const yearDiv = document.createElement('div');
                yearDiv.classList.add('year-marker');
                yearDiv.textContent = year;
                yearDiv.style.left = `${index * 50}px`;  // Spacing of years (adjust as needed)
                yearDiv.addEventListener('click', () => openYearPage(year));
                timelineContainer.appendChild(yearDiv);
            });
        }
    }

    // Open a new page when a year is clicked and pass the year as a query parameter
    function openYearPage(year) {
        window.location.href = `key-events.html?year=${year}`;
    }

    // Zoom in/out functionality
    document.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            zoomLevel += (e.deltaY > 0) ? -zoomSpeed : zoomSpeed;
            zoomLevel = Math.max(0.5, Math.min(zoomLevel, 3));  // Limit zoom level between 0.5x and 3x
            if (timelineContainer) {
                timelineContainer.style.transform = `scale(${zoomLevel})`;
            }
        }
    });

    // Two-finger pinch for zoom on touch devices
    if (timelineContainer) {
        timelineContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
                if (!timelineContainer.lastDistance) {
                    timelineContainer.lastDistance = distance;
                    return;
                }

                zoomLevel += (distance - timelineContainer.lastDistance) / 500;
                zoomLevel = Math.max(0.5, Math.min(zoomLevel, 3));
                if (timelineContainer) {
                    timelineContainer.style.transform = `scale(${zoomLevel})`;
                }

                timelineContainer.lastDistance = distance;
            }
        });
    }

    // Call the function to generate the timeline
    if (timelineContainer) {
        generateTimeline();
    }

    // Extract Year from URL (for key-events.html)
    function getYearFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('year');
    }

    // Display Key Events for Selected Year (for key-events.html)
    async function displayKeyEvents() {
        const selectedYear = getYearFromUrl();
        if (selectedYear) {
            const timelineData = await loadTimelineData();
            if (timelineData) {
                const selectedEntry = timelineData.find(entry => entry.year === selectedYear);

                if (selectedEntry) {
                    // Insert year into title-container
                    const titleContainer = document.getElementById('title-container');
                    if (titleContainer) {
                        titleContainer.innerHTML = `<p><u>${selectedYear}</u></p>`;
                    }

                    // Insert events into events-container
                    const eventsContainer = document.getElementById('events-container');
                    if (eventsContainer) {
                        // Clear previous content
                        eventsContainer.innerHTML = '';
    
                        // Create a list
                        const ul = document.createElement('ul');
                        selectedEntry.events.forEach(event => {
                            const li = document.createElement('li');
                            li.textContent = event;
                            ul.appendChild(li);
                        });
    
                        // Append the list to the events-container
                        eventsContainer.appendChild(ul);
                    }
                } else {
                    console.error("Year not found in data");
                }
            }
        }
    }

    // Call appropriate functions based on the page
    if (document.getElementById('timeline-container')) {
        generateTimeline();
    } else if (document.getElementById('events-container')) {
        displayKeyEvents();
    }
});