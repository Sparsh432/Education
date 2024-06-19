const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
    { question: "What is the capital of Spain?", options: ["Madrid", "Berlin", "Lisbon", "Paris"], answer: 0 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
    { question: "What is the capital of Italy?", options: ["Rome", "Paris", "Berlin", "Madrid"], answer: 0 },
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: 2 },
    { question: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
    { question: "What is the capital of Germany?", options: ["Paris", "Rome", "Berlin", "Madrid"], answer: 2 },
    { question: "Which element has the chemical symbol O?", options: ["Gold", "Oxygen", "Silver", "Osmium"], answer: 1 },
    { question: "What is the capital of Japan?", options: ["Tokyo", "Osaka", "Kyoto", "Nagoya"], answer: 0 },
    { question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], answer: 1 },
    { question: "Which planet is known as the Blue Planet?", options: ["Mars", "Earth", "Neptune", "Uranus"], answer: 1 },
    { question: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Everest", "Lhotse"], answer: 2 },
    { question: "Which element has the chemical symbol H?", options: ["Helium", "Hydrogen", "Hafnium", "Holmium"], answer: 1 },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
    { question: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "Pt", "Pb"], answer: 1 },
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Mars", "Mercury", "Earth"], answer: 2 },
    { question: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], answer: 3 },
    { question: "What is the capital of Russia?", options: ["Saint Petersburg", "Moscow", "Novosibirsk", "Yekaterinburg"], answer: 1 },
    { question: "What is the capital of China?", options: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"], answer: 1 },
    { question: "What is the chemical symbol for Silver?", options: ["Ag", "Au", "Si", "Pb"], answer: 0 },
    { question: "What is the tallest building in the world?", options: ["Shanghai Tower", "Abraj Al Bait", "One World Trade Center", "Burj Khalifa"], answer: 3 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"], answer: 1 },
    { question: "What is the largest desert in the world?", options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"], answer: 3 },
    { question: "What is the chemical symbol for Iron?", options: ["Fe", "Ir", "In", "I"], answer: 0 },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"], answer: 1 },
    { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], answer: 1 },
    { question: "Which is the smallest continent?", options: ["Asia", "Europe", "Australia", "Antarctica"], answer: 2 },
    { question: "What is the currency of Japan?", options: ["Yuan", "Yen", "Won", "Ringgit"], answer: 1 }
];

const questionsPerPage = 10;
let currentPage = 0;
const totalPages = Math.ceil(questions.length / questionsPerPage);

function loadQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);

    for (let i = start; i < end; i++) {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerText = `${i + 1}. ${questions[i].question}`;
        questionBlock.appendChild(questionElement);

        const optionsElement = document.createElement('div');
        optionsElement.classList.add('options');
        questions[i].options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = `${String.fromCharCode(65 + index)}. ${option}`;
            button.onclick = () => checkAnswer(button, i, index);
            optionsElement.appendChild(button);
        });

        questionBlock.appendChild(optionsElement);

        const viewAnswerButton = document.createElement('button');
        viewAnswerButton.classList.add('view-answer-button');
        viewAnswerButton.innerText = "View Answer";
        viewAnswerButton.onclick = () => viewAnswer(i);
        questionBlock.appendChild(viewAnswerButton);

        quizContainer.appendChild(questionBlock);
    }

    document.getElementById('prev-button').style.display = currentPage > 0 ? 'block' : 'none';
    document.getElementById('next-button').style.display = (currentPage + 1) * questionsPerPage < questions.length ? 'block' : 'none';

    loadPagination();
}

function checkAnswer(button, questionIndex, selectedOption) {
    const correctAnswer = questions[questionIndex].answer;
    const buttons = button.parentElement.children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correctAnswer) {
            buttons[i].classList.add('correct');
        } else if (i === selectedOption) {
            buttons[i].classList.add('incorrect');
        }
    }
}

function viewAnswer(questionIndex) {
    const questionBlock = document.getElementById('quiz-container').children[questionIndex % questionsPerPage];
    const buttons = questionBlock.querySelectorAll('.options button');
    const correctAnswer = questions[questionIndex].answer;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correctAnswer) {
            buttons[i].classList.add('correct');
        }
    }
}

function nextPage() {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
        currentPage++;
        loadQuestions();
    } else {
        alert('No more questions!');
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        loadQuestions();
    }
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    loadQuestions();
}

function loadPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPagesToShow = 3;
    const startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 0);
    const endPage = Math.min(startPage + totalPagesToShow, totalPages);

    for (let i = startPage; i < endPage; i++) {
        const pageButton = document.createElement('span');
        pageButton.innerText = i + 1;
        pageButton.classList.add(currentPage === i ? 'active' : '');
        pageButton.onclick = () => goToPage(i);
        paginationContainer.appendChild(pageButton);
    }

    // Display previous page number
    if (currentPage > 0) {
        const prevPageButton = document.createElement('span');
        prevPageButton.innerText = currentPage;
        prevPageButton.classList.add('prev-page');
        prevPageButton.onclick = () => goToPage(currentPage - 1);
        paginationContainer.insertBefore(prevPageButton, paginationContainer.firstChild);
    }

    // Display next page number
    if (currentPage < totalPages - 1) {
        const nextPageButton = document.createElement('span');
        nextPageButton.innerText = currentPage + 2;
        nextPageButton.classList.add('next-page');
        nextPageButton.onclick = () => goToPage(currentPage + 1);
        paginationContainer.appendChild(nextPageButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});

