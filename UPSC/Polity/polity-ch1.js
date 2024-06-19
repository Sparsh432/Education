const questions = [
    { question: "East India Company got the exclusive right of trading in India under a charter granted by?", options: ["Queen Elizabeth II", "Queen Elizabeth I", "Lady Jane Grey", "Catherine Howard"], answer: 1 },
    { question: "In which year East India Company obtained the first 'Diwani' of Bengal, Bihar and Orissa?", options: ["1858", "1859", "1765", "1800"], answer: 2 },
    { question: "In which year British Crown assumed the direct responsibility for the governance of India?", options: ["1858", "1859", "1765", "1800"], answer: 0 },
    { question: "Who is considered as the pioneer for Communist Movement in India? ", options: ["Ghulam Hussain", "S A Dange", "Singaravelu", "M N Roy"], answer: 3 },
    { question: "M N Roy suggested the need for constitution in which year?", options: ["1934", "1945", "1950", "1923"], answer: 0 },
    { question: "Constituent Assembly for the formation of Constitution was formed in wich year?", options: ["1934", "1946", "1945", "1947"], answer: 1 },
    { question: "When was The Company Rule?", options: ["1858-1900", "1858-1947", "1773-1858", "1900-1947"], answer: 2 },
    { question: "Regulating Act came in which year?", options: ["1773", "1873", "1780", "1800"], answer: 0 },
    { question: "Regulating Act was", options: ["the first step taken by British Government to control and regulate the affairs of East India Company in India", "It recognised the political and administrative power of the  company", "It laid the foundation of central administration in India", "All of these"], answer: 3 },
    { question: "Which Act designated the Governor of Bengal as the Governor General of Bengal", options: ["Rugulating Act of 1773", "Pitt's India Act of 1784", "Charter Act of 1833", "Charter Act 0f 1853"], answer: 0 },
    { question: "Who was the first Governor General of Bengal", options: ["Lord Macaulay", "Lord William Bentict", "Lord Warren Hasting", "None of the Above"], answer: 2 },
    { question: "Who was the first Governor General of Bengal", options: ["Lord Macaulay", "Lord William Bentict", "Lord Warren Hasting", "None of the Above"], answer: 2 },
	
    
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

