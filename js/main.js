// Hiding questions page
document.querySelector('.question-container').style.display = 'none';
document.querySelector('.skipped-questions').style.display = 'none';


// Question class
function Question(question, ans1, ans2, ans3, ans4, correctAnswer) {
    this.Question = question;
    this.ans1 = ans1;
    this.ans2 = ans2;
    this.ans3 = ans3;
    this.ans4 = ans4;
    this.correctAnswer = correctAnswer;
}

// Variables definition
var idx = 1;
var noOfQuestions = 5;
var studentName;
var poolOfQuestions = [
    new Question('How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        'if (i <> 5)',
        'if i <> 5',
        'if (i != 5)',
        'if (i == 5)', 3),
    new Question('How does a WHILE loop start?',
        'while i = 1 to 10',
        'while (i <= 10; i++)',
        'while i = 1 through 10',
        'while (i <= 10)', 4),
    new Question('How does a FOR loop start?',
        'for (i = 0; i <= 5)',
        'for (i = 0; i <= 5; i++)',
        'for i = 1 to 5',
        'for (i <= 5; i++)', 2),
    new Question('Which of the following are attributes for the FORM tag?',
        'method',
        'action',
        'Both (a) & (b)',
        'None of the above', 3),
    new Question('How can you add a comment in a JavaScript?',
        '//This is a comment',
        '--This is a comment',
        '%This is a comment',
        '%%This is a comment', 1),
    new Question('How to insert a comment that has more than one line?',
        '/*This is a comment*/',
        '--This is a comment',
        '%This is a comment',
        '%%This is a comment', 1),
    new Question('How do you round the number 7.25, to the nearest integer?',
        'rnd(7.25)',
        'Math.round(7.25)',
        'Math.rnd(7.25)',
        'round(7.25)', 2),
    new Question('How do you find the number with the highest value of x?',
        'Math.max(x)',
        'Math.ceil(x)',
        'top(x)',
        'ceil(x)', 2),
    new Question('Which event occurs when the user clicks on an HTML element?',
        'onchange',
        'onmouseclick',
        'onclick',
        'onmouseover', 3),
    new Question('Which operator is used to assign a value to a variable?',
        '*',
        '=',
        '-',
        '/', 2)
];
//for these two arrays the first element is always null for counting
var arrayOfQuestions = [null];
var studentAnswers = [null];
var arrayOfSkippedQuestions = [];
var arrayOfRandomNumbers = [];
var skippedQuestionsNodeList = document.querySelectorAll('.skipped-question');

// Initializing the arrays
for (let i = 0; i < noOfQuestions; i++) {
    studentAnswers.push(null);
}
for (let i = 0; i < noOfQuestions; i++) {
    let random = Math.floor(Math.random() * poolOfQuestions.length);
    arrayOfRandomNumbers.push(random);
    arrayOfQuestions.push(poolOfQuestions[random]);
    // Remove this element from the pool of questions
    poolOfQuestions.splice(random, 1);
}

// Event listeners
document.querySelector('#next-btn').addEventListener('click', handleNextQuestion);
document.querySelector('#prev-btn').addEventListener('click', handlePrevQuestion);
document.querySelector('#skip-btn').addEventListener('click', handleSkip);
document.querySelector('#submit-btn').addEventListener('click', handleSubmit);
document.querySelector('form.question').addEventListener('change', handleChangeChoice);

// Functions
function renderQuestion(idx, question) {

    document.querySelector('.question').innerHTML =
        `<h5>Question ${idx} of ${noOfQuestions}</h5>
        <h2 class="question-header">${question.Question}</h2>
            
        <ul class="answer-list">
            <li>
                <label class="answer-label">
                    <input type="radio" name="answer" value="1">
                    <span class="answer">${question.ans1}</span>
                </label>
            </li>
            <li>
                <label class="answer-label">
                    <input type="radio" name="answer" value="2">
                    <span class="answer">${question.ans2}</span>
                </label>
            </li>
            <li>
                <label class="answer-label">
                    <input type="radio" name="answer" value="3">
                    <span class="answer">${question.ans3}</span>
                </label>
            </li>
            <li>
                <label class="answer-label">
                    <input type="radio" name="answer" value="4">
                    <span class="answer">${question.ans4}</span>
                </label>
            </li>
            
        </ul>`;

    var inputList = document.querySelectorAll('input');
    // Remember the choice of the user
    for (let j = 0; j < inputList.length; j++) {
        if (inputList[j].value == studentAnswers[idx]) {
            inputList[j].checked = 'checked';
        }
    }

    // Show or hide 'submit' button
    if (idx < noOfQuestions) {
        document.querySelector('#submit-btn').style.display = 'none';
    }
    else {
        document.querySelector('#submit-btn').style.display = 'inline-block';
    }
}

