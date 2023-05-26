var questionEl = document.querySelector(".question");
var inputEl = document.querySelector("input");
var formEl = document.querySelector("form");
var questionCount = 0;

var soFar = 0;
var inStore = 0;
var eightPm = 0;
var ninePm = 0;

var questions = [
  "How many trays in the proofer?",
  "How many trays are on the cart",
  "How many trays are outside?",
  "Trays in people's hands?",
  "What are the bread sales so far?",
  "What were the total sales for yesterday",
  `What were the total sales for this day last week?`,
  `What were the total sales for this day, two weeks ago?`,
];

var answers = [];

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  answers.push(parseInt(inputEl.value, 10));
  questionCount++;
  questionCount < questions.length
    ? (questionEl.textContent = questions[questionCount])
    : calculateFinalResult();

  formEl.reset();
});

function calculateFinalResult() {
  var traysInStore = answers.slice(0, 4);
  inStore = traysInStore.reduce((a, b) => a + b, 0) * 24;
  console.log(inStore);
  soFar = inStore + answers[4];
  console.log(soFar);
  var hoursOpen = 7 + new Date().getHours();
  console.log("hours open: ", hoursOpen);
  var breadSalesPerHour = Math.floor(soFar / hoursOpen);
  eightPm = Math.floor(breadSalesPerHour * (20 - new Date().getHours()) * 0.08);
  console.log("8pm: ", eightPm);
  ninePm = Math.floor(breadSalesPerHour * (21 - new Date().getHours()) * 0.08);
  console.log("9pm: ", ninePm);
  var finalResult = `
Sales so far today: $${soFar}
Amount of sales in store: $${inStore}
Sales projected for 8pm: $${eightPm}
Sales projected for 9pm: $${ninePm}
Sales include 8% waste estimate.
`;
  questionEl.textContent = finalResult;
}

questionEl.textContent = questions[0];
