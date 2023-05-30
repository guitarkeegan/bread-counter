var questionEl = document.querySelector(".question");
var inputEl = document.querySelector("input");
var formEl = document.querySelector("form");
var questionCount = 0;

var soFar = 0;
var inStore = 0;
var eightPm = 0;
var ninePm = 0;

var questions = [
  "How many trays in the proofer?", // 10
  "How many trays are on the cart", // 10
  "How many trays are outside?",// 10
  "Trays in people's hands?",// 10
  "What are the bread sales so far?",// 2000
  "What were the total sales for yesterday",// 4000
  `What were the total sales for this day last week?`,// 4000
  `What were the total sales for this day, two weeks ago?`,// 4000
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
  console.log("inStore should be 960", inStore);
  soFar = inStore + answers[4]; // total sales to this hour... 1240
  console.log("total sales to this hour... 2960", soFar);
  var hoursOpen = new Date().getHours() - 7; // should equall hours since 7am
  console.log("hours open since 7am: ", hoursOpen);
  var breadSalesPerHour = Math.floor(soFar / hoursOpen);
  console.log("rate of sales so far... ", breadSalesPerHour);
  console.log("hours until 8pm... ", 20 - new Date().getHours());
  var salesTo8 = Math.floor(breadSalesPerHour * (20 - new Date().getHours()));
  var plusWaste8 = salesTo8 + (salesTo8 * 0.08);
  console.log("sales to 8 plus waste... ", plusWaste8);

  var totalTo8 = plusWaste8 + soFar;
  
  var salesTo9 = Math.floor(breadSalesPerHour * (21 - new Date().getHours()));
  var plusWaste9 = salesTo9 + (salesTo9 * 0.08); 
  var totalTo9 = plusWaste9 + soFar;
  console.log("9pm: ", ninePm);
  var finalResult = `
Amount of sales in store: $${inStore}
Earlier sales + in-store: $${soFar}
Sales projected until 8pm: $${plusWaste8}
Total projected to 8pm: $${totalTo8}
Total projected to 9pm $${totalTo9}
`;
  questionEl.textContent = finalResult;
}

questionEl.textContent = questions[0];
