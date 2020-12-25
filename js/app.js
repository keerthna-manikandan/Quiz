const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const ansContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter =0;
let currQuestion;
let availableQuestsion = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;
let wrongAnswer = 0;

function setAvailableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
       availableQuestsion.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question "+ (questionCounter+ 1)+ " of " + quiz.length;

    const questionIndex = availableQuestsion[Math.floor(Math.random() * availableQuestsion.length)];
    currQuestion = questionIndex;
    questionText.innerHTML = currQuestion.q;

    const ind = availableQuestsion.indexOf(questionIndex);
    //remove this question from available question
    availableQuestsion.splice(ind,1);

    const optionlen = currQuestion.options.length;
    for(let i=0;i<optionlen;i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0;
      for(let i=0;i<optionlen;i++){
          animationDelay+=0.15;
        const optionInd = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        const index2 = availableOptions.indexOf(optionInd);
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        
        option.innerHTML = currQuestion.options[optionInd];
        option.id = optionInd;
        option.style.animationDelay =  animationDelay+'s';
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
      }
    questionCounter++;
}

function getResult(element){
    const id = parseInt(element.id);
    if(id === currQuestion.answer){
        element.classList.add("correct");
        updateAnsIndicator("correct"); 
        correctAnswer++;
    }
    else{
        element.classList.add("wrong");
        updateAnsIndicator("wrong");
        let b = document.getElementById(currQuestion.answer);
        b.classList.add("correct");
        wrongAnswer++;
    }
    attempt++;
    unclickableOptions();
}


function updateAnsIndicator(indi){
    ansContainer.children[questionCounter].classList.add(indi);

}



function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next(){
    if(questionCounter==quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();  
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}



function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML = wrongAnswer;
    resultBox.querySelector(".total-percentage").innerHTML = ((correctAnswer/quiz.length)*100).toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswer +" / " + quiz.length;

}

function resetQuiz(){
    questionCounter=0;
    correctAnswer =0 ;
    attempt =0;

}

function tryAgain(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    homeBox.classList.remove("hide");
    startOver();
}


function answerIndicator(){
    ansContainer.innerHTML = '';
    ansContainer.innerHTML = "<hr>";
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion ; i++){
        const indicator = document.createElement("div");
        ansContainer.appendChild(indicator);
    }
}

function home(){
    homeBox.classList.remove("hide");
    quizBox.classList.add("hide");
    resultBox.classList.add("hide");
}

function startOver(){

    homeBox.classList.add("hide");

    quizBox.classList.remove("hide");

    setAvailableQuestion();
    getNewQuestion();

    answerIndicator();

}