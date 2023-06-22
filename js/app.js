'use strict';

console.log('hey');

let productSelection = document.getElementById('product-selection');
let leftImage = document.getElementById('product1');
let middleImage = document.getElementById('product2');
let rightImage = document.getElementById('product3');
let button = document.getElementById('results-button');
let resultsContainer = document.getElementById('results-container');



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
  // generate a 3 unique product images
  return Math.floor(Math.random() * productArr.length);
}

function renderProducts() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();

  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = selectRandomProduct();
    product3 = selectRandomProduct();
  }

  leftImage.name = productArr[product1].name;
  middleImage.name = productArr[product2].name;
  rightImage.name = productArr[product3].name;
  leftImage.src = productArr[product1].fileExtension;
  middleImage.src = productArr[product2].fileExtension;
  rightImage.src = productArr[product3].fileExtension;
  productArr[product1].timesShown++;
  productArr[product2].timesShown++;
  productArr[product2].timesShown++;
  console.log(product1);
}
function handleProductClick(event) {
  currentRoundNumber++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < productArr.length; i++) {
    if (clickedProduct === productArr[i].name) {
      productArr[i].votes++;
      break;
    }
  }

  if (maxNumberOfRounds === currentRoundNumber) {
    // end game
    productSelection.removeEventListener('click', handleProductClick);
    button.addEventListener('click', renderResults);
    button.className = 'clicks-allowed';
  } else {
    renderProducts();
  }
}

function renderResults() {
  resultsContainer.innerHTML = '';

  for (let i = 0; i < productArr.length; i++) {
    let resultItem = document.createElement('div');
    resultItem.textContent = `${productArr[i].name} had ${productArr[i].votes} votes and was seen ${productArr[i].timesShown} times.`;
    resultsContainer.appendChild(resultItem);
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
console.log(productArr);

renderProducts();

productSelection.addEventListener('click', handleProductClick);
