let chapters = [];
let currentChapter = 0;
let currentPage = 0;
const questionsPerPage = 10;

function loadChapterButtons() {
    const chapterButtonsContainer = document.getElementById('chapter-buttons');
    chapterButtonsContainer.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const button = document.createElement('button');
        button.innerText = chapter.name;
        button.className = 'chapter-button';
        button.onclick = () => loadChapter(index);
        chapterButtonsContainer.appendChild(button);
    });
}

function loadChapter(index) {
    currentChapter = index;
    currentPage = 0;
    loadQuestions();
    scrollToTop();
}

function loadQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const chapterNameDiv = document.createElement('div');
    chapterNameDiv.id = 'chapter-name';
    chapterNameDiv.innerText = chapters[currentChapter].name;
    quizContainer.appendChild(chapterNameDiv);

    const chapter = chapters[currentChapter];
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

        const options = document.createElement('div');
        options.className = 'options';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = `${String.fromCharCode(65 + index)}: ${option}`;
            button.onclick = () => checkAnswer(button, index, start + i);
            options.appendChild(button);
        });
        questionBlock.appendChild(options);

        const viewAnswerButton = document.createElement('button');
        viewAnswerButton.className = 'view-answer-button';
        viewAnswerButton.innerText = 'View Answer';
        viewAnswerButton.onclick = () => showAnswer(start + i);
        questionBlock.appendChild(viewAnswerButton);

        quizContainer.appendChild(questionBlock);
    });

    updatePagination();
    
}

function checkAnswer(button, selectedOption, questionIndex) {
    const chapter = chapters[currentChapter];
    if (selectedOption === chapter.questions[questionIndex].answer) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }
}

function showAnswer(questionIndex) {
    const chapter = chapters[currentChapter];
    const questionBlock = document.getElementsByClassName('question-block')[questionIndex % questionsPerPage];
    const optionButtons = questionBlock.getElementsByClassName('options')[0].children;
    for (let i = 0; i < optionButtons.length; i++) {
        if (i === chapter.questions[questionIndex].answer) {
            optionButtons[i].classList.add('correct');
        }
    }
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

    const chapter = chapters[currentChapter];
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
    const chapter = chapters[currentChapter];
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
    fetch('bc-mi.json')
        .then(response => response.json())
        .then(data => {
            chapters = data.chapters;
            loadChapterButtons();
            loadQuestions();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});
