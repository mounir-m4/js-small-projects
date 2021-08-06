const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
// fetch random user add money
async function getRandomUser() {
  // we'll use a the async await here instead of fetch and then
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  //testing
  //console.log(data);
  const user = data.results[0];
  // create an object from the fectched data
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // hard coded data not from the API
    money: Math.floor(Math.random() * 1000000),
  };
  //store the resukt object through array
  addData(newUser);
}
// function to double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}
// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
// Show Millionaires only
function showMilionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEL = document.createElement('div');
  wealthEL.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEL);
}
//add new object to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}
//updateDOM : accept one param
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach((item) => {
    //create an element
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> 
    ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}
// Format number as money :
//for more visit -> https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// Event listeners
//add User
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMilionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
