let chapters = [];
let currentMonth = 'Chapter 1'; // Default month to be displayed
let currentPage = 0;
const questionsPerPage = 15;

function loadQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const chapter = chapters.find(chap => chap.name === currentMonth);
    if (!chapter) {
        quizContainer.innerText = 'No questions available for this month.';
        return;
    }

    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const questions = chapter.questions.slice(start, end);

    questions.forEach((question, i) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        const questionText = document.createElement('div');
        questionText.className = 'question';
        questionText.innerText = `${start + i + 1}. ${question.question}`;
        questionBlock.appendChild(questionText);

        const answer = document.createElement('div');
        answer.className = 'answer';
        answer.innerText = `Ans: ${question.answer}`;
        questionBlock.appendChild(answer);

        quizContainer.appendChild(questionBlock);
    });

    updatePagination();
}

function updatePagination() {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    if (currentPage > 0) {
        const prevPageSpan = document.createElement('span');
        prevPageSpan.innerText = 'Prev';
        prevPageSpan.onclick = () => prevPage();
        pagination.appendChild(prevPageSpan);
    }

    const currentPageSpan = document.createElement('span');
    currentPageSpan.innerText = currentPage + 1;
    currentPageSpan.classList.add('active');
    pagination.appendChild(currentPageSpan);

    const chapter = chapters.find(chap => chap.name === currentMonth);
    if (currentPage < Math.ceil(chapter.questions.length / questionsPerPage) - 1) {
        const nextPageSpan = document.createElement('span');
        nextPageSpan.innerText = 'Next';
        nextPageSpan.onclick = () => nextPage();
        pagination.appendChild(nextPageSpan);
    }

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.appendChild(pagination);
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        loadQuestions();
        scrollToTop();
    }
}

function nextPage() {
    const chapter = chapters.find(chap => chap.name === currentMonth);
    if (currentPage < Math.ceil(chapter.questions.length / questionsPerPage) - 1) {
        currentPage++;
        loadQuestions();
        scrollToTop();
    }
}

function scrollToTop() {
    const quizContainer = document.getElementById('title-container');
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fetchQuestions() {
    fetch('2024-CA.json')
        .then(response => response.json())
        .then(data => {
            chapters = data.chapters;
            loadQuestions();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function setMonth(month) {
    currentMonth = month;
    currentPage = 0;
    loadQuestions();
}

setMonth('April'); // To display questions for January
//setMonth('Chapter 2'); // To display questions for February

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});
