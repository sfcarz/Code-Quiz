$(document).ready(function () {
    const $userScore = $('#userScore');
    const $timer = $('#timer');
    const $question = $('#question');
    const $choices = $('#choices');
    const $ready = $('#ready');
    let $forms = $('#forms');
    let $form = $('#form');
    const $formAnswers = $('#formAnswers');
    const $todoCount = $('#todo-count');
    const $todoList = $('#todo-list');
    const $submit = $('#submit')

    let StartingMin = .5;
    let MinToSec = StartingMin * 60;
    let resetTimer;
    let score = localStorage.getItem("score");
    let currentQuestion = 0;
    let HSName = [];
    
    function countDown() {
        let minutes = Math.floor(MinToSec / 60)
        let seconds = MinToSec % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        $timer.text(`${minutes}: ${seconds}`)
        MinToSec--;
        if (MinToSec === -1) {
            reset();
        };
    }; 

    function start() {
        score = 0;
        $todoCount.text(score);
        resetTimer = setInterval(countDown, 1000)
        $ready.addClass('hide');
        $question.removeClass('hide');
        $choices.removeClass('hide');
        showQuestion();
        shufflingQuestion = question.sort(function() { Math.random() - .5});
   
    };

    function showQuestion() {
        $choices.empty();
        const myQuestion = question[currentQuestion];
        $question.text(myQuestion.quizQuestion).addClass('h1');
        myQuestion.answer.forEach(answer => {
            const buttonEl = $('<button>').addClass('btn btn-primary btn-lg mb-3 mr-3 buttons overBtn');
            buttonEl.text(answer.text);            
            if(answer.correct) {
                buttonEl.data('answer', true);
            } else {
                buttonEl.data('answer', false);
            };
            buttonEl.on('click', function () {
                answerSelection($(this).data('answer'));
            });
            $choices.append(buttonEl);
        });
    };

    function answerSelection(right) {
        $userScore.text(`Score: ${score}`);
        $todoCount.text(`${score}`);
        if(right) {
            score++;
            localStorage.setItem("Score: ", score);
            console.log(score);
        } else {
            console.log('wrong');
            MinToSec = MinToSec - 15;
            score--;
            localStorage.setItem("Score: ", score);
        }
        if (MinToSec <= 0) {
            reset();
            $timer.addClass('hide')
        };
        if(right) {
            next()
        }
    };  

    function next() {
        currentQuestion++;
        if(currentQuestion >= question.length) {
            reset()
        } else {
            showQuestion();
        }
    };

    function reset() { 
            clearInterval(resetTimer);
            $question.addClass('hide');
            $choices.addClass('hide');
            $forms.removeClass('hide');
            $formAnswers.removeClass('hide');
    };

    const question = [
        {
            quizQuestion: 'What does pop() do to an Array?', 
            answer: [
                { text: 'Adds a new Array?', correct: false },
                { text: 'Removes an Array?', correct: false },
                { text: 'Adds an Array to the middle?', correct: false },
                { text: 'Removes the last element from the Array?', correct: true},
            ]
        },
        {
            quizQuestion: 'What does split do to a string?', 
            answer: [
                { text: 'Turns into an object?', correct: false },
                { text: 'Turns into an Array?', correct: true },
                { text: 'Splits the string in 2?', correct: false },
                { text: 'All the Above?', correct: false },
            ]
        },
        {
            quizQuestion: 'What does concat do?', 
            answer: [
                { text: 'Adds a string to another string?', correct: true },
                { text: 'Adds an array to another array?', correct: false },
                { text: 'Returns a boolean?', correct: false },
                { text: 'Creates it into an object?', correct: false },
            ]
        },
        {
            quizQuestion: 'What does Math.random() do?',
            answer: [
                { text: 'Sort numbers into order?', correct: false },
                { text: 'Randomize numbers only?', correct: false },
                { text: 'Randomize any parameter given to it?', correct: true },
                { text: 'Adds every other number?', correct: false },
            ]
        }
    ];

    $ready.on('click', function () {
        start();
    });

    $submit.on('click', function(event) {
        event.preventDefault();

        const userName = $form.val().trim();

        localStorage.setItem('User Name:', JSON.stringify(userName));

        if (userName === null ) {
            HSName.push(userName);
        };
        if (userName == '') {
            return
        };
        $form.val('');

        const $li = $('<li>');
        $li.text(userName + ' : ' + `${score}`);
        $todoList.append($li);
        console.log(userName);
    });

});
 