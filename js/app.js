'use strict';

console.log('hey');

let productSelection = document.getElementById('product-selection');
let leftImage = document.getElementById('product1');
let middleImage = document.getElementById('product2');
let rightImage = document.getElementById('product3');
let button = document.getElementById('results-button');
let resultsContainer = document.getElementById('results-container');
// let Chart = document.getElementById('myChart');
let previousIndexes = [];

let maxNumberOfRounds = 25;
let currentRoundNumber = 0;
let productArr = [];

// Constructor function for products

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = `img/${name}.${fileExtension}`;
  this.timesShown = 0;
  this.votes = 0;
}

// Global Funtion

function selectRandomProduct() {
  const indexes = new Set();
  while(indexes.size < 3 ) {
    const randomIndex =  Math.floor(Math.random() * productArr.length);
    if(!indexes.has(randomIndex) && !previousIndexes.includes(randomIndex)) {
      indexes.add(randomIndex);
    }
  }
  const uniqueIndexes = Array.from(indexes);
  previousIndexes = uniqueIndexes;
  const[leftIndex, middleIndex, rightIndex] = uniqueIndexes;
  renderProducts(leftIndex, middleIndex, rightIndex);
  console.log(uniqueIndexes);
}

function renderProducts(left, middle, right) {
  leftImage.alt = productArr[left].name;
  middleImage.alt = productArr[middle].name;
  rightImage.alt = productArr[right].name;
  leftImage.src = productArr[left].fileExtension;
  middleImage.src = productArr[middle].fileExtension;
  rightImage.src = productArr[right].fileExtension;
  productArr[left].timesShown++;
  productArr[middle].timesShown++;
  productArr[right].timesShown++;

}
function handleProductClick(event) {
  console.log('click');
  currentRoundNumber++;
  let clickedProduct = event.target.alt;
  console.log(clickedProduct);
  for (let i = 0; i < productArr.length; i++) {
    if (clickedProduct === productArr[i].name) {
      console.log('match');
      productArr[i].votes++;
      break;
    }
  }

  if (maxNumberOfRounds === currentRoundNumber) {
    productSelection.removeEventListener('click', handleProductClick);
    button.addEventListener('click', renderResults);
    button.className = 'clicks-allowed';
    storeProductArr();
    console.log('productArr', productArr);
  } else {
    selectRandomProduct();
  }
}

function renderResults() {
  renderList();
  renderChart();
}

function renderList() {
  resultsContainer.innerHTML = '';
  for (let i = 0; i < productArr.length; i++) {
    let resultItem = document.createElement('ul');
    resultItem.textContent = `${productArr[i].name}: Had ${productArr[i].votes} votes and was seen ${productArr[i].timesShown} times.`;
    resultsContainer.appendChild(resultItem);
  }
}

function renderChart() {
  let productNames = [];
  let productTimesShown = [];
  let productVotes = [];

  for (let i = 0; i < productArr.length; i++) {
    productNames.push(productArr[i].name);
    productTimesShown.push(productArr[i].timesShown);
    productVotes.push(productArr[i].votes);
  }
  console.log(productNames);
  const ctx = document.getElementById('myChart');
  const config = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: '# of TimesShown',
          data: productTimesShown,
          borderWidth: 1,
          backgroundColor: 'orange',
          borderColor: 'orange'
        },
        {
          label: '# of Votes',
          data: productVotes,
          borderWidth: 1,
          backgroundColor: 'blue',
          borderColor: 'blue'
        },
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

  new Chart(ctx, config);
}

function storeProductArr() {
  let stringProduct = JSON.stringify(productArr);
  localStorage.setItem('productArr', stringProduct);
}

function getProduct() {
  let potentialProduct = localStorage.getItem('productArr');
  if (potentialProduct) {
    let parsedProduct = JSON.parse(potentialProduct);
    productArr = parsedProduct;
  }
}


// EXECUTABLE CODE

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArr.push(bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  cthulhu,
  dogDuck,
  dragon,
  pen,
  petSweep,
  scissors,
  shark,
  sweep,
  tauntaun,
  unicorn,
  waterCan,
  wineGlass);

selectRandomProduct();

getProduct();

productSelection.addEventListener('click', handleProductClick);
