'use strict';


// ***** GLOBALS ******
let votingRounds = 25;
let merchArray = [];

// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let attemptsCounter = document.getElementById('attempts-counter');

let ctx = document.getElementById('myChart');

// **** CONSTRUCTOR FUNCTION ****
function Merch(name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** HELPER FUNCTIONS / UTILITIES ****

function randomIndexGenerator() {
  return Math.floor(Math.random() * merchArray.length);
}

let previousRound = [];

function renderImgs() {
  console.log('index Array at the start of function', previousRound);
  while (previousRound.length < 6) {
    let randomNumber = randomIndexGenerator();
    if (!previousRound.includes(randomNumber)) {
      previousRound.push(randomNumber);
    }

  }

  console.log('index Array end of function', previousRound);

  let imageOneIndex = previousRound.shift();
  let imageTwoIndex = previousRound.shift();
  let imageThreeIndex = previousRound.shift();


  // // DONE: make sure they are unique
  // while (imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex) {
  //   imageTwoIndex = randomIndexGenerator();
  //   imageThreeIndex = randomIndexGenerator();
  // }

  imgOne.src = merchArray[imageOneIndex].image;
  imgOne.title = merchArray[imageOneIndex].name;
  imgOne.alt = merchArray[imageOneIndex].name;


  imgTwo.src = merchArray[imageTwoIndex].image;
  imgTwo.title = merchArray[imageTwoIndex].name;
  imgTwo.alt = merchArray[imageTwoIndex].name;

  imgThree.src = merchArray[imageThreeIndex].image;
  imgThree.title = merchArray[imageThreeIndex].name;
  imgThree.alt = merchArray[imageThreeIndex].name;

  merchArray[imageOneIndex].views++;
  merchArray[imageTwoIndex].views++;
  merchArray[imageThreeIndex].views++;

  attemptsCounter.textContent = votingRounds;
}



function renderChart() {
  let nameArray = [];
  let productView = [];
  let productVote = [];

  for (let i = 0; i < merchArray.length; i++) {
    nameArray.push(merchArray[i].name);
    productView.push(merchArray[i].views);
    productVote.push(merchArray[i].votes);
  }

  let tallyChart = {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# of Views',
        data: productView,
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: productVote,
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, tallyChart);
  
}


// **** EVENT HANDLERS ****
function handleImgClick(event) {


  let imageClicked = event.target.title;
  // console.dir(event.target);
  // console.log(imageClicked);


  for (let i = 0; i < merchArray.length; i++) {
    if (imageClicked === merchArray[i].name) {
      merchArray[i].votes++;

      votingRounds--;

      renderImgs();
    }
  }


  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }

}

function handleShowResults() {
  if (votingRounds === 0) {
    renderChart();
  }
  resultBtn.removeEventListener('click', handleShowResults);
}

// **** EXECUTABLE CODE *****
let bag = new Merch('bag');
let banana = new Merch('banana');
let bathroom = new Merch('bathroom');
let boots = new Merch('boots');
let breakFast = new Merch('breakfast');
let bubbleGum = new Merch('bubblegum');
let chair = new Merch('chair');
let cthulhu = new Merch('cthulhu');
let dogDuck = new Merch('dog-duck');
let dragon = new Merch('dragon');
let pen = new Merch('pen');
let petSweep = new Merch('pet-sweep');
let scissors = new Merch('scissors');
let shark = new Merch('shark');
let sweep = new Merch('sweep', 'png');
let tauntaun = new Merch('tauntaun');
let unicorn = new Merch('unicorn');
let waterCan = new Merch('water-can');
let wineGlass = new Merch('wine-glass');


merchArray.push(bag, banana, bathroom, boots, breakFast, bubbleGum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);



renderImgs();
imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
