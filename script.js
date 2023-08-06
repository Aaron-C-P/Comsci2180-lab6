
        const startButton = document.getElementById('start-btn');
        const nextButton = document.getElementById('next-btn');

        const questionContainerElement = document.getElementById('question-container');
        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answer-buttons');

        let shuffledQuestions, currentQuestionIndex;
        let quizScore = 0;

        startButton.addEventListener('click', startQuiz);

        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            setNextQuestion();
        });

        function startQuiz() {
            startButton.classList.add('hide');
            shuffledQuestions = questions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
            questionContainerElement.classList.remove('hide');
            setNextQuestion();
            quizScore = 0;
            document.getElementById("right-answers").innerText = quizScore;
        }

        function setNextQuestion() {
            resetState();
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        }

        function showQuestion(question) {
            questionElement.innerText = question.question;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                answerButtonsElement.appendChild(button);
            });
        }

        function resetState() {
            clearStatusClass(document.body);
            nextButton.classList.add('hide');
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedButton = e.target;
            const correct = selectedButton.dataset.correct;
            setStatusClass(document.body, correct);
            Array.from(answerButtonsElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct);
            });

            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hide');
            } else {
                selectedButton.innerText = 'Restart';
                selectedButton.classList.remove('hide');
            }

            if (correct === "true") {
                quizScore++;
            }
            document.getElementById("right-answers").innerText = quizScore;
        }

        function setStatusClass(element, correct) {
            clearStatusClass(element);
            if (correct === "true") {
                element.classList.add('Correct');
            } else {
                element.classList.add('InCorrect');
            }
        }

        function clearStatusClass(element) {
            element.classList.remove('Correct');
            element.classList.remove('InCorrect');
        }

        const questions = [
            {
                question: 'Which framework is the best?',
                answers: [
                    { text: 'React JS', correct: 'true' },
                    { text: 'Python', correct: 'false' },
                    { text: 'Angular', correct: 'false' },
                    { text: 'Vue.js', correct: 'false' }
                ],
            },
            {
                question: 'What is the Capital of Jamaica?',
                answers: [
                    { text: 'Mandeville', correct: 'false' },
                    { text: 'Kingston', correct: 'true' },
                    { text: 'Delhi', correct: 'false' },
                    { text: 'St.Ann', correct: 'false' }
                ],
            },
            {
                question: 'Did you enjoy this Quiz?',
                answers: [
                    { text: 'Yes', correct: 'true' },
                    { text: 'No', correct: 'false' },
                ],
            },
        ];



//Happy coding!