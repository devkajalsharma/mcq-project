const questions = [
    {
        question: "What is javascript?",
        answers: [
            { text: "A markup Lanquage", correct: "false" },
            { text: " A scripting language", correct: "true" },
            { text: "A programming language", correct: "false" },
            { text: "None of the above", correct: "false" },
        ]
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: [
            { text: "Number", correct: "false" },
            { text: "String", correct: "false" },
            { text: "Float", correct: "true" },
            { text: "Boolean", correct: "false" },
        ]
    },

    {
        question: "Which of the following is a loop in JavaScript?",
        answers: [
            { text: "if", correct: "false" },
            { text: "for", correct: "false" },
            { text: "Switch", correct: "false" },
            { text: "Function", correct: "true" },
        ]
    }

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("Next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();

}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => { // to show answers option//
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });



}



function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    let selectButton = e.target;
    let isCorrect = selectButton.dataset.correct === "true";
    if (isCorrect) {
        selectButton.classList.add("correct");
        score++;
    }
    else {
        selectButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = "true";
    })

    nextButton.style.display = "block"
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block"
}


function heandeleNextbutton() {
    currentQuestionIndex++;
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        heandeleNextbutton();
    }
    else{
        startQuiz();
    }
})


resetState();
startQuiz();
