const questions = [
    { question: "Material that do not have lustre is?", options: ["Gold", "Aluminium", "Cloth", "Iron"], answer: 2 },
    { question: "Materials that can be compressed or scrathed easily are called?", options: ["Hard", "Soft", "Heavy", "Rough"], answer: 1 },
    { question: "Materials that are difficult to compress are called?", options: ["Hard", "Soft", "Heavy", "Rough"], answer: 0 },
    { question: "Substances that completely disappear or dissolve in water are known as", options: ["Insoluble", "Solvent", "Solution", "Soluble"], answer: 3 },
    { question: "Substances that do not mix with water or disappear in water are known as?", options: ["Insoluble", "Solvent", "Solution", "Soluble"], answer: 0 },
    { question: "Substances or materials through which things can be seen are known as ?", options: ["Translucent", "Transparent", "Opaque", "Sovent"], answer: 1 },
    { question: "Materials through which you are not able to see are known as?", options: ["Translucent", "Transparent", "Opaque", "Sovent"], answer: 3 },
    { question: "Materials through which things can be seen but not clearly are known as?", options: ["Translucent", "Transparent", "Opaque", "Sovent"], answer: 0 },
    { question: "Which one of the following is insoluble in water?", options: ["Vinegar", "Sugar", "Slat", "Oil"], answer: 3 },
    { question: "Which one of the following is opaque material?", options: ["Wood", "Glass", "Water", "Air"], answer: 0 },
    { question: "Stone is transparent, while glass is opaque?", options: ["True", "False"], answer: 0 },
    { question: "Chalk dissolves in water?", options: ["True", "False"], answer: 0 },
    { question: "A piece of wood floats on water?", options: ["True", "False"], answer: 0 },
    { question: "Sugar does not dissolves in water?", options: ["True", "False"], answer: 1 },
    { question: "Oil mixes with water?", options: ["True", "False"], answer: 1 },
    { question: "Sand settles down in water?", options: ["True", "False"], answer: 0 },
    { question: "Vinegar dissolves in water?", options: ["True", "False"], answer: 0 },
    { question: "A Notebook has a lustre while erasure does not?", options: ["True", "False"], answer: 1 },
    
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