function handleNextQuestion() {

    // If pressed next without answering, put it in the skipped questions list
    if (studentAnswers[idx] == null) {

        if (!arrayOfSkippedQuestions.includes(idx)) {
            document.querySelector('.skipped-questions').innerHTML
                += `<div class="skipped-question" data-value="${idx}">${idx}</div>`;
            arrayOfSkippedQuestions.push(idx);
        }

        skippedQuestionsNodeList = document.querySelectorAll('.skipped-question');

        //add an event listener to each of the skipped questions
        for (let i = 0; i < skippedQuestionsNodeList.length; i++) {
            skippedQuestionsNodeList[i].addEventListener('click', handleClickOnSkipped);
        }

    }

    idx++;

    if (idx <= noOfQuestions) {
        renderQuestion(idx, arrayOfQuestions[idx]);
    }
    else {
        idx = noOfQuestions;
    }


}

function handlePrevQuestion() {

    idx--;

    if (idx >= 1) {
        renderQuestion(idx, arrayOfQuestions[idx]);
    }
    else {
        idx = 1;
    }
}

function handleSkip() {

    if (!arrayOfSkippedQuestions.includes(idx)) {
        document.querySelector('.skipped-questions').innerHTML
            += `<div class="skipped-question" data-value="${idx}">${idx}</div>`;
        arrayOfSkippedQuestions.push(idx);

        handleNextQuestion();
        // console.log(arrayOfSkippedQuestions);
    }
    else {
        handleNextQuestion();
    }

    skippedQuestionsNodeList = document.querySelectorAll('.skipped-question');

    //add an event listener to each of the skipped questions
    for (let i = 0; i < skippedQuestionsNodeList.length; i++) {
        skippedQuestionsNodeList[i].addEventListener('click', handleClickOnSkipped);
    }

}

function handleClickOnSkipped(e) {
    //delete from UI
    idx = e.target.dataset.value;
    renderQuestion(idx, arrayOfQuestions[idx]);

    //delete it from skipped array
    e.target.parentNode.removeChild(e.target);
    idx = parseInt(idx);
    var indexToBeRemoved = arrayOfSkippedQuestions.indexOf(idx);
    arrayOfSkippedQuestions.splice(indexToBeRemoved, 1);
}

function handleSubmit() {

    document.querySelector('.skipped-questions').style.display = 'none';

    var score = 0;
    var questionContainer = document.querySelector('.question-container');

    questionContainer.parentNode.removeChild(questionContainer);

    for (let i = 1; i <= noOfQuestions; i++) {
        if (studentAnswers[i] == arrayOfQuestions[i].correctAnswer) {
            score++;
        }
    }

    document.querySelector('.score').innerHTML =
        `<h1>Thank you, ${studentName}</h1>
        <p>You scored</p>
        <h2>${score}/${noOfQuestions}</h2>`;


}

function handleChangeChoice(e) {
    studentAnswers[idx] = e.target.value;
}


/*********** Login-form ***********/
document.getElementById('btn-login').addEventListener('click', function (e) {

    e.preventDefault();

    if (isValidName() && isValidEmail() && isValidPassword()) {

        document.querySelector('.login-page').classList.add('login-page-translate');
        
        setTimeout(function() { 
            document.querySelector('.login-page').style.display = 'none';
            document.querySelector('.question-container').style.display = 'block';
            document.querySelector('body').style.background = '#F8F8F8';
            renderQuestion(1, arrayOfQuestions[1]);
            document.querySelector('.skipped-questions').style.display = 'block';  
        }, 1000);

    }

    if (!isValidName())
        document.querySelector('.incorrect-name').style.display = 'block';
    else
        document.querySelector('.incorrect-name').style.display = 'none';


    if (!isValidEmail())
        document.querySelector('.incorrect-email').style.display = 'block';
    else
        document.querySelector('.incorrect-email').style.display = 'none';


    if (!isValidPassword())
        document.querySelector('.incorrect-password').style.display = 'block';
    else
        document.querySelector('.incorrect-password').style.display = 'none';


});


function isValidName() {

    var name = document.querySelector('.login-name').value;
    studentName = name;

    if (name === null || name.length < 3)
        return false;

    for (var i = 0; i < name.length; i++) {
        if (!isNaN(name[i]))
            return false;
    }

    return true;
}

function isValidEmail() {

    var email = document.querySelector('.login-email').value;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isValidPassword() {

    var password = document.querySelector('.login-password').value;

    if (password === null || password.length < 8)
        return false;

    return true;
}