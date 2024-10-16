let allQuestions = [];
let selectedQuestions = [];
const questionsPerQuiz = 20;

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        bookName: params.get('book') || 'defaultBook',
        chapterName: params.get('chapter') || 'defaultChapter'
    };
}

function loadQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    selectedQuestions.forEach((question, i) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        const questionText = document.createElement('div');
        questionText.className = 'question';
        questionText.innerText = `${i + 1}. ${question.question}`;
        questionBlock.appendChild(questionText);

        const options = document.createElement('div');
        options.className = 'options';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = `${String.fromCharCode(65 + index)}: ${option}`;
            button.onclick = () => selectOption(button, index, i);
            options.appendChild(button);
        });
        questionBlock.appendChild(options);

        quizContainer.appendChild(questionBlock);
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.className = 'submit-button';
    submitButton.onclick = () => showResults();
    quizContainer.appendChild(submitButton);
}

function selectOption(button, selectedOption, questionIndex) {
    const question = selectedQuestions[questionIndex];
    const buttons = button.parentElement.children;
    for (let btn of buttons) {
        btn.style.backgroundColor = ''; // Reset all buttons' background color
        btn.style.color = ''; // Reset all buttons' font color
    }
    button.style.backgroundColor = 'black'; // Highlight selected option
    button.style.color = 'white'; // Change font color to white

    question.selectedAnswer = selectedOption;
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    let correctAnswers = 0;

    selectedQuestions.forEach((question, i) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        const isCorrect = question.selectedAnswer === question.answer;
        const questionText = document.createElement('div');
        questionText.className = 'question';
        questionText.innerHTML = `${i + 1}. ${question.question} ${isCorrect ? '<span class="tick-mark">&#10004;</span>' : ''}`;
        questionBlock.appendChild(questionText);

        const options = document.createElement('div');
        options.className = 'options';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = `${String.fromCharCode(65 + index)}: ${option}`;

            if (question.selectedAnswer === index) {
                if (index === question.answer) {
                    button.classList.add('correct');
                    correctAnswers++;
                } else {
                    button.classList.add('incorrect');
                }
            }
            if (index === question.answer) {
                button.classList.add('correct');
            }

            options.appendChild(button);
        });
        questionBlock.appendChild(options);
        quizContainer.appendChild(questionBlock);
    });

    const result = document.createElement('div');
    result.className = 'result';
    result.innerText = `Marks Obtained: ${correctAnswers}/${questionsPerQuiz}`;
    quizContainer.appendChild(result);

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = getFeedback(correctAnswers);
    quizContainer.appendChild(feedback);
}

function getFeedback(score) {
    if (score <= 5) {
        return "You need to do a lot of work.";
    } else if (score <= 10) {
        return "Keep trying, you can do better!";
    } else if (score <= 15) {
        return "Good job, you're getting there!";
    } else {
        return "Excellent work, well done!";
    }
}

function fetchQuestions() {
    const { bookName, chapterName } = getQueryParams();

    fetch('../questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data.books[bookName][chapterName];
            selectedQuestions = selectRandomQuestions(allQuestions, questionsPerQuiz);
            loadQuestions();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function selectRandomQuestions(allQuestions, numQuestions) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});
