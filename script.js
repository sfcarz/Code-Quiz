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

    let StartingMin = 1.5;
    let MinToSec = StartingMin * 60;
    let resetTimer;
    let score = localStorage.getItem("score");
    let scores = JSON.parse(localStorage.getItem('scores'))
    let currentQuestion = 0;
    let HSName = [];
    let shufflingQuestion;
    
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
        shufflingQuestion = question.sort(function() {return Math.random() - .5});
        // console.log(shufflingQuestion);
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
        if(right) {
            score++;
            localStorage.setItem("Score: ", score);
            // console.log(score);
        } else {
            // console.log('wrong');
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
        $userScore.text(`Score: ${score}`);
        $todoCount.text(`${score}`);

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
        },
        {
            quizQuestion: 'What do curly brackets create?',
            answer: [
                { text: 'Create an Object?', correct: true },
                { text: 'Create an Array?', correct: false },
                { text: 'None of the Above?', correct: false }
            ]
        },
        {
            quizQuestion: 'What does the % return?',
            answer: [
                { text: 'Turn a number into a percentage?', correct: false },
                { text: 'Divide the number you assign and returns the remainder?', correct: true },
                { text: 'Divide the number by it self?', correct: false },
                { text: 'All the above?', correct: false }
            ]
        }
    ];

    $ready.on('click', function () {
        start();
    });

    $submit.on('click', function(event) {
        event.preventDefault();

        const userName = $form.val().trim();
        console.log(userName);
        localStorage.setItem('User Name:', JSON.stringify(userName));
        if (!scores) {
            scores = []
        }

        scores.push({userName: userName, score: score});
        localStorage.setItem('scores', JSON.stringify(scores));
        if (userName === null ) {
            HSName.push(userName);
        };
        if (userName == '') {
            return
        };

        $form.val('');
        
        for (let i = 0; i < scores.length; i++) {
            const scoresLength = scores[i];
            const userText = scoresLength.userName;
            const userScore = scoresLength.score
            // console.log(userText);
            // console.log(userScore);
            const li = $('<li>').text(`${userText}: ${userScore}`)
            $todoList.prepend(li);
        }

        
    
    });

});