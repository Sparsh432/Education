const questions = [
    { question: "Ingredients that we get from Plants & Animals that are essential for our body are know as?", options: ["Soda", "Nutrients", "Cream", "Muscle"], answer: 1 },
    { question: "The main carbohydrates found in our food in the form of?", options: ["Liquid", "Solid", "Starch & Sugars", "Blood"], answer: 2 },
    { question: "In Test for Protein, which color indicates the presence of Protein?", options: ["Violet", "Yellow", "Pink", "Blue"], answer: 0 },
    { question: "In Test for Starch, what color indicates the presence of Starch?", options: ["Violet", "No Color", "Blue-Black", "Pink"], answer: 2 },
    { question: "Which chemical solution is used in Test for Stach?", options: ["Iodine", "Caustic Soda", "Copper Sulphate", "Caustic Soda"], answer: 0 },
    { question: "How much drops of Copper Sulphate and Caustic Soda is added in Test for Protein?", options: ["2 and 10", "3 and 4", "1 and 2", "5 and 6"], answer: 0 },
    { question: "Carbohydrates and Fats mainly provide ___ to our body?", options: ["Fibre", "Water", "Vitamins", "Energy"], answer: 3 },
    { question: "Major Nutrients in our foods are?", options: ["Carbohydrates, Protein, Fats, Vitamins & Minerals", "Only Proteins", "Only Fats", "Only Carbohydrate & Proteins"], answer: 0 },
    { question: "What patch on paper shows food items contains Fat in Test for Fats?", options: ["Dry", "Oily", "Wet", "No change"], answer: 0 },
    { question: "Same amount of Fats gives more energy than Carbohydrates", options: ["True", "False"], answer: 0 },
    { question: "Food containing Fats and Carbohydrates are called?", options: ["Energy giving foods", "Energy sharing foods", "Energy taking foods", "No foods"], answer: 0 },
    { question: "Proteins are needed for?", options: ["Growth and Repair of our body", "Dehydrating our body", "Damaging our body", "Wounding our body"], answer: 0 },
    { question: "Food Proteins are often called?", options: ["Deceased Foods", "Unhealty Foods", "Damaging Foods", "Body Building Foods"], answer: 3 },
    { question: "___ help in protedting our body against disease. It also helps in keeping our eyes, bones, teeth and gums healthy?", options: ["Carbohydrate", "Vitamins", "Fats", "Water"], answer: 1 },
    { question: "Which is not a Vitamin?", options: ["Vitamin A", "Vitamin P", "Vitamin C", "Vitamin K"], answer: 1 },
    { question: "Which Vitamin keeps our skin and eyes healthy?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"], answer: 0 },
    { question: "Which Vitamin helps body to fight against diseases?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"], answer: 2 },
    { question: "Which Vitamin helps our body to use calcium for bones and teeth?", options: ["Vitamin D", "Vitamin E", "Vitamin C", "Vitamin K"], answer: 0 },
    { question: "Rice has more ___ than other nutrients?", options: ["Minerals", "Vitamin", "Carbohydrates", "Fats"], answer: 2 },
    { question: "Dietary fibres are also known?", options: ["Roughage", "Rough", "Roughy", "Fats"], answer: 0 },
    { question: "Water helps our body to ___ nutrients from food?", options: ["Absorb", "Release", "Remove", "Damage"], answer: 0 },
    { question: "Lack of nutrients is known as?", options: ["Deficacy", "Deficiency", "Efficiency", "Efficacy"], answer: 1 },
    { question: "All deficiency disease can be prevented by taking a ___?", options: ["Carbohydrate diet", "Protein Diet", "Balance Diet", "Fats Diet"], answer: 2 },
    { question: "Symptomes of Vitamin A deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Bleeding gums and wounds taking longer to heal", "Weak Bones,tooth decay"], answer: 0 },
    { question: "Symptomes of Vitamin B1 deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Bleeding gums and wounds taking longer to heal", "Weak Bones,tooth decay"], answer: 1 },
    { question: "Symptomes of Vitamin C deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Bleeding gums and wounds taking longer to heal", "Weak Bones,tooth decay"], answer: 2 },
    { question: "Symptomes of Vitamin D deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Bleeding gums and wounds taking longer to heal", "Bones becomes soft and bent"], answer: 3 },
    { question: "Symptomes of Vitamin Calcium deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Weak Bones,tooth decay", "Weak Bones,tooth decay"], answer: 2 },
    { question: "Symptomes of Vitamin Iodine deficiency?", options: ["Glands in the neck appears swollen, mental disability in children", "Weak muscles and very little energy to work", "Weak Bones,tooth decay", "Weak Bones,tooth decay"], answer: 0 },
    { question: "Symptomes of Vitamin Iron deficiency?", options: ["Poor Vision or Loss of Vision in darkness (night)", "Weak muscles and very little energy to work", "Weakness", "Weak Bones,tooth decay"], answer: 2 },
    { question: "Which one is Vitamin A deficiency disorder?", options: ["Loss of Vision", "Beriberi", "Scurvy", "Rickets"], answer: 0 },
    { question: "Which one is Vitamin B1 deficiency disorder?", options: ["Loss of Vision", "Beriberi", "Scurvy", "Rickets"], answer: 1 },
    { question: "Which one is Vitamin C deficiency disorder?", options: ["Loss of Vision", "Beriberi", "Scurvy", "Rickets"], answer: 2 },
    { question: "Which one is Vitamin D deficiency disorder?", options: ["Loss of Vision", "Beriberi", "Scurvy", "Rickets"], answer: 3 },
    { question: "Which one is Calcium deficiency disorder?", options: ["Loss of Vision", "Bone and tooth decay", "Goiter", "Anaemia"], answer: 1 },
    { question: "Which one is Iodine deficiency disorder?", options: ["Loss of Vision", "Bone and tooth decay", "Goiter", "Anaemia"], answer: 2 },
    { question: "Which one is Iron deficiency disorder?", options: ["Loss of Vision", "Bone and tooth decay", "Goiter", "Anaemia"], answer: 3 },
    
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

