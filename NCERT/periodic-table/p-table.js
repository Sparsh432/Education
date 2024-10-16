document.addEventListener('DOMContentLoaded', () => {
    fetch('p-table.json')
        .then(response => response.json())
        .then(data => {
            createPeriodicTable(data.elements);
            createElementTypesList(data.elements);
        })
        .catch(error => console.error('Error fetching the elements data:', error));
});

function createPeriodicTable(elements) {
    const tableContainer = document.getElementById('periodic-table');

    // Clear the container before appending elements
    tableContainer.innerHTML = '';

    // Initialize a 2D array to represent the periodic table grid
    const grid = Array.from({ length: 10 }, () => Array(18).fill(null)); // Assuming max 10 periods

    elements.forEach(element => {
        const { period, group } = element;
        if (period && group) {
            grid[period - 1][group - 1] = element;  // Insert element at correct position in the grid
        }
    });

    // Create grid items based on the grid array
    grid.forEach((period) => {
        period.forEach((element) => {
            const elementDiv = document.createElement('div');
            if (element) {
                const elementTypeClass = getElementTypeClass(element.type);

                // Ensure the class is not empty
                if (elementTypeClass) {
                    elementDiv.classList.add('element', elementTypeClass);
                } else {
                    elementDiv.classList.add('element'); // Fallback class if type is invalid
                }

                elementDiv.setAttribute('data-name', element.name);
                elementDiv.setAttribute('data-symbol', element.symbol);
                elementDiv.setAttribute('data-atomic-number', element.atomicNumber);
                elementDiv.setAttribute('data-atomic-mass', element.atomicMass);
                elementDiv.setAttribute('data-type', element.type);

                // Add content to the element div
                elementDiv.innerHTML = `
                    <span class="small-text">${element.atomicNumber}</span>
                    <span>${element.symbol}</span>
                    <span class="element-name">${element.name}</span>
                `;

                // Add click event to show detailed info
                elementDiv.addEventListener('click', () => showElementDetails(element));
            } else {
                // Create empty div for empty spots in the grid
                elementDiv.classList.add('element-empty');
            }

            // Append the div (either element or empty) to the table container
            tableContainer.appendChild(elementDiv);
        });
    });
}


// Function to create the element types list
function createElementTypesList(elements) {
    const typesSet = new Set();
    elements.forEach(element => {
        if (element.type) {
            typesSet.add(element.type);
        }
    });

    const typesList = document.getElementById('types-list');

    typesSet.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        li.setAttribute('data-type', type);
        li.addEventListener('click', () => highlightElementsByType(type));
        typesList.appendChild(li);
    });
}

// Function to get CSS class based on element type
function getElementTypeClass(type) {
    switch (type ? type.toLowerCase() : '') {
        case 'nonmetal':
            return 'non-metal';
        case 'noble gas':
            return 'noble-gas';
        case 'alkali metal':
            return 'alkali-metal';
        case 'alkaline earth metal':
            return 'alkaline-earth-metal';
        case 'metalloid':
            return 'metalloid';
        case 'halogen':
            return 'halogen';
        case 'post transition metal':
            return 'post-transition-metal';
        case 'transition metal':
            return 'transition-metal';
        case 'lanthanide':
            return 'lanthanide';
        case 'actinide':
            return 'actinide';
        case 'unknown':
            return 'unknown';
        // Add more cases for different types
        default:
            return ''; // Ensure this returns an empty string if no match
    }
}

// Function to highlight elements by type and black out others
function highlightElementsByType(type) {
    // Select all the elements in the periodic table
    const allElements = document.querySelectorAll('.element');

    // Loop through each element and apply the correct class
    allElements.forEach(el => {
        const elementType = el.getAttribute('data-type');

        if (elementType === type) {
            // If the element matches the selected type, highlight it
            el.classList.add('highlighted');
            el.classList.remove('blacked-out');
        } else {
            // Otherwise, black out the element
            el.classList.remove('highlighted');
            el.classList.add('blacked-out');
        }
    });
}

// Function to clear all highlights
function clearHighlights() {
    const allElements = document.querySelectorAll('.element');
    allElements.forEach(el => {
        el.classList.remove('highlighted');
        el.classList.remove('blacked-out');
    });
}

// Function to show full details in a dialog box
function showElementDetails(element) {
    // Populate the dialog with element details
    document.getElementById('element-name').innerText = element.name;
    document.getElementById('element-atomic-number').innerText = element.atomicNumber;
    document.getElementById('element-symbol').innerText = element.symbol;
    document.getElementById('element-atomic-mass').innerText = element.atomicMass;
    document.getElementById('element-type').innerText = element.type;
    document.getElementById('element-melting').innerText = element.meltingPoint;
    document.getElementById('element-boiling').innerText = element.boilingPoint;
    document.getElementById('element-electronConfiguration').innerText = element.electronConfiguration;
    document.getElementById('element-electroNegativity').innerText = element.electroNegativity;
    document.getElementById('element-density').innerText = element.density;
    document.getElementById('element-state').innerText = element.stateAtRoomTemperature;
    document.getElementById('element-ionization').innerText = element.ionizationEnergy;
    document.getElementById('element-oxidation').innerText = element.oxidationStates;
    document.getElementById('element-uses').innerText = element.uses;
    
    // Show the dialog
    document.getElementById('element-dialog').style.display = 'flex';
}

// Function to close the dialog box
function closeDialog() {
    document.getElementById('element-dialog').style.display = 'none';
}
