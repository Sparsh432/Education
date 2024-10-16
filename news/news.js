/*
const sections = ['general', 'sports', 'sharemarket', 'technology', 'cinema'];
let newsData = []; // To hold the JSON news data

// Store which news tablets are frozen
let frozenTablets = new Set(); // To track which news tablets are frozen (hovered)

// Fetch the news from the JSON file
fetch('news.json')
    .then(response => response.json())
    .then(data => {
        newsData = data;
        sections.forEach(section => {
            displayNewsByCategory(section); // Display initial 10 news items for each section
        });
        setInterval(updateRandomTablets, 5000); // Update every 5 seconds
    });

// Function to display news by selected category (General, Sports, etc.)
function displayNewsByCategory(category) {
    const filteredNews = newsData.filter(news => news.category === category);
    const shuffledNews = filteredNews.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(`#${category}-news-grid`);

    // Clear existing grid
    grid.innerHTML = '';

    // Create 10 random news tablets for the selected category
    for (let i = 0; i < 10 && i < shuffledNews.length; i++) {
        const newsItem = shuffledNews[i];
        let tablet = createNewsTablet(newsItem, category, i);
        grid.appendChild(tablet);
    }
}

// Function to shuffle and update news in random tablets for each category
function updateRandomTablets() {
    sections.forEach(category => {
        const filteredNews = newsData.filter(news => news.category === category);
        const grid = document.querySelector(`#${category}-news-grid`);
        
        let randomIndexes = [];
        
        while (randomIndexes.length < 3) { // Update 3 random tablets
            let randIndex = Math.floor(Math.random() * 10); // 10 news items
            const tabletId = `${category}-${randIndex}`; // Create a unique ID for each tablet
            if (!randomIndexes.includes(randIndex) && !frozenTablets.has(tabletId)) { // Skip if tablet is frozen
                randomIndexes.push(randIndex);
            }
        }

        randomIndexes.forEach(index => {
            const randomNewsIndex = Math.floor(Math.random() * filteredNews.length);
            const tablet = createNewsTablet(filteredNews[randomNewsIndex], category, index);
            grid.replaceChild(tablet, grid.children[index]);
        });
    });
}

// Function to create a single news tablet
function createNewsTablet(news, category, index) {
    let tablet = document.createElement('div');
    tablet.classList.add('news-tablet');

    // Unique ID for the tablet to track whether it's hovered
    let tabletId = `${category}-${index}`;
    tablet.dataset.id = tabletId;

    let img = document.createElement('img');
    img.src = news.image;
    
    let title = document.createElement('h3');
    title.classList.add('news-title');
    title.textContent = news.title;
    
    let excerpt = document.createElement('p');
    excerpt.classList.add('news-excerpt');
    excerpt.textContent = news.excerpt;

    tablet.appendChild(img);
    tablet.appendChild(title);
    tablet.appendChild(excerpt);

    // Add hover event listeners to freeze/unfreeze news tablets
    tablet.addEventListener('mouseenter', () => {
        frozenTablets.add(tabletId); // Freeze the tablet (add to frozen set)
    });

    tablet.addEventListener('mouseleave', () => {
        frozenTablets.delete(tabletId); // Unfreeze the tablet (remove from frozen set)
    });

    return tablet;
}

Works perfectly*/

const sections = ['general', 'sports', 'sharemarket', 'technology'];
let newsData = []; // To hold the JSON news data

// Store which news tablets are frozen
let frozenTablets = new Set(); // To track which news tablets are frozen (hovered)

// Fetch the news from the JSON file
fetch('news.json')
    .then(response => response.json())
    .then(data => {
        newsData = data;
        sections.forEach(section => {
            displayNewsByCategory(section); // Display initial 10 news items for each section
        });
        setInterval(updateRandomTablets, 5000); // Update every 5 seconds
    });

// Function to display news by selected category (General, Sports, etc.)
function displayNewsByCategory(category) {
    const filteredNews = newsData.filter(news => news.category === category);
    const shuffledNews = filteredNews.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(`#${category}-news-grid`);

    // Clear existing grid
    grid.innerHTML = '';

    // Create 10 random news tablets for the selected category
    for (let i = 0; i < 10 && i < shuffledNews.length; i++) {
        const newsItem = shuffledNews[i];
        let tablet = createNewsTablet(newsItem, category, i);
        grid.appendChild(tablet);
    }
}

// Function to shuffle and update news in random tablets for each category
function updateRandomTablets() {
    sections.forEach(category => {
        const filteredNews = newsData.filter(news => news.category === category);
        const grid = document.querySelector(`#${category}-news-grid`);
        
        let randomIndexes = [];
        
        while (randomIndexes.length < 3) { // Update 3 random tablets
            let randIndex = Math.floor(Math.random() * 10); // 10 news items
            const tabletId = `${category}-${randIndex}`; // Create a unique ID for each tablet
            if (!randomIndexes.includes(randIndex) && !frozenTablets.has(tabletId)) { // Skip if tablet is frozen
                randomIndexes.push(randIndex);
            }
        }

        randomIndexes.forEach(index => {
            if (grid.children[index]) { // Check if the node exists
                const randomNewsIndex = Math.floor(Math.random() * filteredNews.length);
                const tablet = createNewsTablet(filteredNews[randomNewsIndex], category, index);
                grid.replaceChild(tablet, grid.children[index]); // Only replace if valid node exists
            }
        });
    });
}

// Function to create a single news tablet
function createNewsTablet(news, category, index) {
    let tablet = document.createElement('div');
    tablet.classList.add('news-tablet');

    // Unique ID for the tablet to track whether it's hovered
    let tabletId = `${category}-${index}`;
    tablet.dataset.id = tabletId;

    let img = document.createElement('img');
    img.src = news.image;
    
    let title = document.createElement('h3');
    title.classList.add('news-title');
    title.textContent = news.title;
    
    let excerpt = document.createElement('p');
    excerpt.classList.add('news-excerpt');
    excerpt.textContent = news.excerpt;

    tablet.appendChild(img);
    tablet.appendChild(title);
    tablet.appendChild(excerpt);

    // Add hover event listeners to freeze/unfreeze news tablets
    tablet.addEventListener('mouseenter', () => {
        frozenTablets.add(tabletId); // Freeze the tablet (add to frozen set)
    });

    tablet.addEventListener('mouseleave', () => {
        frozenTablets.delete(tabletId); // Unfreeze the tablet (remove from frozen set)
    });

    return tablet;
}

