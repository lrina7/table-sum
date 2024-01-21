//Таймер
let timerDisplay = document.getElementById('timer');
let isTimerExpired = false;
  let timerInterval;

  function startTimer() {
    let durationInSeconds = 60;

    function updateTimer() {
      let minutes = Math.floor(durationInSeconds / 60);
      let seconds = durationInSeconds % 60;

      timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (--durationInSeconds < 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = 'Время вышло!';
        timerDisplay.style.fontFamily = "Caveat"
        timerDisplay.style.color = 'red';

        isTimerExpired = true;
			document.querySelector('.btn_praxis').disabled = true;//блокируем кнопку по окончанию таймера
      document.getElementById('answer').disabled = true;//блокируем enter по окончанию таймера
      showAnswer(); //показ сообщения
      }
    }
    updateTimer(); // Обновляем таймер сразу, чтобы избежать мигания
    timerInterval = setInterval(updateTimer, 1000);
  }


  //таблица
  let currentAnswer;
  function generateQuestion() {
    {
      let num1 = Math.floor(Math.random() * 9) + 1; // случайное число от 1 до 9
      let num2 = Math.floor(Math.random() * 9) + 1;
      return { num1, num2, answer: num1 + num2 };
    }
  }

  function displayQuestion() {
    if (isTimerExpired) return;
    let question = generateQuestion();
    document.getElementById('question').textContent = `${question.num1} + ${question.num2} =`;
    document.getElementById('answer').value = ''; // очистить поле ввода
    currentAnswer = question.answer; // сохранить правильный ответ

    // Очистим иконку результата при новом вопросе
  document.getElementById('resultIcon').textContent = '';
  }


    
  function checkAnswer() {
    let resultIcon = document.getElementById('resultIcon');
    //let userAnswer = parseInt(document.getElementById('answer').value);
    let userAnswer = document.getElementById('answer').value.trim();

    if (userAnswer === "") {
      // Пользователь не ввел ответ
      resultIcon.textContent = 'Введите ответ!';
      resultIcon.style.color = 'red';
      return;
    }

    userAnswer = parseInt(userAnswer);

    let scoreElementRight = document.getElementById('result_right'); // отдельная переменная для верного элемента счета
    let scoreRight= parseInt(scoreElementRight.textContent); // получение текущего значения счета
    let scoreElementWrong = document.getElementById('result_wrong'); // отдельная переменная для неверного элемента счета
    let scoreWrong= parseInt(scoreElementWrong.textContent); // получение текущего значения счета
    
    if (userAnswer === currentAnswer) {
      scoreRight ++; //добавляем балла за верный ответ
      resultIcon.textContent = '✔️';
      resultIcon.style.color = 'green';
    } else {
      scoreWrong ++;//добавляем балла за неверный ответ
      resultIcon.textContent = '❌';
      resultIcon.style.color = 'red';
    }

    scoreElementRight.textContent = scoreRight;
    scoreElementWrong.textContent = scoreWrong;

    setTimeout(displayQuestion, 500);  // Вызовем функцию с задержкой, чтобы иконка не оставалась бесконечно долго
    
  }

   function showAnswer() {
      let text_message = document.getElementById("text_result");
      let scoreAll = parseInt(document.getElementById('result_right').textContent) + parseInt(document.getElementById('result_wrong').textContent);
      let scoreRight = parseInt(document.getElementById('result_right').textContent);
      text_message.textContent = `Ваш результат ${scoreRight} из ${scoreAll}`;
      text_message.style.color ='red';
    }
    
    function startGame() {
      startTimer();
      displayQuestion();
    }

    document.getElementById('answer').addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        checkAnswer();
      }
    });

  document.querySelector('.btn_timer').addEventListener("click", startGame);